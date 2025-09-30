import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="personas">Gestión de Personas</Link>
      </nav>
    </div>
  );
}
