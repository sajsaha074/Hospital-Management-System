import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdatePatientInfo = () => {
    const [patient, setPatient] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedFields, setSelectedFields] = useState({
        name: false,
        age: false,
        address: false,
        contact: false,
    });
    const [updatedValues, setUpdatedValues] = useState({
        name: "",
        age: "",
        address: "",
        contact: "",
    });

    useEffect(() => {
        fetchPatientInfo();
    }, []);

    const fetchPatientInfo = async () => {
        const patientData = JSON.parse(localStorage.getItem("patientData"));
        if (!patientData) {
            alert("Please log in to update your information!");
            window.location.href = "/patient/login";
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:4000/getPatients/${patientData.email}`
            );
            setPatient(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching patient info:", error.message);
            setLoading(false);
        }
    };

    const handleFieldSelection = (field) => {
        setSelectedFields((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleInputChange = (field, value) => {
        setUpdatedValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        const updates = {};
        if (selectedFields.name) updates.pname = updatedValues.name;
        if (selectedFields.age) updates.page = updatedValues.age;
        if (selectedFields.address) updates.paddress = updatedValues.address;
        if (selectedFields.contact) updates.phone = updatedValues.contact;

        try {
            await axios.put(
                `http://localhost:4000/updatePatInfo/${patient.pemail}`,
                updates
            );
            alert("Information updated successfully!");
            window.location.href = "/patient/login";
        } catch (error) {
            console.error("Error updating patient info:", error.message);
        }
    };

    if (loading) {
        return <div>Loading patient information...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1 style={styles.title}>Update Patient Information</h1>
                <div style={styles.currentInfo}>
                    <h3>Current Information:</h3>
                    <p><strong>Name:</strong> {patient.pname}</p>
                    <p><strong>Age:</strong> {patient.page}</p>
                    <p><strong>Address:</strong> {patient.paddress}</p>
                    <p><strong>Contact:</strong> {patient.phone}</p>
                </div>
                <h3>Select fields to update:</h3>
                <div style={styles.fieldsContainer}>
                    {["name", "age", "address", "contact"].map((field) => (
                        <div key={field} style={styles.fieldRow}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedFields[field]}
                                    onChange={() => handleFieldSelection(field)}
                                />
                                {` Update ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                            </label>
                            {selectedFields[field] && (
                                <div style={styles.inputContainer}>
                                    <input
                                        type="text"
                                        placeholder={`Enter new ${field}`}
                                        value={updatedValues[field]}
                                        onChange={(e) => handleInputChange(field, e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={handleSubmit} style={styles.button}>
                    Update Information
                </button>
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
        backgroundColor: "#f4f4f4",
        padding: "20px",
    },
    formContainer: {
        width: "100%",
        maxWidth: "600px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        textAlign: "center",
    },
    title: {
        marginBottom: "20px",
        fontSize: "24px",
        color: "green",
    },
    currentInfo: {
        textAlign: "left",
        marginBottom: "20px",
    },
    fieldsContainer: {
        textAlign: "left",
    },
    fieldRow: {
        marginBottom: "20px",
    },
    inputContainer: {
        marginTop: "10px",
    },
    input: {
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    button: {
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "green",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default UpdatePatientInfo;