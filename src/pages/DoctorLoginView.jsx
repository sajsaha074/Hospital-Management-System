import React from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

const DoctorLoginView = () => {
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

      {/* Navbar */}
      <div className="navbar">
        <div className="image">
          <img src="\images\logo.png" alt="HealoPharm Logo" className="logo" />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/doctor/rescheduleAppointment">Reschedule appointment</Link>
            </li>
            <li>
              <Link to="/doctor/cancelAppointment">Cancel appointment</Link>
            </li>
            <li>
              <Link to="/home">Logout</Link>
            </li>

          </ul>
        </nav>
      </div>

      {/* Dashboard Section */}
<div className="dashboard-container" style={{
  display: "flex",
  flexDirection: "column", 
  justifyContent: "center", 
  alignItems: "center", 
  height: "30vh",
  textAlign: "center" 
}}>
  <h1 style={{
    fontSize: "2rem", 
    color: "rgb(36, 39, 222)",
    marginBottom: "40px" 
  }}>
    Welcome to Your Dashboard
  </h1>
  
  <Link to="/doctor/showAppointments">
    <button style={{
      padding: "10px 20px",
      margin: "10px",
      backgroundColor: "rgb(36, 39, 222)",
      color: "#fff",
      border: "2px solid #4A90E2",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s, color 0.3s",
    }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = "rgb(125, 165, 225)";
        e.target.style.color = "#333";
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = "rgb(36, 39, 222)";
        e.target.style.color = "#fff";
      }}
    >
      Your Appointments
    </button>
  </Link>
</div>

      {/* Footer */}
      <footer>
        <h1>HealoPharm</h1>
        <p>Copyright &copy; 2024</p>
        <div className="profiles">
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-whatsapp"></i></a>
        </div>
      </footer>
    </div>
  );
};

export default DoctorLoginView;
