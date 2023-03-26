import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

/**
 * To prevent if the user is not authenticated still direct to the home page.
 * @author Jing Huang
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // if user isAuthenticated is false which mean user is not authenticated, direct to 
    return <Navigate to="/" />;
  }
  return children;
};