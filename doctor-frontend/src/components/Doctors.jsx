import { useEffect, useState } from "react";
import { getDoctors } from "../api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDoctors()
      .then(data => setDoctors(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
  <h2>Doctors</h2>
  <table style={{ borderCollapse: "collapse", width: "100%" }}>
    <thead>
      <tr>
        <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Name</th>
        <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Specialization</th>
      </tr>
    </thead>
    <tbody>
      {doctors.map(d => (
        <tr key={d.id}>
          <td style={{ border: "1px solid #ccc", padding: "8px" }}>{d.name}</td>
          <td style={{ border: "1px solid #ccc", padding: "8px" }}>{d.specialization}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}
