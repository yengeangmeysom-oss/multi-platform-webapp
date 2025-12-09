import React, { useState } from "react";

export default function LoanApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    loanAmount: "",
    loanPurpose: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Submitting...");

    try {
      const response = await fetch("https://loan-application-form-airtable.yengeangmey-som.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FullName: formData.fullName,
          Email: formData.email,
          Phone: formData.phone,
          LoanAmount: Number(formData.loanAmount),
          LoanPurpose: formData.loanPurpose,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit loan application");
      }

      setSubmitStatus("Application submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        loanAmount: "",
        loanPurpose: "",
      });
    } catch (err) {
      setSubmitStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ marginTop: 40, maxWidth: 400 }}>
      <h2>Loan Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Full Name:<br />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </label>
        </div>
        <div>
          <label>
            Email:<br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </label>
        </div>
        <div>
          <label>
            Phone:<br />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </label>
        </div>
        <div>
          <label>
            Loan Amount:<br />
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
              min="0"
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </label>
        </div>
        <div>
          <label>
            Loan Purpose:<br />
            <input
              type="text"
              name="loanPurpose"
              value={formData.loanPurpose}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Submit Application
        </button>
      </form>
      {submitStatus && <p style={{ marginTop: 10 }}>{submitStatus}</p>}
    </div>
  );
}