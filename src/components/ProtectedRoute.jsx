import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    window.alert("Пожалуйста, войдите в систему или зарегистрируйтесь");
    return <Navigate to="/signup" replace />;
  }

  return children;
}

