import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const VatReport = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [filterType, setFilterType] = useState("All");

  const types = ["All", "Outward Supplies", "Inward Supplies", "Adjustments", "Exempt Supplies"];

  const vatEntries = [
    {
      type: "Outward Supplies",
      description: "Sales to GCC customers",
      taxableAmount: 15000,
      vatRate: 5,
      vatAmount: 750,
    },
    {
      type: "Inward Supplies",
      description: "Purchase from GCC vendors",
      taxableAmount: 9000,
      vatRate: 5,
      vatAmount: 450,
    },
    {
      type: "Adjustments",
      description: "Credit note issued",
      taxableAmount: -2000,
      vatRate: 5,
      vatAmount: -100,
    },
    {
      type: "Exempt Supplies",
      description: "Exported goods (zero-rated)",
      taxableAmount: 5000,
      vatRate: 0,
      vatAmount: 0,
    },
  ];

  const filteredRows = vatEntries.filter(
    (e) => filterType === "All" || e.type === filterType
  );

  return (
    <div
      className="p-4 mt-4"
      style={{
        background: "linear-gradient(180deg, #f8f9fa, #e9f7f6)",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <h4
        className="fw-bold text-center mb-2"
        style={{
          color: "#004e4d",
          letterSpacing: "0.5px",
          textShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        GCC VAT Return Report
      </h4>
      <p className="text-center text-muted mb-4">
        Auto-generated VAT summary.
      </p>

      {/* 🔍 Filter Section */}
      <div
        className="shadow-sm rounded-4 p-4 mb-4 border"
        style={{
          backgroundColor: "white",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.01)";
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
        }}
      >
        <Row className="g-3 align-items-end">
          <Col md={4}>
            <Form.Label className="fw-semibold">Choose Date</Form.Label>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable
              className="form-control shadow-sm"
              dateFormat="dd/MM/yyyy"
            />
          </Col>
          <Col md={4}>
            <Form.Label className="fw-semibold">Transaction Type</Form.Label>
            <Form.Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="shadow-sm"
            >
              {types.map((t, i) => (
                <option key={i}>{t}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Button
              variant=""
              style={{
                backgroundColor: "#27b2b6",
                borderColor: "#27b2b6",
                color: "white",
                width: "100%",
                transition: "all 0.2s ease",
              }}
              className="py-2"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1f989b";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#27b2b6";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Generate Report
            </Button>
          </Col>
        </Row>
      </div>

      {/* 📊 VAT Table */}
      <Card
        className="rounded-4 p-4 border-0 shadow-sm"
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.01)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h5 className="fw-bold mb-2 mb-md-0 text-primary">VAT Summary</h5>
          <div className="d-flex gap-2">
            <Button
              variant="outline-danger"
              size="sm"
              style={{
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#dc3545";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#dc3545";
              }}
            >
              <FaFilePdf />
            </Button>
            <Button
              variant="outline-success"
              size="sm"
              style={{
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#198754";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#198754";
              }}
            >
              <FaFileExcel />
            </Button>
          </div>
        </div>

        <Table hover responsive className="text-nowrap mb-0 align-middle">
          <thead className="bg-light text-dark fw-semibold">
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Taxable Amount</th>
              <th>VAT Rate (%)</th>
              <th>VAT Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e9f7f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                <td>{row.type}</td>
                <td>{row.description}</td>
                <td>R{row.taxableAmount.toFixed(2)}</td>
                <td>{row.vatRate}%</td>
                <td>R{row.vatAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* 📘 Page Info */}
      <Card
        className="mb-4 p-3 shadow rounded-4 mt-4"
        style={{
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.01)";
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.08)";
        }}
      >
        <Card.Body>
          <h5 className="fw-semibold border-bottom pb-2 mb-3 text-primary">
            Page Info
          </h5>
          <ul
            className="text-muted fs-6 mb-0"
            style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}
          >
            <li>
              VAT (Value Added Tax) is an indirect tax applied on the sale of
              goods and services.
            </li>
            <li>
              It is charged at every stage of the supply chain — from
              manufacturer to retailer.
            </li>
            <li>
              The final consumer ultimately bears the VAT cost while businesses
              collect and remit it.
            </li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VatReport;
