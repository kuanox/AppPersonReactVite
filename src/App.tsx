import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./app/pages/LoginPage";
import RegisterPage from "./app/pages/RegisterPage";
import DashboardPage from "./app/pages/DashboardPage";
import PersonsPage from "./app/pages/PersonsPage";
import Layout from "./app/components/Layout/Layout";
import ProtectedRoute from "./app/components/ProtectedRoute";
import { AuthProvider } from "./app/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="personas" element={<PersonsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
