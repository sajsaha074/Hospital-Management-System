import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InsuranceReviewApprove = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch pending insurance claims
  const fetchClaims = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/getPendingRequests");
      setClaims(response.data);
      setError("");
    } catch (err) {
      setError(err.response ? err.response.data.message : "Failed to fetch claims.");
      console.error("Error fetching claims:", err);
    } finally {
      setLoading(false);
    }
  };

  // Approve a claim
  const approveClaim = async (pemail) => {
    try {
      await axios.post(`http://localhost:4000/approveRequest/${pemail}`);
      alert("Claim approved successfully.");
      fetchClaims();
    } catch (err) {
      alert("Failed to approve claim.");
    }
  };

  // Reject a claim
  const rejectClaim = async (pemail) => {
    try {
      await axios.post(`http://localhost:4000/rejectRequest/${pemail}`);
      alert("Claim rejected successfully.");
      fetchClaims();
    } catch (err) {
      alert("Failed to reject claim.");
    }
  };

  // Navigate back to the dashboard
  const goToDashboard = () => {
    navigate("/admin/dashboard"); // Adjust the route as needed
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Insurance Review and Approval</h1>
      {loading ? (
        <p style={styles.centerText}>Loading claims...</p>
      ) : error ? (
        <p style={styles.errorText}>{error}</p>
      ) : claims.length === 0 ? (
        <p style={styles.centerText}>No pending insurance claims.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Insurance Company</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim._id}>
                <td style={styles.td}>{claim._id}</td>
                <td style={styles.td}>{claim.pname}</td>
                <td style={styles.td}>{claim.insurancecompany}</td>
                <td style={styles.td}>{claim.status}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => approveClaim(claim.pemail)}
                    style={{ ...styles.button, backgroundColor: "green", marginRight: "10px" }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectClaim(claim.pemail)}
                    style={{ ...styles.button, backgroundColor: "red" }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={goToDashboard} style={styles.backButton}>
        Back to Dashboard
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    color: "#007bff",
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  centerText: {
    textAlign: "center",
    fontSize: "1.2rem",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: "1.2rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  th: {
    padding: "12px",
    backgroundColor: "#f1f1f1",
    border: "1px solid #ddd",
    color: "#333",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  button: {
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    minWidth: "100px",
  },
  backButton: {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
};

export default InsuranceReviewApprove;
