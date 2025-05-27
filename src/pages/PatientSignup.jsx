import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PatientSignup = () => {
    const [formData, setFormData] = useState({
        pname: '',
        pemail: '',
        ppassword: '',
        page: '',
        paddress: '',
        phone: '',
        insuranceStatus: false,
        dueAmount: 0,
        pAvailable: true,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [buttonColor, setButtonColor] = useState("#87CEEB");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prevData)=> ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        setSuccess('');

        try{
            const response = await axios.post('http://localhost:4000/addPatient', formData);
            setSuccess("Signup successful!");
            setTimeout(()=> navigate('/patient/loginWelcome'), 5000);
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong!');
        }
    };

  return (
    <div style={styles.container}>
        <div style={styles.formContainer}>
        <h2 style={styles.heading}>Patient Signup</h2>
        {error && <p style={styles.errorText}>{error}</p>}
        {success && <p style={styles.successText}>{success}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.fieldContainer}>
            <label style={styles.label}>Full Name:</label>
            <input
            type="text"
            name='pname'
            placeholder='Full Name'
            value={formData.pname}
            onChange={handleChange}
            style={styles.input}
            required
            />
            </div>
            <div style={styles.fieldContainer}>
            <label style={styles.label}>Age:</label>
            <input
            type="number"
            name='page'
            placeholder='Age'
            value={formData.page}
            onChange={handleChange}
            style={styles.input}
            required
            />
            </div>
            <div style={styles.fieldContainer}>
            <label style={styles.label}>Address:</label>
            <input
            type="text"
            name='paddress'
            placeholder='Address'
            value={formData.paddress}
            onChange={handleChange}
            style={styles.input}
            required
            />
            </div>
            <div style={styles.fieldContainer}>
            <label style={styles.label}>E-mail:</label>
            <input
            type="text"
            name='pemail'
            placeholder='E-mail'
            value={formData.pemail}
            onChange={handleChange}
            style={styles.input}
            required
            />
            </div>
            <div style={styles.fieldContainer}>
            <label style={styles.label}>Phone No.:</label>
            <input
            type="text"
            name='phone'
            placeholder='Phone Number Format (01234-123123)'
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
            />
            </div>
            <div style={styles.fieldContainer}>
            <label style={styles.label}>Password:</label>
            <input
            type="password"
            name='ppassword'
            placeholder='Password'
            value={formData.ppassword}
            onChange={handleChange}
            style={styles.input}
            required
            />
            </div>
            <button type="submit" style={{...styles.button, backgroundColor: buttonColor}} onMouseEnter={()=>setButtonColor("#283593")} onMouseLeave={()=>setButtonColor("#3f51b5")}>Sign Up</button>
        </form>
    </div>
    </div>
  );
};

const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f7f8fa",
    },
    formContainer: {
      width: "100%",
      maxWidth: "500px",
      padding: "30px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    fieldContainer: {
      textAlign: "left",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    button: {
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "12px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    errorText: {
      color: "red",
      fontSize: "14px",
    },
    successText: {
      color: "green",
      fontSize: "14px",
    },
  };
  
export default PatientSignup;