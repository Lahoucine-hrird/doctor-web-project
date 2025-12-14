const API_URL = "http://127.0.0.1:8000/api"; 

export const getDoctors = async () => {
  const res = await fetch(`${API_URL}/doctors`);
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
};

export const getAppointments = async () => {
  const res = await fetch(`${API_URL}/appointments`);
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
};

// Fetch availability for a doctor
export const getDoctorAvailability = async (doctorId, date) => {
  const res = await fetch(`${API_URL}/doctors/${doctorId}/availability?date=${date}`);
  return res.json();
};


// Fetch booked slots for a doctor on a specific date
export const getBookedSlots = async (doctorId, date) => {
  const res = await fetch(
    `${API_URL}/appointments/booked-slots?doctor_id=${doctorId}&date=${date}`
  );
  return res.json();
};


// Book an appointment
export const bookAppointment = async (appointment) => {
  const res = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
