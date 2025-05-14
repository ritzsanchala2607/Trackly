/* eslint-disable no-console */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LeadDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const leadData = location.state?.leadData;

  const [followUps, setFollowUps] = useState([]);

  const handleFollowUpChange = (index, field, value) => {
    const updated = [...followUps];
    updated[index] = { ...updated[index], [field]: value };
    setFollowUps(updated);
  };

  const handleAddFollowUp = () => {
    setFollowUps([...followUps, { note: '', date: '' }]);
  };

  const handleSaveFollowUp = (index) => {
    console.log(`Follow Up-${index + 1}:`, followUps[index]);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!leadData) return <div>No lead data provided.</div>;

  return (
    <div style={{ maxWidth: '700px', margin: '60px auto', padding: '20px' }}>
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '28px',
          fontWeight: '600',
        }}
      >
        Lead Detail Page
      </h2>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <p>
          <strong>Client Name:</strong> {leadData.client}
        </p>
        <p>
          <strong>Date:</strong> {leadData.date}
        </p>
      </div>

      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
        <p>
          <strong>Lead ID:</strong> {leadData.lead_id}
        </p>
        <p>
          <strong>Status:</strong> {leadData.status}
        </p>
      </div>

      {followUps.map((followUp, index) => (
        <div
          key={index}
          style={{ display: 'flex', marginBottom: '20px', gap: '10px', flexWrap: 'wrap' }}
        >
          <div style={{ flex: '2', minWidth: '250px' }}>
            <label
              htmlFor={`followup-${index}`}
              style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}
            >
              Follow Up-{index + 1}:
            </label>
            <input
              type="text"
              id={`followup-${index}`}
              value={followUp.note}
              onChange={(e) => handleFollowUpChange(index, 'note', e.target.value)}
              placeholder="Enter follow-up note"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ flex: '1', minWidth: '180px' }}>
            <label
              htmlFor={`nextfollowup-${index}`}
              style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}
            >
              Next Followup Date:
              <input
                type="date"
                id={`nextfollowup-${index}`}
                value={followUp.date}
                onChange={(e) => handleFollowUpChange(index, 'date', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '15px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </label>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              paddingBottom: '2px',
            }}
          >
            <button
              type="button"
              onClick={() => handleSaveFollowUp(index)}
              style={{
                padding: '10px 14px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                height: '43px',
              }}
            >
              Save
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddFollowUp}
        style={{
          marginTop: '10px',
          padding: '10px 16px',
          backgroundColor: '#17a2b8',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Add Follow-Up
      </button>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '40px',
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          style={{
            padding: '10px 18px',
            backgroundColor: '#ED0202',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '12px',
          }}
        >
          Close
        </button>
        <button
          type="button"
          onClick={() => console.log('All follow-ups submitted', followUps)}
          style={{
            padding: '10px 18px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default LeadDetail;
