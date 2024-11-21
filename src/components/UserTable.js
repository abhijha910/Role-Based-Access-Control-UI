import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const fetchRoles = async () => {
    const response = await axios.get("http://localhost:5000/roles");
    setRoles(response.data);
  };

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers(); // Refresh the user list after deletion
    }
  };

  // Handle editing a user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setOpen(true);
  };

  const handleAddUser = async () => {
    if (editingUser) {
      await axios.put(`http://localhost:5000/users/${editingUser.id}`, form);
    } else {
      await axios.post("http://localhost:5000/users", form);
    }
    fetchUsers();
    setOpen(false);
    setForm({ name: "", email: "", role: "", status: "Active" });
    setEditingUser(null);
  };

  return (
    <div>
      <h2>Users</h2>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => handleDeleteUser(user.id)} // Trigger delete
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Select
            label="Role"
            fullWidth
            margin="normal"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Status"
            fullWidth
            margin="normal"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserTable;
