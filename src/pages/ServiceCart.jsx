import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const ServerCart = () => {
    const [services, setServices] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pemail, setPemail] = useState("");
    const navigate = useNavigate();

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
        updateDueAmountInDatabase(total); // Call to update the due amount after calculation
    };

    const updateDueAmountInDatabase = async (newDueAmount) => {
        try {
            const response = await axios.post("http://localhost:4000/updateDueAmount", {
                pemail,
                dueAmount: newDueAmount,
            });
            if (response.status === 200) {
                console.log("Due amount updated successfully.");
            } else {
                console.error("Failed to update due amount:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating due amount:", error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchServices(pemail);
    };

    // Generate PDF for the services
    const generatePDF = () => {
        const doc = new jsPDF();

        // Title - Centered, Big font
        doc.setFontSize(26);
        doc.setTextColor(0, 123, 255); // Blue color
        doc.text("Patient Services Summary", 105, 20, null, null, 'center');

        // Subtitle with patient email
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Black color
        doc.text(`Patient Email: ${pemail}`, 20, 30);

        // Line Separator
        doc.setDrawColor(0);
        doc.line(20, 35, 190, 35);

        // Table Header Styling
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255); // White color for headers
        doc.setFillColor(0, 123, 255); // Blue background for header
        doc.rect(20, 40, 170, 10, "F"); // Background for header
        doc.text("Service Type", 20, 45);
        doc.text("Item Name", 60, 45);
        doc.text("Quantity", 120, 45);
        doc.text("Total Price", 150, 45);
        doc.text("Date", 180, 45);

        // Add table content with alternating row colors
        let y = 50;
        let rowIndex = 0;
        services.forEach((service) => {
            doc.setFontSize(12);
            if (rowIndex % 2 === 0) {
                doc.setFillColor(240, 240, 240); // Light gray background for even rows
            } else {
                doc.setFillColor(255, 255, 255); // White background for odd rows
            }
            doc.rect(20, y, 170, 10, "F");
            doc.setTextColor(0, 0, 0); // Reset text color to black
            doc.text(service.service_type, 20, y + 6);
            doc.text(service.item_name, 60, y + 6);
            doc.text(service.quantity.toString(), 120, y + 6);
            doc.text(service.total_price.toString(), 150, y + 6);
            doc.text(service.date, 180, y + 6);
            y += 12;
            rowIndex++;
        });

        // Add total amount at the bottom
        doc.setFontSize(14);
        doc.setTextColor(0, 123, 255); // Blue color for total amount
        doc.text(`Total Amount: ${totalAmount}`, 20, y + 10);

        // Footer section with updated contact information
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150); // Gray text for footer
        doc.text("For more details, contact us at healopharm@gmail.com", 20, y + 20);
        doc.text("Thank you for using our services!", 20, y + 30);

        // Save the PDF
        doc.save("patient_services_summary.pdf");
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
                        Total Amount: {totalAmount}
                    </div>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <button
                            style={styles.dashboardButton}
                            onClick={() => navigate("/patient/dashboard")}
                        >
                            Go to Patient Dashboard
                        </button>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                        <button
                            style={styles.pdfButton}
                            onClick={generatePDF}
                        >
                            Generate PDF
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
    pdfButton: {
        padding: "15px 25px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "18px",
        transition: "background-color 0.3s",
    },
};

export default ServerCart;
