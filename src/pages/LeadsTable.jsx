/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Select, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const LeadsTable = () => {
  const [assignments, setAssignments] = useState({});
  const [hoveredKey, setHoveredKey] = useState(null);
  const [employee, setEmployee] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleAssign = (key) => {
    // console.log(`Assigned ${assignments[key]} to lead with key ${key}`);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/user/get_employees`)
      .then((res) => {
        setEmployee(res.data.employees);

        // Extract only names
        const names = res.data.employees.map((emp) => emp.name);
        setAvailableUsers(names);
      })
      .catch((err) => {
        // console.error('Error fetching employees', err);
      });

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/lead/`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        // console.error('Error fetching employees', err);
      });
  }, []);

  const handleChange = (value, key) => {
    setAssignments({ ...assignments, [key]: value });
  };

  // const availableUsers = ['John Doe', 'Anna Smith', 'Vikram Joshi', 'Grace Kimani', 'Lukas Bauer'];

  // const data = [
  //   {
  //     key: '1',
  //     clientName: 'Nancy Davolio',
  //     contact: '+1-202-555-0101',
  //     city: 'Seattle',
  //     state: 'Washington',
  //     assignedTo: 'John Doe',
  //     date: '2025-05-01',
  //     leadId: 'LD001',
  //     status: 'New',
  //   },
  //   {
  //     key: '2',
  //     clientName: 'Iulia Albu',
  //     contact: '+40-123-456-789',
  //     city: 'Bucharest',
  //     state: 'Romania',
  //     assignedTo: 'Anna Smith',
  //     date: '2025-05-01',
  //     leadId: 'LD002',
  //     status: 'Contacted',
  //   },
  //   // ... more data
  // ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'lead_id',
      key: 'lead_id',
    },
    {
      title: 'Client Name',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact_number',
      key: 'contact_number',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'emial',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Assigned To',
      key: 'assignedTo',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Select
            defaultValue={record.assignedTo}
            style={{ width: 150 }}
            onChange={(value) => handleChange(value, record.key)}
          >
            {availableUsers.map((user) => (
              <Option key={user} value={user}>
                {user}
              </Option>
            ))}
          </Select>
          <Button
            onMouseEnter={() => setHoveredKey(record.key)}
            onMouseLeave={() => setHoveredKey(null)}
            onClick={() => handleAssign(record.key)}
            style={{
              border: '1px solid #1890ff',
              color: hoveredKey === record.key ? '#fff' : '#1890ff',
              backgroundColor: hoveredKey === record.key ? '#1890ff' : '#fff',
              transition: 'all 0.3s',
            }}
          >
            Assign
          </Button>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="default"
          onClick={() => navigate('/leaddetails', { state: { leadData: record } })}
        >
          Check Details
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} bordered />
    </div>
  );
};

export default LeadsTable;
