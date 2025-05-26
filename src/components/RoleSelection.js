import React, { useState } from "react";
import { roles } from "../data/mockUsers";

export default function RoleSelection({ onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h2 className="mb-5 fw-bold">Chọn vai trò</h2>
      <div className="row g-4">
        {roles.map((role, idx) => (
          <div className="col-12 col-md-6 col-lg-3" key={role.key}>
            <div
              className={`card text-center h-100 shadow-sm border-2 ${selected === idx ? "border-info" : "border-light"}`}
              style={{
                cursor: "pointer",
                boxShadow: selected === idx ? "0 0 0 2px #0dcaf0" : "",
                transition: "box-shadow 0.2s, border-color 0.2s"
              }}
              onClick={() => {
                setSelected(idx);
                setTimeout(() => onSelect(role.key), 150); // hiệu ứng chọn
              }}
            >
              <div className="card-body d-flex flex-column align-items-center">
                {/* Thay icon bằng ảnh minh họa nếu muốn */}
                <div style={{ fontSize: 64, marginBottom: 16 }}>{role.icon}</div>
                <h5 className={`card-title ${selected === idx ? "text-info" : ""}`}>{role.label}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}