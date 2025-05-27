import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch reviews when component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:4000/getReviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        console.log("Reviews fetched:", data);
        setReviews(data);
      } catch (err) {
        setError("Failed to load reviews. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      {/* Header Section */}
      <header
        style={{
          width: "100%",
          textAlign: "center",
          marginBottom: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "15px 0",
        }}
      >
        <h1>Reviews</h1>
      </header>

      {/* Reviews Section */}
      <div
        style={{
          width: "80%",
          maxWidth: "800px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          flexGrow: 1, // Ensures reviews section takes up available space
        }}
      >
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading reviews...</p>
        ) : error ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {reviews.map((review) => (
              <li
                key={review._id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3>{review.pname}</h3> {/* Display patient's name */}
                <p>
                  <strong>Email:</strong> {review.pemail}
                </p>
                <p>
                  <strong>Service Taken:</strong> {review.ServicesTaken}
                </p>
                <p>
                  <strong>Review:</strong> {review.review}
                </p>
                <small>
                  <strong>Added On:</strong>{" "}
                  {new Date(review.createdAt).toLocaleString()}{" "}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Back to Home Button */}
      <footer
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "20px",
          padding: "10px 0",
        }}
      >
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "#4CAF50",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Back to Home
        </Link>
      </footer>
    </div>
  );
};

export default ShowReview;
