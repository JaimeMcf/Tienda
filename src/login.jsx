import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/cargar-libro");
    } catch (err) {
      setError("Credenciales incorrectas o usuario no registrado.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h2>Iniciar Sesión (Administrador)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input 
          type="email"
          placeholder="Correo electrónico" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          autoComplete="email"
          required 
          style={{ padding: "8px", width: "100%" }}
        />
        <input 
          type="password"
          placeholder="Contraseña"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          autoComplete="current-password"
          required 
          style={{ padding: "8px", width: "100%" }}
        />
        <button type="submit" style={{ background: "#333", color: "#fff", padding: "10px", border: "none", cursor: "pointer", borderRadius: "4px" }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}