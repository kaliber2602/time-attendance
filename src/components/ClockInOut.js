import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { FaUserClock, FaCamera, FaRegClock } from "react-icons/fa";

export default function ClockInOut({ shifts, timesheet, setTimesheet }) {
  const [mode, setMode] = useState("manual");
  const [form, setForm] = useState({
    name: "",
    shift: shifts[0]?.id || 1,
  });
  const [message, setMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getToday = () => new Date().toLocaleDateString();
  const getNow = () => new Date().toLocaleTimeString();

  const handleClockInOut = (name, shiftName) => {
    const today = getToday();
    const now = getNow();

    const existing = timesheet.find(
      (entry) => entry.date === today && entry.name === name
    );

    if (existing) {
      const updated = timesheet.map((entry) =>
        entry.date === today && entry.name === name
          ? { ...entry, out: now }
          : entry
      );
      setTimesheet(updated);
      return "✅ Đã ghi nhận giờ ra!";
    } else {
      setTimesheet([
        ...timesheet,
        {
          name,
          date: today,
          shift: shiftName,
          in: now,
          out: "",
          status: "Đúng giờ",
        },
      ]);
      return "✅ Đã ghi nhận giờ vào!";
    }
  };

  const handleManual = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setMessage("❌ Vui lòng nhập tên để chấm công.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const shiftName =
      shifts.find((s) => s.id === Number(form.shift))?.name || "Ca không xác định";

    const result = handleClockInOut(form.name.trim(), shiftName);
    setMessage(result);
    setForm({ ...form, name: "" });
    setTimeout(() => setMessage(""), 3000);
  };

  const handleFace = () => {
    const result = handleClockInOut("FaceID", "Ca sáng");
    setMessage(result);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white text-center">
              <h4 className="mb-0">
                <FaRegClock className="me-2" />
                Hệ thống chấm công
              </h4>
              <small>Thời gian hiện tại: {currentTime}</small>
            </div>
            <div className="card-body px-4">
              {/* Tabs chế độ */}
              <div className="d-flex justify-content-center mb-4 gap-3">
                <button
                  className={`btn ${mode === "manual" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMode("manual")}
                >
                  <FaUserClock className="me-2" />
                  Nhập tay
                </button>
                <button
                  className={`btn ${mode === "face" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMode("face")}
                >
                  <FaCamera className="me-2" />
                  Face Tracking
                </button>
              </div>

              {/* Nhập tay */}
              {mode === "manual" && (
                <form onSubmit={handleManual}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Tên nhân viên</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên của bạn"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Ca làm</label>
                    <select
                      className="form-select"
                      value={form.shift}
                      onChange={(e) => setForm({ ...form, shift: e.target.value })}
                    >
                      {shifts.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-success w-100">
                    ✅ Xác nhận chấm công
                  </button>
                </form>
              )}

              {/* Face Tracking */}
              {mode === "face" && (
                <div className="text-center col-12">
                  <div className="container">
                  <div className="col-12"><Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    width={500}
                    height={500}
                    className="border  shadow-sm"/></div>
                  <button className="btn btn-success mt-3 col-12 w-50" onClick={handleFace}>
                    ✅ Nhận diện khuôn mặt
                  </button>
                
                  </div>
                  </div>
              )}

              {/* Thông báo */}
              {message && (
                <div className="alert alert-info mt-4 text-center fw-semibold">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
