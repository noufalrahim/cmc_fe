import { Url } from '@/constants';
import { Layout } from '@/layout';
import { AllCases } from '@/pages/Nurse/AllCases';
import { AboutCases } from '@/pages/Surgeon/AboutCases';
import { AddPatientPage } from '@/pages/Surgeon/AddPatient';
import { CaseListPage } from '@/pages/Surgeon/CaseList';
import { HomePage } from '@/pages/Surgeon/Home';
import { TheatersPage } from '@/pages/Surgeon/Theaters';
import { ProtectedRoute } from '@/utils/ProtectedRoutes';
import { Route, Routes } from "react-router-dom";

export default function SurgeonRoutes({ userRole }: { userRole: "surgeon" | "admin" | "anesthesia" | "nurse" | undefined }) {
  return (
    <Routes>
      <Route path={Url.surgeonHome} element={<Layout userRole={userRole}><HomePage /></Layout>} />
      <Route path={Url.surgeonAddUser} element={<ProtectedRoute><Layout userRole={userRole}><AddPatientPage /></Layout></ProtectedRoute>} />
      <Route path={Url.surgeonCaselist} element={<ProtectedRoute><Layout userRole={userRole}><CaseListPage /></Layout></ProtectedRoute>} />
      <Route path={Url.surgeonAllCases} element={<ProtectedRoute><Layout userRole={userRole}><AllCases /></Layout></ProtectedRoute>} />
      <Route path={Url.surgeonTheatre} element={<ProtectedRoute><Layout userRole={userRole}><TheatersPage /></Layout></ProtectedRoute>} />
      <Route path="/cases/:id" element={<ProtectedRoute><Layout userRole={userRole}><AboutCases /></Layout></ProtectedRoute>} />
    </Routes>
  );
}
