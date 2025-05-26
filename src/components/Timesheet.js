import React, { useState } from "react";

export default function Timesheet({ timesheet = [] }) {
  const [filter, setFilter] = useState("all");

  // Lọc dữ liệu theo tuần/tháng (mock)
  const filtered = timesheet; // Có thể thêm logic lọc thực tế nếu cần

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4>Bảng công cá nhân</h4>
            </div>
            <div className="card-body">
              {/* Bộ lọc */}
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <label htmlFor="filter" className="form-label mb-0">
                  Lọc theo:
                </label>
                <select
                  id="filter"
                  className="form-select w-auto"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">Tất cả</option>
                  <option value="week">Theo tuần</option>
                  <option value="month">Theo tháng</option>
                </select>
              </div>
              {/* Bảng công */}
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Ngày</th>
                    <th>Ca làm</th>
                    <th>Giờ vào</th>
                    <th>Giờ ra</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        Chưa có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    filtered.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.date}</td>
                        <td>{row.shift}</td>
                        <td>{row.in}</td>
                        <td>{row.out}</td>
                        <td>
                          <span
                            className={`badge ${
                              row.status === "Đúng giờ"
                                ? "bg-success"
                                : row.status === "Trễ"
                                ? "bg-warning text-dark"
                                : row.status === "Vắng"
                                ? "bg-danger"
                                : "bg-info"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}