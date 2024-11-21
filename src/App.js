import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import { AppBar, Toolbar, Button, Container } from "@mui/material";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/roles">
            Roles
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px" }}>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
