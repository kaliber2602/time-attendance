import React, { useState } from "react";
import Webcam from "react-webcam";

export default function ClockInOut({ employee, shifts, timesheet, setTimesheet }) {
  const [mode, setMode] = useState("manual");
  const [form, setForm] = useState({
    shift: shifts[0]?.id || 1,
    in: "",
    out: "",
  });
  const [message, setMessage] = useState("");
  const [faceMsg, setFaceMsg] = useState("");

  const handleManual = (e) => {
    e.preventDefault();
    setTimesheet([
      ...timesheet,
      {
        date: new Date().toLocaleDateString(),
        shift: shifts.find((s) => s.id === Number(form.shift))?.name,
        in: form.in,
        out: form.out,
        status: "Đúng giờ",
      },
    ]);
    setMessage("Đã lưu chấm công thủ công!");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleFace = () => {
    setTimesheet([
      ...timesheet,
      {
        date: new Date().toLocaleDateString(),
        shift: "Ca sáng",
        in: new Date().toLocaleTimeString(),
        out: "",
        status: "Đúng giờ",
      },
    ]);
    setFaceMsg("Đã chấm công bằng khuôn mặt!");
    setTimeout(() => setFaceMsg(""), 2000);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4>Chấm công</h4>
            </div>
            <div className="card-body">
              {/* Chọn chế độ */}
              <div className="mb-4 d-flex justify-content-center gap-3">
                <button
                  className={`btn ${mode === "manual" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMode("manual")}
                >
                  Nhập tay
                </button>
                <button
                  className={`btn ${mode === "face" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMode("face")}
                >
                  Face Tracking
                </button>
              </div>

              {/* Chế độ nhập tay */}
              {mode === "manual" && (
                <form onSubmit={handleManual}>
                  <div className="mb-3">
                    <label htmlFor="shift" className="form-label">
                      Chọn ca làm:
                    </label>
                    <select
                      id="shift"
                      className="form-select"
                      value={form.shift}
                      onChange={(e) => setForm((f) => ({ ...f, shift: e.target.value }))}
                    >
                      {shifts.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inTime" className="form-label">
                      Giờ vào:
                    </label>
                    <input
                      type="time"
                      id="inTime"
                      className="form-control"
                      value={form.in}
                      onChange={(e) => setForm((f) => ({ ...f, in: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="outTime" className="form-label">
                      Giờ ra:
                    </label>
                    <input
                      type="time"
                      id="outTime"
                      className="form-control"
                      value={form.out}
                      onChange={(e) => setForm((f) => ({ ...f, out: e.target.value }))}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Xác nhận
                  </button>
                  {message && (
                    <div className="alert alert-success mt-3 text-center">{message}</div>
                  )}
                </form>
              )}

              {/* Chế độ nhận diện khuôn mặt */}
              {mode === "face" && (
                <div className="text-center">
                  <Webcam audio={false} width={320} height={240} />
                  <button className="btn btn-success mt-3" onClick={handleFace}>
                    Nhận diện khuôn mặt
                  </button>
                  {faceMsg && (
                    <div className="alert alert-success mt-3 text-center">{faceMsg}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}