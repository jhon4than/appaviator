import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProtectedPage.css";

const ProtectedPage = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState("");

  const correctPassword = "admin@!#D@#!2qwd1!@#"; // Defina sua senha secreta aqui
  const navigate = useNavigate();
  const setAuthenticated = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };
  const handleAccess = () => {
    if (password === correctPassword) {
      setAuthenticated(); // Define a autenticação como verdadeira
      navigate("/admin/users");
    } else {
      alert("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <div className="protected-page-container">
      <h1>Acesso Protegido</h1>
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAccess}>Acessar</button>
    </div>
  );
};

export default ProtectedPage;
