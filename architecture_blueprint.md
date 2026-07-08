# 🏗️ Backend Boilerplate Architecture Blueprint

This document outlines the architecture for our production-ready Express & MongoDB Node.js backend. We are using the **MVC (Model-View-Controller)** pattern, which separates concerns and keeps our codebase scalable and maintainable.

## 📂 Folder Structure

```text
node-backend-boilerplate-main/
│
├── .env                  # Environment variables (secrets, DB URI, ports)
├── index.js              # Server entry point (starts the HTTP server)
├── package.json          # Dependencies and scripts
│
└── src/                  # All application source code lives here
    │
    ├── app.js            # Express application configuration (middleware, routes)
    │
    ├── config/           # Database connections and configuration files
    │   └── db.js         # MongoDB connection logic
    │
    ├── controllers/      # Business logic and request handling (The "Brain")
    │   └── authController.js 
    │
    ├── model/            # Mongoose schemas and database models (The "Data")
    │   └── User.js       
    │
    ├── routes/           # Express routers mapping URLs to Controllers (The "Traffic Cop")
    │   └── authRoutes.js 
    │
    ├── middleware/       # Custom functions that intercept requests
    │   ├── logger.js     # Logs incoming requests
    │   ├── auth.js       # (UPCOMING) Verifies JWT tokens to protect routes
    │   └── error.js      # (UPCOMING) Global error handler to catch crashes safely
    │
    └── utils/            # (UPCOMING) Helper functions
        └── generateToken.js # Generates JWTs for user sessions
```

## 🚀 The Request Lifecycle
When a frontend application makes a request to our API, here is the exact path it takes:

1. **Client** sends an HTTP request (e.g., `POST /api/auth/register`).
2. **`index.js`** receives the request and passes it to `src/app.js`.
3. **Middleware** in `app.js` runs (like our `logger` and `express.json()`).
4. **Router** (`authRoutes.js`) matches `/register` and routes traffic to the specific controller function.
5. **Controller** (`authController.js`) handles the logic, pulling data from `req.body`.
6. **Model** (`User.js`) is used by the controller to talk to the MongoDB Database.
7. **Controller** sends a JSON response back through the Express chain to the **Client**.

## 🎯 Our Progress Roadmap
- [x] Project Initialization & Dependencies
- [x] Server Setup (`index.js` & `app.js`)
- [x] Database Connection (`config/db.js`)
- [x] Basic Middleware (`logger.js`)
- [x] User Model with Password Hashing
- [x] User Registration (`authController.register` & `/api/auth/register`)
- [ ] **User Login & JWT Generation** *(<- We are here!)*
- [ ] Protecting Routes with Auth Middleware
- [ ] Global Error Handling
- [ ] Rate Limiting & Security Headers
