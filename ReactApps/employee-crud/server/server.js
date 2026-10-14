const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Create SQLite database file
const db = new sqlite3.Database(
  path.join(__dirname, "employees.db"),
  (err) => {
    if (err) {
      console.error("Database error:", err.message);
    } else {
      console.log("Connected to SQLite database");
    }
  }
);

// Create Employee table automatically
db.run(`
  CREATE TABLE IF NOT EXISTS Employee (
    emp_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ename TEXT NOT NULL,
    job TEXT,
    salary REAL NOT NULL CHECK (salary >= 0)
  )
`, (err) => {
  if (err) {
    console.error("Table creation error:", err.message);
  } else {
    console.log("Employee table ready");
  }
});

// CREATE employee
app.post("/employees", (req, res) => {
  const { ename, job, salary } = req.body;

  if (
    typeof ename !== "string" ||
    !ename.trim() ||
    salary === "" ||
    salary == null ||
    !Number.isFinite(Number(salary)) ||
    Number(salary) < 0
  ) {
    return res.status(400).json({
      message: "Enter a valid name and salary",
    });
  }

  db.run(
    `INSERT INTO Employee (ename, job, salary)
     VALUES (?, ?, ?)`,
    [ename.trim(), job || null, Number(salary)],
    function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.status(201).json({
        emp_id: this.lastID,
        ename: ename.trim(),
        job: job || null,
        salary: Number(salary),
      });
    }
  );
});

// READ all employees
app.get("/employees", (req, res) => {
  db.all(
    "SELECT * FROM Employee ORDER BY emp_id",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json(rows);
    }
  );
});

// READ employee by ID
app.get("/employees/:id", (req, res) => {
  db.get(
    "SELECT * FROM Employee WHERE emp_id = ?",
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (!row) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }

      res.json(row);
    }
  );
});

// UPDATE employee
app.put("/employees/:id", (req, res) => {
  const { ename, job, salary } = req.body;

  if (
    typeof ename !== "string" ||
    !ename.trim() ||
    salary === "" ||
    salary == null ||
    !Number.isFinite(Number(salary)) ||
    Number(salary) < 0
  ) {
    return res.status(400).json({
      message: "Enter valid employee details",
    });
  }

  db.run(
    `UPDATE Employee
     SET ename = ?, job = ?, salary = ?
     WHERE emp_id = ?`,
    [
      ename.trim(),
      job || null,
      Number(salary),
      req.params.id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }

      res.json({ message: "Employee updated successfully" });
    }
  );
});

// DELETE employee
app.delete("/employees/:id", (req, res) => {
  db.run(
    "DELETE FROM Employee WHERE emp_id = ?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }

      res.json({ message: "Employee deleted successfully" });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});