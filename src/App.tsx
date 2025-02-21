import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { HomePage } from "./pages/Home";
import { Layout } from "./layout";
import { CaseListPage } from "./pages/CaseList";
import { TheatersPage } from "./pages/Theaters";
import { AddUserPage } from "./pages/AddUser";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <div className="h-screen flex items-center justify-center">
            <Login />
          </div>
        } />
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/add-user" element={<Layout><AddUserPage /></Layout>} />
        <Route path="/caselist" element={<Layout><CaseListPage /></Layout>} />
        <Route path="/theater" element={<Layout><TheatersPage /></Layout>} />
      </Routes>
    </Router>
  )
}