import React from "react";
import { Link } from "react-router-dom";

const AdminDashboardView = () => {
  return (
    <div>
      <style>
        {`
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

        .header {
          margin-top: 100px; /* To make room for the fixed navbar */
          color: rgb(14, 45, 158);
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
        }

        .dashboard-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* First row has 3 columns */
          gap: 20px;
          width: 100%;
          max-width: 1200px;
          margin-top: 20px; /* Additional spacing below the header */
          padding: 20px;
        }

        /* Adjust second row items to span across columns */
        .dashboard-container > .section-container:nth-child(n+4) {
          grid-column: span 3; /* Spans across 3 columns to make a single column layout */
        }

        .section-container {
          background: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border: 2px solid #4A90E2;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          color: #333;
          text-align: center;
        }

        .section-container button {
          padding: 15px 30px;
          background-color: rgb(36, 39, 222);
          color: #fff;
          border: 2px solid #4A90E2;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s, color 0.3s;
        }

        .section-container button:hover {
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
        `}
      </style>

      <div className="navbar">
        <img src="/images/logo.png" className="logo" alt="HealoPharm Logo" />
        <nav>
          <ul>
            <li>
              <Link to="/admin/login">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header">
        Admin Dashboard
      </div>

      <div className="dashboard-container">
        <div className="section-container">
          <Link to="/admin/insurance-review">
            <button>Insurance Claims</button>
          </Link>
        </div>
        <div className="section-container">
          <Link to="/admin/doctordashboard">
            <button>Doctors</button>
          </Link>
        </div>
        <div className="section-container">
          <Link to="/admin/patients">
            <button>Patients</button>
          </Link>
        </div>
        <div className="section-container">
          <Link to="/admin/adminFetchMedicine">
            <button>Medicine Inventory</button>
          </Link>
        </div>
        <div className="section-container">
          <Link to="/patient/makePayment">
            <button>Make Payment</button>
          </Link>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 HealoPharm, All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboardView;
