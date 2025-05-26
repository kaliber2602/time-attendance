import React, { useState } from "react";
import { requestTypes } from "../data/employee";

export default function SubmitRequest({ employee, requests, setRequests }) {
  const [form, setForm] = useState({
    type: requestTypes[0],
    date: "",
    reason: "",
  });
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequests([
      ...requests,
      {
        dateSent: new Date().toLocaleDateString(),
        type: form.type,
        date: form.date,
        reason: form.reason,
        status: "Chờ duyệt",
      },
    ]);
    setMsg("Đã gửi yêu cầu thành công");
    setForm({ type: requestTypes[0], date: "", reason: "" });
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="container mt-5" >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4>Gửi yêu cầu điều chỉnh công</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Loại yêu cầu:
                  </label>
                  <select
                    id="type"
                    className="form-select"
                    value={form.type}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, type: e.target.value }))
                    }
                  >
                    {requestTypes.map((t, i) => (
                      <option key={i} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Ngày:
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={form.date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="reason" className="form-label">
                    Lý do:
                  </label>
                  <textarea
                    id="reason"
                    className="form-control"
                    rows="4"
                    value={form.reason}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, reason: e.target.value }))
                    }
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Gửi yêu cầu
                </button>
              </form>
              {msg && (
                <div className="alert alert-success mt-3 text-center">
                  {msg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}