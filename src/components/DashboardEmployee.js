import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // Import plugin cho lịch

// Mock data
const schedule = [
    { event: "Họp nhóm", type: "Meeting", date: "2025-05-27" },
    { event: "Nghỉ lễ", type: "Public Holiday", date: "2025-05-30" },
    { event: "Họp dự án", type: "Meeting", date: "2025-06-01" },
    { event: "Đào tạo nhân viên", type: "Training", date: "2025-06-05" },
    { event: "Họp tổng kết", type: "Meeting", date: "2025-06-10" },
    { event: "Nghỉ lễ Quốc khánh", type: "Public Holiday", date: "2025-09-02" },
    { event: "Họp chiến lược", type: "Meeting", date: "2025-06-15" },
    { event: "Hội thảo công nghệ", type: "Training", date: "2025-06-20" },
    { event: "Họp khách hàng", type: "Meeting", date: "2025-06-25" },
    { event: "Nghỉ lễ Giáng sinh", type: "Public Holiday", date: "2025-12-25" },
    { event: "Họp báo cáo", type: "Meeting", date: "2025-07-01" },
    { event: "Đào tạo kỹ năng mềm", type: "Training", date: "2025-07-05" },
    { event: "Họp kế hoạch", type: "Meeting", date: "2025-07-10" },
    { event: "Nghỉ lễ Tết Dương lịch", type: "Public Holiday", date: "2026-01-01" },
    { event: "Họp đánh giá", type: "Meeting", date: "2025-07-15" },
];

export default function DashboardEmployee({ user }) {
    const [now, setNow] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Số lượng lịch trình hiển thị mỗi trang
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Tính toán dữ liệu phân trang
    const totalPages = Math.ceil(schedule.length / itemsPerPage);
    const paginatedSchedule = schedule.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Xử lý chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="min-vh-100 d-flex" style={{ background: "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)" }}>
            {/* Sidebar menu */}
            <div className="bg-dark text-white p-4 d-flex flex-column" style={{ width: 220, minHeight: "100vh" }}>
                <div className="mb-4 fw-bold fs-4 text-center">Nhân viên</div>
                <div className="mb-4 text-center">
                    <img src="https://i.pravatar.cc/60" alt="avatar" className="rounded-circle mb-2" />
                    <div className="fw-semibold">{user.name || user.email}</div>
                    <div className="small text-secondary">{user.role}</div>
                </div>
                <button className="btn btn-outline-light mb-2 text-start" onClick={() => navigate("/ClockInOut")}>Chấm công</button>
                <button className="btn btn-outline-light mb-2 text-start" onClick={() => navigate("/Timesheet")}>Timesheet</button>
                <button className="btn btn-outline-light mb-2 text-start" onClick={() => navigate("/SubmitRequest")}>Gửi yêu cầu</button>
                <button className="btn btn-outline-light mb-2 text-start" onClick={() => navigate("/RequestList")}>Xem yêu cầu</button>
                <div className="mt-auto">
                    <button className="btn btn-danger w-100" onClick={() => window.location.reload()}>Đăng xuất</button>
                </div>
            </div>
            {/* Main content */}
            <div className="flex-grow-1 p-5" style={{
                    maxHeight: "100vh",
                    overflowY: "auto",
                }}>
                {/* Welcome message */}
                <div className="bg-white rounded shadow p-4 mb-4">
                    <h2 className="fw-bold mb-2">Xin chào, {user.name || user.email}!</h2>
                    <div className="mb-2 text-secondary">Vai trò: {user.role}</div>
                    <div className="mb-2 text-primary fw-bold">Thời gian hiện tại: {now.toLocaleString()}</div>
                    <div className="mt-3">
                        <span className="text-success">Chúc bạn một ngày làm việc hiệu quả!</span>
                    </div>
                </div>
                {/* Schedule */}
                <div className="bg-white rounded shadow p-4 mb-4">
                    <h4 className="fw-bold mb-3">Lịch trình sắp tới</h4>
                    {schedule.length === 0 ? (
                        <div className="text-center text-secondary">Không có lịch trình nào</div>
                    ) : (
                        <>
                            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                <table className="table table-bordered table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Ngày</th>
                                            <th>Sự kiện</th>
                                            <th>Loại</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedSchedule.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.date}</td>
                                                <td>{item.event}</td>
                                                <td>
                                                    <span
                                                        className={`badge ${
                                                            item.type === "Meeting"
                                                                ? "bg-info"
                                                                : item.type === "Public Holiday"
                                                                ? "bg-success"
                                                                : item.type === "Training"
                                                                ? "bg-warning text-dark"
                                                                : "bg-secondary"
                                                        }`}
                                                    >
                                                        {item.type}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination */}
                            <nav>
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                            &laquo;
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <li
                                            key={page}
                                            className={`page-item ${page === currentPage ? "active" : ""}`}
                                        >
                                            <button className="page-link" onClick={() => handlePageChange(page)}>
                                                {page}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                            &raquo;
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </>
                    )}
                </div>
                {/* Calendar */}
                <div className="bg-white rounded shadow p-4">
                    <h4 className="fw-bold mb-3">Lịch trình trên lịch</h4>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={schedule.map((item) => ({
                            title: item.event,
                            date: item.date,
                            backgroundColor:
                                item.type === "Meeting"
                                    ? "#17a2b8"
                                    : item.type === "Public Holiday"
                                    ? "#28a745"
                                    : item.type === "Training"
                                    ? "#ffc107"
                                    : "#6c757d",
                        }))}
                        locale="vi" // Hiển thị tiếng Việt
                    />
                </div>
            </div>
        </div>
    );
}