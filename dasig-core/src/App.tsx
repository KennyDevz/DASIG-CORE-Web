import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'

import LoginForm from './authentication/login-form'
import AdminDashboardLayout from './layouts/admin-layout';

function AdminDashboardHome() {
  return (
    <div>
      <h1 style={{ marginTop: 0, color: '#212529' }}>Admin Dashboard Overview</h1>
      <p style={{ color: '#495057' }}>Welcome back! This is your primary dashboard pane.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route 1: Auth Screen (Takes up 100% of the screen space) */}
        <Route path="/" element={<LoginForm />} />

        {/* Route 2: Dashboard App Section (Includes the Sidebar layout wrapper) */}
        <Route 
          path="/dashboard" 
          element={
            <AdminDashboardLayout>
              <AdminDashboardHome />
            </AdminDashboardLayout>
          } 
        />

        {/* Catch-all: Redirect users to login by default if path is unknown */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
