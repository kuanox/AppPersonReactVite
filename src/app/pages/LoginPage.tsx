import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Correo electrónico no válido");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;
    setError("");
    setLoading(true);
    if (auth) {
      const result = await auth.login(email, password);
      console.log("result");
      console.log(result);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Error en login");
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: "blue", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: "white", padding: "2rem", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
        <h2 style={{ textAlign: "center", color: "blue" }}>Login</h2>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setEmailError(""); }}
          style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px", width: "100%", boxSizing: "border-box" }}
          required
        />
        {emailError && <p style={{ color: "red", fontSize: "0.9rem" }}>{emailError}</p>}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px", width: "100%", boxSizing: "border-box" }}
          required
        />
        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", padding: "0.5rem", cursor: loading ? "not-allowed" : "pointer", width: "100%", boxSizing: "border-box" }}
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>
        <Link to="/register" style={{ textAlign: "center", color: "blue", textDecoration: "none" }}>Registrarse</Link>
      </form>
    </div>
  );
}
