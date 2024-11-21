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
} from "@mui/material";
import axios from "axios";

const RoleTable = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", permissions: "" });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const response = await axios.get("http://localhost:5000/roles");
    setRoles(response.data);
  };

  // Handle deleting a role
  const handleDeleteRole = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      await axios.delete(`http://localhost:5000/roles/${id}`);
      fetchRoles(); // Refresh the roles list after deletion
    }
  };

  const handleAddRole = async () => {
    const permissions = form.permissions.split(",").map((p) => p.trim());
    await axios.post("http://localhost:5000/roles", { ...form, permissions });
    fetchRoles();
    setOpen(false);
    setForm({ name: "", permissions: "" });
  };

  return (
    <div>
      <h2>Roles</h2>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Role
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(", ")}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => handleDeleteRole(role.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Permissions (comma-separated)"
            fullWidth
            margin="normal"
            value={form.permissions}
            onChange={(e) => setForm({ ...form, permissions: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddRole} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleTable;
