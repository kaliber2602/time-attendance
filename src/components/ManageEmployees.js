import React, { useState } from "react";

// Mock data
const employeesMock = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        email: "a@company.com",
        department: "Phòng IT",
        position: "Lập trình viên",
        status: "Đang làm",
        rating: "Tốt",
        note: "Làm việc chăm chỉ, đúng deadline",
    },
    {
        id: 2,
        name: "Trần Thị B",
        email: "b@company.com",
        department: "Phòng Kế toán",
        position: "Nhân viên",
        status: "Nghỉ việc",
        rating: "Trung bình",
        note: "Thường đi trễ",
    },
];

export default function ManageEmployees() {
    const [employees, setEmployees] = useState(employeesMock);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("Tất cả");
    const [filterStatus, setFilterStatus] = useState("Tất cả");
    const [filterRating, setFilterRating] = useState("Tất cả");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [formData, setFormData] = useState({
        position: "",
        status: "",
        rating: "",
        note: "",
    });

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setFormData({
            position: employee.position,
            status: employee.status,
            rating: employee.rating,
            note: employee.note,
        });
    };

    const handleUpdate = () => {
        setEmployees((prev) =>
            prev.map((emp) =>
                emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp
            )
        );
        alert("Thông tin nhân viên đã được cập nhật!");
        setSelectedEmployee(null);
    };

    const handleFilter = () => {
        let filtered = employeesMock;

        if (filterDepartment !== "Tất cả") {
            filtered = filtered.filter(
                (emp) => emp.department === filterDepartment
            );
        }
        if (filterStatus !== "Tất cả") {
            filtered = filtered.filter((emp) => emp.status === filterStatus);
        }
        if (filterRating !== "Tất cả") {
            filtered = filtered.filter((emp) => emp.rating === filterRating);
        }
        if (searchTerm) {
            filtered = filtered.filter(
                (emp) =>
                    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setEmployees(filtered);
    };

    return (
        <div className="container min-vh-100 py-4">
            <h1 className="text-center mb-4">Quản lý nhân viên</h1>

            {/* Filter Bar */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm theo tên hoặc email"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={filterDepartment}
                                onChange={(e) => setFilterDepartment(e.target.value)}
                            >
                                <option value="Tất cả">Tất cả phòng ban</option>
                                <option value="Phòng IT">Phòng IT</option>
                                <option value="Phòng Kế toán">Phòng Kế toán</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="Tất cả">Tất cả trạng thái</option>
                                <option value="Đang làm">Đang làm</option>
                                <option value="Nghỉ việc">Nghỉ việc</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={filterRating}
                                onChange={(e) => setFilterRating(e.target.value)}
                            >
                                <option value="Tất cả">Tất cả đánh giá</option>
                                <option value="Tốt">Tốt</option>
                                <option value="Trung bình">Trung bình</option>
                                <option value="Kém">Kém</option>
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

            {/* Employee Table */}
            <div className="card">
                <div className="card-body">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>STT</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Phòng ban</th>
                                <th>Vị trí</th>
                                <th>Trạng thái</th>
                                <th>Đánh giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((emp, idx) => (
                                    <tr key={emp.id}>
                                        <td>{idx + 1}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.department}</td>
                                        <td>{emp.position}</td>
                                        <td>{emp.status}</td>
                                        <td>{emp.rating}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => handleEdit(emp)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#editModal"
                                            >
                                                Chỉnh sửa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        Không có nhân viên nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal luôn tồn tại trong DOM */}
            <div
                className="modal fade"
                id="editModal"
                tabIndex="-1"
                aria-labelledby="editModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">
                                Chỉnh sửa thông tin nhân viên
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {selectedEmployee ? (
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">Vị trí</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.position}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    position: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Trạng thái</label>
                                        <select
                                            className="form-select"
                                            value={formData.status}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    status: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="Đang làm">Đang làm</option>
                                            <option value="Nghỉ việc">Nghỉ việc</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Đánh giá</label>
                                        <select
                                            className="form-select"
                                            value={formData.rating}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    rating: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="Tốt">Tốt</option>
                                            <option value="Trung bình">Trung bình</option>
                                            <option value="Kém">Kém</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Ghi chú</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={formData.note}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    note: e.target.value,
                                                })
                                            }
                                        ></textarea>
                                    </div>
                                </>
                            ) : (
                                <p>Không có nhân viên nào được chọn.</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Đóng
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleUpdate}
                                data-bs-dismiss="modal"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
