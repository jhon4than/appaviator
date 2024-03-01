import { Navigate } from "react-router-dom";

const ProtectAdmin = ({ children }) => {
  // Verifique se o usuário está autenticado
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectAdmin;
