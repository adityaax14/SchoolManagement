# School Management API

A robust RESTful API built with **Node.js, Express, and MySQL** for managing school geographic data. This system allows users to securely add new schools and retrieve a list of schools dynamically sorted by their proximity to a specified location.

## 🚀 Live Links
- **Live API Endpoint:** [https://schoolmanagement-qznx.onrender.com](https://schoolmanagement-qznx.onrender.com)
- **Postman Documentation:** [View & Test Postman Collection](https://adi9771425633-821668.postman.co/workspace/Aditya-xD's-Workspace~3fc63dd4-25c5-44c8-80a7-0d3a7fc3c91c/collection/50801983-a4f06e5c-455b-4518-8871-bd8a9329547c?action=share&creator=50801983)

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL (Hosted on Clever Cloud)
- **Hosting:** Render

## ✨ Features & Architecture
- **MVC Architecture:** Clean separation of concerns with dedicated folders for routes, controllers, and database configuration.
- **Geospatial Sorting:** Implements the **Haversine Formula** to accurately calculate the geographic distance between coordinates on a sphere and sort responses by precise proximity.
- **Strict Validation:** Ensures all incoming payload data is strongly typed, sanitized, and present before interacting with the database.
- **Prepared Statements:** Prevents SQL injection attacks by utilizing `mysql2/promise` parameterized queries.

---

## 📖 API Documentation

### 1. Add School
Adds a new school to the database.

- **Endpoint:** `/api/addSchool`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Payload:**
  ```json
  {
      "name": "Greenwood High",
      "address": "123 Education Lane, Cityville",
      "latitude": 34.052235,
      "longitude": -118.243683
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
      "message": "School added successfully.",
      "schoolId": 1
  }
  ```

### 2. List Schools
Fetches all schools sorted by geographic proximity to the provided user coordinates.

- **Endpoint:** `/api/listSchools`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude` (float) - User's current latitude
  - `longitude` (float) - User's current longitude
- **Example Request:** `/api/listSchools?latitude=34.052235&longitude=-118.243683`
- **Success Response (200 OK):**
  ```json
  [
      {
          "id": 1,
          "name": "Greenwood High",
          "address": "123 Education Lane, Cityville",
          "latitude": 34.052235,
          "longitude": -118.243683,
          "distance": 0 
      }
  ]
  ```

---

## 💻 Local Setup Instructions

If you wish to run this API locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adityaax14/SchoolManagement.git
   cd SchoolManagement
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   Execute the `schema.sql` file in your local MySQL environment to create the `school_db` database and `schools` table.

4. **Environment Variables:**
   Create a `.env` file in the root directory and add your local MySQL credentials:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_db
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```
   *The server will run on `http://localhost:3000`.*
