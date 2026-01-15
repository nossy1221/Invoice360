import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

// 🔹 Sample Cash Flow Data
const cashFlowData = [
  { date: "03 Oct 2024", bank: "SWIZ - 3354456565687", desc: "Cash payments for operating", credit: 1100, debit: 0, accBal: 1100, totalBal: 5899, method: "Stripe" },
  { date: "06 Nov 2024", bank: "NBC - 4324356677889", desc: "Loan received (short-term)", credit: 800, debit: 0, accBal: 800, totalBal: 6896, method: "Cash" },
  { date: "10 Dec 2024", bank: "SWIZ - 5475878970090", desc: "Cash payments to employees", credit: 0, debit: 1500, accBal: 1500, totalBal: 9899, method: "Paypal" },
  { date: "10 Sep 2024", bank: "IBO - 3434565776768", desc: "Cash receipts from sales", credit: 1700, debit: 0, accBal: 1700, totalBal: 4568, method: "Cash" },
  { date: "14 Oct 2024", bank: "IBO - 3453647664889", desc: "Owner’s equity contribution", credit: 1300, debit: 0, accBal: 1300, totalBal: 4568, method: "Paypal" },
  { date: "18 Nov 2024", bank: "IBO - 4353689870544", desc: "Sale of old equipment", credit: 1000, debit: 1000, accBal: 1000, totalBal: 1562, method: "Paypal" },
  { date: "20 Sep 2024", bank: "SWIZ - 345656576787", desc: "Cash payments to suppliers", credit: 2300, debit: 0, accBal: 2300, totalBal: 4568, method: "Stripe" },
  { date: "24 Dec 2024", bank: "HBSC - 3298784309485", desc: "Cash receipts from sales", credit: 1000, debit: 0, accBal: 1000, totalBal: 889898, method: "Stripe" },
];

const formatUSD = (num) => "R" + num.toLocaleString("en-US", { minimumFractionDigits: 2 });

const CashFlow = () => {
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paymentMethods = ["All", ...Array.from(new Set(cashFlowData.map((d) => d.method)))];

  const filtered = cashFlowData.filter(
    (row) =>
      (method === "All" || row.method === method) &&
      (row.date.toLowerCase().includes(search.toLowerCase()) ||
        row.bank.toLowerCase().includes(search.toLowerCase()) ||
        row.desc.toLowerCase().includes(search.toLowerCase()) ||
        row.method.toLowerCase().includes(search.toLowerCase()))
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Cash Flow Report", 14, 16);
    doc.autoTable({
      startY: 22,
      head: [["Date", "Bank", "Description", "Credit", "Debit", "Acc. Bal", "Total Bal", "Method"]],
      body: filtered.map((r) => [
        r.date, r.bank, r.desc, formatUSD(r.credit), formatUSD(r.debit),
        formatUSD(r.accBal), formatUSD(r.totalBal), r.method
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [61, 170, 170], textColor: 255 },
    });
    doc.save("cashflow.pdf");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">💰 Cash Flow</h1>
            <p className="text-gray-500">View and manage your cashflow records easily</p>
          </div>
          <button
            onClick={handlePDF}
            className="flex items-center gap-2 bg-red-100 hover:bg-red-200 transition-all px-4 py-2 rounded-lg text-red-600 font-medium mt-3 md:mt-0"
          >
            <FaFilePdf size={20} /> Download PDF
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="🔍 Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 focus:ring-2 focus:ring-teal-400 rounded-lg px-4 py-2 outline-none transition-all"
          />
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border border-gray-300 focus:ring-2 focus:ring-teal-400 rounded-lg px-4 py-2"
          >
            {paymentMethods.map((m) => (
              <option key={m} value={m}>
                {m === "All" ? "All Payment Methods" : m}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-teal-50 text-gray-800 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Bank</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3">Credit</th>
                <th className="px-4 py-3">Debit</th>
                <th className="px-4 py-3">Acc. Bal</th>
                <th className="px-4 py-3">Total Bal</th>
                <th className="px-4 py-3 text-center">Method</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-teal-50 transition-all duration-200 cursor-pointer"
                >
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.bank}</td>
                  <td className="px-4 py-3">{row.desc}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">{formatUSD(row.credit)}</td>
                  <td className="px-4 py-3 text-red-600 font-medium">{formatUSD(row.debit)}</td>
                  <td className="px-4 py-3">{formatUSD(row.accBal)}</td>
                  <td className="px-4 py-3">{formatUSD(row.totalBal)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-3 py-1 rounded-full text-xs bg-teal-100 text-teal-700">
                      {row.method}
                    </span>
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-5 text-sm text-gray-500">
          <span>
            Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
            {Math.min(indexOfLast, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-1">
            <button
              className={`px-3 py-1 border rounded-l-lg ${
                currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-teal-100"
              }`}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              &laquo;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 border ${
                  currentPage === i + 1
                    ? "bg-teal-500 text-white border-teal-500"
                    : "hover:bg-teal-100"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 border rounded-r-lg ${
                currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-teal-100"
              }`}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-6">
        <h2 className="text-lg font-semibold text-teal-600 border-b pb-2 mb-3">
          💡 Cash Flow Insights
        </h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          <li>Tracks how much cash is flowing in and out of your business.</li>
          <li>Focuses on actual cash movement — not just accounting profit.</li>
          <li>Helps plan payments and avoid cash shortages.</li>
        </ul>
      </div>
    </div>
  );
};

export default CashFlow;
