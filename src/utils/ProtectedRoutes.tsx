import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

