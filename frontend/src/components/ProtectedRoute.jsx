import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // wait for auth check
  if (!user) return <Navigate to="/sign_in" replace />;

  return children;
}
