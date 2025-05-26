import React, { useState } from "react";

// Mock data
const mockDepartments = ["Tất cả", "Phòng Kế toán", "Phòng Nhân sự", "Phòng IT"];
const mockSummaryData = [
  { id: 1, name: "Nguyễn Văn A", department: "Phòng IT", daysWorked: 20, lateDays: 2, absentDays: 1, overtimeHours: 10 },
  { id: 2, name: "Trần Thị B", department: "Phòng Nhân sự", daysWorked: 18, lateDays: 1, absentDays: 2, overtimeHours: 5 },
  { id: 3, name: "Lê Văn C", department: "Phòng Kế toán", daysWorked: 22, lateDays: 0, absentDays: 0, overtimeHours: 15 },
];

export default function SummaryView() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [filteredData, setFilteredData] = useState(mockSummaryData);

  const handleFilter = () => {
    let filtered = mockSummaryData;

    // Lọc theo phòng ban
    if (selectedDepartment !== "Tất cả") {
      filtered = filtered.filter((item) => item.department === selectedDepartment);
    }

    // Lọc theo trạng thái công
    if (statusFilter === "Đúng giờ") {
      filtered = filtered.filter((item) => item.lateDays === 0);
    } else if (statusFilter === "Đi trễ") {
      filtered = filtered.filter((item) => item.lateDays > 0);
    } else if (statusFilter === "Nghỉ") {
      filtered = filtered.filter((item) => item.absentDays > 0);
    } else if (statusFilter === "Tăng ca") {
      filtered = filtered.filter((item) => item.overtimeHours > 0);
    }

    setFilteredData(filtered);
  };

  return (
    <div className="container min-vh-100 py-4">
      {/* Header */}
      <h1 className="text-center mb-4">Thống kê chấm công theo thời gian</h1>

      {/* Bộ lọc */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Từ ngày</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Đến ngày</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Phòng ban</label>
              <select
                className="form-select"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {mockDepartments.map((dept, idx) => (
                  <option key={idx} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Trạng thái công</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Đúng giờ">Đúng giờ</option>
                <option value="Đi trễ">Đi trễ</option>
                <option value="Nghỉ">Nghỉ</option>
                <option value="Tăng ca">Tăng ca</option>
              </select>
            </div>
          </div>
          <div className="text-end mt-3">
            <button className="btn btn-primary" onClick={handleFilter}>
              Lọc
            </button>
          </div>
        </div>
      </div>

      {/* Bảng thống kê */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <h5 className="card-title">Kết quả thống kê</h5>
            <div>
              <button
                className="btn btn-outline-success me-2"
                onClick={() => alert("Exporting as CSV (mock functionality).")}
              >
                Export CSV
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => alert("Exporting as PDF (mock functionality).")}
              >
                Export PDF
              </button>
            </div>
          </div>
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>STT</th>
                <th>Tên nhân viên</th>
                <th>Phòng ban</th>
                <th>Tổng ngày làm</th>
                <th>Số lần đi trễ</th>
                <th>Số ngày nghỉ</th>
                <th>Số giờ tăng ca</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.department}</td>
                    <td>{item.daysWorked}</td>
                    <td>{item.lateDays}</td>
                    <td>{item.absentDays}</td>
                    <td>{item.overtimeHours}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Không có dữ liệu
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