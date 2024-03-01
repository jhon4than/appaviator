import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

  return <Navigate to="/login" />;
};

export default PrivateRoute;
