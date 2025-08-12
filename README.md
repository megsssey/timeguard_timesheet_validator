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

## 📸 Video

### UI – Validation Report
![Validation Report]("C:\Users\MY PC\OneDrive\Desktop\validation report video.mp4")


