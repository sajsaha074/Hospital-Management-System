import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const RestrictPatient = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    // Fetch patients data from the backend
    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:4000/getDueTrackers');
            setPatients(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching patients:', error.message);
            setError('There was an error fetching patient data.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleRestrict = async (patientEmail) => {
        try {
            const response = await axios.put('http://localhost:4000/restrictPatient', { email: patientEmail });
            
            if (response.status === 200) {
                setPatients((prevPatients) =>
                    prevPatients.map((patient) =>
                        patient.pemail === patientEmail ? { ...patient, pAvailability: false } : patient
                    )
                );
                console.log(`Patient with email ${patientEmail} has been restricted.`);
            } else {
                setError("Failed to restrict patient.");
            }
        } catch (error) {
            setError("Error restricting patient.");
            console.error("Error restricting patient:", error.message);
        }
    };

    // Table and button styles
    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
        },
        th: {
            padding: '12px',
            textAlign: 'left',
            backgroundColor: '#4CAF50',
            color: 'white',
            fontWeight: 'bold',
        },
        td: {
            padding: '12px',
            textAlign: 'left',
            borderBottom: '1px solid #ddd',
        },
        button: {
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#d32f2f',
        },
        loading: {
            fontSize: '18px',
            color: '#333',
            marginTop: '20px',
        },
        error: {
            color: 'red',
            fontSize: '16px',
            marginTop: '20px',
        },
        noPatients: {
            fontSize: '18px',
            color: '#888',
            marginTop: '20px',
        },
        backButton: {
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
        }
    };

    return (
        <div style={styles.container}>
            {/* Back to Dashboard Button */}
            <button 
                style={styles.backButton} 
                onClick={() => navigate('/admin/dashboard')} // Navigate to admin dashboard
            >
                Back to Dashboard
            </button>

            {loading ? (
                <p style={styles.loading}>Loading patients...</p>
            ) : error ? (
                <p style={styles.error}>{error}</p>
            ) : patients.length === 0 ? (
                <p style={styles.noPatients}>No patients found.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Patient Email</th>
                            <th style={styles.th}>Total Due</th>
                            <th style={styles.th}>Deadline</th>
                            <th style={styles.th}>Availability</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={index}>
                                <td style={styles.td}>{patient.pemail}</td>
                                <td style={styles.td}>{patient.total_due}</td>
                                <td style={styles.td}>{new Date(patient.deadline).toLocaleDateString()}</td>
                                <td style={styles.td}>
                                    {patient.pAvailability ? 'Available' : 'Not Available'}
                                </td>
                                <td style={styles.td}>
                                    <button
                                        style={styles.button}
                                        onClick={() => handleRestrict(patient.pemail)}
                                        onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                                        onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                                    >
                                        Restrict
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RestrictPatient;
