import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BedBooking = () => {
    const [beds, setBeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBeds();
    }, []);

    const fetchBeds = async () => {
        try {
            const response = await axios.get("http://localhost:4000/getBed");
            setBeds(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching beds:", error.message);
        }
    };

    const handleBookBed = async (bed) => {
        const patientData = JSON.parse(localStorage.getItem("patientData"));

        if (!patientData) {
            alert("Please log in to book a bed!");
            return;
        }

        if (!bed.status) {
            alert("This bed is currently unavailable.");
            return;
        }

        const bookingData = {
            pname: patientData.name,
            pemail: patientData.email,
            f_id: bed.f_id,
            bed_no: bed.bed_no,
            category: bed.category,
            bed_price: bed.bed_price,
        };

        // Add service data to servicesmodel.js
        const serviceData = {
            f_id: bed.f_id,
            service_type: "Bed Booking",
            item_name: `Bed No: ${bed.bed_no} (${bed.category})`,
            quantity: 1,
            total_price: bed.bed_price,
            pemail: patientData.email,
            date: new Date().toISOString().split('T')[0], // Get today's date
        };

        try {
            await axios.post("http://localhost:4000/addServiceBed", serviceData); // Add to services collection
            await axios.put(`http://localhost:4000/updateBedInfo/${bed.f_id}`, { status: false }); // Update bed status
            alert("Bed booked successfully!");
            fetchBeds(); // Refresh the beds data after booking
        } catch (error) {
            console.error("Error booking bed:", error.message);
            alert("There was an error booking the bed. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading beds...</div>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ 
                textAlign: "center", 
                marginBottom: "20px", 
                fontSize: "36px", 
                color: "green" 
            }}>
                Book a Bed
            </h1>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th style={styles.th}>Facility ID</th>
                        <th style={styles.th}>Bed Number</th>
                        <th style={styles.th}>Category</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {beds.map((bed) => (
                        <tr key={bed.f_id} style={styles.tr}>
                            <td style={styles.td}>{bed.f_id}</td>
                            <td style={styles.td}>{bed.bed_no}</td>
                            <td style={styles.td}>{bed.category}</td>
                            <td style={styles.td}>Tk. {bed.bed_price}</td>
                            <td style={styles.td}>{bed.status ? "Available" : "Unavailable"}</td>
                            <td style={styles.td}>
                                <button
                                    disabled={!bed.status}
                                    onClick={() => handleBookBed(bed)}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: bed.status ? "#007BFF" : "#CCCCCC",
                                        cursor: bed.status ? "pointer" : "not-allowed",
                                    }}
                                >
                                    Book Bed
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                    style={styles.dashboardButton}
                    onClick={() => navigate("/patient/dashboard")}
                >
                    Go to Patient Dashboard
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
        backgroundColor: "#fff",
        transition: "background-color 0.3s",
    },
    button: {
        padding: "10px 20px",
        border: "none",
        color: "#fff",
        fontSize: "14px",
        borderRadius: "5px",
        transition: "background-color 0.3s",
    },
    dashboardButton: {
        padding: "15px 25px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "18px",
        transition: "background-color 0.3s",
    },
};

export default BedBooking;
