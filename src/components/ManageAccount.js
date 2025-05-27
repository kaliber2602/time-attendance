import React, { useState } from "react";
import { mockUsers, roles } from "../data/mockUsers"; // Giả sử mockUsers và roles được import từ file mockUsers


export default function ManageAccount() {
    const [accounts, setAccounts] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("Tất cả");
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [isAdding, setIsAdding] = useState(false);

    const handleEdit = (account) => {
        setSelectedAccount(account);
        setIsAdding(false);
        setFormData({
            email: account.email,
            password: account.password,
            role: account.role,
        });
    };

    const handleAdd = () => {
        setIsAdding(true);
        setSelectedAccount(null);
        setFormData({
            email: "",
            password: "",
            role: roles[0].key, // Mặc định chọn vai trò đầu tiên
        });
    };

    const handleSave = () => {
        if (isAdding) {
            // Kiểm tra email đã tồn tại
            if (accounts.some((acc) => acc.email === formData.email)) {
                alert("Email đã tồn tại!");
                return;
            }
            setAccounts([...accounts, formData]);
            alert("Tài khoản đã được thêm!");
        } else {
            setAccounts((prev) =>
                prev.map((acc) =>
                    acc.email === selectedAccount.email ? { ...acc, ...formData } : acc
                )
            );
            alert("Thông tin tài khoản đã được cập nhật!");
        }
        setSelectedAccount(null);
        setIsAdding(false);
    };

    const handleDelete = (email) => {
        if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
            setAccounts(accounts.filter((acc) => acc.email !== email));
            alert("Tài khoản đã được xóa!");
        }
    };

    const handleFilter = () => {
        let filtered = mockUsers;

        if (filterRole !== "Tất cả") {
            filtered = filtered.filter((acc) => acc.role === filterRole);
        }
        if (searchTerm) {
            filtered = filtered.filter(
                (acc) =>
                    acc.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setAccounts(filtered);
    };

    return (
        <div className="container min-vh-100 py-4">
            <h1 className="text-center mb-4">Quản lý tài khoản</h1>

            {/* Filter Bar */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm theo email"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-md-5">
                            <select
                                className="form-select"
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                            >
                                <option value="Tất cả">Tất cả vai trò</option>
                                {roles.map((role) => (
                                    <option key={role.key} value={role.key}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button
                                className="btn btn-success w-100"
                                onClick={handleAdd}
                                data-bs-toggle="modal"
                                data-bs-target="#accountModal"
                            >
                                Thêm tài khoản
                            </button>
                        </div>
                    </div>
                    <div className="text-end mt-3">
                        <button className="btn btn-primary" onClick={handleFilter}>
                            Lọc
                        </button>
                    </div>
                </div>
            </div>

            {/* Account Table */}
            <div className="card">
                <div className="card-body">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>STT</th>
                                <th>Email</th>
                                <th>Vai trò</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.length > 0 ? (
                                accounts.map((acc, idx) => (
                                    <tr key={acc.email}>
                                        <td>{idx + 1}</td>
                                        <td>{acc.email}</td>
                                        <td>{roles.find((r) => r.key === acc.role)?.label || acc.role}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEdit(acc)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#accountModal"
                                            >
                                                Chỉnh sửa
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(acc.email)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        Không có tài khoản nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Adding/Editing Account */}
            <div
                className="modal fade"
                id="accountModal"
                tabIndex="-1"
                aria-labelledby="accountModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="accountModalLabel">
                                {isAdding ? "Thêm tài khoản mới" : "Chỉnh sửa thông tin tài khoản"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    //disabled={!isAdding} // Không cho sửa email khi chỉnh sửa
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Vai trò</label>
                                <select
                                    className="form-select"
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value,
                                        })
                                    }
                                >
                                    {roles.map((role) => (
                                        <option key={role.key} value={role.key}>
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                                onClick={handleSave}
                                data-bs-dismiss="modal"
                            >
                                {isAdding ? "Thêm" : "Cập nhật"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}