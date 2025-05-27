import React, { useState, useEffect } from "react";
import axios from "axios";

const BillingCart = () => {
    const [services, setServices] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pemail, setPemail] = useState("");

    const fetchServices = async (email) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:4000/getServices?pemail=${email}`);
            setServices(response.data);
            calculateTotalAmount(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching services:", error.message);
            setLoading(false);
        }
    };

    const calculateTotalAmount = (services) => {
        const total = services.reduce((sum, service) => sum + service.total_price, 0);
        setTotalAmount(total);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchServices(pemail);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
            <h1 style={{ marginBottom: "20px", fontSize: "36px", color: "green" }}>
                Your Booked Services
            </h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <label style={{ marginRight: "10px" }}>
                    Patient Email:
                    <input
                        type="email"
                        value={pemail}
                        onChange={(e) => setPemail(e.target.value)}
                        required
                        style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#e0e0e0", border: "1px solid #ccc" }}
                    />
                </label>
                <button type="submit" style={{ padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer" }}>
                    Fetch Services
                </button>
            </form>
            {loading ? (
                <div className="loading">Loading services...</div>
            ) : (
                <>
                    <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%" }}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Service Type</th>
                                <th style={styles.th}>Item Name</th>
                                <th style={styles.th}>Quantity</th>
                                <th style={styles.th}>Total Price</th>
                                <th style={styles.th}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service._id} style={styles.tr}>
                                    <td style={styles.td}>{service.service_type}</td>
                                    <td style={styles.td}>{service.item_name}</td>
                                    <td style={styles.td}>{service.quantity}</td>
                                    <td style={styles.td}>{service.total_price}</td>
                                    <td style={styles.td}>{service.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ marginTop: "20px", fontSize: "24px", color: "green" }}>
                        Total Amount: Tk.{totalAmount}
                    </div>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                    style={styles.dashboardButton}
                    onClick={() => navigate("/patient/dashboard")}
                >
                    Go to Patient Dashboard
                </button>
            </div>
                </>
            )}
        </div>
    );
};

const styles = {
    th: {
        padding: "10px",
        border: "1px solid #ddd",
        backgroundColor: "#f4f4f4",
        textAlign: "center",
    },
    td: {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center",
    },
    tr: {
        '&:nth-child(even)': { backgroundColor: "#f9f9f9" }
    },
    dashboardButton: {
        padding: "15px 25px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "18px",
        transition: "background-color 0.3s",
    },
};

export default BillingCart;
