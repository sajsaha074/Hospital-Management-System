import React, { useState } from "react";
import jsPDF from "jspdf";

const Prescription = () => {
  const [patientInfo, setPatientInfo] = useState({ patientName: "", doctorName: "" });
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({ medicine: "", dosage: "", test: "" });
  const [isEditing, setIsEditing] = useState(null);

  // Handle changes in the patient info section
  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle changes in the prescription section
  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add a new prescription
  const handleAddPrescription = () => {
    if (newPrescription.medicine || newPrescription.test) {
      setPrescriptions([
        ...prescriptions,
        {
          id: prescriptions.length + 1,
          medicine: newPrescription.medicine,
          dosage: newPrescription.dosage,
          test: newPrescription.test,
        },
      ]);
      setNewPrescription({ medicine: "", dosage: "", test: "" });
    } else {
      alert("Please fill in either medicine or test details.");
    }
  };

  // Edit a prescription
  const handleEditPrescription = (id) => {
    const prescriptionToEdit = prescriptions.find((pres) => pres.id === id);
    setNewPrescription({
      medicine: prescriptionToEdit.medicine,
      dosage: prescriptionToEdit.dosage,
      test: prescriptionToEdit.test,
    });
    setIsEditing(id);
  };

  // Update an edited prescription
  const handleUpdatePrescription = () => {
    setPrescriptions((prevPrescriptions) =>
      prevPrescriptions.map((pres) =>
        pres.id === isEditing
          ? { ...pres, medicine: newPrescription.medicine, dosage: newPrescription.dosage, test: newPrescription.test }
          : pres
      )
    );
    setNewPrescription({ medicine: "", dosage: "", test: "" });
    setIsEditing(null);
  };

  // Delete a prescription
  const handleDeletePrescription = (id) => {
    setPrescriptions((prevPrescriptions) =>
      prevPrescriptions.filter((pres) => pres.id !== id)
    );
  };

  // Generate PDF for the prescription
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add Logo to PDF
    doc.addImage('/images/logo.png', 'JPEG', 20, 10, 30, 30); // Adjust the logo image size and position as needed

    // Add Title with style
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("Patient Prescription", 80, 25);
    
    // Draw a line under the title
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35); // horizontal line
    
    // Patient Info Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Patient Name: ${patientInfo.patientName}`, 20, 45);
    doc.text(`Doctor Name: ${patientInfo.doctorName}`, 20, 55);

    // Add some space before prescription section
    doc.text("", 20, 65);

    // Prescription Table Header
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Medicine", 20, 75);
    doc.text("Dosage", 90, 75);
    doc.text("Test", 150, 75);

    // Add a line under the header
    doc.setLineWidth(0.5);
    doc.line(20, 78, 190, 78);

    // Prescription Table Rows
    let yPosition = 85; // Starting position for the first row
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    prescriptions.forEach((pres) => {
      doc.text(pres.medicine, 20, yPosition);
      doc.text(pres.dosage, 90, yPosition);
      doc.text(pres.test, 150, yPosition);
      yPosition += 10;
    });

    // Draw a line at the bottom of the table
    doc.setLineWidth(0.5);
    doc.line(20, yPosition + 5, 190, yPosition + 5);

    // Save the PDF
    doc.save("prescription.pdf");
  };

  return (
    <div>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
          }
          .prescription-container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .prescription-header {
            text-align: center;
            margin-bottom: 20px;
          }
          .prescription-header h1 {
            font-size: 2.5rem;
            color: blue;
            font-weight: bold;
          }
          .form-container input, .form-container select {
            margin-right: 10px;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
          }
          .form-container button {
            padding: 8px 15px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            background-color: #4A90E2;
            color: white;
            cursor: pointer;
          }
          .form-container button:hover {
            background-color: #357ABD;
          }
          .prescription-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .prescription-table th, .prescription-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          .prescription-table th {
            background-color: #4A90E2;
            color: #fff;
          }
          .action-buttons {
            display: flex;
            gap: 10px;
          }
          .action-buttons button {
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9rem;
          }
          .action-buttons .edit-button {
            background-color: #ffa726;
            color: #fff;
          }
          .action-buttons .delete-button {
            background-color: #e57373;
            color: #fff;
          }
        `}
      </style>
      

      <div className="prescription-container">
        <div className="prescription-header">
          <h1>Patient Prescription</h1>
        </div>

        {/* Patient Info Form */}
        <div className="form-container">
          <input
            type="text"
            name="patientName"
            value={patientInfo.patientName}
            onChange={handlePatientInfoChange}
            placeholder="Patient Name"
          />
          <input
            type="text"
            name="doctorName"
            value={patientInfo.doctorName}
            onChange={handlePatientInfoChange}
            placeholder="Doctor Name"
          />
        </div>

        {/* Prescription Form */}
        <div className="form-container">
          <input
            type="text"
            name="medicine"
            value={newPrescription.medicine}
            onChange={handlePrescriptionChange}
            placeholder="Medicine"
          />
          <input
            type="text"
            name="dosage"
            value={newPrescription.dosage}
            onChange={handlePrescriptionChange}
            placeholder="Dosage (e.g., 1+0+1)"
          />
          <input
            type="text"
            name="test"
            value={newPrescription.test}
            onChange={handlePrescriptionChange}
            placeholder="Test"
          />
          {isEditing ? (
            <button onClick={handleUpdatePrescription}>Update Prescription</button>
          ) : (
            <button onClick={handleAddPrescription}>Add Prescription</button>
          )}
        </div>

        {/* Prescription Table */}
        <table className="prescription-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Test</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((pres) => (
              <tr key={pres.id}>
                <td>{pres.medicine}</td>
                <td>{pres.dosage}</td>
                <td>{pres.test}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => handleEditPrescription(pres.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeletePrescription(pres.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Button to generate the PDF */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={generatePDF}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4A90E2",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
