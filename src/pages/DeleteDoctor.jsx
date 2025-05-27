import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DeleteDoctor = () => {
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

  const deleteDoctor = async (demail) => {
    try {
      const response = await axios.delete(`http://localhost:4000/deleteDoc/${demail}`);
      setSuccess(response.data.message);
      setError("");
      fetchDoctors();
    } catch (err) {
      setError("Failed to delete doctor. Please try again.");
      setSuccess("");
      console.error(err.message);
    }
  };

  const handleGoBack = () => {
    navigate("/admin/dashboard");
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", fontFamily: "'Arial', sans-serif", color: "red", fontSize: "36px" }}>
        Delete Doctor Profiles
      </h1>
      
      {error && <p style={{ textAlign: "center", padding: "10px", fontSize: "18px", color: "red" }}>{error}</p>}
      {success && <p style={{ textAlign: "center", padding: "10px", fontSize: "18px", color: "green" }}>{success}</p>}

      {doctors.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0", fontFamily: "'Arial', sans-serif" }}>
          <thead>
            <tr>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Name</th>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Email</th>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Specialization</th>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Capacity</th>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Available Slots</th>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>{doctor.dname}</td>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>{doctor.demail}</td>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>{doctor.specialization}</td>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>{doctor.dcapacity}</td>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>{doctor.availableSlots}</td>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>
                  <button
                    onClick={() => deleteDoctor(doctor.demail)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#d32f2f"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "red"}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No doctors found.</p>
      )}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleGoBack}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
            fontSize: "16px",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DeleteDoctor;