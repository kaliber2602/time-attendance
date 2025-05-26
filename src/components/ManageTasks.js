import React, { useState } from "react";

// Mock data
const initialTasks = [
  {
    id: 1,
    name: "Lập báo cáo tuần",
    assignee: "Nguyễn Văn A",
    startDate: "2025-05-20",
    endDate: "2025-05-24",
    priority: "High",
    status: "Chưa hoàn thành",
  },
  {
    id: 2,
    name: "Thiết kế UI trang báo cáo",
    assignee: "Trần Thị B",
    startDate: "2025-05-21",
    endDate: "2025-05-25",
    priority: "Medium",
    status: "Đã hoàn thành",
  },
];

const employees = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"];

export default function ManageTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [filterPriority, setFilterPriority] = useState("Tất cả");
  const [filterAssignee, setFilterAssignee] = useState("Tất cả");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    assignee: "",
    startDate: "",
    endDate: "",
    priority: "Low",
    status: "Chưa hoàn thành",
  });

  const handleAddOrUpdateTask = () => {
    if (formData.id) {
      // Update task
      setTasks((prev) =>
        prev.map((task) => (task.id === formData.id ? formData : task))
      );
      alert("Công việc đã được cập nhật!");
    } else {
      // Add new task
      setTasks((prev) => [
        ...prev,
        { ...formData, id: prev.length + 1 },
      ]);
      alert("Công việc mới đã được thêm!");
    }
    resetForm();
  };

  const handleEditTask = (task) => {
    setFormData(task);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá công việc này?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      alert("Công việc đã được xoá!");
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      assignee: "",
      startDate: "",
      endDate: "",
      priority: "Low",
      status: "Chưa hoàn thành",
    });
  };

  const handleFilter = () => {
    let filtered = initialTasks;

    // Lọc theo trạng thái
    if (filterStatus !== "Tất cả") {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }

    // Lọc theo mức ưu tiên
    if (filterPriority !== "Tất cả") {
      filtered = filtered.filter((task) => task.priority === filterPriority);
    }

    // Lọc theo nhân viên
    if (filterAssignee !== "Tất cả") {
      filtered = filtered.filter((task) => task.assignee === filterAssignee);
    }

    // Lọc theo từ khoá tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setTasks(filtered);
  };

  return (
    <div className="container min-vh-100 py-4">
      <h1 className="text-center mb-4">Quản lý công việc</h1>
      <div className="row">
        {/* Form thêm/sửa công việc */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                {formData.id ? "Cập nhật công việc" : "Thêm công việc mới"}
              </h5>
              <div className="mb-3">
                <label className="form-label">Tên công việc</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Người được giao</label>
                <select
                  className="form-select"
                  value={formData.assignee}
                  onChange={(e) =>
                    setFormData({ ...formData, assignee: e.target.value })
                  }
                >
                  <option value="">Chọn nhân viên</option>
                  {employees.map((emp, idx) => (
                    <option key={idx} value={emp}>
                      {emp}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Ngày giao</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ngày kết thúc</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mức ưu tiên</label>
                <select
                  className="form-select"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handleAddOrUpdateTask}
              >
                {formData.id ? "Cập nhật" : "Thêm công việc"}
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách công việc */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm công việc"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="Tất cả">Tất cả trạng thái</option>
                    <option value="Chưa hoàn thành">Chưa hoàn thành</option>
                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                  >
                    <option value="Tất cả">Tất cả ưu tiên</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary w-100" onClick={handleFilter}>
                    Lọc
                  </button>
                </div>
              </div>
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>STT</th>
                    <th>Tên công việc</th>
                    <th>Nhân viên</th>
                    <th>Ngày giao</th>
                    <th>Ngày kết thúc</th>
                    <th>Ưu tiên</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 ? (
                    tasks.map((task, idx) => (
                      <tr key={task.id}>
                        <td>{idx + 1}</td>
                        <td>{task.name}</td>
                        <td>{task.assignee}</td>
                        <td>{task.startDate}</td>
                        <td>{task.endDate}</td>
                        <td>{task.priority}</td>
                        <td>{task.status}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEditTask(task)}
                          >
                            Sửa
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Xoá
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        Không có công việc nào
                      </td>
                    </tr>
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