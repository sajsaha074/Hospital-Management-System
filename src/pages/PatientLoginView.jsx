import React from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css"; 

const PatientLoginView = () => {
  return (
    <div>
      <style>
        {`
        /* General Page Styles */
        body {
          margin: 0;
          font-family: 'Arial', sans-serif;
          background-color: rgb(255, 255, 255);
          color: #333;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          min-height: 100vh;
        }

        /* Background Image */
        .background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/images/background.jpg'); /* Adjust path */
          background-size: cover;
          background-position: center;
          filter: blur(5px);
          z-index: -1;
        }

        /* Navbar Styles */
        .navbar {
          background-color: rgba(250, 250, 250, 0.8);
          border-bottom: 2px solid #fff;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .navbar img.logo {
          height: 50px;
        }

        .navbar nav ul {
          list-style: none;
          display: flex;
          gap: 15px;
          margin: 0;
          padding: 0;
        }

        .navbar nav ul li a {
          text-decoration: none;
          color: #fff;
          padding: 8px 15px;
          background-color: rgb(14, 45, 158);
          border: 2px solid rgb(109, 172, 243);
          border-radius: 5px;
          transition: background-color 0.3s, color 0.3s;
        }

        .navbar nav ul li a:hover {
          background-color: rgb(16, 61, 195);
          color: #fff;
        }

        /* Dashboard Styles */
        .dashboard-container {
          background: rgba(255, 255, 255, 0.9);
          padding: 30px;
          border: 2px solid #4A90E2;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          width: 100%;
          color: #333;
          text-align: center;
          margin-top: 100px;
        }
        .dashboard-container h1 {
          font-size: 2rem; /* Increased the size */
          color: rgb(36, 39, 222);
        }  
        .dashboard-container button {
          padding: 10px 20px;
          margin: 10px;
          background-color: rgb(36, 39, 222);
          color: #fff;
          border: 2px solid #4A90E2;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s, color 0.3s;
        }

        .dashboard-container button:hover {
          background-color: rgb(125, 165, 225);
          color: #333;
        }

        footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  padding: 10px;
  background-color: rgb(240, 240, 240);
  text-align: center;
  color: #333;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
}

        .profiles a {
          margin: 0 10px;
          color: #333;
          text-decoration: none;
          font-size: 1.2rem;
        }

        .profiles a:hover {
          color: #4A90E2;
        }
        `}
      </style>

      {/* Background */}
      <div className="background"></div>

      {/* Navbar */}
      <div className="navbar">
        <img src="\images\logo.png" className="logo" alt="HealoPharm Logo" />
        <nav>
          <ul>
          <li>
              <Link to="/patient/updateInfo">Update Info.</Link>
            </li>
            <li>
              <Link to="/patient/appointmentBooking">Appointments</Link>
            </li>
            <li>
              <Link to="/patient/services">Services</Link>
            </li>
            <li>
              <Link to="/patient/patientDue">Billing Cart</Link>
            </li>
            <li>
              <Link to="/home">Logout</Link>
          </li>
          </ul>
        </nav>
      </div>

      {/* Dashboard */}
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        <div>
          <Link to="/patient/showAppointments">
            <button>Your Appointments</button>
          </Link>
          <Link to="/patient/serviceCart">
            <button>Services Taken</button>
          </Link>
          <Link to="/patient/insurance">
            <button>Claim Insurance</button>
          </Link>
          <Link to="/patient/servicereview">
            <button>Service Review</button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <h1>HealoPharm</h1>
        <p>&copy; 2024</p>
        <div className="profiles">
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default PatientLoginView;
