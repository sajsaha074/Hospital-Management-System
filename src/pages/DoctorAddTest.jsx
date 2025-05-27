import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorAddTest = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [patientEmail, setPatientEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await axios.get("http://localhost:4000/getLab");
            setTests(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tests:", error.message);
        }
    };

    const handleAddTest = async (test) => {
        if (!patientEmail) {
            alert("Patient Email is required!");
            return;
        }

        const testData = {
            f_id: test.f_id,
            service_type: "Lab Test",
            item_name: test.test_type,
            quantity: 1,
            total_price: test.test_price,
            pemail: patientEmail,
            date: new Date().toISOString().split('T')[0],
        };

        try {
            await axios.post("http://localhost:4000/addDoctorTest", testData);
            alert("Test added successfully!");
            fetchTests(); // Refresh the test list if necessary
        } catch (error) {
            console.error("Error adding test:", error.message);
            alert("There was an error adding the test record. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading tests...</div>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    fontSize: "36px",
                    color: "blue",
                }}
            >
                Doctor Add Test
            </h1>

            {/* Patient Email Input */}
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <label htmlFor="patientEmail" style={{ marginRight: "10px" }}>
                    Enter Patient Email:
                </label>
                <input
                    type="email"
                    id="patientEmail"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="Patient Email"
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                    }}
                />
            </div>

            {/* Tests Table */}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th style={styles.th}>Facility ID</th>
                        <th style={styles.th}>Lab Number</th>
                        <th style={styles.th}>Test Type</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map((test) => (
                        <tr key={test._id} style={styles.tr}>
                            <td style={styles.td}>{test.f_id}</td>
                            <td style={styles.td}>{test.lab_no}</td>
                            <td style={styles.td}>{test.test_type}</td>
                            <td style={styles.td}>Tk. {test.test_price}</td>
                            <td style={styles.td}>
                                <button
                                    onClick={() => handleAddTest(test)}
                                    style={styles.button}
                                >
                                    Add Test
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                    style={styles.dashboardButton}
                    onClick={() => navigate("/doctor/showAppointments")}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

const styles = {
    th: {
        padding: "10px",
        border: "1px solid #ddd",
        backgroundColor: "#f4f4f4",
        textAlign: "left",
    },
    td: {
        padding: "10px",
        border: "1px solid #ddd",
    },
    tr: {
        backgroundColor: "#fff",
        transition: "background-color 0.3s",
    },
    button: {
        padding: "10px 20px",
        border: "none",
        backgroundColor: "#007BFF",
        color: "#fff",
        fontSize: "14px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    dashboardButton: {
        padding: "15px 25px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "18px",
        transition: "background-color 0.3s",
    },
};

export default DoctorAddTest;
