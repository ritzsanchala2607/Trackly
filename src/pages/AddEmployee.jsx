import React, { useState } from "react";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    email: "",
    password: "",
    joiningDate: "",
    role: "",
    phone: "",
    district: "",
  });

  const [errors, setErrors] = useState({});

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const labelStyle = {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.empId.trim()) newErrors.empId = "Employee ID is required";
    if (!formData.name.trim()) newErrors.name = "Employee name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.joiningDate) newErrors.joiningDate = "Joining date is required";

    if (!formData.role) newErrors.role = "Role is required";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.district.trim()) newErrors.district = "District is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Submit logic here (e.g., send to API)
    alert("Employee registered successfully!");

    // Reset form
    setFormData({
      empId: "",
      name: "",
      email: "",
      password: "",
      joiningDate: "",
      role: "",
      phone: "",
      district: "",
    });
    setErrors({});
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <form onSubmit={handleSubmit}>
        {[
          { id: "empId", label: "Employee ID", type: "text" },
          { id: "name", label: "Employee Name", type: "text" },
          { id: "email", label: "Email", type: "email" },
          { id: "password", label: "Password", type: "password" },
          { id: "joiningDate", label: "Joining Date", type: "date" },
          { id: "phone", label: "Phone Number", type: "tel" },
          { id: "district", label: "District", type: "text" },
        ].map(({ id, label, type }) => (
          <div key={id} style={{ marginBottom: "15px" }}>
            <label htmlFor={id} style={labelStyle}>
              {label}:
              <input
                id={id}
                type={type}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                style={inputStyle}
              />
              {errors[id] && (
                <p style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>
                  {errors[id]}
                </p>
              )}
            </label>
          </div>
        ))}

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="role" style={labelStyle}>
            Role:
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
            {errors.role && (
              <p style={{ color: "red", fontSize: "0.9em", marginTop: "5px" }}>
                {errors.role}
              </p>
            )}
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
