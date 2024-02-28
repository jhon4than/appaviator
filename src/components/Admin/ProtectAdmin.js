import { Navigate } from "react-router-dom";

const ProtectAdmin = ({ children }) => {
  // Verifique se o usuário está autenticado
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Se o usuário não estiver autenticado, redirecione para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  // Se o usuário for autenticado e for um administrador, permita o acesso às crianças (componentes protegidos)
  return children;
};

export default ProtectAdmin;
