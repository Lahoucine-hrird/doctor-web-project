import { useState } from "react";
import Nav from "./components/Nav";
import Doctors from "./components/Doctors";
import Appointments from "./components/Appointments";
import ShowAppointments from "./components/ShowAppointments";

export default function App() {
  const [currentPage, setCurrentPage] = useState("appointments"); // default page

  const renderPage = () => {
    if (currentPage === "appointments") return <Appointments />;
    if (currentPage === "doctors") return <Doctors />;
    if (currentPage === "ShowAppointments") return <ShowAppointments />;
    return <div>Page not found</div>;
  };

  return (
    <div>
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div style={{ padding: 20 }}>
        {renderPage()}
      </div>
    </div>
  );
}
