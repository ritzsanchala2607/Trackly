/* eslint-disable no-alert */
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const AddLeads = () => {
  const [formData, setFormData] = useState({
    client: '',
    date: '',
    contact_number: '',
    email: '',
    district: '',
    source: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Manually Submitted Lead:", formData);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/lead/`, formData)
      .then((res) => {
        // eslint-disable-next-line no-alert
        alert(res.data.message);
        setFormData({
          client: '',
          date: '',
          contact_number: '',
          email: '',
          district: '',
          source: '',
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        // eslint-disable-next-line no-alert
        alert('Something went wrong during registration.');
      });

    setFormData({
      client: '',
      date: '',
      contact_number: '',
      email: '',
      district: '',
      source: '',
    });
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    // Optional: Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      alert('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });

        const sheetName = workbook.SheetNames[0]; // First sheet only
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' }); // defval: '' ensures empty cells are included

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/lead/excel`, jsonData)
          .then((res) => {
            // eslint-disable-next-line no-alert
            alert(res.data.message);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
            // eslint-disable-next-line no-alert
            alert('Something went wrong during registration.');
          });
        // Example: setData(jsonData); if using useState
      } catch (error) {
        alert('Failed to read the Excel file.');
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-center text-2xl font-semibold mb-6">Add Leads</h2>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Manual Lead Entry Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Manual Lead Entry</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="date">
                Date:
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="client">
                Customer Name:
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="contact_number">
                Contact Number:
                <input
                  type="tel"
                  name="contact_number"
                  id="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="email">
                Email:
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="source">
                Source:
                <select
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select Source</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Youtube">Youtube</option>
                  <option value="News Paper">News Paper</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label className="block font-medium mb-1" htmlFor="district">
                District:
                <input
                  type="text"
                  name="district"
                  id="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full transition-colors"
            >
              Submit Lead
            </button>
          </form>
        </div>

        {/* Bulk Upload Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Bulk Upload Leads</h3>

          <div className="space-y-4">
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div className="form-group">
                <label className="block font-medium mb-1" htmlFor="file">
                  Upload Leads via XLSX:
                  <input
                    type="file"
                    id="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="w-full p-2 border rounded"
                  />
                  <a
                    href="/lead_template.xlsx"
                    download
                    className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Download Template
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full transition-colors"
              >
                Upload & Process File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLeads;
