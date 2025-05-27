import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AddDoctors = () => {
  const [formData, setFormData] = useState({
    dname: '',
    demail: '',
    dpassword: '',
    specialization: '',
    dcapacity: 0,
    availableSlots: '',
});
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
const [buttonColor, setButtonColor] = useState("#3f51b5");
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
        const response = await axios.post('http://localhost:4000/addDoctor', formData);
        setSuccess("Doctor added successfully!");
        setTimeout(()=> navigate('/admin/dashboard'), 5000);
    } catch (error) {
        setError(error.response?.data?.message || 'Something went wrong!');
    }
};

return (
<div style={styles.container}>
    <div style={styles.formContainer}>
    <h2 style={styles.heading}>Add Doctor</h2>
    {error && <p style={styles.errorText}>{error}</p>}
    {success && <p style={styles.successText}>{success}</p>}
    <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.fieldContainer}>
        <label style={styles.label}>Full Name:</label>
        <input
        type="text"
        name='dname'
        placeholder='Full Name'
        value={formData.dname}
        onChange={handleChange}
        style={styles.input}
        required
        />
        </div>
        <div style={styles.fieldContainer}>
        <label style={styles.label}>E-mail:</label>
        <input
        type="text"
        name='demail'
        placeholder='E-mail'
        value={formData.demail}
        onChange={handleChange}
        style={styles.input}
        required
        />
        </div>
        <div style={styles.fieldContainer}>
        <label style={styles.label}>Specialization:</label>
        <input
        type="text"
        name='specialization'
        placeholder='Specialization'
        value={formData.specialization}
        onChange={handleChange}
        style={styles.input}
        required
        />
        </div>
        <div style={styles.fieldContainer}>
        <label style={styles.label}>Capacity:</label>
        <input
        type="number"
        name='dcapacity'
        placeholder='Capacity'
        value={formData.dcapacity}
        onChange={handleChange}
        style={styles.input}
        required
        />
        </div>
        <div style={styles.fieldContainer}>
        <label style={styles.label}>Available Slot:</label>
        <input
        type="text"
        name='availableSlots'
        placeholder='Available Slot'
        value={formData.availableSlots}
        onChange={handleChange}
        style={styles.input}
        required
        />
        </div>
        <div style={styles.fieldContainer}>
        <label style={styles.label}>Password:</label>
        <input
        type="password"
        name='dpassword'
        placeholder='Password'
        value={formData.dpassword}
        onChange={handleChange}
        style={styles.input}
        required
        />
        </div>
        <button type="submit" style={{...styles.button, backgroundColor: buttonColor}} onMouseEnter={()=>setButtonColor("#283593")} onMouseLeave={()=>setButtonColor("#3f51b5")}>Add</button>
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

export default AddDoctors;