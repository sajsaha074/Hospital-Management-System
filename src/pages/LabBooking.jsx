import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LabBooking = () => {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLabs();
    }, []);

    const fetchLabs = async () => {
        try {
            const response = await axios.get("http://localhost:4000/getLab");
            setLabs(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching labs:", error.message);
        }
    };

    const handleUpdateService = async (lab) => {
        const patientData = JSON.parse(localStorage.getItem("patientData"));

        if (!patientData) {
            alert("Please log in to update service!");
            return;
        }

        const serviceData = {
            f_id: lab.f_id,
            service_type: "Lab Test", // You can dynamically set this based on the lab type
            item_name: lab.test_type,
            quantity: 1, // You can add quantity logic if needed
            total_price: lab.test_price,
            pemail: patientData.email,
            date: new Date().toISOString().split('T')[0], // Get today's date
        };

        try {
            await axios.post("http://localhost:4000/addServiceLab", serviceData);
            alert("Lab service added successfully!");
            fetchLabs(); // Refresh the labs data after updating
        } catch (error) {
            console.error("Error updating service:", error.message);
            alert("There was an error updating the service. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading labs...</div>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    fontSize: "36px",
                    color: "blue",
                }}
            >
                Lab Test Services
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
                        <th style={styles.th}>Lab Number</th>
                        <th style={styles.th}>Test Type</th>
                        <th style={styles.th}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {labs.map((lab) => (
                        <tr key={lab._id} style={styles.tr}>
                            <td style={styles.td}>{lab.f_id}</td>
                            <td style={styles.td}>{lab.lab_no}</td>
                            <td style={styles.td}>{lab.test_type}</td>
                            <td style={styles.td}>Tk. {lab.test_price}</td>
                            <td style={styles.td}>
                                <button
                                    onClick={() => handleUpdateService(lab)}
                                    style={styles.button}
                                >
                                    Add Service
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
        backgroundColor: "#007BFF",
        color: "#fff",
        fontSize: "14px",
        borderRadius: "5px",
        cursor: "pointer",
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

export default LabBooking;
