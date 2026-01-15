import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BalanceSheet = () => (
  <div
    style={{
      background: "linear-gradient(135deg, #dbe9f4, #f7f9fb)",
      minHeight: "100vh",
      paddingBottom: 60,
      transition: "all 0.4s ease",
    }}
  >
    <Container fluid className="py-4">
      <div
        className="text-center mb-2"
        style={{
          fontSize: 38,
          color: "#003049",
          fontWeight: 700,
          letterSpacing: 1,
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        💼 Balance Sheet
      </div>
      <div
        className="text-center mb-5"
        style={{
          color: "#6c757d",
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: 0.5,
        }}
      >
        As on <b>8 July 2025</b>
      </div>

      <Row className="g-4 justify-content-center">
        {/* ASSETS CARD */}
        <Col xs={12} md={6}>
          <Card
            style={{
              borderRadius: 20,
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.08)";
            }}
          >
            <Card.Body>
              <Row className="align-items-center mb-3">
                <Col
                  xs={6}
                  style={{
                    fontWeight: 700,
                    fontSize: 24,
                    color: "#003049",
                  }}
                >
                  ASSETS
                </Col>

                <Col xs={6} className="text-end">
                  <Link
                    to="/company/balancesheet/asstedetails"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      size="sm"
                      style={{
                        background: "linear-gradient(135deg, #4ac7b3, #3a9d88)",
                        border: "none",
                        padding: "8px 16px",
                        fontSize: 14,
                        fontWeight: 600,
                        borderRadius: 10,
                        color: "#fff",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.08)";
                        e.currentTarget.style.boxShadow =
                          "0 5px 15px rgba(0,0,0,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                          "0 3px 8px rgba(0,0,0,0.15)";
                      }}
                    >
                      View Asset Details
                    </Button>
                  </Link>
                </Col>
              </Row>

              {/* Current Assets */}
              <Section title="Current Assets" data={[
                ["Cash", "R75,000"],
                ["Bank", "R245,000"],
                ["Stock", "R320,000"],
                ["Accounts Receivable", "R185,000"],
                ["Total Current Assets", "R825,000", true],
              ]} />

              {/* Fixed Assets */}
              <Section title="Fixed Assets" data={[
                ["Land & Building", "R1,250,000"],
                ["Plant & Machinery", "R875,000"],
                ["Furniture & Fixtures", "R150,000"],
                ["Total Fixed Assets", "R2,275,000", true],
              ]} />

              <hr className="my-3" />
              <Row>
                <Col
                  xs={7}
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#002d4d",
                  }}
                >
                  Total Assets
                </Col>
                <Col
                  xs={5}
                  className="text-end"
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#003049",
                    background:
                      "linear-gradient(90deg, #a3e4db, #c2f0e8)",
                    borderRadius: 8,
                    padding: "4px 8px",
                    transition: "all 0.3s ease",
                  }}
                >
                  R3,100,000
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* LIABILITIES & CAPITAL CARD */}
        <Col xs={12} md={6}>
          <Card
            style={{
              borderRadius: 20,
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.08)";
            }}
          >
            <Card.Body>
              <Row className="align-items-center mb-3">
                <Col
                  xs={6}
                  style={{
                    fontWeight: 700,
                    fontSize: 24,
                    color: "#003049",
                  }}
                >
                  LIABILITIES & CAPITAL
                </Col>
                <Col xs={6} className="text-end">
                  <Link
                    to="/company/balancesheet/liabilitydetails"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      size="sm"
                      style={{
                        background: "linear-gradient(135deg, #4ac7b3, #3a9d88)",
                        border: "none",
                        padding: "8px 16px",
                        fontSize: 14,
                        fontWeight: 600,
                        borderRadius: 10,
                        color: "#fff",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.08)";
                        e.currentTarget.style.boxShadow =
                          "0 5px 15px rgba(0,0,0,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                          "0 3px 8px rgba(0,0,0,0.15)";
                      }}
                    >
                      View Liability Details
                    </Button>
                  </Link>
                </Col>
              </Row>

              {/* Sections */}
              <Section title="Current Liabilities" data={[
                ["Accounts Payable", "R235,000"],
                ["Short-term Loans", "R125,000"],
                ["Outstanding Expenses", "R45,000"],
                ["Total Current Liabilities", "R405,000", true],
              ]} />

              <Section title="Long-term Liabilities" data={[
                ["Term Loan", "R750,000"],
                ["Mortgage Loan", "R425,000"],
                ["Total Long-term Liabilities", "R1,175,000", true],
              ]} />

              <Section title="Owner’s Capital" data={[
                ["Capital", "R1,000,000"],
                ["Retained Earnings", "R520,000"],
                ["Total Owner’s Capital", "R1,520,000", true],
              ]} />

              <hr className="my-3" />
              <Row>
                <Col xs={7} style={{ fontWeight: 700, fontSize: 18, color: "#002d4d" }}>
                  Total Liabilities & Capital
                </Col>
                <Col xs={5} className="text-end" style={{
                  fontWeight: 700, fontSize: 18, color: "#003049",
                  background: "linear-gradient(90deg, #a3e4db, #c2f0e8)",
                  borderRadius: 8, padding: "4px 8px",
                }}>
                  R3,100,000
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer note */}
      <div className="text-center mt-5">
        <small
          style={{
            display: "inline-block",
            fontSize: 15,
            fontWeight: 500,
            color: "#003049",
            background: "rgba(255,255,255,0.6)",
            padding: "12px 20px",
            borderRadius: 10,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            backdropFilter: "blur(6px)",
          }}
        >
          📘 The Balance Sheet represents your business’s financial position — <b>Assets = Liabilities + Capital</b>.
        </small>
      </div>
    </Container>
  </div>
);

// 🔹 Reusable Section Component
const Section = ({ title, data }) => (
  <>
    <div
      style={{
        color: "#002d4d",
        fontWeight: 600,
        fontSize: 17,
        marginBottom: 10,
        marginTop: 20,
      }}
    >
      {title}
    </div>
    {data.map(([label, value, isTotal], idx) => (
      <Row
        key={idx}
        className="mb-2"
        style={{
          backgroundColor: isTotal
            ? "#f1f9f7"
            : idx % 2 === 0
            ? "#fff"
            : "#f9fbfc",
          borderRadius: 8,
          padding: "6px 8px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#e0f3ef")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = isTotal
            ? "#f1f9f7"
            : idx % 2 === 0
            ? "#fff"
            : "#f9fbfc")
        }
      >
        <Col
          xs={7}
          style={{
            fontSize: 16,
            fontWeight: isTotal ? 700 : 500,
            color: isTotal ? "#000" : "#495057",
          }}
        >
          {label}
        </Col>
        <Col
          xs={5}
          className="text-end"
          style={{
            fontSize: 16,
            fontWeight: isTotal ? 700 : 500,
            color: isTotal ? "#000" : "#495057",
          }}
        >
          {value}
        </Col>
      </Row>
    ))}
  </>
);

export default BalanceSheet;
