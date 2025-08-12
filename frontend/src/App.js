import React, { useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // State to store the selected file from input
  const [file, setFile] = useState(null);

  // State to store the response data from backend (missing/extra rows)
  const [report, setReport] = useState(null);

  // Function to handle when user selects a file
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Save first selected file
  };

  // Function to upload the selected file to backend
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    // Create a FormData object to send file in POST request
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Call your backend API to upload timesheet
      const response = await fetch("http://127.0.0.1:8000/timesheets", {
        method: "POST",
        body: formData,
      });

      // Get response JSON which should contain validation report id
      const data = await response.json();

      // Now fetch the report using the report id (example URL)
      // Assuming your backend has /reports/{id} endpoint
      const reportResponse = await fetch(`http://127.0.0.1:8000/reports`);
      const reportData = await reportResponse.json();

      // Save the report data to state to display
      setReport(reportData);
      console.log("Report data from backend:", reportData);

    } catch (error) {
      console.error("Error uploading file or fetching report:", error);
    }
  };

  return (
    <div className="container">
      <h1>TimeGuard</h1>

      {/* File input for user to select timesheet CSV */}
      <input type="file" accept=".csv" onChange={handleFileChange} />

      {/* Upload button to send file */}
      <button onClick={handleUpload}>Upload Timesheet</button>

      {/* Display report results if available */}
      {report && (
        <div>
          <h2>Missing Entries</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>Project/Title</th>
              </tr>
            </thead>
            <tbody>
              {report?.missingEntries?.length > 0 ? (
                report.missingEntries.map((entry, index) => (
                  <tr key={`missing-${index}`} style={{ backgroundColor: "red" }}>
                    <td>{entry.date || entry.Date}</td>
                    <td>{entry.start || entry.Start}</td>
                    <td>{entry.end || entry.End}</td>
                    <td>{entry.project || entry.Project || entry.title || entry.Title}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4">No missing entries found</td></tr>
              )}
            </tbody>
          </table>

          <h2>Extra Entries</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>Project/Title</th>
              </tr>
            </thead>
            <tbody>
              {report?.extraEntries?.length > 0 ? (
                report.extraEntries.map((entry, index) => (
                  <tr key={`extra-${index}`} style={{ backgroundColor: "yellow" }}>
                    <td>{entry.date || entry.Date}</td>
                    <td>{entry.start || entry.Start}</td>
                    <td>{entry.end || entry.End}</td>
                    <td>{entry.project || entry.Project || entry.title || entry.Title}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4">No extra entries found</td></tr>
              )}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default App;
