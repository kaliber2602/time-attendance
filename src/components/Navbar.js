import React from "react";
import { Link, useLocation } from "react-router-dom";

const navs = [
  { to: "/", label: "Dashboard" },
  { to: "/clock", label: "Chấm công" },
  { to: "/timesheet", label: "Timesheet" },
  { to: "/submit-request", label: "Gửi yêu cầu" },
  { to: "/requests", label: "Xem yêu cầu" },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 shadow mb-4">
      {navs.map((nav) => (
        <Link
          key={nav.to}
          to={nav.to}
          className={`px-3 py-2 rounded ${location.pathname === nav.to ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"}`}
        >
          {nav.label}
        </Link>
      ))}
    </nav>
  );
}