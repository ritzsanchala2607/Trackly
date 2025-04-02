import React, { useState } from "react";

const AddLeadsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    contactNumber: "",
    email: "",
    district: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="p-6 bg-white-100 min-h-screen">
      <h2 className="text-center text-xl font-semibold mb-4">Add Leads</h2>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <label className="block font-semibold">Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          className="w-full border rounded p-2 mb-2"
        />
        
        <label className="block font-semibold">Date:</label>
        <input 
          type="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          className="w-full border rounded p-2 mb-2"
        />
        
        <label className="block font-semibold">Contact Number:</label>
        <input 
          type="text" 
          name="contactNumber" 
          value={formData.contactNumber} 
          onChange={handleChange} 
          className="w-full border rounded p-2 mb-2"
        />
        
        <label className="block font-semibold">Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full border rounded p-2 mb-2"
        />
        
        <label className="block font-semibold">District:</label>
        <input 
          type="text" 
          name="district" 
          value={formData.district} 
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

export default AddLeadsForm;
