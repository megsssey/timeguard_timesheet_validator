# TimeGuard – Timesheet Validator

**TimeGuard** is a web app that compares a CSV timesheet upload against a mock calendar export and highlights:

 -> **Missing Entries** → In calendar but not in timesheet  
 -> **Extra Entries** → In timesheet but not in calendar  

Built with **FastAPI** (backend) + **React** (frontend).  

##  Project Setup

### 1. Clone the Repository
git clone https://github.com/megsssey/timeguard_timesheet_validator.git
cd timeguard_timesheet_validator

### 2. Backend (FastAPI)
cd backend
pip install fastapi uvicorn pandas
uvicorn main:app --reload
Backend will start on [**http://127.0.0.1:8000**](http://127.0.0.1:8000).  
Swagger docs: [**http://127.0.0.1:8000/docs**](http://127.0.0.1:8000/docs)

### 3. Frontend (React)
cd frontend
npm install
npm start
Frontend will run on [**http://localhost:3000**](http://localhost:3000)
##  Tech Stack

- **Backend:** Python, FastAPI, Pandas
- **Frontend:** React
- **Data Format:** CSV + JSON

## 🛠 API Specification

This project exposes two main API endpoints via the FastAPI backend.

---

### **1. POST `/timesheets`**

Upload a timesheet CSV file for validation.

- **Method:** `POST`
- **URL:** `http://127.0.0.1:8000/timesheets`
- **Content-Type:** `multipart/form-data`
- **Form Field:** `file` (CSV file)

**Expected CSV Format:**
date,start,end,project
2025-08-12,13:00,14:00,Code Review
2025-08-12,15:00,16:00,Project Beta
**Example Response:**
{ "status": "ok" }

---

### **2. GET `/reports`**

Fetches the discrepancy report comparing the last uploaded timesheet against the mock calendar data.

- **Method:** `GET`
- **URL:** `http://127.0.0.1:8000/reports`

**Response Structure:**
{
"missingEntries": [
{
"date": "2025-08-12",
"start": "09:00",
"end": "11:00",
"title": "Project Alpha"
}
],
"extraEntries": [
{
"date": "2025-08-12",
"start": "15:00",
"end": "16:00",
"project": "Project Beta"
}
]
}
**Field meanings:**
- `missingEntries` → Present in calendar but **not** in timesheet.
- `extraEntries` → Present in timesheet but **not** in calendar.

---

##  Video

### UI – Validation Report
https://drive.google.com/file/d/1lZRfO9c1K5bezs6sKU2Db5eV9t6xWNvV/view?usp=sharing


