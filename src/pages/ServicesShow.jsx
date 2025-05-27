import React from 'react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  return (
    <div>
      {/* Navbar Section with Back to Homepage Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
        <Link to="/patient/dashboard">
          <button
            style={{
              backgroundColor: 'rgb(36, 39, 222)',
              color: '#fff',
              padding: '10px 20px',
              border: '2px solid #4A90E2',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgb(125, 165, 225)';
              e.target.style.color = '#333';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgb(36, 39, 222)';
              e.target.style.color = '#fff';
            }}
          >
            Back to Dashboard
          </button>
        </Link>
      </div>

      {/* Logo Section */}
      <img 
        src="\images\logo.png" 
        alt="Healopharm Logo" 
        className="logo" 
        style={{ position: "absolute", top: "20px", left: "20px", width: "100px" }} 
      />


      {/* Header Section */}
      <header style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '20px 0', color: '#F1B814' }}>
          Healopharm Services
        </h1>
      </header>

      {/* Services Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          padding: '20px',
        }}
      >
        {/* Bed Booking */}
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Link to="/bedservices">
            <img
              src="\images\bed.png"
              alt="Bed Booking"
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'transform 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
          </Link>
          <p>Bed Booking</p>
        </div>

        {/* Lab Test Booking */}
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Link to="/labservices">
            <img
              src="\images\lab.png"
              alt="Lab Test Booking"
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'transform 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
          </Link>
          <p>Lab Test Booking</p>
        </div>

        {/* Ambulance Booking */}
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Link to="/ambulnceservices">
            <img
              src="\images\ambulance.png"
              alt="Ambulance Booking"
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'transform 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
          </Link>
          <p>Ambulance Booking</p>
        </div>

        {/* Medicine Booking */}
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Link to="/patient/addmedicine">
            <img
              src="\images\medicine.png"
              alt="Medicine Booking"
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'transform 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
          </Link>
          <p>Medicine Booking</p>
        </div>
      </div>

      {/* Footer Section */}
      <footer
        style={{
          position: 'fixed',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'fit-content',
          padding: '10px',
          backgroundColor: 'rgb(240, 240, 240)',
          textAlign: 'center',
          color: '#333',
          boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1>HealoPharm</h1>
        <p>Copyright &copy; 2024</p>
        <div className="profiles">
          <a href="#" style={{ margin: '0 10px' }}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" style={{ margin: '0 10px' }}>
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" style={{ margin: '0 10px' }}>
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" style={{ margin: '0 10px' }}>
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
