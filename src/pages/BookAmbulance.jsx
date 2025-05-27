import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookAmbulance = () => {
    const [ambulances, setAmbulances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookedAmbulance, setBookedAmbulance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAmbulances();
    }, []);

    const fetchAmbulances = async () => {
        try {
            const response = await axios.get("http://localhost:4000/getAmbulance");
            setAmbulances(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching ambulances:", error.message);
        }
    };

    const handleBookAmbulance = async (ambulance) => {
        const patientData = JSON.parse(localStorage.getItem("patientData"));
        
        if (!patientData) {
            alert("Please log in to book an ambulance!");
            return;
        }

        if (!ambulance.availability) {
            alert("This ambulance is currently unavailable.");
            return;
        }

        const bookingData = {
            availability: false,
        };

        try {
            // Update the ambulance availability in the database
            const response = await axios.put(`http://localhost:4000/updateAmbInfo/${ambulance.f_id}`, bookingData);

            // Update the local state to reflect the booking
            const updatedAmbulances = ambulances.map((item) =>
                item.f_id === ambulance.f_id ? { ...item, availability: response.data.ambulance.availability } : item
            );
            setAmbulances(updatedAmbulances);
            setBookedAmbulance(ambulance);

            // Get patient data (email)
            const patientData = JSON.parse(localStorage.getItem("patientData"));
            const pemail = patientData?.email;

            if (!pemail) {
                alert("Patient email is missing!");
                return;
            }

            // Add ambulance to the services database
            await axios.post("http://localhost:4000/addServiceAmbulance", {
                f_id: ambulance.f_id,
                service_type: "Ambulance",
                item_name: ambulance.plate_no,
                quantity: 1,
                price: ambulance.Price,
                pemail,
            });

            alert("Ambulance booked and added to cart and services successfully!");
        } catch (error) {
            console.error("Error booking ambulance or adding to services:", error.message);
        }
    };

    if (loading) {
        return <div className="loading">Loading ambulances...</div>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "36px", color: "green" }}>
                Book an Ambulance
            </h1>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Plate Number</th>
                        <th style={styles.th}>Type</th>
                        <th style={styles.th}>Time</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Availability</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ambulances.map((ambulance) => (
                        <tr key={ambulance.f_id} style={styles.tr}>
                            <td style={styles.td}>{ambulance.f_id}</td>
                            <td style={styles.td}>{ambulance.plate_no}</td>
                            <td style={styles.td}>{ambulance.Type}</td>
                            <td style={styles.td}>{ambulance.Time}</td>
                            <td style={styles.td}>Tk. {ambulance.Price}</td>
                            <td style={styles.td}>{ambulance.availability ? "Available" : "Unavailable"}</td>
                            <td style={styles.td}>
                                <button
                                    disabled={!ambulance.availability}
                                    onClick={() => handleBookAmbulance(ambulance)}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: ambulance.availability ? "#007BFF" : "#CCCCCC",
                                        cursor: ambulance.availability ? "pointer" : "not-allowed",
                                    }}
                                >
                                    {ambulance.availability ? "Book Ambulance" : "Booked"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {bookedAmbulance && (
                <div style={{ textAlign: "center", marginTop: "20px", fontSize: "18px", color: "green" }}>
                    <h3>Ambulance Booked Successfully!</h3>
                    <p>Ambulance ID: {bookedAmbulance.f_id}</p>
                    <p>Plate Number: {bookedAmbulance.plate_no}</p>
                    <p>Type: {bookedAmbulance.Type}</p>
                    <p>Price: {bookedAmbulance.Price}</p>
                </div>
            )}

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                    style={styles.dashboardButton}
                    onClick={() => navigate("/patient/dashboard")}
                >
                    Go to Services Dashboard
                </button>
            </div>
        </div>
    );
};

const styles = {
    th: {
        padding: "10px",
        border: "1px solid #ddd",
        backgroundColor: "#f4f4f4",
        textAlign: "left",
    },
    td: {
        padding: "10px",
        border: "1px solid #ddd",
    },
    tr: {
        '&:nth-child(even)': { backgroundColor: "#f9f9f9" }
    },
    button: {
        padding: "10px 20px",
        border: "none",
        color: "white",
        fontSize: "14px",
        borderRadius: "5px",
        transition: "background-color 0.3s",
    },
    dashboardButton: {
        padding: "15px 25px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "18px",
        transition: "background-color 0.3s",
    },
};

export default BookAmbulance;
