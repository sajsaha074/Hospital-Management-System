import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowDoctorAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noAppointments, setNoAppointments] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const doctorData = JSON.parse(localStorage.getItem("doctorData"));

        if (!doctorData) {
            alert("Please log in to view your appointments!");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/getAppointments/${doctorData.email}`);
            if (response.data.length === 0) {
                setNoAppointments(true);
            } else {
                setAppointments(response.data);
                setNoAppointments(false);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching appointments:", error.message);
            setLoading(false);
            setNoAppointments(true);
        }
    };

    const handleCancelAppointment = async (appointment) => {
        try {
            await axios.delete(`http://localhost:4000/deleteAppoint/${appointment.pemail}`);
            await axios.put(`http://localhost:4000/increaseCapacity/${appointment.demail}`);
            alert("Checked successfully!");
            fetchAppointments();
        } catch (error) {
            console.error("Error canceling appointment:", error.message);
        }
    };

    const handleGoToDashboard = () => {
        navigate("/doctor/dashboard");
    };

    if (loading) {
        return <div>Loading your appointments...</div>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ 
                textAlign: "center", 
                marginBottom: "20px", 
                fontSize: "36px", 
                color: "green" 
            }}>
                Your Patients
            </h1>
            {noAppointments ? (
                <div style={{ textAlign: "center", fontSize: "20px", color: "red" }}>
                    No appointments found.
                </div>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Patient's Name</th>
                            <th style={styles.th}>Patient's Email</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment._id} style={styles.tr}>
                                <td style={styles.td}>{appointment.pname}</td>
                                <td style={styles.td}>{appointment.pemail}</td>
                                <td style={styles.td}>
                                    <button
                                        onClick={() => handleCancelAppointment(appointment)}
                                        style={styles.cancelButton}
                                    >
                                        Checked
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div style={{ textAlign: "center"}}>
                <button
                    onClick={handleGoToDashboard}
                    style={styles.goBackButton}
                >
                    Go to Doctor Dashboard
                </button>
            </div>

            <div style={{ textAlign: "center"}}>
                <button
                    onClick={() => navigate("/doctor/prescription")}
                    style={styles.goBackButton}
                >
                    Patient's Prescription
                </button>
            </div>
            <div style={{ textAlign: "center"}}>
                <button
                    onClick={() => navigate("/doctor/addTest")}
                    style={styles.goBackButton}
                >
                    Add test on behalf of a patient
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
    cancelButton: {
        padding: "10px 20px",
        backgroundColor: "#4caf50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background-color 0.3s",
    },
    goBackButton: {
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "20px",
        transition: "background-color 0.3s",
    },
};

export default ShowDoctorAppointment;