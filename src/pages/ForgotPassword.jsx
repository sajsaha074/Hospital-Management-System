import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [buttonColor, setButtonColor] = useState("#303f9f");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axios.post('http://localhost:4000/forgotPassword', { email });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Error sending email.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading1}>Forgot Password</h2>
        <h4 style={styles.heading2}>Reset your password by entering your email</h4>
        {message && <p style={styles.successText}>{message}</p>}
        {error && <p style={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>E-mail:</label>
            <input
              type="email"
              placeholder="Enter your E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button
            type="submit"
            style={{ ...styles.button, backgroundColor: buttonColor }}
            onMouseEnter={() => setButtonColor("#283593")}
            onMouseLeave={() => setButtonColor("#3f51b5")}
          >
            Send Reset Email
          </button>
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
  heading1: {
    fontSize: '40px',
    marginBottom: '20px',
    color: '#4caf50',
  },
  heading2: {
    fontSize: '20px',
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
  successText: {
    color: 'green',
    fontSize: '14px',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
  },
};

export default ForgotPassword;