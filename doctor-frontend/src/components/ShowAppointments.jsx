import { useState, useEffect } from "react";
import { getDoctors, getDoctorAvailability } from "../api";

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return {
    date: date.toISOString().split("T")[0],
    time: date.toTimeString().slice(0, 5)
  };
};

const today = new Date().toISOString().split("T")[0];

/* Generate daily slots*/
const generateSlots = () => {
  const slots = [];
  for (let h = 9; h < 17; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
};

export default function ShowAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [showSlots, setShowSlots] = useState(false);

  const allSlots = generateSlots();

  /*   Load doctors   */
  useEffect(() => {
    getDoctors().then(setDoctors).catch(console.error);
  }, []);

  /*   Load appointments   */
  const loadAppointments = async () => {
    if (!selectedDoctor || !selectedDate) {
      alert("Select doctor and date first");
      return;
    }

    try {
      const data = await getDoctorAvailability(selectedDoctor, selectedDate);
      setAppointments(data);
      setMessage("");
    } catch {
      setAppointments([]);
      setMessage("No appointments found");
    }
  };

  /*   Booked slots   */
  const bookedSlots = appointments.map(
    (a) => formatDateTime(a.start_time).time
  );

  return (
    <div className="book" style={{ textAlign: "center", padding: 20 }}>
      <h2>Show Appointments</h2>

      {/*   Filters   */}
      <select
        value={selectedDoctor}
        onChange={(e) => setSelectedDoctor(e.target.value)}
        style={{ padding: 6 }}
      >
        <option value="">Select Doctor</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="date"
        min={today}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ padding: 6 }}
      />

      <br /><br />

      <button onClick={loadAppointments}>
        Load Appointments
      </button>

      <br /><br />

      {/* Checkbox Show available times  */}
      <label>
        <input
          type="checkbox"
          checked={showSlots}
          onChange={(e) => setShowSlots(e.target.checked)}
        />
        {" "}Show available times
      </label>

      {/* Slots Show  times */}
      {showSlots && (
        <div style={{ marginTop: 20 }}>
          <h3>Time Slots</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
              maxWidth: 400,
              margin: "auto"
            }}
          >
            {allSlots.map((slot) => {
              const isBooked = bookedSlots.includes(slot);

              return (
                <div
                  key={slot}
                  style={{
                    padding: "8px",
                    borderRadius: 6,
                    color: "#fff",
                    backgroundColor: isBooked ? "#e53935" : "#43a047",
                    opacity: isBooked ? 0.6 : 1
                  }}
                >
                  {slot}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Appointments Table*/}
      {appointments.length > 0 ? (
        <table
          border="1"
          cellPadding="8"
          style={{
            marginTop: 30,
            borderCollapse: "collapse",
            marginInline: "auto"
          }}
        >
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
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
