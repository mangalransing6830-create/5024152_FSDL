import React, { useState } from "react";

function Attendance() {
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);

  const pageBackground = {
  backgroundImage: "url('https://www.anushtech.com/public/images/banner/1723120687_aab13c6a76f3187b123a.jpeg')",
  backgroundColor: "#e3f2fd",
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundRepeat: "repeat"
};

const card = {
  width: "400px",
  padding: "50px",
  borderRadius: "12px",
  boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
  textAlign: "center",
  fontFamily: "Arial",
  backgroundColor: "rgba(255,255,255,0.6)",
  backdropFilter: "blur(6px)"
};
  
  const presentBtn = {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 18px",
    margin: "10px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer"
  };

  const absentBtn = {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "10px 18px",
    margin: "10px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer"
  };

  const resetBtn = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 18px",
    marginTop: "15px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer"
  };

  return (
    <div style={pageBackground}>
      <div style={card}>
        <h2>Attendance Counter</h2>

        <p>Present: {present}</p>
        <button style={presentBtn} onClick={() => setPresent(present + 1)}>
          Mark Present
        </button>

        <p>Absent: {absent}</p>
        <button style={absentBtn} onClick={() => setAbsent(absent + 1)}>
          Mark Absent
        </button>

        <p style={{fontWeight:"bold"}}>
          Total: {present + absent}
        </p>

        <button
          style={resetBtn}
          onClick={() => {
            setPresent(0);
            setAbsent(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Attendance;