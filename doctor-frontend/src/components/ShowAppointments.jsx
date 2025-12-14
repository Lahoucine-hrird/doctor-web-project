import { useState, useEffect } from "react";
import { getDoctors, getDoctorAvailability } from "../api";

const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  const formattedDate = date.toISOString().split("T")[0]; 
  const formattedTime = date.toTimeString().slice(0, 5);  

  return {
    date: formattedDate,
    time: formattedTime
  };
};

/* ---------- Helper to get today date (disable past) ---------- */
const today = new Date().toISOString().split("T")[0];

export default function ShowAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  /* ---------- Load doctors ---------- */
  useEffect(() => {
    getDoctors()
      .then(setDoctors)
      .catch(console.error);
  }, []);

  /* ---------- Load appointments ---------- */
  const loadAppointments = async () => {
    if (!selectedDoctor || !selectedDate) {
      alert("Select doctor and date first");
      return;
    }

    try {
      const data = await getDoctorAvailability(selectedDoctor, selectedDate);
      setAppointments(data);
      setMessage("");
    } catch (err) {
      setAppointments([]);
      setMessage("No appointments found");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20
      }}
    >
      {/* ---------- Filters ---------- */}
      <div className="book" style={{ padding: 20 }}>
        <h2>Show Appointments</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center"
          }}
        >
          <label>Doctor</label>
          <select
            value={selectedDoctor}
            style={{ padding: "6px 22px" }}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.specialization})
              </option>
            ))}
          </select>

          <label>Date</label>
          <input
            type="date"
            style={{ padding: "6px 22px" }}
            value={selectedDate}
            min={today}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <button onClick={loadAppointments}>
            Load Appointments
          </button>
        </div>
      </div>

      {/* ---------- Table ---------- */}
      {appointments.length > 0 ? (
        <table
          border="1"
          cellPadding="8"
          style={{ marginTop: 20, borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => {
              const start = formatDateTime(appt.start_time);
              const end = formatDateTime(appt.end_time);

              return (
                <tr key={appt.id}>
                  <td>{appt.patient_name}</td>
                  <td>{start.date}</td>
                  <td>{start.time}</td>
                  <td>{end.time}</td>
                  <td>{appt.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: 20 }}>
          {message || "No appointments for this day."}
        </p>
      )}
    </div>
  );
}
