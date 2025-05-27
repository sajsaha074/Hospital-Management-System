import React, { useState } from "react";

const ServiceTakenDashboard = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Bed", cost: 2000 },
    { id: 2, name: "Lab Tests", cost: 1500 },
    { id: 3, name: "Ambulance", cost: 1000 },
  ]);

  const [newService, setNewService] = useState({ name: "", cost: "" });
  const [isEditing, setIsEditing] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddService = () => {
    if (newService.name && newService.cost) {
      setServices([
        ...services,
        { id: services.length + 1, name: newService.name, cost: parseFloat(newService.cost) },
      ]);
      setNewService({ name: "", cost: "" });
    } else {
      alert("Please fill in both service name and cost.");
    }
  };

  const handleEditService = (id) => {
    const serviceToEdit = services.find((service) => service.id === id);
    setNewService({ name: serviceToEdit.name, cost: serviceToEdit.cost });
    setIsEditing(id);
  };

  const handleUpdateService = () => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === isEditing ? { ...service, name: newService.name, cost: parseFloat(newService.cost) } : service
      )
    );
    setNewService({ name: "", cost: "" });
    setIsEditing(null);
  };

  const handleDeleteService = (id) => {
    setServices((prevServices) => prevServices.filter((service) => service.id !== id));
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
          .dashboard-container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .dashboard-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .dashboard-header img {
            height: 50px;
          }
          .dashboard-header button {
            background-color: #4A90E2;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 1rem;
          }
          .dashboard-header button:hover {
            background-color: #357ABD;
          }
          .dashboard-container h1 {
            text-align: center;
            font-size: 2.5rem;
            color: blue;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .service-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .service-table th, .service-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          .service-table th {
            background-color: #4A90E2;
            color: #fff;
          }
          .service-table td {
            background-color: #f9f9f9;
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
          .form-container {
            margin-top: 20px;
          }
          .form-container input {
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
            color: #fff;
            cursor: pointer;
          }
          .form-container button:hover {
            background-color: #357ABD;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding: 10px;
            background-color: #4A90E2;
            color: white;
            border-radius: 5px;
          }
        `}
      </style>

      <div className="dashboard-container">
        {/* Header with Logo and Back Button */}
        <div className="dashboard-header">
          <img src="\images\logo.png" alt="Logo" />
          <button onClick={() => alert("Back to Dashboard")}>Back to Dashboard</button>
          
        </div>

        <h1>Services Taken</h1>

        {/* Services Table */}
        <table className="service-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>${service.cost.toFixed(2)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => handleEditService(service.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add/Edit Service Form */}
        <div className="form-container">
          <input
            type="text"
            name="name"
            value={newService.name}
            onChange={handleInputChange}
            placeholder="Service Name"
          />
          <input
            type="number"
            name="cost"
            value={newService.cost}
            onChange={handleInputChange}
            placeholder="Service Cost"
          />
          {isEditing ? (
            <button onClick={handleUpdateService}>Update Service</button>
          ) : (
            <button onClick={handleAddService}>Add Service</button>
          )}
        </div>

        {/* Footer */}
        <div className="footer">© 2024 Healopharm. All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default ServiceTakenDashboard;
