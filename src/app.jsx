import axios from 'axios';
import React, { useState, useEffect } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: ''
  });

  
  const [registeredUsers, setRegisteredUsers] = useState([]);
  // const [userReg, setUsers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:3000/userReg', formData);
      console.log(response.data); // Assuming server sends back success message
      setRegisteredUsers([...registeredUsers, formData]);
      setFormData({ username: '', email: '', mobile: '', password: '' });
      // You can handle success message here
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error here
      // handleDelete();
    }
  };

  const handlesubmit = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', formData);
      console.log(response.data); // Assuming server sends back success message
      setRegisteredUsers([...registeredUsers, formData]);
      // You can handle success message here
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error here
      // uhandleDelete();
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/userReg/${id}`);
      // Update the user list after deletion
      const updatedUsers = registeredUsers.filter(user => user.id !== id);
      setRegisteredUsers(updatedUsers);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error here
    }
  };

  return (
    <div>
      <h1 style={{ color: 'blue' }}>Vestige marketing pvt.ltd</h1>
      <h2>Registration Form</h2>
      <form>
        <div>
          <label htmlFor="username">UserName:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <br />
        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input type="mobile" id="mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        <br />
      </form>
      <button onClick={handleClick}>Save</button>
      <button onClick={handlesubmit}>Submit</button>
      {/* <button onClick={() => handleDelete(user.id)}>Delete</button> */}
      <div>
        <h3>Registered Users</h3>
        <table>
          <thead>
            <tr>
              <th>UserName</th>
              <th style={{ paddingLeft: '20px' }}>Email</th>
              <th style={{ paddingLeft: '20px' }}>Mobile</th>
              <th style={{ paddingLeft: '30px' }}>Password</th>
            </tr>
          </thead>
          <tbody>
            {registeredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td style={{ paddingLeft: '60px' }}>{user.email}</td>
                <td style={{ paddingLeft: '50px' }}>{user.mobile}</td>
                <td style={{ paddingLeft: '50px' }}>{user.password}</td>
                {/* Delete button */}
                <td><button onClick={() => handleDelete(user.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RegistrationForm;
