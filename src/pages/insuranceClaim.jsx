import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const InsuranceClaimPage = () => {
  const [pname, setPname] = useState("");
  const [pemail, setPemail] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const storedPatientData = JSON.parse(localStorage.getItem("patientData"));
    if (storedPatientData) {
      setPname(storedPatientData.name || "");
      setPemail(storedPatientData.email || "");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!insuranceCompany.trim()) {
      alert("Please enter the insurance company name.");
      return;
    }

    const claimData = {
      pname,
      pemail,
      insurancecompany: insuranceCompany,
    };

    try {
      const response = await fetch("http://localhost:4000/addClaim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(claimData),
      });

      if (response.ok) {
        setNotification("Your insurance claim has been submitted and is awaiting approval.");
      } else {
        const errorData = await response.json();
        setNotification(errorData.message || "Failed to submit the claim.");
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
      setNotification("An error occurred while submitting your claim. Please try again later.");
    }
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      {/* Logo Section */}
      <img
        src="/images/logo.png"
        alt="Healopharm Logo"
        className="logo"
        style={{ position: "absolute", top: "20px", left: "20px", width: "150px" }}
      />

      <div style={{ paddingTop: "80px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            color: "green",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Insurance Claim Form
        </h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div>
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              value={pname}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                maxWidth: "400px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#f5f5f5",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={pemail}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                maxWidth: "400px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#f5f5f5",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label htmlFor="insuranceCompany">Insurance Company:</label>
            <input
              type="text"
              id="insuranceCompany"
              value={insuranceCompany}
              onChange={(e) => setInsuranceCompany(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                maxWidth: "400px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                border: "2px solid rgb(44, 217, 84)",
                borderRadius: "5px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "rgb(36, 39, 222)",
              color: "#fff",
              border: "2px solid #4A90E2",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background-color 0.3s, color 0.3s",
              width: "100%",
              maxWidth: "400px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Claim Insurance
          </button>
        </form>

        {/* Notification */}
        {notification && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#e0f7fa",
              borderRadius: "5px",
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p>{notification}</p>
          </div>
        )}

        {/* Back to Dashboard Button */}
        <Link to="/patient/dashboard">
          <button
            style={{
              padding: "10px 20px",
              marginTop: "20px",
              backgroundColor: "#F1B814",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
              maxWidth: "400px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InsuranceClaimPage;
