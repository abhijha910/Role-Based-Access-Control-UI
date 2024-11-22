# **Role-Based Access Control (RBAC) UI**

This project is a **Role-Based Access Control (RBAC)** User Interface designed to manage users, roles, and permissions efficiently. The admin dashboard allows administrators to assign roles, define permissions, and manage user statuses in a secure and intuitive manner.

---

## **Features**

### **1. User Management**
- View, add, edit, and delete users.
- Assign roles to users and manage their status (e.g., Active/Inactive).
- Search and filter users for efficient management.

### **2. Role Management**
- Define, edit, and delete roles.
- Assign permissions to roles (e.g., Read, Write, Delete).
- Custom attributes for roles based on organizational needs.

### **3. Dynamic Permissions**
- Easily assign or modify permissions for roles.
- Display permissions in a clear and user-friendly manner.
- Ensure dynamic updates to permission changes across users.

### **4. Mock API Simulation**
- CRUD operations simulated using `json-server`.
- Mock responses to validate the functionality and user flows.

---

## **Technologies Used**

- **Frontend**: React.js, Material-UI, Axios  
- **Backend**: json-server (Mock API)

---

## **Setup Instructions**

### **1. Clone the Repository**
Clone the repository to your local machine:

```bash
git clone https://github.com/abhijha910/Role-Based-Access-Control-UI.git
```

### 2. Install Frontend Dependencies

Navigate to the `rbac_dashboard/rbac_ui` directory:

```bash
cd Role-Based-Access-Control-UI
npm install
```

### 3. Set up the Mock API

Install `json-server` globally:

```bash
npm install -g json-server
```

Start the mock API server:

```bash
json-server --watch db.json --port 5000
```

### 4. Start the Frontend

```bash
npm start
```

Your app will be running at `http://localhost:3000` and the mock API at `http://localhost:5000`.

## API Endpoints

### Users

- **GET /users**: Fetch all users.
- **POST /users**: Create a new user.
- **PUT /users/:id**: Update a user.
- **DELETE /users/:id**: Delete a user.

### Roles

- **GET /roles**: Fetch all roles.
- **POST /roles**: Create a new role.
- **PUT /roles/:id**: Update a role.
- **DELETE /roles/:id**: Delete a role.
