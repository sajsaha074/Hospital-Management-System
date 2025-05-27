import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorAdmin = () => {
    const navigate = useNavigate();

    // Navigate to Add Doctor page
    const handleAddDoctor = () => {
        navigate("/admin/addDoctor");
    };

    // Navigate to Delete Doctor page
    const handleDeleteDoctor = () => {
        navigate("/deleteDoc/:id");
    };

    // Navigate back to Admin Dashboard
    const handleBackToDashboard = () => {
        navigate("/admin/dashboard");
    };

    return (
        <div style={styles.container}>
            {/* Header with Logo */}
            <header style={styles.header}>
                <h1 style={styles.heading}>Doctor Admin Panel</h1>
            </header>

            {/* Main Content */}
            <div style={styles.mainContent}>
                <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={handleAddDoctor}>
                        Add Doctor
                    </button>
                    <button style={styles.button} onClick={handleDeleteDoctor}>
                        Delete Doctor
                    </button>
                </div>
                <button style={styles.backButton} onClick={handleBackToDashboard}>
                    Back to Admin Dashboard
                </button>
            </div>

            {/* Footer */}
            <footer style={styles.footer}>
                <p>© 2024 Healopharm. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100vh",
        backgroundColor: "#f4f7fc",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "0 20px",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "20px 0",
        backgroundColor: "#007bff",
        color: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderBottom: "2px solid #0056b3",
    },
    heading: {
        fontSize: "2.5rem",
        fontWeight: "600",
        margin: "0",
    },
    mainContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "20px",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        marginBottom: "30px",
        width: "100%",
        alignItems: "center",
    },
    button: {
        padding: "12px 25px",
        fontSize: "1.2rem",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        minWidth: "200px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
        transform: "scale(1.05)",
    },
    backButton: {
        padding: "12px 25px",
        fontSize: "1.2rem",
        color: "#fff",
        backgroundColor: "#6c757d",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        minWidth: "200px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    backButtonHover: {
        backgroundColor: "#5a6268",
        transform: "scale(1.05)",
    },
    footer: {
        width: "100%",
        textAlign: "center",
        padding: "15px 0",
        backgroundColor: "#333",
        color: "#fff",
        fontSize: "1rem",
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
    },
};

export default DoctorAdmin;
