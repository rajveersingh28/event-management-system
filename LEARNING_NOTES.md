# 📘 EventHub - Learning Notes

## 📌 Project Information

**Project Name:** EventHub - Event Management System

**Purpose:** Internship Project for 3 Skill India (Web Development Domain)

---

## 💻 Tech Stack

### Frontend

* React.js
* Vite
* HTML5
* CSS3
* JavaScript (ES6+)
* React Router DOM
* Axios
* React Toastify
* React Icons

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs
* cookie-parser

### Other Technologies

* Razorpay (Test Mode)
* QR Code Generator
* Multer
* CORS
* Dotenv

### Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

# ✅ Module 1 - Backend Configuration

## 🎯 Objective

Set up the backend foundation using Express.js and prepare the project for future modules.

---

## 📁 Folder Structure

```text
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
├── app.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

---

## 📄 Files Created

* app.js
* server.js
* .env
* .gitignore

---

## 📦 Packages Used

### Express

Used to build REST APIs.

### dotenv

Loads environment variables from the `.env` file.

### cors

Allows communication between the React frontend and Express backend.

### cookie-parser

Parses cookies from incoming requests.

---

## 🌐 Request Flow

```text
Client Request
      │
      ▼
server.js
      │
      ▼
app.js
      │
      ▼
Middleware
      │
      ▼
Routes
      │
      ▼
Controller (Later)
      │
      ▼
Database (Later)
      │
      ▼
Response
```

---

## 🔗 Routes Created

### GET /

Returns

```json
{
  "success": true,
  "message": "Welcome to EventHub API Gateway!"
}
```

---

### GET /api/health

Returns

```json
{
  "success": true,
  "status": "UP",
  "timestamp": "...",
  "environment": "development"
}
```

---

## 📚 What I Learned

* Express project structure
* Difference between app.js and server.js
* How middleware works
* What CORS does
* Why dotenv is used
* Health check endpoint
* Request-response lifecycle
* Git initialization
* Connecting local repository with GitHub

---

## 🛠 Commands Used

### Backend Setup

```bash
npm init -y

npm install express mongoose dotenv cors bcryptjs jsonwebtoken qrcode razorpay multer cookie-parser

npm install --save-dev nodemon

npm run dev
```

### Frontend Setup

```bash
npm create vite@latest .

npm install

npm install react-router-dom axios react-icons react-toastify

npm run dev
```

### Git Commands

```bash
git init

git add .

git commit -m "Initialize MERN project structure"

git branch -M main

git remote add origin https://github.com/rajveersingh28/event-management-system.git

git push -u origin main
```

---

## 🐞 Problems Faced

### Problem 1

```
fatal: not a git repository
```

### Solution

Initialized Git using

```bash
git init
```

---

### Problem 2

Created `LEARNING_NOTES.md` and `ROADMAP.md` as folders instead of files.

### Solution

Deleted the folders and recreated them as Markdown (.md) files.

---

### Problem 3

Git line-ending warnings:

```
LF will be replaced by CRLF
```

### Solution

No action required. These warnings are normal on Windows and do not affect the project.

---

## 🎤 Viva Questions

### 1. What is Express.js?

Express.js is a lightweight web framework for Node.js used to build REST APIs and web applications.

---

### 2. Why do we use Express?

It simplifies routing, middleware management, and API development.

---

### 3. Difference between server.js and app.js?

**server.js**

* Starts the server.
* Reads environment variables.
* Listens on a port.

**app.js**

* Configures Express.
* Registers middleware.
* Defines routes.
* Handles errors.

---

### 4. What is middleware?

Middleware is a function that executes between the incoming request and the final response. It can modify the request, response, or perform tasks such as authentication and logging.

---

### 5. What is CORS?

CORS (Cross-Origin Resource Sharing) allows the frontend and backend running on different origins (such as different ports) to communicate securely.

---

### 6. Why do we use dotenv?

To store sensitive configuration values such as API keys, database URLs, and secrets outside the source code.

---

### 7. Why do we create a health route?

A health route allows developers and cloud providers (Render, AWS, etc.) to verify that the server is running correctly.

---

## ⭐ Best Practices Learned

* Keep `server.js` and `app.js` separate.
* Never upload `.env` to GitHub.
* Use meaningful Git commit messages.
* Build the project module by module.
* Test every module before moving to the next one.

---

## ⏱ Time Taken

Approximately 3–4 hours

---

## ⭐ Difficulty

⭐⭐☆☆☆ (2/5)

---

## 💪 Confidence Level

8/10

---

## 📅 Date Completed

28 June 2026

---

## ✅ Module Status

Completed Successfully

---

# 🚀 Upcoming Modules

* [x] Module 1 - Backend Configuration
* [ ] Module 2 - MongoDB Atlas Integration
* [ ] Module 3 - Authentication (JWT)
* [ ] Module 4 - Event CRUD
* [ ] Module 5 - Ticket Booking
* [ ] Module 6 - Razorpay Payment Integration
* [ ] Module 7 - QR Code Generation
* [ ] Module 8 - QR Check-in
* [ ] Module 9 - Analytics Dashboard
* [ ] Module 10 - React Frontend Integration
* [ ] Module 11 - Deployment
* [ ] Module 12 - Final Documentation
* [ ] Module 13 - Viva Preparation
