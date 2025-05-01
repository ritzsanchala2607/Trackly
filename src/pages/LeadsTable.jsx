import React, { useState } from 'react';
import { Table, Select, Button } from 'antd';

const { Option } = Select;

const LeadsTable = () => {
  const [assignments, setAssignments] = useState({});

  const handleAssign = (key) => {
    console.log(`Assigned ${assignments[key]} to lead with key ${key}`);
    // TODO: Add logic to save to database or backend
  };

  const handleChange = (value, key) => {
    setAssignments({ ...assignments, [key]: value });
  };

  const availableUsers = ['John Doe', 'Anna Smith', 'Vikram Joshi', 'Grace Kimani', 'Lukas Bauer'];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
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
            type="primary"
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff',padding: '0 12px' }}
            onClick={() => handleAssign(record.key)}
          >
            Assign
          </Button>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Nancy Davolio',
      contact: '+1-202-555-0101',
      city: 'Seattle',
      state: 'Washington',
      assignedTo: 'John Doe',
    },
    {
      key: '2',
      name: 'Iulia Albu',
      contact: '+40-123-456-789',
      city: 'Bucharest',
      state: 'Romania',
      assignedTo: 'Anna Smith',
    },
    {
      key: '3',
      name: 'Omar Darobe',
      contact: '+91-9876543210',
      city: 'Mumbai',
      state: 'Maharashtra',
      assignedTo: 'Vikram Joshi',
    },
    {
      key: '4',
      name: 'Nasimiyu Danai',
      contact: '+254-712-345678',
      city: 'Nairobi',
      state: 'Nairobi County',
      assignedTo: 'Grace Kimani',
    },
    {
      key: '5',
      name: 'Siegbert Gottfried',
      contact: '+49-30-123456',
      city: 'Berlin',
      state: 'Berlin',
      assignedTo: 'Lukas Bauer',
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default LeadsTable;
