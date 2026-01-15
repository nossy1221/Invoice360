import React, { useState } from "react";

export default function ProfitLoss() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("August");

  const data = {
    revenue: 850000,
    expenses: 620000,
    grossProfit: 230000,
    netProfit: 180000,
  };

  return (
    <div
      className="container mt-4"
      style={{
        fontFamily: "Poppins, sans-serif",
        color: "#333",
      }}
    >
      {/* 🔷 Header Card */}
      <div
        className="card shadow-lg border-0 mb-4"
        style={{
          borderRadius: "18px",
          overflow: "hidden",
          transition: "0.3s ease",
        }}
      >
        <div
          className="card-header text-white"
          style={{
            background:
              "linear-gradient(135deg, #007bff 0%, #6610f2 100%)",
            padding: "20px 25px",
          }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div>
              <h4 className="mb-1 fw-bold">📊 Profit & Loss Statement</h4>
              <p className="mb-0 opacity-75">
                January 1, 2025 - August 20, 2025
              </p>
            </div>
            <div className="d-flex gap-3 flex-wrap align-items-center">
              <div>
                <label className="me-2 fw-semibold">Year:</label>
                <select
                  className="form-select form-select-sm"
                  style={{
                    width: "auto",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                  }}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>

              <div>
                <label className="me-2 fw-semibold">Month:</label>
                <select
                  className="form-select form-select-sm"
                  style={{
                    width: "auto",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                  }}
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Profit Summary Cards */}
      <div className="row g-4">
        {[
          {
            label: "Total Revenue",
            value: data.revenue,
            color: "#28a745",
            emoji: "💰",
          },
          {
            label: "Total Expenses",
            value: data.expenses,
            color: "#dc3545",
            emoji: "💸",
          },
          {
            label: "Gross Profit",
            value: data.grossProfit,
            color: "#ffc107",
            emoji: "📈",
          },
          {
            label: "Net Profit",
            value: data.netProfit,
            color: "#0d6efd",
            emoji: "🏦",
          },
        ].map((item, index) => (
          <div className="col-md-3 col-sm-6" key={index}>
            <div
              className="card text-center border-0 shadow-sm"
              style={{
                borderRadius: "18px",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              <div
                className="card-body"
                style={{
                  background: `linear-gradient(135deg, ${item.color}40, ${item.color}10)`,
                  borderRadius: "18px",
                  padding: "25px",
                }}
              >
                <h5 className="fw-bold" style={{ color: item.color }}>
                  {item.emoji} {item.label}
                </h5>
                <h3
                  className="fw-bold mt-2"
                  style={{ color: item.color, fontSize: "1.7rem" }}
                >
                  R{item.value.toLocaleString("en-IN")}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔸 Summary Section */}
      <div
        className="card mt-5 shadow-sm border-0"
        style={{ borderRadius: "15px" }}
      >
        <div className="card-body">
          <h5 className="fw-bold mb-3">Summary</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>Revenue from Sales</span>
              <strong>R{(data.revenue * 0.9).toLocaleString("en-IN")}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>Other Income</span>
              <strong>R{(data.revenue * 0.1).toLocaleString("en-IN")}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>Operating Expenses</span>
              <strong>R{(data.expenses * 0.7).toLocaleString("en-IN")}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>Administrative Expenses</span>
              <strong>R{(data.expenses * 0.3).toLocaleString("en-IN")}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center bg-light fw-bold">
              <span>💹 Net Profit</span>
              <strong style={{ color: "#198754" }}>
                R{data.netProfit.toLocaleString("en-IN")}
              </strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
