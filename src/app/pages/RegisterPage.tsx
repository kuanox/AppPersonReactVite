import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function RegisterPage() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      console.log("registering user");
      console.log({ firstname, lastname, email, password });
      await registerUser(firstname, lastname, email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ backgroundColor: "blue", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: "white", padding: "2rem", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
        <h2 style={{ textAlign: "center", color: "blue" }}>Registro</h2>
        <input
          placeholder="Nombre"
          value={firstname}
          onChange={e => setFirstName(e.target.value)}
          style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          required
        />
        <input
          placeholder="Apellido"
          value={lastname}
          onChange={e => setLastName(e.target.value)}
          style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          required
        />
        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
        <button
          type="submit"
          style={{ backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", padding: "0.5rem", cursor: "pointer" }}
        >
          Registrarse
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ backgroundColor: "gray", color: "white", border: "none", borderRadius: "4px", padding: "0.5rem", cursor: "pointer" }}
        >
          Volver
        </button>
      </form>
    </div>
  );
}