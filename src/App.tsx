import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import VoteManagementDashboard from './components/admin/VoteManagementDashboard';
import Login from './components/Login';
import AdminLayout from './components/layouts/AdminLayout';

const App: React.FC = () => {
  // For demo purposes, we'll set a dummy companyId
  const demoCompanyId = "demo-company-1";
  
  return (
    <Router>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route 
            path="votes" 
            element={
              <VoteManagementDashboard 
                companyId={demoCompanyId} 
                isAdmin={true} 
              />
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
