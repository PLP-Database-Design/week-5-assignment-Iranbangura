// Import our dependancies
const express = require("express");
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv')

// cors & ejs

// Congigure enviromental variables
dotenv.config();

// Create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


// Test the connection
db.connect((err) => {
    // connection is not sucessful
if (err) {
    return console.log("Error connecting to the database:", err)
}

    // Connection is sucessful
    console.log("Successfully connected to mysql:")
})



        //QUESTION 1
  // Retrieve all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching patients:', err);
            res.status(500).send('Error fetching patients');
        } else {
            res.json(results);
        }
    });
  });
  
  
  //QUESTION 2
  // Retrieve all providers
  app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching providers:', err);
            res.status(500).send('Error fetching providers');
        } else {
            res.json(results);
        }
    });
  });
  
  //QUESTION 3
  // Filter patients by first name
  app.get('/patients/first-name/:firstName', (req, res) => {
    const firstName = req.params.firstName;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(query, [firstName], (err, results) => {
        if (err) {
            console.error('Error fetching patients by first name:', err);
            res.status(500).send('Error fetching patients');
        } else {
            res.json(results);
        }
    });
  });
  
  //QUESTION 4
  // Retrieve providers by specialty
  app.get('/providers/specialty/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(query, [specialty], (err, results) => {
        if (err) {
            console.error('Error fetching providers by specialty:', err);
            res.status(500).send('Error fetching providers');
        } else {
            res.json(results);
        }
    });
  });



// Start and listen to the server
app.listen(3300, () => {
    console.log('server is running on port 3300...')
})