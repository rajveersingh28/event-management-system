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


# Module 2 - MongoDB Atlas Integration

## Objective

Connect the Express.js backend to a cloud-hosted MongoDB Atlas database using Mongoose and establish a stable database connection before starting the server.

---

## Files Created / Modified

* config/db.js
* server.js
* .env

---

## Packages Used

### Mongoose

Mongoose is an ODM (Object Data Modeling) library that helps interact with MongoDB using JavaScript objects and schemas.

---

### dotenv

Used to load environment variables from the `.env` file into `process.env`.

---

## What I Built

* Connected the backend to MongoDB Atlas.
* Created a reusable database connection module (`config/db.js`).
* Modified `server.js` so the server starts **only after** the database connection is successful.
* Stored the database connection string securely inside `.env`.

---

## Request Flow

Client Request

↓

server.js

↓

connectDB()

↓

MongoDB Atlas

↓

Express Server Starts

↓

Routes

↓

Response

---

## Database Connection String

The connection string is stored securely inside `.env` and should **never** be pushed to GitHub.

Example:

```env
MONGODB_URI=mongodb://username:password@host/eventhub
```

---

## What I Learned

* What MongoDB Atlas is.
* Difference between MongoDB Atlas and a local MongoDB server.
* How Mongoose connects Node.js with MongoDB.
* Why environment variables are important.
* Why the server should start only after a successful database connection.

---

## Problems Faced

### Problem

The SRV connection string (`mongodb+srv://`) produced:

```
querySrv ECONNREFUSED
```

### Cause

A DNS/SRV lookup issue prevented the connection from being established.

### Solution

Used the standard `mongodb://` connection string with shard hostnames instead of the SRV connection string.

After updating the connection string, the backend connected successfully.

---

## Commands Used

```bash
npm run dev
```

```bash
git add .
git commit -m "Connect backend to MongoDB Atlas"
git push
```

---

## Successful Output

```
MongoDB Connected Successfully
EventHub Server running in development mode on port 5000
```

---

## Viva Questions

### What is MongoDB Atlas?

MongoDB Atlas is MongoDB's cloud-hosted database service that allows applications to store and manage data online without installing MongoDB locally.

---

### Why do we use Mongoose?

Mongoose provides an Object Data Modeling (ODM) layer for MongoDB. It helps define schemas, validate data, and simplifies database operations.

---

### Why is `.env` used?

The `.env` file stores sensitive information such as database URLs, API keys, and secret tokens separately from the source code to improve security.

---

### Why connect to the database before starting the server?

If the database is unavailable, the application cannot function correctly. Connecting first prevents the server from accepting requests that would fail due to missing database access.

---

## Module Status

✅ Completed

# Module 3 - Authentication

## What I Built
Implemented user registration, login, JWT token generation, and protected profile route.

## APIs Created
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile

## Problem Faced
Mongoose 9 async pre-save hook gave:
next is not a function

## Solution
Removed next() from async pre-save hook.

## Files Created / Modified

- models/User.js
- controllers/authController.js
- middleware/authMiddleware.js
- routes/authRoutes.js
- utils/generateToken.js
- app.js

## Status
✅ Completed

## 📅 Date Completed

29 June 2026


# Module 4 - Event CRUD

## APIs Created
- POST /api/events
- GET /api/events
- GET /api/events/:id
- PUT /api/events/:id
- DELETE /api/events/:id

## Features
- Create event
- View all events
- View single event
- Update event
- Delete event
- Organizer ownership check
- JWT protected create/update/delete

## Problem Faced
Mongoose 9 pre-save hook gave:
next is not a function

## Solution
Removed next() from Event model pre-save hook.

## Files Created / Modified

- models/Event.js
- controllers/eventController.js
- routes/eventRoutes.js
- middleware/adminMiddleware.js
- app.js

## Status
✅ Completed

## 📅 Date Completed
29 June 2026

# Module 5 - Ticket Booking

## APIs Created
- POST /api/bookings
- GET /api/bookings/my-bookings
- GET /api/bookings/:id
- PUT /api/bookings/:id/cancel

## Features
- Book tickets for an event
- View my bookings
- Reduce available tickets after booking
- Restore tickets on cancellation
- Booking linked with user and event

## Files Created / Modified

- models/Booking.js
- controllers/bookingController.js
- routes/bookingRoutes.js
- app.js

## Status
✅ Completed

## 📅 Date Completed
29 June 2026

# Module 6 - QR Code Generation

## APIs Updated

- POST /api/bookings

## Features

- Generates a QR Code automatically after every successful booking.
- Stores the QR Code as a Base64 Data URL in MongoDB.
- QR contains:
  - bookingId
  - userId
  - eventId
- QR can be opened directly in a browser or rendered in the frontend.

## Files Created

- utils/generateQRCode.js

## Files Modified

- controllers/bookingController.js

## Packages Used

- qrcode

## What I Learned

- How QR codes are generated in Node.js.
- Difference between image files and Base64 Data URLs.
- How to create reusable utility functions.
- How to update a MongoDB document after creation.

## Status
✅ Completed

## 📅 Date Completed
29 June 2026

# Module 7 - QR Check-in

## APIs Created
- PUT /api/bookings/checkin/:id

## Features
- Validates booking by ID
- Prevents check-in for cancelled bookings
- Marks ticket as Checked In
- Prevents duplicate check-ins

## Status
✅ Completed

## 📅 Date Completed
30 June 2026

# Module 8 - Razorpay Payment Integration

## APIs Created
- POST /api/payments/create-order
- POST /api/payments/verify

## Features
- Created Razorpay test order
- Used Razorpay API keys from .env
- Amount converted into paise
- Payment verification logic added using crypto
- Booking paymentStatus updates to Paid after successful verification

## Status
✅ Partially Completed


# 🚀 Upcoming Modules

* [x] Module 1 - Backend Configuration
* [x] Module 2 - MongoDB Atlas Integration
* [x] Module 3 - Authentication (JWT)
* [x] Module 4 - Event CRUD
* [x] Module 5 - Ticket Booking
* [x] Module 6 - QR Code Generation
* [X] Module 7 - QR Check-in
* [ ] Module 8 - Razorpay Payment Integration
* [ ] Module 9 - Analytics Dashboard
* [ ] Module 10 - React Frontend Integration
* [ ] Module 11 - Deployment
* [ ] Module 12 - Final Documentation
* [ ] Module 13 - Viva Preparation

---

# 📊 Project Progress

## Backend

- Authentication ✅
- Event Management ✅
- Ticket Booking ✅
- QR Code Generation ✅
- QR Check-in ⏳
- Razorpay Payment ⏳

## Database Collections

- Users
- Events
- Bookings

## APIs Built So Far

### Authentication

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

### Events

- POST /api/events
- GET /api/events
- GET /api/events/:id
- PUT /api/events/:id
- DELETE /api/events/:id

### Bookings

- POST /api/bookings
- GET /api/bookings/my-bookings
- GET /api/bookings/:id
- PUT /api/bookings/:id/cancel

## Total APIs Created

12 REST APIs

## Current Completion

Backend: 80%

Frontend: 0%

Overall Project: ~65%


# 📝 Git Commit History

- Initialize MERN project structure
- Connect backend to MongoDB Atlas
- Implement user authentication with JWT
- Implement Event CRUD
- Implement ticket booking module
- Add QR code generation for bookings
---