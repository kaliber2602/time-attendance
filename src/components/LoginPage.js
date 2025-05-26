import React, { useState } from "react";
import { mockUsers, roles } from "../data/mockUsers";
import { useNavigate } from "react-router-dom"; // Thêm dòng này
import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "./Logo.png";
// import ToastNotification from "./ToastNotification";

export default function LoginPage({ role, onBack, onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate(); // Thêm dòng này

  const roleLabel = roles.find((r) => r.key === role)?.label || role;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = (field) => {
    const inputElement = document.getElementById(field);
    let isValid = true;
    if (field === "email" && formData.email.trim() === "") {
      setToast({ type: "danger", message: "Email không được để trống!" });
      isValid = false;
    } else if (field === "password" && formData.password.trim() === "") {
      setToast({ type: "danger", message: "Mật khẩu không được để trống!" });
      isValid = false;
    }
    if (inputElement) {
      if (!isValid) {
        inputElement.classList.add("is-invalid");
        inputElement.classList.remove("is-valid");
      } else {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = mockUsers.find(
      (u) =>
        u.email === formData.email &&
        u.password === formData.password &&
        u.role === role
    );
    if (user) {
      setToast({ type: "success", message: `Đăng nhập thành công với vai trò: ${roleLabel}` });
      setTimeout(() => {
        setToast(null);
        if (onLoginSuccess) onLoginSuccess(user);
        navigate("/dashboard"); // Thêm dòng này để chuyển trang
      }, 1000);
    } else {
      setToast({ type: "danger", message: "Email hoặc mật khẩu không đúng." });
    }
  };

  const handleToastClose = () => setToast(null);

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <form
          className="col-12 col-md-6 col-lg-4 bg-white rounded shadow p-4 d-flex flex-column align-items-center"
          onSubmit={handleLogin}
        >
          {/* <img src={logo} className="mb-4" alt="Logo" style={{ width: 80 }} /> */}
          <h2 className="mb-4 fw-bold">Đăng nhập ({roleLabel})</h2>
          <input
            className="form-control w-75 mb-3 shadow-sm p-3"
            type="email"
            id="email"
            name="email"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleValidation("email")}
            required
          />
          <input
            className="form-control w-75 mb-3 shadow-sm p-3"
            type="password"
            id="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            onBlur={() => handleValidation("password")}
            required
          />
          <button
            className="btn btn-info w-75 mb-3 p-3 text-white fw-bold"
            type="submit"
          >
            Đăng nhập
          </button>
          <div className="container w-75 mb-3">
            <div className="row">
              <div className="col-12 text-center">
                <a href="#" className="text-decoration-none">Quên mật khẩu?</a>
              </div>
            </div>
          </div>
          <button className="btn btn-link mt-2" onClick={onBack} type="button">
            ← Quay lại chọn vai trò
          </button>
        </form>
        {/* Toast Message */}
        {toast && (
          <div
            className={`toast align-items-center text-white bg-${toast.type} border-0 show position-fixed bottom-0 end-0 m-4`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ zIndex: 9999, minWidth: 250 }}
          >
            <div className="d-flex">
              <div className="toast-body">{toast.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={handleToastClose}
              ></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}