import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import LoginPage from "./components/LoginPage";
import DashboardEmployee from "./components/DashboardEmployee";
import DashboardManager from "./components/DashboardManager";
import DashboardAdmin from "./components/DashboardAdmin"; // Import DashboardAdmin
import ManageAccount from "./components/ManageAccount"; // Import ManageAccount
import DashboardHR from "./components/DashboardHR";
import ClockInOut from "./components/ClockInOut";
import Timesheet from "./components/Timesheet";
import SubmitRequest from "./components/SubmitRequest";
import RequestList from "./components/RequestList";
import ManageTasks from "./components/ManageTasks";
import HandleRequests from "./components/HandleRequests";
import SummaryView from "./components/SummaryView";
import ManageEmployees from "./components/ManageEmployees";
import SetSchedule from "./components/SetSchedule";
import {
  employee as mockEmployee,
  shifts,
  requestTypes,
} from "./data/employee"; // Mock data
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
export default function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [user, setUser] = useState(null);

  // Mock data: timesheet và requests
  const [timesheet, setTimesheet] = useState([]);
  const [requests, setRequests] = useState([]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chọn vai trò hoặc đăng nhập */}
        <Route
          path="/"
          element={
            !selectedRole ? (
              <RoleSelection onSelect={setSelectedRole} />
            ) : (
              <LoginPage
                role={selectedRole}
                onBack={() => setSelectedRole(null)}
                onLoginSuccess={handleLoginSuccess}
              />
            )
          }
        />
        {/* Chỉ cho Employee */}
        {user && user.role === "Employee" && (
          <>
            <Route
              path="/dashboard"
              element={<DashboardEmployee user={user} />}
            />
            <Route
              path="/ClockInOut"
              element={
                <ClockInOut
                  employee={user}
                  shifts={shifts}
                  timesheet={timesheet}
                  setTimesheet={setTimesheet}
                />
              }
            />
            <Route
              path="/Timesheet"
              element={<Timesheet timesheet={timesheet} />}
            />
            <Route
              path="/SubmitRequest"
              element={
                <SubmitRequest
                  employee={user}
                  requests={requests}
                  setRequests={setRequests}
                />
              }
            />
            <Route
              path="/RequestList"
              element={<RequestList requests={requests} />}
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
        {/* Chỉ cho Department Manager */}
        {user && user.role === "Department Manager" && (
          <>
            <Route
              path="/dashboard"
              element={<DashboardManager user={user} />}
            />
            <Route path="/tasks" element={<ManageTasks />} />
            <Route path="/requests" element={<HandleRequests />} />
            <Route path="/summary" element={<SummaryView />} />
            <Route path="/employees" element={<ManageEmployees />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
        {/* Chỉ cho HR */}
        {user && user.role === "HR" && (
          <>
            <Route 
              path="/dashboard" 
              element={<DashboardHR user={user} />} 
            />
            <Route path="/schedule" element={<SetSchedule />} />
            <Route path="/summary" element={<SummaryView />} />
            <Route path="/employees" element={<ManageEmployees />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}

        {/* Chỉ cho Administrator */}
        {user && user.role === "Administrator" && (
          <>
            <Route path="/dashboard" element={<DashboardAdmin user={user} />} />
            <Route path="/ManageAccount" element={<ManageAccount />} />
            <Route path="/ManageEmployees" element={<ManageEmployees />} />
            <Route path="/RequestList" element={<RequestList requests={requests} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}

        {/* Nếu chưa đăng nhập */}
        {!user && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </BrowserRouter>
  );
}
