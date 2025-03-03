import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { useState, useEffect } from "react";
import { SurgeonRoutes } from "./routes/Surgeon";
import { AnesthesiaRoutes } from "./routes/Anaesthesia";
import { getUserData } from "./pages/Surgeon/AddPatient/api/getUserData";
import { NurseRoutes } from "./routes/Nurse";

export default function App() {
  const [userRole, setUserRole] = useState<"surgeon" | "admin" | "anesthesia" | "nurse" | undefined>(undefined);

  useEffect(() => {
    const fetchUserRole = async () => {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");

      if (!username || !token) {
        return;
      }

      try {
        const response = await getUserData({ username, token });

        if (response.success) {
          setUserRole(response.data.role);
        } else {
          console.log()
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        alert("An error occurred. - 8");
      }
    };

    if (!userRole) {
      fetchUserRole();
    }
  }, [userRole]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <div className="h-screen flex items-center justify-center">
              <Login setUserRole={setUserRole} userRole={userRole} />
            </div>
          }
        />
        {userRole === "surgeon" && <Route path="/*" element={<SurgeonRoutes userRole={userRole} />} />}
        {userRole === "anesthesia" && <Route path="/*" element={<AnesthesiaRoutes userRole={userRole} />} />}
        {userRole === "nurse" && <Route path="/*" element={<NurseRoutes userRole={userRole} />} />}
        <Route path="*" element={<h1>Unauthorized!</h1>} />
      </Routes>
    </Router>
  );
}
