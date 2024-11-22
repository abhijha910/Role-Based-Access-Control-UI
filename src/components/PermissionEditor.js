import React from "react";
import { TextField, Button } from "@mui/material";

const PermissionEditor = ({ permissions, onChange }) => {
  const handleAddPermission = () => {
    const newPermission = window.prompt("Enter a new permission:");
    if (newPermission) {
      onChange([...permissions, newPermission]);
    }
  };

  const handleRemovePermission = (permission) => {
    onChange(permissions.filter((p) => p !== permission));
  };

  return (
    <div>
      <h3>Permissions</h3>
      {permissions.map((permission, index) => (
        <div key={index} style={{ marginBottom: "8px" }}>
          <TextField
            disabled
            value={permission}
            style={{ marginRight: "8px", width: "200px" }}
          />
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemovePermission(permission)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button variant="contained" onClick={handleAddPermission}>
        Add Permission
      </Button>
    </div>
  );
};

export default PermissionEditor;
