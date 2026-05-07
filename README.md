# School Management API

This is a set of Node.js APIs built with Express.js and MySQL to manage school data. 

## Features
- **Add School API:** Add new schools with details like name, address, latitude, and longitude.
- **List Schools API:** Fetch all schools sorted by their geographical proximity to a specified user location.

## Technologies Used
- Node.js
- Express.js
- MySQL
- Postman (for API testing)

---

## 🚀 Setup Instructions (Local)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MySQL Server](https://dev.mysql.com/downloads/) installed and running

### 2. Database Setup
1. Open your MySQL client (like MySQL Workbench or CLI).
2. Execute the commands provided in `schema.sql` to create the database and table:
   ```sql
   CREATE DATABASE IF NOT EXISTS school_db;
   USE school_db;
   CREATE TABLE IF NOT EXISTS schools (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       address VARCHAR(255) NOT NULL,
       latitude FLOAT NOT NULL,
       longitude FLOAT NOT NULL
   );
   ```

### 3. Environment Variables
1. Ensure `.env` is in the root directory.
2. Update `.env` with your local MySQL database credentials:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_db
   ```

### 4. Install Dependencies
Run the following command in the project directory:
```bash
npm install
```

### 5. Start the Server
Start the development server:
```bash
npm run dev
```
*(Server will start on `http://localhost:3000`)*

---

## 🌐 Hosting and Testing (Deliverables 2 & 3)

### How to Deploy (Live API Endpoint)
Since this assignment requires a **Live API endpoint**, you can easily deploy this using a free service like **Render** or **Vercel**, and a free MySQL database on **Aiven**, **TiDB**, or **PlanetScale**.
1. Push this repository to GitHub.
2. Create a free MySQL database on [Aiven](https://aiven.io/) or [Clever Cloud](https://www.clever-cloud.com/). Copy your new DB credentials.
3. Sign up on [Render.com](https://render.com/), create a new "Web Service", and link your GitHub repo.
4. Add the Environment Variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) in Render's dashboard.
5. Set Start Command to `npm start`.
6. Once deployed, Render will give you a live URL (e.g., `https://your-api.onrender.com`).

### Postman Collection
A complete Postman collection is already generated in this repository:
👉 `postman_collection.json`

**How to share it:**
1. Open Postman.
2. Click **Import** > Select the `postman_collection.json` file from this folder.
3. You can either export the imported collection or right-click the collection in Postman and select **"Share"** to get a public link to submit in your form!

---

## API Endpoints Documentation

### 1. Add School
- **URL:** `/api/addSchool`
- **Method:** `POST`
- **Body payload (JSON):**
  ```json
  {
      "name": "Greenwood High",
      "address": "123 Education Lane, Cityville",
      "latitude": 34.052235,
      "longitude": -118.243683
  }
  ```

### 2. List Schools
- **URL:** `/api/listSchools?latitude=34.052235&longitude=-118.243683`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude`: User's latitude
  - `longitude`: User's longitude
