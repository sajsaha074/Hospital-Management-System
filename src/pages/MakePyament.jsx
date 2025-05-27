import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const MakePayment = () => {
  const [totalDue, setTotalDue] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState(""); // Admin input for patient's email
  const [patientEmail, setPatientEmail] = useState(""); // Patient's email from URL location state
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // If a patient email is passed from previous page, use that
  const passedEmail = location.state?.email || "";

  // Fetch services for the patient based on email
  useEffect(() => {
    if (passedEmail) {
      setPatientEmail(passedEmail);
      fetchServices(passedEmail);
    }
  }, [passedEmail]);

  const fetchServices = async (email) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/getServices?pemail=${email}`);
      
      // Log the response data to debug
      console.log("Fetched Services:", response.data);

      if (response.data && response.data.length > 0) {
        setServices(response.data);
        calculateTotalAmount(response.data);
      } else {
        setMessage("No services found for this patient.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error.message);
      setMessage("Error fetching services. Please try again later.");
      setLoading(false);
    }
  };

  const calculateTotalAmount = (services) => {
    const total = services.reduce((sum, service) => sum + service.total_price, 0);
    setTotalDue(total);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    const payment = parseFloat(paymentAmount);

    if (payment === totalDue) {
      // Payment matches total due
      setMessage("Payment successful! The due is now 0.");
      setIsPaid(true);
      setTotalDue(0); // Reset the due to 0 after successful payment
    } else if (payment < totalDue) {
      // If the payment is less than the due amount
      setMessage("Error: Payment is less than the due amount. Please pay the exact due.");
    } else {
      // If the payment exceeds the due amount
      setMessage("Error: Payment is more than the due amount. Please pay the exact due.");
    }

    setPaymentAmount(""); // Reset the input field
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (emailInput) {
      setPatientEmail(emailInput); // Set patient email from input field
      fetchServices(emailInput); // Fetch services for this email
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  return (
    <div>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f8f9fa;
          }
          .payment-container {
            background-color: white;
            padding: 40px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            max-width: 600px;
            width: 100%;
            text-align: center;
          }
          .payment-container h2 {
            color: #4A90E2;
          }
          .input-field {
            margin: 20px 0;
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #ccc;
            border-radius: 5px;
          }
          .submit-button {
            padding: 12px 20px;
            background-color: #36b37e;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .submit-button:hover {
            background-color: #28a745;
          }
          .error-message {
            color: #e74c3c;
            font-weight: bold;
            margin-top: 20px;
          }
          .success-message {
            color: #2ecc71;
            font-weight: bold;
            margin-top: 20px;
          }
          .back-link {
            display: block;
            margin-top: 30px;
            font-size: 14px;
            color: #4A90E2;
            text-decoration: none;
          }
          .back-link:hover {
            text-decoration: underline;
          }
          .service-table {
            margin-top: 20px;
            width: 100%;
            border-collapse: collapse;
          }
          .service-table th, .service-table td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: center;
          }
          .service-table th {
            background-color: #f4f4f4;
          }
        `}
      </style>

      <div className="payment-container">
        <h2>Make Payment</h2>

        {/* Admin input for patient's email */}
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            className="input-field"
            placeholder="Enter Patient's Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">
            Fetch Services
          </button>
        </form>

        {/* Display patient's services and total bill */}
        <div>
          {loading ? (
            <div>Loading services...</div>
          ) : (
            <>
              {services.length > 0 ? (
                <>
                  <table className="service-table">
                    <thead>
                      <tr>
                        <th>Service Type</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service._id}>
                          <td>{service.service_type}</td>
                          <td>{service.item_name}</td>
                          <td>{service.quantity}</td>
                          <td>{service.total_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ marginTop: "20px" }}>
                    <p><strong>Total Due: </strong>Tk.{totalDue}</p>
                  </div>
                </>
              ) : (
                <p>No services found for this patient.</p>
              )}
            </>
          )}
          
          <form onSubmit={handlePaymentSubmit}>
            <input
              type="number"
              className="input-field"
              placeholder="Enter Payment Amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              min="0"
              required
            />
            <button type="submit" className="submit-button">
              Submit Payment
            </button>
          </form>

          {message && (
            <div className={isPaid ? "success-message" : "error-message"}>
              {message}
            </div>
          )}

          {/* Back Link */}
          <a href="/admin/dashboard" className="back-link">
            Back to Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
