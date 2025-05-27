import React, { useState } from "react";

export default function Timesheet({ timesheet = [] }) {
  const [filter, setFilter] = useState("all");

  // Tính thời gian làm việc
  const calculateWorkingTime = (inTime, outTime) => {
    if (!inTime || !outTime) return "-";
    const [inH, inM, inS] = inTime.split(":").map(Number);
    const [outH, outM, outS] = outTime.split(":").map(Number);
    const inDate = new Date(0, 0, 0, inH, inM, inS || 0);
    const outDate = new Date(0, 0, 0, outH, outM, outS || 0);
    let diff = (outDate - inDate) / 1000;
    if (diff < 0) return "-";
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    return `${hours} giờ ${minutes} phút`;
  };

  // Tính thời gian đi trễ nếu giờ vào > 9:00
  const calculateLateTime = (inTime) => {
    if (!inTime) return "-";
    const [h, m, s] = inTime.split(":").map(Number);
    const checkIn = new Date(0, 0, 0, h, m, s || 0);
    const deadline = new Date(0, 0, 0, 9, 0, 0); // 9:00 AM
    const diff = (checkIn - deadline) / 1000;
    if (diff <= 0) return "-";
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    return `${hours > 0 ? `${hours} giờ ` : ""}${minutes} phút`;
  };

  const filtered = timesheet;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-11">
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
                    <th>Thời gian làm việc</th>
                    <th>Trạng thái</th>
                    <th>Đi trễ</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        Chưa có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    filtered.map((row, idx) => {
                      const lateTime = calculateLateTime(row.in);
                      const isLate = lateTime !== "-";
                      const workingTime = calculateWorkingTime(row.in, row.out);
                      const status = isLate ? "Trễ" : row.status;

                      return (
                        <tr key={idx}>
                          <td>{row.date}</td>
                          <td>{row.shift}</td>
                          <td>{row.in || "-"}</td>
                          <td>{row.out || "-"}</td>
                          <td>{workingTime}</td>
                          <td>
                            <span
                              className={`badge ${
                                status === "Đúng giờ"
                                  ? "bg-success"
                                  : status === "Trễ"
                                  ? "bg-warning text-dark"
                                  : status === "Vắng"
                                  ? "bg-danger"
                                  : "bg-info"
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                          <td>{lateTime}</td>
                        </tr>
                      );
                    })
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
