export default function Nav({ currentPage, setCurrentPage }) {
  return (
    <nav style={{ padding: 20, borderBottom: "1px solid #ccc",backgroundColor: "#f8f8f8" }}>
      <button onClick={() => setCurrentPage("doctors")} style={{ marginRight: 10,backgroundColor: "#000000ff",color:"#ffffffff" }}>
        Doctors
      </button>
      <button onClick={() => setCurrentPage("appointments")} style={{ marginRight: 10,backgroundColor: "#000000ff",color:"#ffffffff" }}>
        Appointments
      </button>
      <button onClick={() => setCurrentPage("ShowAppointments")} style={{ marginRight: 10,backgroundColor: "#000000ff",color:"#ffffffff" }}>
        Show Appointments 
      </button>
    </nav>
  );
}
