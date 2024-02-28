import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userEmail = localStorage.getItem("userEmail");
  const userWhatsapp = localStorage.getItem("userWhatsapp");

  return userEmail && userWhatsapp ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
