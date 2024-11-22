// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Switch,
//   FormControlLabel,
// } from "@mui/material";
// import axios from "axios";

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [roles, setRoles] = useState([]); // Fetch roles from the backend
//   const [editUser, setEditUser] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [isActive, setIsActive] = useState(true);
//   const [open, setOpen] = useState(false);

//   // Fetch users and roles
//   useEffect(() => {
//     const fetchUsersAndRoles = async () => {
//       try {
//         const usersResponse = await axios.get("http://localhost:5000/users");
//         const rolesResponse = await axios.get("http://localhost:5000/roles"); // Fetch roles
//         setUsers(usersResponse.data);
//         setRoles(rolesResponse.data); // Store available roles
//       } catch (error) {
//         console.error("Error fetching users or roles:", error);
//       }
//     };

//     fetchUsersAndRoles();
//   }, []);

//   const handleEditUser = (user) => {
//     setEditUser(user);
//     setName(user.name);
//     setEmail(user.email);
//     setRole(user.role);
//     setIsActive(user.isActive);
//     setOpen(true);
//   };

//   const handleDeleteUser = async (userId) => {
//     const userToDelete = users.find((user) => user.id === userId);
//     if (!userToDelete) return;

//     const confirmed = window.confirm(
//       `Are you sure you want to delete the user "${userToDelete.name}"? This action cannot be undone.`
//     );

//     if (confirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/users/${userId}`);
//         setUsers(users.filter((user) => user.id !== userId));
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSaveUser = async () => {
//     if (!validateEmail(email)) {
//       alert("Invalid email format. Please enter a valid email.");
//       return;
//     }

//     if (!role) {
//       alert("Please select a role for the user.");
//       return;
//     }

//     const userData = { name, email, role, isActive };

//     try {
//       if (editUser) {
//         await axios.put(`http://localhost:5000/users/${editUser.id}`, userData);
//         setUsers(
//           users.map((user) =>
//             user.id === editUser.id ? { ...user, ...userData } : user
//           )
//         );
//       } else {
//         const response = await axios.post(
//           "http://localhost:5000/users",
//           userData
//         );
//         setUsers([...users, response.data]);
//       }
//       setOpen(false);
//       setEditUser(null);
//     } catch (error) {
//       console.error("Error saving user:", error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditUser(null);
//   };

//   return (
//     <div>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => setOpen(true)}
//         style={{ marginBottom: "20px" }}
//       >
//         Add User
//       </Button>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Role</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>{user.name}</TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>{user.role}</TableCell>
//               <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
//               <TableCell>
//                 <Button
//                   color="primary"
//                   variant="contained"
//                   onClick={() => handleEditUser(user)}
//                   style={{
//                     marginRight: "10px",
//                     backgroundColor: "#4caf50",
//                     color: "white",
//                     fontWeight: "bold",
//                     textTransform: "none",
//                     padding: "5px 15px",
//                   }}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   color="secondary"
//                   variant="contained"
//                   onClick={() => handleDeleteUser(user.id)}
//                   style={{
//                     backgroundColor: "#f44336",
//                     color: "white",
//                     fontWeight: "bold",
//                     textTransform: "none",
//                     padding: "5px 15px",
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Add/Edit User Dialog */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Name"
//             fullWidth
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={{ marginBottom: "20px" }}
//           />
//           <TextField
//             label="Email"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{ marginBottom: "20px" }}
//           />
//           <FormControl fullWidth style={{ marginBottom: "20px" }}>
//             <InputLabel>Role</InputLabel>
//             <Select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               label="Role"
//             >
//               {roles.map((role) => (
//                 <MenuItem key={role.id} value={role.name}>
//                   {role.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControlLabel
//             control={
//               <Switch
//                 checked={isActive}
//                 onChange={() => setIsActive(!isActive)}
//                 color="primary"
//               />
//             }
//             label={isActive ? "Active" : "Inactive"}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveUser} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default UsersPage;

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // Fetch roles from the backend
  const [editUser, setEditUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [open, setOpen] = useState(false);

  // Fetch users and roles
  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:5000/users");
        const rolesResponse = await axios.get("http://localhost:5000/roles"); // Fetch roles
        setUsers(usersResponse.data);
        setRoles(rolesResponse.data); // Store available roles
      } catch (error) {
        console.error("Error fetching users or roles:", error);
      }
    };

    fetchUsersAndRoles();
  }, []);

  const handleAddUser = () => {
    setEditUser(null);
    setName("");
    setEmail("");
    setRole("");
    setIsActive(true);
    setOpen(true);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setIsActive(user.isActive);
    setOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    const userToDelete = users.find((user) => user.id === userId);
    if (!userToDelete) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete the user "${userToDelete.name}"? This action cannot be undone.`
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveUser = async () => {
    if (!validateEmail(email)) {
      alert("Invalid email format. Please enter a valid email.");
      return;
    }

    if (!role) {
      alert("Please select a role for the user.");
      return;
    }

    const userData = { name, email, role, isActive };

    try {
      if (editUser) {
        await axios.put(`http://localhost:5000/users/${editUser.id}`, userData);
        setUsers(
          users.map((user) =>
            user.id === editUser.id ? { ...user, ...userData } : user
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:5000/users",
          userData
        );
        setUsers([...users, response.data]);
      }
      setOpen(false);
      setEditUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddUser}
        style={{ marginBottom: "20px" }}
      >
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
              <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleEditUser(user)}
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
                  onClick={() => handleDeleteUser(user.id)}
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

      {/* Add/Edit User Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                color="primary"
              />
            }
            label={isActive ? "Active" : "Inactive"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersPage;
