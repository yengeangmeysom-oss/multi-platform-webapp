import React, { useState } from "react";

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    loanAmount: "",
    loanPurpose: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.loanAmount || Number(formData.loanAmount) <= 0)
      newErrors.loanAmount = "Loan amount must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: Replace with real API submit
    console.log("Loan application submitted:", formData);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 500, margin: "2rem auto", textAlign: "center" }}>
        <h2>Thank you for your loan application!</h2>
        <p>We will review your request and get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}
    >
      <h2>Loan Application Form</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Full Name:</label>
        <br />
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your full name"
          style={{ width: "100%", padding: 8 }}
        />
        {errors.fullName && <div style={{ color: "red" }}>{errors.fullName}</div>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Email Address:</label>
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          style={{ width: "100%", padding: 8 }}
        />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Phone Number:</label>
        <br />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1234567890"
          style={{ width: "100%", padding: 8 }}
        />
        {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Loan Amount (USD):</label>
        <br />
        <input
          type="number"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleChange}
          placeholder="Amount in USD"
          min="0"
          style={{ width: "100%", padding: 8 }}
        />
        {errors.loanAmount && <div style={{ color: "red" }}>{errors.loanAmount}</div>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Purpose of Loan:</label>
        <br />
        <textarea
          name="loanPurpose"
          value={formData.loanPurpose}
          onChange={handleChange}
          placeholder="Briefly explain your loan purpose"
          rows={4}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Submit Application
      </button>
    </form>
  );
};

export default LoanApplicationForm;