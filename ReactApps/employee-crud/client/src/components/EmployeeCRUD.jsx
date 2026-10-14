import { useEffect, useState } from "react";
import "../App.css";

// Keep all your existing CRUD and pagination code here.
const API = "http://localhost:5000/employees";
const PAGE_SIZE = 5;

const emptyForm = {
  ename: "",
  job: "",
  salary: "",
};

function EmployeeCRUD() {
  // Move everything from your existing App()
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.max(
      1,
      Math.ceil(employees.length / PAGE_SIZE)
    );
  
    const startIndex = (currentPage - 1) * PAGE_SIZE;
  
    const currentEmployees = employees.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );
  
    useEffect(() => {
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }, [currentPage, totalPages]);
  
    async function loadEmployees() {
      try {
        const response = await fetch(API);
        if (!response.ok) throw new Error("Failed to load employees");
  
        setEmployees(await response.json());
      } catch {
        setMessage("Cannot connect to the server.");
      }
    }
  
    useEffect(() => {
      loadEmployees();
    }, []);
  
    function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      const url = editId ? `${API}/${editId}` : API;
      const method = editId ? "PUT" : "POST";
  
      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            salary: Number(form.salary),
          }),
        });
  
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
  
        setMessage(
          editId
            ? "Employee updated successfully"
            : "Employee added successfully"
        );
  
        setForm(emptyForm);
        setEditId(null);
  
        await loadEmployees();
  
        // Show the latest page after inserting a record.
        if (!editId) {
          setCurrentPage(
            Math.ceil((employees.length + 1) / PAGE_SIZE)
          );
        }
      } catch (error) {
        setMessage(error.message || "Operation failed");
      }
    }
  
    function handleEdit(emp) {
      setEditId(emp.emp_id);
      setForm({
        ename: emp.ename,
        job: emp.job || "",
        salary: String(emp.salary),
      });
      setMessage("");
    }
  
    async function handleDelete(id) {
      if (!window.confirm("Delete this employee?")) return;
  
      try {
        const response = await fetch(`${API}/${id}`, {
          method: "DELETE",
        });
  
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
  
        setMessage("Employee deleted successfully");
  
        if (editId === id) {
          setEditId(null);
          setForm(emptyForm);
        }
  
        await loadEmployees();
      } catch (error) {
        setMessage(error.message || "Delete failed");
      }
    }
  
    function handleCancel() {
      setEditId(null);
      setForm(emptyForm);
      setMessage("");
    }
  
    return (
      <div className="container">
        <h1>Employee Management</h1>
  
        <form onSubmit={handleSubmit} className="employee-form">
          <h2>{editId ? "Update Employee" : "Add Employee"}</h2>
  
          <input
            name="ename"
            placeholder="Employee Name"
            value={form.ename}
            onChange={handleChange}
            required
          />
  
          <input
            name="job"
            placeholder="Job"
            value={form.job}
            onChange={handleChange}
          />
  
          <input
            name="salary"
            type="number"
            min="0"
            step="0.01"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            required
          />
  
          <button type="submit">
            {editId ? "Update" : "Add Employee"}
          </button>
  
          {editId && (
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </form>
  
        {message && <p className="message">{message}</p>}
  
        <h2>Employee List</h2>
  
        <p className="pagination-info">
          Showing {employees.length === 0 ? 0 : startIndex + 1}
          {"–"}
          {Math.min(startIndex + PAGE_SIZE, employees.length)}
          {" of "}
          {employees.length} employees
        </p>
  
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Job</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
  
            <tbody>
              {currentEmployees.map((emp) => (
                <tr key={emp.emp_id}>
                  <td>{emp.emp_id}</td>
                  <td>{emp.ename}</td>
                  <td>{emp.job || "-"}</td>
                  <td>{Number(emp.salary).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleEdit(emp)}>
                      Edit
                    </button>
  
                    <button
                      className="delete"
                      onClick={() => handleDelete(emp.emp_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
  
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
  
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              First
            </button>
  
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
            >
              Previous
            </button>
  
            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                className={
                  currentPage === page ? "active-page" : ""
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
  
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
            >
              Next
            </button>
  
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              Last
            </button>
          </div>
        )}
      </div>
    );
  // component here, unchanged.
}

export default EmployeeCRUD;