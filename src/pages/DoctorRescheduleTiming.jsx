import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RescheduleAppointmentTiming = () => {
    const [doctor, setDoctor] = useState({});
    const [loading, setLoading] = useState(true);
    const [newSlots, setNewSlots] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [currSlot, setCurrSlot] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctorInfo();
    }, []);

    const fetchDoctorInfo = async () => {
        const doctorData = JSON.parse(localStorage.getItem("doctorData"));
        if (!doctorData) {
            alert("Please log in to reschedule your appointment timing!");
            window.location.href = "/doctor/login";
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/getDoctors/${doctorData.email}`);
            setDoctor(response.data);
            setCurrSlot(response.data.availableSlots);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching doctor info:", error.message);
            setLoading(false);
        }
    };

    const handleReschedule = async () => {
        if (!newSlots || currSlot === newSlots) {
            setError("Please provide new available slots or make sure the new schedule is different from the current one.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:4000/rescheduleTiming/${doctor.demail}`,
                { newSlots }
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
                setError("An error occurred while rescheduling.");
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
                <h1 style={styles.title}>Reschedule Appointment Timing</h1>
                <div style={styles.currentInfo}>
                    <h3>Current Available Slots:</h3>
                    <p><strong>Available Slots:</strong> {doctor.availableSlots}</p>
                </div>
                <div style={styles.inputContainer}>
                    <label>
                        <strong>Enter New Available Slots:</strong>
                        <input
                            type="text"
                            placeholder="e.g. Tuesday 9 AM - 5 PM"
                            value={newSlots}
                            onChange={(e) => setNewSlots(e.target.value)}
                            style={styles.input}
                        />
                    </label>
                </div>
                <button onClick={handleReschedule} style={styles.button}>
                    Reschedule Timing
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
    inputContainer: {
        marginBottom: "20px",
    },
    input: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "green",
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

export default RescheduleAppointmentTiming;