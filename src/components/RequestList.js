import React, { useState } from "react";

const statusColors = {
  "Chờ duyệt": "badge bg-warning text-dark",
  "Đã duyệt": "badge bg-success",
  "Từ chối": "badge bg-danger",
};

export default function RequestList({ requests }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4>Danh sách yêu cầu đã gửi</h4>
            </div>
            <div className="card-body">
              {/* Bộ lọc */}
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <label htmlFor="filter" className="form-label mb-0">
                  Lọc theo trạng thái:
                </label>
                <select
                  id="filter"
                  className="form-select w-auto"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">Tất cả</option>
                  <option value="Chờ duyệt">Chờ duyệt</option>
                  <option value="Đã duyệt">Đã duyệt</option>
                  <option value="Từ chối">Từ chối</option>
                </select>
              </div>
              {/* Bảng yêu cầu */}
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Ngày gửi</th>
                    <th>Loại yêu cầu</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        Chưa có yêu cầu nào
                      </td>
                    </tr>
                  ) : (
                    filtered.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.dateSent}</td>
                        <td>{row.type}</td>
                        <td>
                          <span className={statusColors[row.status] || "badge bg-secondary"}>
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