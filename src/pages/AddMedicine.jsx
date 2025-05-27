import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMedicine = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await axios.get("http://localhost:4000/getMedicine");
            setMedicines(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching medicines:", error.message);
        }
    };

    const handleQuantityChange = (e, id) => {
        setQuantities({
            ...quantities,
            [id]: e.target.value,
        });
    };

    const handleAddToCart = async (medicine) => {
        const quantity = parseInt(quantities[medicine._id], 10);
        if (isNaN(quantity) || quantity <= 0) {
            alert("Please enter a valid quantity!");
            return;
        }

        if (medicine.quantity < quantity) {
            alert("Insufficient stock!");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ ...medicine, requestedQuantity: quantity });
        localStorage.setItem("cart", JSON.stringify(cart));

        try {
            // Update the medicine quantity in the database
            const response = await axios.put(`http://localhost:4000/updateMedicineQuantity/${medicine._id}`, {
                quantity,
            });
            const updatedMedicine = response.data.medicine;

            // Update the local state to reflect the new quantity
            const updatedMedicines = medicines.map((item) =>
                item._id === updatedMedicine._id ? { ...item, quantity: updatedMedicine.quantity } : item
            );
            setMedicines(updatedMedicines);

            // Fetch patient data from localStorage
            const patientData = JSON.parse(localStorage.getItem("patientData"));
            const pemail = patientData?.email;

            if (!pemail) {
                alert("Patient email is missing!");
                return;
            }

            // Add the medicine to the services table
            await axios.post("http://localhost:4000/addServiceMedicine", {
                f_id: medicine.f_id,
                service_type: "Medicine",
                item_name: medicine.medicine_name,
                quantity,
                price:  medicine.price,
                pemail,
            });

            alert("Medicine added to cart and services successfully!");
        } catch (error) {
            console.error("Error updating medicine quantity or adding to services:", error.message);
        }
    };

    if (loading) {
        return <div className="loading">Loading medicines...</div>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "36px", color: "green" }}>
                Add Medicines
            </h1>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                <thead>
                    <tr>
                        <th style={styles.th}>f_id</th>
                        <th style={styles.th}>Medicine Name</th>
                        <th style={styles.th}>Expiration Date</th>
                        <th style={styles.th}>Quantity</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Requested Quantity</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine) => (
                        <tr key={medicine._id} style={styles.tr}>
                            <td style={styles.td}>{medicine.f_id}</td>
                            <td style={styles.td}>{medicine.medicine_name}</td>
                            <td style={styles.td}>{medicine.exp_date}</td>
                            <td style={styles.td}>{medicine.quantity}</td>
                            <td style={styles.td}>Tk.{medicine.price}</td>
                            <td style={styles.td}>
                                <input
                                    type="number"
                                    value={quantities[medicine._id] || ""}
                                    onChange={(e) => handleQuantityChange(e, medicine._id)}
                                    style={{ width: "60px" }}
                                />
                            </td>
                            <td style={styles.td}>
                                <button
                                    onClick={() => handleAddToCart(medicine)}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: medicine.quantity > 0 ? "#007BFF" : "#CCCCCC",
                                        cursor: medicine.quantity > 0 ? "pointer" : "not-allowed",
                                    }}
                                    disabled={medicine.quantity <= 0}
                                >
                                    {medicine.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                    style={styles.dashboardButton}
                    onClick={() => navigate("/patient/dashboard")}
                >
                    Go to patient Dashboard
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
        color: "#fff",
        fontSize: "14px",
        borderRadius: "5px",
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

export default AddMedicine;