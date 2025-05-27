import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CancelAppointment = () => {
    const [doctor, setDoctor] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctorInfo();
    }, []);

    const fetchDoctorInfo = async () => {
        const doctorData = JSON.parse(localStorage.getItem("doctorData"));
        if (!doctorData) {
            alert("Please log in to cancel your appointment schedule!");
            window.location.href = "/doctor/login";
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/getDoctors/${doctorData.email}`);
            setDoctor(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching doctor info:", error.message);
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        try {
            const response = await axios.put(
                `http://localhost:4000/rescheduleTiming/${doctor.demail}`,
                { newSlots: "Unavailable right now!" }
            );
            setSuccessMessage(response.data.message);
            setError("");
            
            setTimeout(() => {
                navigate("/doctor/dashboard");
            }, 3000);
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred while canceling the appointment.");
            }
            setSuccessMessage("");
        }
    };

    if (loading) {
        return <div>Loading doctor information...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1 style={styles.title}>Cancel Appointment Timing</h1>
                <div style={styles.currentInfo}>
                    <h3>Current Available Slots:</h3>
                    <p><strong>Available Slots:</strong> {doctor.availableSlots}</p>
                </div>
                <button onClick={handleCancel} style={styles.button}>
                    Cancel Appointment
                </button>
                {error && <p style={styles.error}>{error}</p>}
                {successMessage && <p style={styles.success}>{successMessage}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "20px",
    },
    formContainer: {
        width: "100%",
        maxWidth: "600px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        textAlign: "center",
    },
    title: {
        marginBottom: "20px",
        fontSize: "24px",
        color: "green",
    },
    currentInfo: {
        textAlign: "left",
        marginBottom: "20px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "red",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
    error: {
        color: "red",
        marginTop: "10px",
    },
    success: {
        color: "green",
        marginTop: "10px",
    },
};

export default CancelAppointment;