const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "student-crud"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

// Create a new student record
app.post('/', (req, res) => {
    const { name, email } = req.body;
    const sql = "INSERT INTO student (Name, Email) VALUES (?, ?)";
    const values = [name, email];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error creating student record:", err);
            return res.status(500).json({ error: "Error creating student record" });
        }
        return res.status(201).json({ message: "Student record created successfully", result });
    });
});

// Retrieve all students
app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error retrieving students:", err);
            return res.status(500).json({ error: "Error retrieving students" });
        }
        return res.json(data);
    });
});

// Update a student record by ID
app.put('/update/:id', (req, res) => {
    const { name, email } = req.body;
    const id = req.params.id;
    const sql = "UPDATE student SET Name = ?, Email = ? WHERE ID = ?";
    const values = [name, email, id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating student record:", err);
            return res.status(500).json({ error: "Error updating student record" });
        }
        return res.json({ message: "Student record updated successfully", result });
    });
});

// Delete a student record by ID
app.delete('/student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM student WHERE ID = ?";
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Error deleting student record:", err);
            return res.status(500).json({ error: "Error deleting student record" });
        }
        return res.json({ message: "Student record deleted successfully", result });
    });
});


const port = 8081;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
