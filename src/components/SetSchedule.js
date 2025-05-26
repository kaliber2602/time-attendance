import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Mock data
const mockDepartments = ["Tất cả", "Sales", "Engineering"];

const mockScheduleData = [
  {
    name: "Jane Doe",
    employeeId: "EMP001",
    department: "Sales",
    schedule: [
      { day: "Monday", shift: "Morning", time: "08:00 - 12:00" },
      { day: "Tuesday", shift: "Afternoon", time: "13:00 - 17:00" },
      { day: "Wednesday", shift: "Off" },
      { day: "Thursday", shift: "Morning", time: "08:00 - 12:00" },
      { day: "Friday", shift: "Full Day", time: "08:00 - 17:00" },
      { day: "Saturday", shift: "Morning", time: "08:00 - 12:00" },
    ],
  },
  {
    name: "John Smith",
    employeeId: "EMP002",
    department: "Engineering",
    schedule: [
      { day: "Monday", shift: "Full Day", time: "09:00 - 18:00" },
      { day: "Tuesday", shift: "Full Day", time: "09:00 - 18:00" },
      { day: "Wednesday", shift: "Morning", time: "09:00 - 12:00" },
      { day: "Thursday", shift: "Off" },
      { day: "Friday", shift: "Afternoon", time: "13:00 - 18:00" },
      { day: "Saturday", shift: "Off" },
    ],
  },
];

const weekdays = [
  { value: "Monday", label: "Thứ 2" },
  { value: "Tuesday", label: "Thứ 3" },
  { value: "Wednesday", label: "Thứ 4" },
  { value: "Thursday", label: "Thứ 5" },
  { value: "Friday", label: "Thứ 6" },
  { value: "Saturday", label: "Thứ 7" },
];

// Mapping shift
const shiftVi = {
  Morning: "Ca sáng",
  Afternoon: "Ca chiều",
  "Full Day": "Cả ngày",
  Off: "Nghỉ",
};

const shiftTimes = {
  Morning: "08:00 - 12:00",
  Afternoon: "13:00 - 17:00",
  "Full Day": "08:00 - 17:00",
  Off: "",
};

export default function SetSchedule() {
  const [selectedDepartment, setSelectedDepartment] = useState("Tất cả");
  const [filteredData, setFilteredData] = useState(mockScheduleData);
  const [selectedDayByEmployee, setSelectedDayByEmployee] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editingInfo, setEditingInfo] = useState(null);

  const handleFilter = () => {
    let filtered = mockScheduleData;
    if (selectedDepartment !== "Tất cả") {
      filtered = filtered.filter(
        (item) => item.department === selectedDepartment
      );
    }
    setFilteredData(filtered);
  };

  const handleDayChange = (employeeId, selectedDay) => {
    setSelectedDayByEmployee((prev) => ({
      ...prev,
      [employeeId]: selectedDay,
    }));
  };

  const handleEdit = (employee, day) => {
    const currentShift = employee.schedule.find((s) => s.day === day);
    setEditingInfo({
      employee,
      day,
      shift: currentShift?.shift || "Off",
    });
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    const updatedData = filteredData.map((emp) => {
      if (emp.employeeId === editingInfo.employee.employeeId) {
        return {
          ...emp,
          schedule: emp.schedule.map((s) =>
            s.day === editingInfo.day
              ? {
                  ...s,
                  shift: editingInfo.shift,
                  time: shiftTimes[editingInfo.shift],
                }
              : s
          ),
        };
      }
      return emp;
    });

    setFilteredData(updatedData);
    setShowModal(false);
  };

  return (
    <div className="container min-vh-100 py-4">
      <h1 className="text-center mb-4">Lịch làm việc nhân viên</h1>

      {/* Bộ lọc */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
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
            <div className="col-md-4 d-flex align-items-end">
              <button className="btn btn-primary" onClick={handleFilter}>
                Lọc
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng lịch */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">Lịch làm việc theo ngày</h5>
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>STT</th>
                <th>Tên nhân viên</th>
                <th>Phòng ban</th>
                <th>Ngày làm việc</th>
                <th>Ca làm</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => {
                  const selectedDay =
                    selectedDayByEmployee[item.employeeId] || "Monday";
                  const shiftData = item.schedule.find(
                    (s) => s.day === selectedDay
                  );

                  return (
                    <tr key={item.employeeId}>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.department}</td>
                      <td>
                        <select
                          className="form-select"
                          value={selectedDay}
                          onChange={(e) =>
                            handleDayChange(item.employeeId, e.target.value)
                          }
                        >
                          {weekdays.map((d) => (
                            <option key={d.value} value={d.value}>
                              {d.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        {shiftData?.shift === "Off"
                          ? "Nghỉ"
                          : `${shiftVi[shiftData.shift]} - ${shiftData.time}`}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning w-100"
                          onClick={() => handleEdit(item, selectedDay)}
                        >
                          Chỉnh sửa
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal chỉnh sửa ca */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa ca làm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingInfo && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nhân viên</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={editingInfo.employee.name}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ngày làm</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={
                    weekdays.find((d) => d.value === editingInfo.day)?.label
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ca làm</Form.Label>
                <Form.Select
                  value={editingInfo.shift}
                  onChange={(e) =>
                    setEditingInfo((prev) => ({
                      ...prev,
                      shift: e.target.value,
                    }))
                  }
                >
                  {Object.keys(shiftVi).map((shift) => (
                    <option key={shift} value={shift}>
                      {shiftVi[shift]}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
