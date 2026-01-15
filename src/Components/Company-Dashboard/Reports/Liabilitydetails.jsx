// components/LiabilityDetails.js
import React, { useState } from "react";
import {
  Container,
  Card,
  Button,
  Table,
  Badge,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const allLiabilityDetails = {
  current: {
    title: "Current Liabilities",
    data: [
      { supplier: "Alpha Supplies", amount: "$235,000", due: "2025-07-10", status: "Pending" },
      { supplier: "QuickFin Loans", amount: "$125,000", due: "2025-08-01", status: "Active" },
      { expense: "Electricity Bill", amount: "$45,000", due: "2025-07-05", status: "Overdue" },
    ],
  },
  longTerm: {
    title: "Long-term Liabilities",
    data: [
      { loan: "Business Term Loan", amount: "$750,000", rate: "8.5%", maturity: "2030" },
      { loan: "Mortgage Loan", amount: "$425,000", rate: "7.2%", maturity: "2035" },
    ],
  },
  capital: {
    title: "Owner’s Capital",
    data: [
      { owner: "Rajesh Kumar", capital: "$1,000,000", type: "Initial Investment" },
      { owner: "Retained Earnings", capital: "$520,000", type: "Accumulated Profits" },
    ],
  },
};

// 💡 Function to calculate totals
const calculateTotal = (data, valueKey = "amount") => {
  return data
    .reduce((sum, item) => {
      const num = parseFloat(item[valueKey].replace(/[$,]/g, "")) || 0;
      return sum + num;
    }, 0)
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
};

const LiabilityDetails = () => {
  const [currentFilter, setCurrentFilter] = useState({ supplier: "", status: "", due: "" });
  const [longTermFilter, setLongTermFilter] = useState({ loan: "", maturity: "" });
  const [capitalFilter, setCapitalFilter] = useState({ owner: "", type: "" });

  const filteredCurrent = allLiabilityDetails.current.data.filter((item) => {
    const supplier = item.supplier || item.expense || "";
    return (
      supplier.toLowerCase().includes(currentFilter.supplier.toLowerCase()) &&
      (!currentFilter.status || item.status === currentFilter.status) &&
      (!currentFilter.due || item.due === currentFilter.due)
    );
  });

  const filteredLongTerm = allLiabilityDetails.longTerm.data.filter((item) => {
    return (
      item.loan.toLowerCase().includes(longTermFilter.loan.toLowerCase()) &&
      (!longTermFilter.maturity || item.maturity === longTermFilter.maturity)
    );
  });

  const filteredCapital = allLiabilityDetails.capital.data.filter((item) => {
    return (
      item.owner.toLowerCase().includes(capitalFilter.owner.toLowerCase()) &&
      item.type.toLowerCase().includes(capitalFilter.type.toLowerCase())
    );
  });

  const totalCurrent = calculateTotal(filteredCurrent, "amount");
  const totalLongTerm = calculateTotal(filteredLongTerm, "amount");
  const totalCapital = calculateTotal(filteredCapital, "capital");

  const grandTotal = (
    parseFloat(totalCurrent.replace(/[$,]/g, "")) +
    parseFloat(totalLongTerm.replace(/[$,]/g, "")) +
    parseFloat(totalCapital.replace(/[$,]/g, ""))
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Container className="py-5" style={{ fontFamily: "Poppins, sans-serif" }}>
      <Row className="align-items-center mb-4">
        <Col xs={6} className="text-start">
          <h3 className="mb-0 fw-bold" style={{ color: "#002d4d" }}>
            📉 All Liability & Capital Details
          </h3>
        </Col>

        <Col xs={6} className="text-end">
          <Button
            onClick={() => window.history.back()}
            style={{
              background: "linear-gradient(135deg, #53b2a5 0%, #009688 100%)",
              border: "none",
              padding: "6px 14px",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.9")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            ← Back to Balance Sheet
          </Button>
        </Col>
      </Row>

      {/* 🔹 Current Liabilities */}
      <Card
        className="mb-4 shadow-sm border-0"
        style={{
          borderRadius: "16px",
          transition: "0.3s",
        }}
      >
        <Card.Header
          style={{
            background: "linear-gradient(135deg, #dc3545 0%, #ff6b6b 100%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "17px",
          }}
        >
          {allLiabilityDetails.current.title}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3 g-2">
            <Col xs={12} md={4}>
              <Form.Control
                type="text"
                placeholder="Supplier / Expense"
                value={currentFilter.supplier}
                onChange={(e) => setCurrentFilter({ ...currentFilter, supplier: e.target.value })}
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Select
                value={currentFilter.status}
                onChange={(e) => setCurrentFilter({ ...currentFilter, status: e.target.value })}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
                <option value="Paid">Paid</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={3}>
              <Form.Control
                type="date"
                value={currentFilter.due}
                onChange={(e) => setCurrentFilter({ ...currentFilter, due: e.target.value })}
              />
            </Col>
            <Col xs={12} md={1}>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => setCurrentFilter({ supplier: "", status: "", due: "" })}
              >
                🗑️
              </Button>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover bordered>
              <thead className="table-light text-black">
                <tr>
                  <th>Supplier / Expense</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCurrent.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.supplier || row.expense}</td>
                    <td>{row.amount}</td>
                    <td>{row.due || "-"}</td>
                    <td>
                      <Badge
                        bg={
                          row.status === "Overdue"
                            ? "danger"
                            : row.status === "Pending"
                            ? "warning"
                            : "success"
                        }
                      >
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
                <tr className="table-light fw-bold">
                  <td colSpan="2">Total</td>
                  <td colSpan="2" className="text-end text-primary">
                    {totalCurrent}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* 🔹 Long-Term Liabilities */}
      <Card className="mb-4 shadow-sm border-0" style={{ borderRadius: "16px" }}>
        <Card.Header
          style={{
            background: "linear-gradient(135deg, #6c757d 0%, #adb5bd 100%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "17px",
          }}
        >
          {allLiabilityDetails.longTerm.title}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3 g-2">
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="Loan Type"
                value={longTermFilter.loan}
                onChange={(e) => setLongTermFilter({ ...longTermFilter, loan: e.target.value })}
              />
            </Col>
            <Col xs={12} md={5}>
              <Form.Select
                value={longTermFilter.maturity}
                onChange={(e) => setLongTermFilter({ ...longTermFilter, maturity: e.target.value })}
              >
                <option value="">All Years</option>
                <option value="2030">2030</option>
                <option value="2035">2035</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={1}>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setLongTermFilter({ loan: "", maturity: "" })}
              >
                🗑️
              </Button>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover bordered>
              <thead className="table-light text-black">
                <tr>
                  <th>Loan</th>
                  <th>Amount</th>
                  <th>Interest Rate</th>
                  <th>Maturity</th>
                </tr>
              </thead>
              <tbody>
                {filteredLongTerm.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.loan}</td>
                    <td>{row.amount}</td>
                    <td>{row.rate}</td>
                    <td>{row.maturity}</td>
                  </tr>
                ))}
                <tr className="table-light fw-bold">
                  <td colSpan="2">Total</td>
                  <td colSpan="2" className="text-end text-primary">
                    {totalLongTerm}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* 🔹 Owner’s Capital */}
      <Card className="mb-4 shadow-sm border-0" style={{ borderRadius: "16px" }}>
        <Card.Header
          style={{
            background: "linear-gradient(135deg, #198754 0%, #28a745 100%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "17px",
          }}
        >
          {allLiabilityDetails.capital.title}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3 g-2">
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="Owner / Type"
                value={capitalFilter.owner}
                onChange={(e) => setCapitalFilter({ ...capitalFilter, owner: e.target.value })}
              />
            </Col>
            <Col xs={12} md={5}>
              <Form.Select
                value={capitalFilter.type}
                onChange={(e) => setCapitalFilter({ ...capitalFilter, type: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="Initial Investment">Initial Investment</option>
                <option value="Accumulated Profits">Accumulated Profits</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={1}>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => setCapitalFilter({ owner: "", type: "" })}
              >
                🗑️
              </Button>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover bordered>
              <thead className="table-light text-black">
                <tr>
                  <th>Owner / Source</th>
                  <th>Capital</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredCapital.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.owner}</td>
                    <td>{row.capital}</td>
                    <td>{row.type}</td>
                  </tr>
                ))}
                <tr className="table-light fw-bold">
                  <td>Total</td>
                  <td colSpan="2" className="text-end text-primary">
                    {totalCapital}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* 🏁 Grand Total */}
      <Card
        className="text-center shadow-sm border-0"
        style={{
          borderRadius: "12px",
          background: "linear-gradient(135deg, #007bff 0%, #00c6ff 100%)",
          color: "white",
        }}
      >
        <Card.Body>
          <h5 className="fw-bold mb-0">
            Grand Total of Liabilities & Capital: {grandTotal}
          </h5>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LiabilityDetails;
