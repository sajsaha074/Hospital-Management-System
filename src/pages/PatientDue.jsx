import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientDue = () => {
  const [pemail, setPemail] = useState("");
  const [dueAmount, setDueAmount] = useState(0);
  const [dueDate, setDueDate] = useState(""); // Added state for due date
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve patient data from localStorage
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setPemail(parsedData.email);
      fetchDueAmount(parsedData.email);
      fetchFirstServiceDate(parsedData.email); // Fetch first service date as well
    }
  }, []);

  // Fetch the due amount from the backend
  const fetchDueAmount = async (email) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/getDueAmount/${email}`);
      const fetchedDueAmount = response.data.dueAmount;

      if (fetchedDueAmount !== undefined && fetchedDueAmount !== null) {
        setDueAmount(fetchedDueAmount);
        localStorage.setItem("dueAmount", fetchedDueAmount); // Store in localStorage
      } else {
        console.log("No due amount found.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching due amount:", error.message);
      setLoading(false);
    }
  };

  // Fetch the first service date and calculate the due date (15 days after)
  const fetchFirstServiceDate = async (email) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/getFirstServiceDate/${email}`);
      if (response.data.firstServiceDate) {
        const firstServiceDate = new Date(response.data.firstServiceDate);
        if (!isNaN(firstServiceDate)) {
          // Add 15 days to the first service date
          const initialDueDate = new Date(firstServiceDate);
          initialDueDate.setDate(firstServiceDate.getDate() + 15); // Add 15 days to the due date
          const dueDateString = initialDueDate.toDateString(); // Convert to string for display
          setDueDate(dueDateString);
        } else {
          console.log("Invalid date format received from server.");
        }
      } else {
        console.log("No service date found for this patient.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching first service date:", error.message);
      setLoading(false);
    }
  };

  // Handle payment submission
  const handlePayment = async (event) => {
    event.preventDefault();
    const paymentAmount = parseFloat(event.target.payment.value);
    
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      alert("Please enter a valid payment amount");
      return;
    }

    if (paymentAmount !== dueAmount) { // Check if the payment is not exactly the due amount
      alert("Payment amount must be exactly equal to the due amount.");
      return;
    }

    const newDueAmount = dueAmount - paymentAmount;
    setDueAmount(newDueAmount);

    if (newDueAmount === 0) {
      alert("Payment completed. No due amount remaining.");
    }

    // Update the due amount in the database
    await updateDueAmountInDatabase(newDueAmount);
  };

  // Update the due amount in the database
  const updateDueAmountInDatabase = async (newDueAmount) => {
    try {
      const response = await axios.post("http://localhost:4000/updateDueAmount", { pemail, dueAmount: newDueAmount });
      if (response.status === 200) {
        console.log("Due amount updated successfully.");
        localStorage.setItem("dueAmount", newDueAmount); // Update the local storage
      } else {
        console.error("Failed to update due amount:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating due amount:", error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Patient Due Information</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Patient Email: {pemail}</p>
          <p>Due Amount: Tk.{dueAmount.toFixed(2)}</p>
          <p>Due Date: {dueDate}</p> {/* Display due date here */}
          <form onSubmit={handlePayment}>
            <label style={styles.label}>
              Enter Payment Amount:
              <input type="number" name="payment" step="0.01" required style={styles.input} />
            </label>
            <button type="submit" style={styles.button}>Submit Payment</button>
          </form>
        </>
      )}
      <button onClick={() => navigate('/patient/dashboard')} style={{ ...styles.button, backgroundColor: '#007BFF' }}>Go to Patient Dashboard</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  },
  heading: {
    textAlign: "center",
    color: "#007BFF",
  },
  label: {
    display: "block",
    margin: "10px 0",
    fontSize: "16px",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
    marginTop: "20px",
    width: "100%",
  },
};

export default PatientDue;
