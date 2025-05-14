import React, { useState } from 'react';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    email: '',
    password: '',
    joiningDate: '',
    role: '',
    phone: '',
    district: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const labelStyle = {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
  };

  // ... existing handleSubmit function ...

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="empId" style={labelStyle}>
            Employee ID:
          </label>
          <input
            id="empId"
            type="text"
            name="empId"
            value={formData.empId}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={labelStyle}>
            Employee Name:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* ... similar pattern for other form fields ... */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="role" style={labelStyle}>
            Role:
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
            <option value="Marketing Agency">Marketing Agency</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
