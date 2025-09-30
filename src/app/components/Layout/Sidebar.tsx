import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{ padding: "1rem", borderRight: "1px solid #ccc", width: "200px" }}>
      <ul>
        <li><Link to="/dashboard">Inicio</Link></li>
        <li><Link to="/dashboard/personas">Personas</Link></li>
      </ul>
    </aside>
  );
}
