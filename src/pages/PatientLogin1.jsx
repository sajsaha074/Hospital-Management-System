import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const PatientLogin1 = () => {
    const [formData, setFormData] = useState({
        pemail:'',
        ppassword:'',
    });
    const [error, setError] = useState('');
    const [buttonColor, setButtonColor] = useState("#303f9f");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData)=> ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try{
            const response = await axios.post('http://localhost:4000/patientLogin', formData);
            if(response.data.token) {
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('patientData', JSON.stringify({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.contact,
                    address: response.data.address,
                    dueAmount: response.data.dueAmount,
                  }));
                navigate('/patient/dashboard');
            }
        } catch(error) {
            setError(error.response?.data?.message || 'Invalid credentials!');
        }
    };
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Patient Login</h2>
        {error && <p style={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>E-mail:</label>
            <input
              type="email"
              name="pemail"
              placeholder="Enter your E-mail"
              value={formData.pemail}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="ppassword"
              placeholder="Enter your Password"
              value={formData.ppassword}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={{...styles.button, backgroundColor: buttonColor}} onMouseEnter={()=>setButtonColor("#283593")} onMouseLeave={()=>setButtonColor("#3f51b5")}>Log in</button>
          <p>
            <a href="/patient/forgotPassword" style={{ color: "#007bff", cursor: "pointer" }}>
            Forgot Password?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f7f8fa',
    },
    formContainer: {
      width: '100%',
      maxWidth: '500px',
      padding: '30px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    fieldContainer: {
      textAlign: 'left',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    button: {
      color: '#fff',
      backgroundColor: '#87CEEB',
      border: 'none',
      borderRadius: '4px',
      padding: '12px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    errorText: {
      color: 'red',
      fontSize: '14px',
    },
  };

export default PatientLogin1;