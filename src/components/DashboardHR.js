import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardHR({ user }) {
  const [now, setNow] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="min-vh-100 d-flex"
      style={{ background: "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)" }}
    >
      {/* Sidebar menu */}
      <div
        className="bg-dark text-white p-4 d-flex flex-column"
        style={{ width: 220, minHeight: "100vh" }}
      >
        <div className="mb-4 fw-bold fs-4 text-center">Quản lý nhân sự</div>
        <div className="mb-4 text-center">
          <img
            src="https://i.pravatar.cc/60"
            alt="avatar"
            className="rounded-circle mb-2"
          />
          <div className="fw-semibold">{user.name || user.email}</div>
          <div className="small text-secondary">{user.role}</div>
        </div>
        <button
          className="btn btn-outline-light mb-2 text-start"
          onClick={() => navigate("/schedule")}
        >
          Thiết lập lịch trình
        </button>
        <button
          className="btn btn-outline-light mb-2 text-start"
          onClick={() => navigate("/summary")}
        >
          Xem thống kê công
        </button>
        <button
          className="btn btn-outline-light mb-2 text-start"
          onClick={() => navigate("/employees")}
        >
          Quản lý nhân viên
        </button>
        <div className="mt-auto">
          <button
            className="btn btn-danger w-100"
            onClick={() => window.location.reload()}
          >
            Đăng xuất
          </button>
        </div>
      </div>
      {/* Main content */}
      <div
        className="flex-grow-1 p-5"
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        {/* Welcome message */}
        <div className="bg-white rounded shadow p-4 mb-4">
          <h2 className="fw-bold mb-2">Xin chào, {user.name || user.email}!</h2>
          <div className="mb-2 text-secondary">Vai trò: {user.role}</div>
          <div className="mb-2 text-primary fw-bold">
            Thời gian hiện tại: {now.toLocaleString()}
          </div>
          <div className="mt-3">
            <span className="text-success">
              Chúc bạn một ngày làm việc hiệu quả!
            </span>
          </div>
        </div>
        {/* Quick actions */}
        <div className="bg-white rounded shadow p-4">
          <h4 className="fw-bold mb-3">Các chức năng chính</h4>
          <div className="d-flex flex-wrap gap-3">
            <button
              className="btn btn-primary flex-grow-1"
              style={{ minWidth: "200px" }}
              onClick={() => navigate("/schedule")}
            >
              Thiết lập lịch trình
            </button>
            <button
              className="btn btn-success flex-grow-1"
              style={{ minWidth: "200px" }}
              onClick={() => navigate("/summary")}
            >
              Xem thống kê công
            </button>
            <button
              className="btn btn-info flex-grow-1"
              style={{ minWidth: "200px" }}
              onClick={() => navigate("/employees")}
            >
              Quản lý nhân viên
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
