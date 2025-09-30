import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logout();
    navigate("/");
  };

  return (
    <header style={{ padding: "1rem", background: "#1976d2", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2>CRUD Personas</h2>
      <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid white", color: "white", padding: "0.5rem", cursor: "pointer" }}>
        Logout
      </button>
    </header>
  );
}
