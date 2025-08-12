from fastapi import FastAPI, UploadFile, File
import pandas as pd
import os 
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime


def normalize_date(date_str):
    try:
        return datetime.strptime(date_str.strip(), "%Y-%m-%d").date().isoformat()
    except:
        try:
            return datetime.strptime(date_str.strip(), "%d/%m/%Y").date().isoformat()
        except:
            return date_str.strip()

def normalize_time(time_str):
    try:
        return datetime.strptime(time_str.strip(), "%H:%M").time().strftime("%H:%M")
    except:
        try:
            return datetime.strptime(time_str.strip(), "%I:%M %p").time().strftime("%H:%M")
        except:
            return time_str.strip()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Only allow your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/timesheets")
async def upload_timesheet(file: UploadFile = File(...)):
    # Read the uploaded file's contents into a DataFrame
    df = pd.read_csv(file.file)
    # Overwrite (or create) sample_timesheet.csv on disk
    df.to_csv("sample_timesheet.csv", index=False)
    return {"status": "ok"}


import json

@app.get("/calendar/events")
def get_calendar_events(date: str = None):
    with open("calendar_mock.json") as f:
        events = json.load(f)
    if date:
        events = [e for e in events if e["date"] == date]
    return events
@app.get("/")
def root():
    return {"message": "Welcome to TimeGuard API. Use /calendar/events or /timesheets endpoints."}

@app.get("/reports")
def generate_report():
    # Load timesheet CSV
    timesheet_df = pd.read_csv("sample_timesheet.csv")
    timesheet_df["date"] = timesheet_df["date"].apply(normalize_date)
    timesheet_df["start"] = timesheet_df["start"].apply(normalize_time)
    timesheet_df["end"] = timesheet_df["end"].apply(normalize_time)
    timesheet = timesheet_df.to_dict(orient="records")

    # Load calendar JSON
    with open("calendar_mock.json") as f:
        calendar = json.load(f)

    for c in calendar:
        c["date"] = normalize_date(c["date"])
        c["start"] = normalize_time(c["start"])
        c["end"] = normalize_time(c["end"])
        
    # Missing Entries → In calendar but not in timesheet
    missing_entries = [
        c for c in calendar
        if not any(
            (c["date"] == t["date"] and c["start"] == t["start"] and c["end"] == t["end"])
            for t in timesheet
        )
    ]

    # Extra Entries → In timesheet but not in calendar
    extra_entries = [
        t for t in timesheet
        if not any(
            (t["date"] == c["date"] and t["start"] == c["start"] and t["end"] == c["end"])
            for c in calendar
        )
    ]

    return {
        "missingEntries": missing_entries,
        "extraEntries": extra_entries
    }
