import { useEffect, useState } from "react";
import { getDoctors, bookAppointment, getBookedSlots } from "../api"; // ensure getBookedSlots exists

export default function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [message, setMessage] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  // Fetch doctors
  useEffect(() => {
    getDoctors()
      .then(data => setDoctors(data))
      .catch(err => console.error("Failed to fetch doctors:", err));
  }, []);

  // Generate 30-min slots dynamically
  const generateSlots = async () => {
    if (!selectedDoctor || !selectedDate) {
      alert("Select doctor and date first");
      return;
    }

    const startHour = 9;
    const endHour = 17;
    const newSlots = [];

    for (let h = startHour; h < endHour; h++) {
      newSlots.push(`${String(h).padStart(2, "0")}:00`);
      newSlots.push(`${String(h).padStart(2, "0")}:30`);
    }

    try {
      const data = await getBookedSlots(selectedDoctor, selectedDate);
      setBookedSlots(data.booked_slots || []);
      setSlots(newSlots);
      setSelectedSlot("");
      setMessage("");
    } catch (err) {
      setMessage(err.message || "Failed to load booked slots");
    }
  };

  // Book an appointment
  const handleBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot || !patientName) {
      return alert("Select doctor, date, slot, and enter patient name");
    }

    const start_time = `${selectedDate} ${selectedSlot}:00`;
    const end_time = new Date(new Date(start_time).getTime() + 30 * 60000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    try {
      await bookAppointment({
        doctor_id: selectedDoctor,
        patient_name: patientName,
        start_time,
      });

      // Add booked slot to bookedSlots so it turns red
      setBookedSlots([...bookedSlots, selectedSlot]);

      setMessage(`✅ Appointment booked successfully for ${patientName} at ${start_time}`);
      setSelectedSlot("");
      setPatientName("");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "⚠ Slot was just booked. Please choose another.");
    }
  };

  return (
    <div className="book" style={{ padding: 20 }}>
      <h2>Book Appointment</h2>

      <div style={{ marginBottom: 20 }}>
        <label>Doctor: </label>
        <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors.map(d => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.specialization})
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Date: </label>
        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
        <button onClick={generateSlots} style={{ marginLeft: 10 }}>
          Load Slots
        </button>
      </div>

      {slots.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          {slots.map(slot => {
            const isBooked = bookedSlots.includes(slot);

            return (
              <button
                key={slot}
                disabled={isBooked}
                onClick={() => !isBooked && setSelectedSlot(slot)}
                style={{
                  padding: "5px 10px",
                  cursor: isBooked ? "not-allowed" : "pointer",
                  backgroundColor: isBooked
                    ? "#ff4d4d" // booked = red
                    : selectedSlot === slot
                    ? "#4caf50" // selected = green
                    : "#5c5c5cff", // available = gray
                  opacity: isBooked ? 0.7 : 1,
                  margin: 3
                }}
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}

      {selectedSlot && (
        <div style={{ marginBottom: 20 }}>
          <input
            placeholder="Patient name"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
          />
          <button onClick={handleBooking} style={{ marginLeft: 10 }}>
            Book
          </button>
        </div>
      )}

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
