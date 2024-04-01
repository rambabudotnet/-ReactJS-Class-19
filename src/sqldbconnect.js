const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const app = express();

const port = 3000; // Assuming you want to run the server on port 3000
app.use(cors());
// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Database configuration
const config = {
  user: 'roshan',
  password: 'vestige@123',
  server: '203.112.141.234',
  port: 21444,
  database: 'pmmyvestigin',
  options: {
    encrypt: true, // Enable encryption
    trustServerCertificate: true, // Trust self-signed certificate
  }
};

// POST endpoint for user registration
app.post('/userReg', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Extract registration data from request body
    const { username, email, mobile, password } = req.body;

    // Execute SQL query to insert user data into database
    await sql.query`INSERT INTO TestUser1 (username, email, mobile, password) VALUES (${username}, ${email}, ${mobile}, ${password})`;

    // Send success response
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    // Send error response
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Registration failed' });
  } finally {
    // Close database connection
    await sql.close();
  }
});

// GET endpoint to retrieve all users from the database
app.get('/users', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);
    // Execute SQL query to retrieve all users
    const result = await sql.query`SELECT * FROM TestUser1`;

    // Send retrieved users as response
    res.status(200).json(result.recordset);
  } catch (error) {
    // Send error response
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch users' });
  } finally {
    // Close database connection
    await sql.close();
  }
});

// DELETE endpoint to delete a user by ID
app.delete('/userReg/:id', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Extract user ID from request parameters
    const { id } = req.params;

    // Execute SQL query to delete user by ID
    await sql.query`DELETE FROM TestUser1 WHERE id = ${id}`;

    // Send success response
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // Send error response
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Failed to delete user' });
  } finally {
    // Close database connection
    await sql.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
