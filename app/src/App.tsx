import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

// Layouts
import PatientLayout from '@/layouts/PatientLayout';
import DoctorLayout from '@/layouts/DoctorLayout';
import HospitalLayout from '@/layouts/HospitalLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Auth Pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';

// Patient Pages
import PatientDashboard from '@/pages/patient/Dashboard';
import PatientAppointments from '@/pages/patient/Appointments';
import PatientDoctors from '@/pages/patient/Doctors';
import PatientConsultations from '@/pages/patient/Consultations';
import PatientRecords from '@/pages/patient/Records';
import PatientWallet from '@/pages/patient/Wallet';
import PatientEmergency from '@/pages/patient/Emergency';
import PatientProfile from '@/pages/patient/Profile';

// Doctor Pages
import DoctorDashboard from '@/pages/doctor/Dashboard';
import DoctorPatients from '@/pages/doctor/Patients';
import DoctorSchedule from '@/pages/doctor/Schedule';
import DoctorEarnings from '@/pages/doctor/Earnings';

// Hospital Pages
import HospitalDashboard from '@/pages/hospital/Dashboard';

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard';

// Landing Page (imported from the existing website)
import Index from '@/pages/LandingPage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'patient') return <Navigate to="/patient/dashboard" replace />;
    if (user.role === 'doctor') return <Navigate to="/doctor/dashboard" replace />;
    if (user.role === 'hospital_admin') return <Navigate to="/hospital/dashboard" replace />;
    if (user.role === 'super_admin') return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Patient Routes */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="doctors" element={<PatientDoctors />} />
          <Route path="consultations" element={<PatientConsultations />} />
          <Route path="records" element={<PatientRecords />} />
          <Route path="prescriptions" element={<PatientRecords />} />
          <Route path="wallet" element={<PatientWallet />} />
          <Route path="emergency" element={<PatientEmergency />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Doctor Routes */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="schedule" element={<DoctorSchedule />} />
          <Route path="consultations" element={<DoctorEarnings />} />
          <Route path="earnings" element={<DoctorEarnings />} />
          <Route path="analytics" element={<DoctorEarnings />} />
          <Route path="profile" element={<DoctorEarnings />} />
          <Route path="reports" element={<DoctorPatients />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Hospital Routes */}
        <Route
          path="/hospital"
          element={
            <ProtectedRoute allowedRoles={['hospital_admin']}>
              <HospitalLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<HospitalDashboard />} />
          <Route path="doctors" element={<HospitalDashboard />} />
          <Route path="patients" element={<HospitalDashboard />} />
          <Route path="appointments" element={<HospitalDashboard />} />
          <Route path="lab-results" element={<HospitalDashboard />} />
          <Route path="analytics" element={<HospitalDashboard />} />
          <Route path="billing" element={<HospitalDashboard />} />
          <Route path="settings" element={<HospitalDashboard />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDashboard />} />
          <Route path="hospitals" element={<AdminDashboard />} />
          <Route path="consultations" element={<AdminDashboard />} />
          <Route path="verifications" element={<AdminDashboard />} />
          <Route path="payments" element={<AdminDashboard />} />
          <Route path="analytics" element={<AdminDashboard />} />
          <Route path="logs" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminDashboard />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
