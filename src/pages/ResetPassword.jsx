import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [buttonColor, setButtonColor] = useState("#303f9f");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axios.post('http://localhost:4000/resetPassword', { token, newPassword });
      setMessage(response.data.message);
      setTimeout(() => navigate('/patient/login'), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating password.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading1}>Reset Password</h2>
        <h4 style={styles.heading2}>Set your new password</h4>
        {message && <p style={styles.successText}>{message}</p>}
        {error && <p style={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldContainer}>
            <label style={styles.label}>New Password:</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.fieldContainer}>
          <label style={styles.label}>Token:</label>
            <input
              type="password"
              placeholder="Enter the token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
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
            Change Password
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

export default ResetPassword;