# RBAC Blog Application

## Project Overview

The RBAC Blog Application is a full-stack web application demonstrating Role-Based Access Control principles in a practical context. It provides different permissions and user experiences based on user roles (admin vs. regular user), with secure authentication and authorization mechanisms.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Application Architecture](#application-architecture)
- [API Documentation](#api-documentation)
- [Security Implementation](#security-implementation)
- [Usage Guide](#usage-guide)
- [Admin Account Creation](#admin-account-creation)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)

## Features

### Authentication & Authorization
- Secure user registration with password hashing
- JWT-based authentication system
- Role-based permissions (admin vs. regular user)
- Protected routes at both frontend and backend

### User Management
- User registration with validation
- Secure login with JWT tokens
- User role management
- Profile viewing capabilities

### Blog Management
- Public blog viewing for all users
- Create, edit, and delete blog posts (admin only)
- Responsive post display with author information
- Chronological post ordering

### Admin Dashboard
- Admin-only access to dashboard
- Post management interface
- Post creation interface with form validation
- Post editing with pre-populated fields

### UI/UX
- Responsive design for all screen sizes
- Clean, modern interface using Tailwind CSS
- Interactive elements with visual feedback
- Clear navigation and user flow
- Role-appropriate UI elements

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (JSON Web Tokens)** - For secure authentication
- **bcrypt** - Password hashing library
- **cors** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

### Frontend
- **React** - Frontend JavaScript library
- **Vite** - Build tool and development server
- **React Router** - For client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Toast notifications
- **Context API** - For state management

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- npm
- MongoDB (local installation or MongoDB Atlas account)
- Git


## Installation & Setup

### Clone the Repository

```bash

git clone https://github.com/yourusername/rbac-blog-app.git
cd rbac-blog-app

```

## Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file inside the backend directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rbac_blog
JWT_SECRET=jwt-secret-key
```

4. Start the backend server:

- For Development mode (with auto-restart):

```bash
npm run dev
```

- OR for Production mode:

```bash
npm start
```

The backend server will run on: [http://localhost:5000](http://localhost:5000)

---

## Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

The frontend development server will run on: [http://localhost:5173](http://localhost:5173)

---

## Application Architecture

### System Architecture

The application follows a standard **client-server** architecture:

```
┌─────────────┐     HTTP/HTTPS      ┌─────────────┐      ┌─────────────┐
│   React     │ <---------------->  │  Express.js │ <---> │   MongoDB   │
│  Frontend   │      Requests       │   Backend   │      │  Database   │
└─────────────┘                     └─────────────┘      └─────────────┘
```

---

## Frontend Architecture

```
├── public/                # Static files
├── src/
│   ├── components/        # Reusable components
│   │   ├── auth/          # Authentication-related components
│   │   ├── layout/        # Layout components (Navbar, Footer)
│   │   └── ...
│   ├── context/           # Context API providers
│   │   └── AuthContext.jsx # Authentication state management
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin-only pages
│   │   └── ...
│   ├── utils/             # Utility functions
│   │   └── api.js         # API request functions
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Entry point
└── index.html             # HTML template
```

---

## Backend Architecture

```
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── auth_controllers.js
│   │   └── post_controllers.js
│   ├── middlewares/       # Custom middleware
│   │   ├── auth_middleware.js
│   │   └── error_handler.js
│   ├── models/            # Database models
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/            # API routes
│   │   ├── auth_routes.js
│   │   └── post_routes.js
│   ├── utils/             # Utility functions
│   │   └── token.js
│   └── app.js             # Express application setup
└── server.js              # Server entry point
```

---

## 🚀 Data Flow

### 🔐 Authentication Flow
- 📝 User submits credentials via frontend form.
- 📡 Frontend sends request to `/api/auth/login` or `/api/auth/register`.
- 🛡️ Backend validates the request and responds with a JWT token.
- 💾 Frontend stores the token in `localStorage`.
- 🧠 `AuthContext` manages user authentication state across the application.

### 🛡️ Protected Routes Flow
- 🚪 User attempts to access a protected route.
- 🔍 React Router checks if the user is authenticated.
- ✅ If authenticated with the appropriate role, the route is rendered.
- ❌ If not, the user is redirected to the login or home page.

### 📝 Blog Post Flow
- 📚 Posts are fetched from the backend and displayed to all users.
- 🛠️ Admin users see additional controls (Create, Edit, Delete).
- 🔐 Admin actions trigger authenticated API requests.
- 🔎 Backend middleware validates admin privileges before processing.

---

## ✨ Features
- 📝 User Registration & Login
- 🛡️ Role-based Access (Admin/User)
- 🔒 Protected Routes
- ✍️ Admin CRUD Operations on Blog Posts
- 🛡️ JWT Authentication



# 📚 RBAC API Documentation

This API allows users to **register**, **login**, and **perform CRUD operations on blog posts** based on their **roles** (`user` or `admin`).

## 🛠 Base URL
```
http://localhost:5000/api
```

---

## 🔑 Authentication
- Authentication is handled via **Bearer Tokens**.
- Some routes require users to be **logged in** and have **admin role**.

---

# 📄 API Endpoints

## ✨ Auth Routes

### ➡️ Register (User)
- **URL:** `POST /auth/register`
- **Request Body:**
```json
{
  "name": "Regular User",
  "email": "user@example.com",
  "password": "password123"
}
```

---

### ➡️ Login (User)
- **URL:** `POST /auth/login`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

### ➡️ Register (Admin)
- **URL:** `POST /auth/register`
- **Request Body:**
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "adminpass123",
  "role": "admin"
}
```

---

### ➡️ Login (Admin)
- **URL:** `POST /auth/login`
- **Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "adminpass123"
}
```

---

### ➡️ Get Current User Details
- **URL:** `GET /auth/me`
- **Headers:**
  - `Authorization: Bearer <token>`

---

## 📝 Post Routes

### ➡️ Get All Posts
- **URL:** `GET /posts`
- **Description:** Fetches all blog posts (publicly accessible).

---

### ➡️ Get Single Post by ID
- **URL:** `GET /posts/:id`
- **Description:** Fetches a single blog post by its ID.

---

### ➡️ Create New Post (Admin Only)
- **URL:** `POST /posts`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "title": "First Blog Post",
  "content": "This is the content of our first blog post. It's created by an admin user."
}
```

---

### ➡️ Update Post by ID (Admin Only)
- **URL:** `PATCH /posts/:id`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "title": "Updated Blog Post",
  "content": "This content has been updated by an admin user."
}
```

---

### ➡️ Delete Post by ID (Admin Only)
- **URL:** `DELETE /posts/:id`
- **Headers:**
  - `Authorization: Bearer <token>`

---

# 🧠 Important Notes
- ✅ **Provide a valid Bearer Token** for protected routes.
- 👑 Only **Admins** are allowed to **Create**, **Update**, and **Delete** posts.
- 👤 **Users** can only **read** blog posts.

---

# 📬 Postman Collection Link
[🔗 Open Postman Collection](https://www.postman.com/b-engage-core/liaplus-rbac-blog-app/collection/fe6u2x9/rbac?action=share&creator=33826607)


# 🛡 Security Implementation

The application incorporates several security measures to ensure data integrity and protect users:

## Authentication Security
- **Password Hashing:** User passwords are hashed securely using bcrypt before storage.
- **JWT Authentication:** Stateless authentication is implemented with JSON Web Tokens (JWT).
- **Token Expiration:** JWTs are configured to expire after a set period, enhancing session security.
- **Protected Routes:** Only authenticated users can access protected frontend and backend routes.

## Authorization Security
- **Role-Based Access Control (RBAC):** Different permissions for `user` and `admin` roles.
- **Route Guards:** The frontend restricts navigation based on the user's role.
- **API Middleware:** Backend endpoints verify user roles and permissions before granting access.
- **Data Access Control:** Users can only perform actions they are authorized for.

## Data Security
- **Input Validation:** All incoming user data is validated before processing.
- **MongoDB Injection Prevention:** Using Mongoose with parameterized queries to prevent injection attacks.
- **Cross-Site Scripting (XSS) Protection:** React provides inherent XSS protection; additional input sanitization is used.
- **Data Exposure Prevention:** Sensitive data (e.g., passwords) is never exposed in API responses.

## Code Security Best Practices
- **Environment Variables:** All sensitive configuration is stored securely in `.env` files.
- **Error Handling:** Robust error handling without leaking sensitive information.
- **Dependency Management:** Only trusted, updated dependencies are used.
- **CORS Configuration:** Cross-origin requests are restricted for better security.

---

# 📖 Usage Guide

## User Registration and Login
1. Navigate to the **Register** page.
2. Fill out the registration form with your name, email, and password.
3. Submit the form to create a new user account.
4. After registration, you are automatically logged in and redirected to the homepage.
5. To log out, click your name in the navbar and select **Logout**.
6. To log back in, click **Login** and enter your credentials.

## Viewing Blog Posts
1. The homepage displays a list of all available blog posts.
2. Click a post title or the **Read More** button to view the full content.
3. Use the **Back to all posts** link to return to the main blog list.

## Admin Features (Admin Users Only)
1. Log in using an admin account.
2. Access the **Dashboard** from the navbar.
3. Create new posts using the **Create New Post** option.
4. Edit existing posts by clicking **Edit** next to any post.
5. Delete posts by clicking **Delete** (with confirmation required).
6. View full post details by clicking **View**.

---

# 👑 Admin Account Creation

By default, all registered users are assigned the `user` role.  
To create an admin user:

1. Register a new user account through the application.
2. Connect to your MongoDB database using **MongoDB Compass** or the **mongo shell**.
3. Update the user's role to `admin` by executing the following command:

```javascript
db.users.updateOne(
  { email: "admin@example.com" }, // Replace with your user's email
  { $set: { role: "admin" } }
)
```

> **Note:**  
> Assigning admin roles manually via the database ensures higher security, preventing unauthorized access.

---

# 🧪 Testing

## Testing with Postman
A complete Postman collection is available for easy testing of all API endpoints.

- **Collection Link:** [LiaPlus RBAC Blog App Postman Collection](https://www.postman.com/b-engage-core/liaplus-rbac-blog-app/collection/fe6u2x9/rbac?action=share&source=collection_link&creator=33826607)

### How to Use:
1. Click the collection link above.
2. Import it into your Postman workspace.
3. Test all available endpoints with pre-configured examples.

---

# 🧠 Notes
- Always include a **valid Bearer token** in the Authorization header for protected routes:
  ```
  Authorization: Bearer <your-token>
  ```
- Only **admin users** are allowed to **create**, **update**, and **delete** blog posts.
- Regular users can **view** blog posts but cannot modify them.

---

# 📬 Postman Collection Link
[Open Postman Collection](https://www.postman.com/b-engage-core/liaplus-rbac-blog-app/collection/fe6u2x9/rbac?action=share&source=collection_link&creator=33826607)

---

# 👥 Contributors
- **Rishab Jha** – Developer

---

# 📖 About the Project
This project was developed as an assignment for **LiaPlusAI**, demonstrating a complete implementation of **Role-Based Access Control (RBAC)** in a full-stack web application.

---

# 📞 Contact
For support, feedback, or inquiries, please contact [rishabjha134@gmail.com](mailto:rishabjha134@gmail.com).

---
