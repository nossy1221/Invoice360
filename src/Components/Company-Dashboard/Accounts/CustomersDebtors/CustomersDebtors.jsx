import React, { useState, useRef } from "react";
import { Button, Table, InputGroup, Form, Card } from "react-bootstrap";
import {
  FaFileImport,
  FaFileExport,
  FaDownload,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dummy Data
const initialCustomers = [
  {
    id: 1,
    nameEnglish: "ABC Supplies Ltd",
    nameArabic: "شركة ABC للمستلزمات",
    email: "contact@abcsupplies.com",
    phone: "+1234567890",
    accountType: "Sundry Creditors",
    accountName: "Accounts Payable",
  },
  {
    id: 2,
    nameEnglish: "XYZ Manufacturing",
    nameArabic: "شركة XYZ للتصنيع",
    email: "info@xyzmanufacturing.com",
    phone: "+0987654321",
    accountType: "Sundry Creditors",
    accountName: "Accounts Payable",
  },
  {
    id: 3,
    nameEnglish: "Global Tech Solutions",
    nameArabic: "حلول التكنولوجيا العالمية",
    email: "sales@globaltech.com",
    phone: "+1122334455",
    accountType: "Sundry Creditors",
    accountName: "Accounts Payable",
  },
];

function CustomersDebtors() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef();

  const filtered = customers.filter(
    (c) =>
      c.nameEnglish.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(customers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");
    XLSX.writeFile(wb, "customers.xlsx");
    toast.success("Customer data exported!");
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center py-5 px-3"
      style={{
        background: "linear-gradient(120deg, #f8fafc, #e9ecef)",
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-100 d-flex justify-content-between align-items-center flex-nowrap mb-4 pb-2 border-bottom"
        style={{ maxWidth: "1200px" }}
      >
        <h5
          className="fw-semibold text-2xl mb-0"
          style={{
            color: "#212529",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.3px",
          }}
        >
          🧾 Customer Management
        </h5>

        <div className="d-flex align-items-center gap-2 flex-nowrap">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              className="d-flex align-items-center border-0 px-3 py-1 rounded-pill shadow-sm text-white"
              style={{
                background: "linear-gradient(135deg, #43cea2, #185a9d)",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <FaFileImport className="me-2" /> Import
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              className="d-flex align-items-center border-0 px-3 py-1 rounded-pill shadow-sm text-white"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
              }}
              onClick={handleExport}
            >
              <FaFileExport className="me-2" /> Export
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              className="d-flex align-items-center border-0 px-3 py-1 rounded-pill shadow-sm text-dark"
              style={{
                background: "linear-gradient(135deg, #f7971e, #ffd200)",
              }}
            >
              <FaDownload className="me-2" /> Download
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              className="d-flex align-items-center border-0 px-3 py-1 rounded-pill shadow-sm text-white"
              style={{
                background: "linear-gradient(135deg, #ff512f, #dd2476)",
              }}
            >
              <FaPlus className="me-2" /> Add
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: "1200px", width: "100%" }}
        className="mb-3"
      >
        <InputGroup className="shadow-sm rounded-pill overflow-hidden">
          <InputGroup.Text className="bg-white border-end-0">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-start-0"
          />
        </InputGroup>
      </motion.div>

      {/* Animated Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="table-responsive rounded-4 shadow-sm"
        style={{
          maxWidth: "1200px",
          background: "white",
          border: "1px solid #e5e5e5",
        }}
      >
        <Table bordered hover className="align-middle text-center mb-0">
          <thead
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            <tr className="text-black">
              <th className="text-black">NO.</th>
              <th className="text-black">NAME (ENGLISH)</th>
              <th className="text-black">NAME (ARABIC)</th>
              <th className="text-black">EMAIL</th>
              <th className="text-black">PHONE</th>
              <th className="text-black">ACCOUNT TYPE</th>
              <th className="text-black">ACCOUNT NAME</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((cust, index) => (
                <motion.tr
                  key={cust.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#f8f9fa", scale: 1.01 }}
                >
                  <td>{index + 1}</td>
                  <td className="fw-semibold text-dark">
                    {cust.nameEnglish}
                  </td>
                  <td dir="rtl">{cust.nameArabic}</td>
                  <td>{cust.email}</td>
                  <td>{cust.phone}</td>
                  <td>
                    <span
                      className="badge text-white px-3 py-2 rounded-pill"
                      style={{
                        backgroundColor: "#00b9f1",
                        fontWeight: 500,
                      }}
                    >
                      {cust.accountType}
                    </span>
                  </td>
                  <td>{cust.accountName}</td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-muted">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </motion.div>

      {/* Info Section */}
      <Card className="mt-4 p-4 w-full rounded-4 shadow-sm" style={{ maxWidth: "1200px" }}>
        <Card.Body>
          <h5 className="fw-semibold text-primary border-bottom pb-2 mb-3">
            📋 Page Info
          </h5>
        
        <ul
  className="text-muted mb-0 ps-3"
  style={{
    fontSize: "0.95rem",
    listStyleType: "none",
    lineHeight: "1.9rem",
  }}
>
  {[
    "Manage customer records and contact details easily.",
    "Perform add, edit, import, and export operations.",
    "Track account balances and GST information.",
    "Smart search and animated UI for better visibility.",
  ].map((text, i) => (
    <motion.li
      key={i}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
      className="d-flex align-items-start gap-2"
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          background: "linear-gradient(135deg, #43cea2, #185a9d)",
          borderRadius: "50%",
          marginTop: "7px",
          flexShrink: 0,
          boxShadow: "0 0 4px rgba(0,0,0,0.2)",
        }}
      ></span>
      <span>{text}</span>
    </motion.li>
  ))}
</ul>

        </Card.Body>
      </Card>
    </div>
  );
}

export default CustomersDebtors;





  //  