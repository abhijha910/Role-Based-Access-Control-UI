import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  TextField,
  Container,
} from "@mui/material";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: "" });
  const [editRole, setEditRole] = useState(null);
  const [isAddingRole, setIsAddingRole] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/roles");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleAddRole = async () => {
    try {
      await axios.post("http://localhost:5000/roles", newRole);
      setNewRole({ name: "", permissions: "" });
      setIsAddingRole(false);
      fetchRoles();
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  const handleEditRole = async () => {
    try {
      await axios.put(`http://localhost:5000/roles/${editRole.id}`, editRole);
      setEditRole(null);
      fetchRoles();
    } catch (error) {
      console.error("Error editing role:", error);
    }
  };

  const handleDeleteRole = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this role? This action cannot be undone."
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/roles/${id}`);
        fetchRoles(); // Refresh the list of roles after deletion
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    } else {
      console.log("Role deletion canceled.");
    }
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => setIsAddingRole(true)}
      >
        Add Role
      </Button>

      <Modal open={isAddingRole} onClose={() => setIsAddingRole(false)}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            width: "400px",
            margin: "auto",
            marginTop: "100px",
          }}
        >
          <TextField
            label="Role Name"
            fullWidth
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Permissions (comma-separated)"
            fullWidth
            value={newRole.permissions}
            onChange={(e) =>
              setNewRole({ ...newRole, permissions: e.target.value })
            }
            style={{ marginBottom: "20px" }}
          />
          <Button
            onClick={handleAddRole}
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </div>
      </Modal>

      {editRole && (
        <Modal open={!!editRole} onClose={() => setEditRole(null)}>
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              width: "400px",
              margin: "auto",
              marginTop: "100px",
            }}
          >
            <TextField
              label="Role Name"
              fullWidth
              value={editRole.name}
              onChange={(e) =>
                setEditRole({ ...editRole, name: e.target.value })
              }
              style={{ marginBottom: "20px" }}
            />
            <TextField
              label="Permissions (comma-separated)"
              fullWidth
              value={editRole.permissions}
              onChange={(e) =>
                setEditRole({ ...editRole, permissions: e.target.value })
              }
              style={{ marginBottom: "20px" }}
            />
            <Button
              onClick={handleEditRole}
              variant="contained"
              color="primary"
              fullWidth
            >
              Save Changes
            </Button>
          </div>
        </Modal>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setEditRole(role)}
                  style={{
                    marginRight: "10px",
                    backgroundColor: "#4caf50",
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "none",
                    padding: "5px 15px",
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => handleDeleteRole(role.id)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "none",
                    padding: "5px 15px",
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default RolesPage;
