import React, { useState } from "react";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Data Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-md w-[500px] border border-gray-300"
      >
        <h2 className="text-center text-xl font-semibold mb-4">Add Employee</h2>
        
        <label className="block font-semibold">Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full border rounded p-2 mb-2"
        />
        
        <label className="block font-semibold">Username:</label>
        <input 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          className="w-full border rounded p-2 mb-2"
        />
        
        <label className="block font-semibold">Password:</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          className="w-full border rounded p-2 mb-2"
        />
        
        <label className="block font-semibold">Role:</label>
        <input 
          type="text" 
          name="role" 
          value={formData.role} 
          onChange={handleChange} 
          className="w-full border rounded p-2 mb-4"
        />
        
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
