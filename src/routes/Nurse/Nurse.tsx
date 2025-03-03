import { Url } from '@/constants';
import { Layout } from '@/layout';
import { ActiveCasesPage } from '@/pages/Anaesthesia/ActiveCases';
import { AllCases } from '@/pages/Nurse/AllCases';
import { TheatresPage } from '@/pages/Nurse/Theaters';
import { AboutCases } from '@/pages/Surgeon/AboutCases';
import { ProtectedRoute } from '@/utils/ProtectedRoutes';
import { Route, Routes } from "react-router-dom";

export default function NurseRoutes({ userRole }: { userRole: "surgeon" | "admin" | "anesthesia" | "nurse" | undefined }) {
  return (
    <Routes>
      <Route path={Url.nurseHome} element={<Layout userRole={userRole}><h1>Home</h1></Layout>} />
      <Route path={Url.nurseTheatre} element={<ProtectedRoute><Layout userRole={userRole}><TheatresPage /></Layout></ProtectedRoute>} />
      <Route path={Url.nurseActiveCases} element={<ProtectedRoute><Layout userRole={userRole}><ActiveCasesPage /></Layout></ProtectedRoute>} />
      <Route path={Url.nurseAllCases} element={<ProtectedRoute><Layout userRole={userRole}><AllCases /></Layout></ProtectedRoute>} />
      <Route path="/cases/:id" element={<ProtectedRoute><Layout userRole={userRole}><AboutCases /></Layout></ProtectedRoute>} />
    </Routes>
  );
}
