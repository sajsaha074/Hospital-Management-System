import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminFetchMedicine = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await axios.get("http://localhost:4000/getMedicine");
            setMedicines(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching medicines:", error.message);
        }
    };

    if (loading) {
        return (
            <div className="loading" style={styles.loadingContainer}>
                <div className="spinner" style={styles.spinner}></div>
                Loading medicines...
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Medicine Inventory</h1>
            <div style={styles.card}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Medicine Name</th>
                            <th style={styles.th}>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((medicine) => (
                            <tr key={medicine._id} style={styles.tr}>
                                <td style={styles.td}>{medicine.medicine_name}</td>
                                <td style={styles.td}>{medicine.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={styles.buttonContainer}>
                <button
                    style={styles.dashboardButton}
                    onClick={() => navigate("/admin/dashboard")} // Use navigate
                >
                    Go to Admin Dashboard
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
    },
    heading: {
        fontSize: "36px",
        color: "#28a745",
        marginBottom: "20px",
        fontWeight: "bold",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        marginBottom: "30px",
    },
    table: {
        margin: "0 auto",
        borderCollapse: "collapse",
        width: "80%",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    th: {
        padding: "15px",
        border: "1px solid #ddd",
        backgroundColor: "#28a745",
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
    td: {
        padding: "15px",
        border: "1px solid #ddd",
        textAlign: "center",
    },
    tr: {
        backgroundColor: "#fff",
        transition: "background-color 0.3s",
    },
    buttonContainer: {
        marginTop: "20px",
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
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    },
    spinner: {
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #28a745",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        animation: "spin 2s linear infinite",
    },
};

export default AdminFetchMedicine;
