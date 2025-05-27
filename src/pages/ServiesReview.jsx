import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const ServicesReviewPage = () => {
  const [formData, setFormData] = useState({
    pname: "",
    pemail: "",
    ServicesTaken: "",
    review: "",
  });
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch patient data from local storage
  useEffect(() => {
    const patientData = JSON.parse(localStorage.getItem("patientData"));
    if (patientData) {
      setFormData((prevState) => ({
        ...prevState,
        pname: patientData.name,
        pemail: patientData.email,
      }));
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch all reviews
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/getReviews");
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const fetchedReviews = await response.json();
      setReviews(fetchedReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err.message);
      setError("Failed to fetch reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Handle form submission to add a new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/addReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const newReview = await response.json();
      setReviews([...reviews, newReview]);
      setFormData({ ...formData, ServicesTaken: "", review: "" });
      setNotification("Your review has been successfully submitted.");
      setError(null);
    } catch (err) {
      console.error("Error adding review:", err.message);
      setError("Failed to submit the review. Please try again.");
    }
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      {/* Logo Section */}
      <img
        src="/images/logo.png"
        alt="Healopharm Logo"
        className="logo"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "150px",
        }}
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
          Service Review Form
        </h1>

        {/* Review Form */}
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div>
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="pname"
              value={formData.pname}
              readOnly
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
                backgroundColor: "#f0f0f0",
              }}
            />
          </div>

          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="pemail"
              value={formData.pemail}
              readOnly
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
                backgroundColor: "#f0f0f0",
              }}
            />
          </div>

          <div>
            <label htmlFor="services">Services Taken:</label>
            <select
              id="services"
              name="ServicesTaken"
              value={formData.ServicesTaken}
              onChange={handleChange}
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
            >
              <option value="">Select a Service</option>
              <option value="Lab">Lab</option>
              <option value="Bed">Bed</option>
              <option value="Ambulance">Ambulance</option>
              <option value="Medicine">Medicine</option>
            </select>
          </div>

          <div>
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
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
            Submit Review
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

        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        

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

export default ServicesReviewPage;