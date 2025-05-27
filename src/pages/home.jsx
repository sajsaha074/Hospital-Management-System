import React from 'react';
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

const Healopharm = () => {
  return (
    <div style={{ backgroundColor: "#fff", color: "#fff", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      {/* Logo Section */}
      <img 
        src="\images\logo.png" 
        alt="Healopharm Logo" 
        className="logo" 
        style={{ position: "absolute", top: "20px", left: "20px", width: "150px" }} 
      />

      {/* Header Section */}
<header style={{ padding: "20px" }}>
  <h1 style={{
    fontSize: "2rem", 
    fontWeight: "bold", 
    margin: "20px 0", 
    textAlign: "center", 
    color: "#F1B814" 
  }}>
    Welcome to Healopharm
  </h1>
</header>


      {/* Login/Signup Buttons only service review link kora baki*/}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", margin: "20px auto" }}>
        <Link to="/patient/login" style={buttonStyle}>Patient Login</Link>
        <Link to="/patient/signup" style={buttonStyle}>Patient Signup</Link>
        <Link to="/doctor/login" style={buttonStyle}>Doctor Login</Link>
        
        <Link to="/review" style={buttonStyle}>Show Service Review</Link>
      </div>

      {/* Doctors Section */}
      <section style={{ padding: "40px 20px" }}>
        <div className="doctors" style={{ marginBottom: "40px" }}>
          <h2>Meet Our Doctors</h2>
          <p>Our highly qualified professionals are dedicated to providing top-notch healthcare.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <DoctorCard
              image="https://jay-harold.com/wp-content/uploads/2015/12/Dollarphotoclub_74864725.jpg"
              name="Dr. John Don"
              description="Cardiologist with 15 years of experience."
            />
            <DoctorCard
              image="https://thumbs.dreamstime.com/b/indian-doctor-mature-male-medical-standing-isolated-white-background-handsome-model-portrait-31871541.jpg"
              name="Dr. Shafique Smith"
              description="Neurologist specializing in stroke care."
            />
            <DoctorCard
              image="https://curae.com/wp-content/uploads/2018/03/AdobeStock_168113506-1-e1522461533266-1037x1400.jpeg"
              name="Dr. Emily White"
              description="Oncologist dedicated to cancer research and treatment."
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="services">
          <h2>Our Services</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <ServiceCard
              image="https://5ororwxhkkokjij.leadongcdn.com/cloud/ipBplKolRiiSmpjopmlpk/H26b25b0d88284c20851144fc71134366a1-800-800.jpg"
              name="Comfortable Beds"
              description="Our patient rooms are equipped with state-of-the-art hospital beds for comfort."
            />
            <ServiceCard
              image="https://www.ucsfbenioffchildrens.org/-/media/project/ucsf/ucsf-bch/images/medical-tests/hero/cmv-blood-test-708x556-2x.jpg"
              name="Comprehensive Testing"
              description="We offer a wide range of laboratory tests to support accurate diagnosis."
            />
            <ServiceCard
              image="https://arvambulance.com/wp-content/uploads/2020/10/P1190458-scaled.jpg"
              name="Ambulance Service"
              description="Our ambulance fleet is available 24/7 for emergency transportation."
            />
            <ServiceCard
              image="https://myrrhmedservices.com/wp-content/uploads/2022/09/laboratory-equipment-Hospital-Me.jpg"
              name="Advanced Lab Equipment"
              description="Our labs are fully equipped with the latest technology for precise testing."
            />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{ padding: "20px", background: "#1c1c20", textAlign: "center", color: "#fff" }}>
        <div className="icons">
          <a href="#" style={iconStyle} className="fab fa-facebook-f"></a>
          <a href="#" style={iconStyle} className="fab fa-twitter"></a>
          <a href="#" style={iconStyle} className="fab fa-instagram"></a>
        </div>
        <p>&copy; 2024 Healopharm. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Reusable Components for Doctors and Services
const DoctorCard = ({ image, name, description }) => (
  <div style={cardStyle}>
    <img src={image} alt={name} style={{ width: "100%", maxHeight: "200px", borderRadius: "8px", marginBottom: "10px" }} />
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
);

const ServiceCard = ({ image, name, description }) => (
  <div style={cardStyle}>
    <img src={image} alt={name} style={{ width: "100%", maxHeight: "200px", borderRadius: "8px", marginBottom: "10px" }} />
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
);

// Inline Styles
const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#1c008a",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  textDecoration: "none",
  transition: "background-color 0.3s",
};

const cardStyle = {
  width: "250px",
  backgroundColor: "#1c1c20",
  padding: "15px",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
  transition: "transform 0.3s ease",
};

const iconStyle = {
  margin: "0 10px",
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.5em",
  transition: "color 0.3s",
};

export default Healopharm;
