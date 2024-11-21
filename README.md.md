# User and Role Management System

This project is a **Role-Based Access Control (RBAC)** management system using **React.js** for the frontend and **json-server** for the mock backend.

## Technologies Used
- **Frontend**: React.js, Material-UI, Axios
- **Backend**: json-server (Mock API)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/your-repository-name.git
```

### 2. Install Frontend Dependencies
Navigate to the `rbac_dashboard/rbac_ui` directory:
```bash
cd rbac_dashboard/rbac_ui
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
cd rbac_dashboard/rbac_ui
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

## Deployment

- Deploy the frontend on Vercel or Netlify.
- Deploy the backend (json-server) on platforms like Heroku.

## License
MIT License.
