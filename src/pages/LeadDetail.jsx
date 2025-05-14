import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LeadDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const leadData = location.state?.leadData;

  const [followUps, setFollowUps] = useState(["", "", ""]);

  const handleFollowUpChange = (index, value) => {
    const updated = [...followUps];
    updated[index] = value;
    setFollowUps(updated);
  };

  const handleAddFollowUp = (index) => {
    console.log(`Follow UP-${index + 1}:`, followUps[index]);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!leadData) return <div>No lead data provided.</div>;

  return (
    <div style={{ maxWidth: "700px", margin: "60px auto", padding: "20px" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "28px",
          fontWeight: "600",
        }}
      >
        Lead Detail Page
      </h2>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>
          <strong>Client Name:</strong> {leadData.clientName}
        </p>
        <p>
          <strong>Date:</strong> {leadData.date}
        </p>
      </div>

      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>
          <strong>Lead ID:</strong> {leadData.leadId}
        </p>
        <p>
          <strong>Status:</strong> {leadData.status}
        </p>
      </div>

      {followUps.map((val, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor={`followup-${index}`}
            style={{ minWidth: "130px", fontWeight: "500" }}
          >
            Follow UP-{index + 1}:
          </label>
          <input
            type="text"
            id={`followup-${index}`}
            value={val}
            onChange={(e) => handleFollowUpChange(index, e.target.value)}
            placeholder="Enter follow-up note"
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "15px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginRight: "10px",
            }}
          />
          <button
            type="button"
            onClick={() => handleAddFollowUp(index)}
            style={{
              padding: "10px 14px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Save
          </button>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "40px",
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          style={{
            padding: "10px 18px",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "12px",
          }}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => console.log("All follow-ups submitted", followUps)}
          style={{
            padding: "10px 18px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit All
        </button>
      </div>
    </div>
  );
};

export default LeadDetail;
