import { Url } from '@/constants';
import { Layout } from '@/layout';
import { ActiveCasesPage } from '@/pages/Anaesthesia/ActiveCases';
import { HomePage } from '@/pages/Anaesthesia/Home';
import { PacQueuePage } from '@/pages/Anaesthesia/PacQueue';
import { AllCases } from '@/pages/Nurse/AllCases';
import { AboutCases } from '@/pages/Surgeon/AboutCases';
import { TheatersPage } from '@/pages/Surgeon/Theaters';
import { ProtectedRoute } from '@/utils/ProtectedRoutes';
import { Route, Routes } from "react-router-dom";

export default function AnesthesiaRoutes({ userRole }: { userRole: "surgeon" | "admin" | "anesthesia" | "nurse" | undefined }) {
  return (
    <Routes>
      <Route path="/" element={<Layout userRole={userRole}><HomePage /></Layout>} />
      <Route path={Url.anesthesiaPacQueue} element={<ProtectedRoute><Layout userRole={userRole}><PacQueuePage /></Layout></ProtectedRoute>} />
      <Route path={Url.anesthesiaActiveCases} element={<ProtectedRoute><Layout userRole={userRole}><ActiveCasesPage /></Layout></ProtectedRoute>} />
      <Route path={Url.anesthesiaAllCases} element={<ProtectedRoute><Layout userRole={userRole}><AllCases /></Layout></ProtectedRoute>} />
      <Route path={Url.anesthesiaTheatre} element={<ProtectedRoute><Layout userRole={userRole}><TheatersPage /></Layout></ProtectedRoute>} />
      <Route path="/cases/:id" element={<ProtectedRoute><Layout userRole={userRole}><AboutCases /></Layout></ProtectedRoute>} />
    </Routes>
  );
}
