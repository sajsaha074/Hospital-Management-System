import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const EmergencyBooking = () => {
  const [email, setEmail] = useState("");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getDoctors");
      setDoctors(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch doctors. Please try again.");
      console.error(err.message);
    }
  };

  const fetchPatientByEmail = async (email) => {
    try {
      const response = await axios.get(`http://localhost:4000/getPatients/${email}`);
      setPatients(response.data);
      return response.data;
    } catch (err) {
      setError("Email not found in the database.");
      setPatients([]);
      return null;
    }
  };

  const reduceDoctorCapacity = async (demail) => {
    try {
      const response = await axios.put(`http://localhost:4000/reduceCapacity/${demail}`);
      console.log("Doctor capacity reduced successfully:", response.data);
    } catch (err) {
      console.error("Failed to reduce doctor capacity:", err.message);
    }
  };

  const bookAppointment = async (doctorId) => {
    if (!email) {
      setError("Please enter a valid email.");
      return;
    }

    const patient = await fetchPatientByEmail(email);
    if (patient) {
      try {
        const response = await axios.post("http://localhost:4000/addAppointment", {
          pname: patient.pname,
          pemail: email,
          dname: doctorId.dname,
          demail: doctorId.demail,
          specialization: doctorId.specialization,
          availableSlots: doctorId.availableSlots,
          capacity: doctorId.dcapacity,
        });

        await reduceDoctorCapacity(doctorId.demail); 

        setSuccess("Appointment booked successfully!");
        setError("");
        await fetchDoctors(); 
      } catch (err) {
        setError("Failed to book appointment. Please try again.");
        console.error(err.message);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setSuccess("");
    setError("");
  };

  const handleSubmitEmail = async () => {
    await fetchDoctors();
  };

  const handleGoBack = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontFamily: "'Arial', sans-serif",
          color: "red",
          fontSize: "36px",
        }}
      >
        Emergency Appointment Booking
      </h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter Patient Email"
          style={{
            padding: "10px",
            width: "300px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleSubmitEmail}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit Email
        </button>
      </div>

      {error && <p style={{ textAlign: "center", padding: "10px", fontSize: "18px", color: "red" }}>{error}</p>}
      {success && <p style={{ textAlign: "center", padding: "10px", fontSize: "18px", color: "green" }}>{success}</p>}

      {doctors.length > 0 && (
        <div>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontFamily: "'Arial', sans-serif",
              fontSize: "28px",
            }}
          >
            Available Doctors
          </h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "20px 0",
              fontFamily: "'Arial', sans-serif",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "12px 15px",
                    textAlign: "left",
                    backgroundColor: "#4CAF50",
                    color: "white",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "12px 15px",
                    textAlign: "left",
                    backgroundColor: "#4CAF50",
                    color: "white",
                  }}
                >
                  Specialization
                </th>
                <th
                  style={{
                    padding: "12px 15px",
                    textAlign: "left",
                    backgroundColor: "#4CAF50",
                    color: "white",
                  }}
                >
                  Available Slots
                </th>
                <th
                  style={{
                    padding: "12px 15px",
                    textAlign: "left",
                    backgroundColor: "#4CAF50",
                    color: "white",
                  }}
                >
                  Capacity
                </th>
                <th
                  style={{
                    padding: "12px 15px",
                    textAlign: "left",
                    backgroundColor: "#4CAF50",
                    color: "white",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.demail}>
                  <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd" }}>{doctor.dname}</td>
                  <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd" }}>{doctor.specialization}</td>
                  <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd" }}>{doctor.availableSlots}</td>
                  <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd" }}>{doctor.dcapacity}</td>
                  <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd" }}>
                    <button
                      onClick={() => bookAppointment(doctor)}
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Book Appointment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleGoBack}
          style={{
            backgroundColor: "gray",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default EmergencyBooking;