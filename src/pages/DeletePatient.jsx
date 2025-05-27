import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DeletePatient = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getPatients");
      setPatients(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch patients. Please try again.");
      console.error(err.message);
    }
  };

  const deletePatient = async (pemail) => {
    try {
      const response = await axios.delete(`http://localhost:4000/deletePat/${pemail}`);
      setSuccess(response.data.message);
      setError("");
      fetchPatients();
    } catch (err) {
      setError("Failed to delete patient. Please try again.");
      setSuccess("");
      console.error(err.message);
    }
  };

  const handleGoBack = () => {
    navigate("/admin/dashboard");
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", fontFamily: "'Arial', sans-serif", color: "red", fontSize: "36px" }}>
        Delete Patient Profiles
      </h1>
      
      {error && <p style={{ textAlign: "center", padding: "10px", fontSize: "18px", color: "red" }}>{error}</p>}
      {success && <p style={{ textAlign: "center", padding: "10px", fontSize: "18px", color: "green" }}>{success}</p>}

      {patients.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0", fontFamily: "'Arial', sans-serif" }}>
          <thead>
            <tr>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Name</th>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Email</th>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Age</th>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Address</th>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Phone</th>
              <th style={{ padding: "12px 15px", textAlign: "left", backgroundColor: "#4CAF50", color: "white" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>{patient.pname}</td>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>{patient.pemail}</td>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>{patient.page}</td>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>{patient.paddress}</td>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>{patient.phone}</td>
                <td style={{ padding: "12px 15px", textAlign: "left" }}>
                  <button
                    onClick={() => deletePatient(patient.pemail)}
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
        <p>No patients found.</p>
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

export default DeletePatient;