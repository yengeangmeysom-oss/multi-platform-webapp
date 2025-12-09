import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    LoanAmount: "",
    LoanPurpose: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.FullName.trim()) return "Full Name is required.";
    if (!formData.Email.trim()) return "Email is required.";
    if (!formData.Phone.trim()) return "Phone is required.";
    if (!formData.LoanAmount || isNaN(formData.LoanAmount) || Number(formData.LoanAmount) <= 0)
      return "Please enter a valid Loan Amount.";
    if (!formData.LoanPurpose.trim()) return "Loan Purpose is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://loan-application-form-airtable.yengeangmey-som.workers.dev",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            FullName: formData.FullName,
            Email: formData.Email,
            Phone: formData.Phone,
            LoanAmount: Number(formData.LoanAmount),
            LoanPurpose: formData.LoanPurpose,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application.");
      }

      setMessage("Your loan application has been submitted successfully!");
      setFormData({
        FullName: "",
        Email: "",
        Phone: "",
        LoanAmount: "",
        LoanPurpose: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        border: "1px solid #ddd",
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Loan Application Form</h2>

      {error && (
        <div
          style={{
            marginBottom: 15,
            padding: 10,
            backgroundColor: "#ffe6e6",
            color: "#cc0000",
            borderRadius: 4,
          }}
        >
          {error}
        </div>
      )}

      {message && (
        <div
          style={{
            marginBottom: 15,
            padding: 10,
            backgroundColor: "#e6ffea",
            color: "#2d662d",
            borderRadius: 4,
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label style={{ display: "block", marginBottom: 6 }}>
          Full Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="FullName"
          value={formData.FullName}
          onChange={handleChange}
          placeholder="Your full name"
          required
          style={inputStyle}
          disabled={loading}
        />

        <label style={{ display: "block", marginBottom: 6, marginTop: 12 }}>
          Email<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          placeholder="example@email.com"
          required
          style={inputStyle}
          disabled={loading}
        />

        <label style={{ display: "block", marginBottom: 6, marginTop: 12 }}>
          Phone<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="tel"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
          placeholder="+1 234 567 8900"
          required
          style={inputStyle}
          disabled={loading}
        />

        <label style={{ display: "block", marginBottom: 6, marginTop: 12 }}>
          Loan Amount<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="number"
          name="LoanAmount"
          value={formData.LoanAmount}
          onChange={handleChange}
          placeholder="Enter amount in USD"
          required
          min="1"
          style={inputStyle}
          disabled={loading}
        />

        <label style={{ display: "block", marginBottom: 6, marginTop: 12 }}>
          Loan Purpose<span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          name="LoanPurpose"
          value={formData.LoanPurpose}
          onChange={handleChange}
          placeholder="Explain the purpose of the loan"
          required
          rows="4"
          style={{ ...inputStyle, resize: "vertical" }}
          disabled={loading}
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 20,
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#999" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

export default App;