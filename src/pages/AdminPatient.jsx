import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPatients = () => {
    const navigate = useNavigate();

    // Navigation handlers for button actions
    const handleAddPatient = () => {
        navigate("/patient/signup");
    };

    const handleUpdatePatient = () => {
        navigate("/admin/makeAvailable");
    };

    const handleDeletePatient = () => {
        navigate("/admin/deletePatient");
    };

    //const handleRestrictPatient = () => {
        //navigate("/admin/restrictPatient");
    //};

    const handleBackToDashboard = () => {
        navigate("/admin/dashboard");
    };

    const handleEmergencyAppointmentBooking = () => {
        navigate("/admin/emergencybooking");
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <h1 style={styles.heading}>Admin Patients Panel</h1>
            </header>

            {/* Main Content */}
            <main style={styles.main}>
                <div style={styles.buttonContainer}>
                    {/* First Row - Add and Update */}
                    <div style={styles.row}>
                        <button style={styles.button} onClick={handleAddPatient}>
                            Add Patient
                        </button>
                        <button style={styles.button} onClick={handleUpdatePatient}>
                            Make Patient Available
                        </button>
                    </div>
                    {/* Second Row - Delete and Restrict */}
                    <div style={styles.row}>
                        <button style={styles.button} onClick={handleDeletePatient}>
                            Delete Patient
                        </button>
                        
                        <button style={styles.button} onClick={handleEmergencyAppointmentBooking}>
                            Emergency Appointment Booking
                        </button>
                    </div>
                </div>
                <button style={styles.backButton} onClick={handleBackToDashboard}>
                    Back to Dashboard
                </button>
            </main>

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
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f3f7fc",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "20px 0",
        backgroundColor: "#1E2A47",  // Darker blue for a sophisticated feel
        color: "#fff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderBottom: "2px solid #007bff",
    },
    heading: {
        fontSize: "2.5rem",
        margin: "0",
        fontWeight: "bold",
    },
    main: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        padding: "20px",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        alignItems: "center",
        marginBottom: "30px",
        width: "100%",
    },
    row: {
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        width: "100%",
    },
    button: {
        padding: "15px 30px",
        fontSize: "1.1rem",
        color: "#fff",
        backgroundColor: "#007bff", // Blue button color
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        minWidth: "160px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
        transform: "scale(1.05)",
    },
    backButton: {
        padding: "15px 30px",
        fontSize: "1.1rem",
        color: "#fff",
        backgroundColor: "#6c757d",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        minWidth: "160px",
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
        boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
    },
};

export default AdminPatients;
