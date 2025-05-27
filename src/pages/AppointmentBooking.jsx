import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppointmentBooking = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get("http://localhost:4000/getDoctors");
            setDoctors(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching doctors:", error.message);
        }
    };

    const handleBookAppointment = async (doctor) => {
        const patientData = JSON.parse(localStorage.getItem("patientData"));

        if (!patientData) {
            alert("Please log in to book an appointment!");
            return;
        }

        if (doctor.dcapacity <= 0) {
            alert("This doctor's appointment capacity is full.");
            return;
        }

        const appointmentData = {
            pname: patientData.name,
            pemail: patientData.email,
            dname: doctor.dname,
            demail: doctor.demail,
            specialization: doctor.specialization,
            availableSlots: doctor.availableSlots,
        };

        try {
            await axios.post("http://localhost:4000/addAppointment", appointmentData);
            await axios.put(`http://localhost:4000/reduceCapacity/${doctor.demail}`);
            alert("Appointment booked successfully!");
            fetchDoctors();
        } catch (error) {
            console.error("Error booking appointment:", error.message);
        }
    };

    if (loading) {
        return <div>Loading doctors...</div>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ 
                textAlign: "center", 
                marginBottom: "20px", 
                fontSize: "36px", 
                color: "green" 
            }}>
                Book an Appointment
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
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Specialization</th>
                        <th style={styles.th}>Capacity</th>
                        <th style={styles.th}>Available Slots</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor._id} style={styles.tr}>
                            <td style={styles.td}>{doctor.dname}</td>
                            <td style={styles.td}>{doctor.demail}</td>
                            <td style={styles.td}>{doctor.specialization}</td>
                            <td style={styles.td}>{doctor.dcapacity}</td>
                            <td style={styles.td}>{doctor.availableSlots}</td>
                            <td style={styles.td}>
                                <button
                                    disabled={doctor.dcapacity <= 0}
                                    onClick={() => handleBookAppointment(doctor)}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: doctor.dcapacity > 0 && doctor.availableSlots != "Unavailable right now!" ? "#007BFF" : "#CCCCCC",
                                        cursor: doctor.dcapacity > 0 && doctor.availableSlots != "Unavailable right now!" ? "pointer" : "not-allowed",
                                    }}
                                >
                                    Book Appointment
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

export default AppointmentBooking;