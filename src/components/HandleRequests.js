import React, { useState } from "react";

// Mock data
const mockRequests = [
  {
    id: 1,
    employeeName: "Nguyễn Văn A",
    date: "2025-05-25",
    type: "Quên chấm công",
    reason: "Tôi quên check-in sáng",
    status: "Chờ duyệt",
  },
  {
    id: 2,
    employeeName: "Trần Thị B",
    date: "2025-05-23",
    type: "Xin nghỉ",
    reason: "Bị ốm",
    status: "Đã duyệt",
  },
  {
    id: 3,
    employeeName: "Lê Văn C",
    date: "2025-05-22",
    type: "Quên chấm công",
    reason: "Quên check-out chiều",
    status: "Từ chối",
  },
];

export default function HandleRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Đã duyệt" } : req
      )
    );
    alert("Yêu cầu đã được duyệt!");
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Từ chối" } : req
      )
    );
    alert("Yêu cầu đã bị từ chối!");
  };

  const handleFilter = () => {
    let filtered = mockRequests;

    // Lọc theo trạng thái
    if (statusFilter !== "Tất cả") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    // Lọc theo tên nhân viên
    if (searchTerm) {
      filtered = filtered.filter((req) =>
        req.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setRequests(filtered);
  };

  return (
    <div className="container min-vh-100 py-4">
      {/* Tiêu đề */}
      <h1 className="text-center mb-4">Danh sách yêu cầu điều chỉnh chấm công</h1>

      {/* Thanh lọc yêu cầu */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Trạng thái yêu cầu</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Chờ duyệt">Chờ duyệt</option>
                <option value="Đã duyệt">Đã duyệt</option>
                <option value="Từ chối">Từ chối</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Tìm kiếm theo tên nhân viên</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên nhân viên"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button className="btn btn-primary w-100" onClick={handleFilter}>
                Lọc
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách yêu cầu */}
      <div className="card">
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>STT</th>
                <th>Tên nhân viên</th>
                <th>Ngày yêu cầu</th>
                <th>Loại yêu cầu</th>
                <th>Lý do</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((req, idx) => (
                  <tr key={req.id}>
                    <td>{idx + 1}</td>
                    <td>{req.employeeName}</td>
                    <td>{req.date}</td>
                    <td>{req.type}</td>
                    <td>{req.reason}</td>
                    <td>
                      {req.status === "Chờ duyệt" ? (
                        <span className="text-warning fw-bold">Chờ duyệt</span>
                      ) : req.status === "Đã duyệt" ? (
                        <span className="text-success fw-bold">Đã duyệt</span>
                      ) : (
                        <span className="text-danger fw-bold">Từ chối</span>
                      )}
                    </td>
                    <td>
                      {req.status === "Chờ duyệt" ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleApprove(req.id)}
                          >
                            Duyệt
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleReject(req.id)}
                          >
                            Từ chối
                          </button>
                        </>
                      ) : (
                        <span className="text-muted">Không khả dụng</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Không có yêu cầu nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}