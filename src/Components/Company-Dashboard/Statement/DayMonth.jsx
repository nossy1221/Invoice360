import React, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { FaCalendarAlt, FaUserTie } from "react-icons/fa";

const ClientDetailsWithDate = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    day: "",
    month: "",
    year: "",
  });

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 50 }, (_, i) => 2025 - i);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `✅ Client Saved!\n\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n📧 Email: ${formData.email}\n🏠 Address: ${formData.address}\n📅 Date: ${formData.day} ${formData.month} ${formData.year}`
    );
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      day: "",
      month: "",
      year: "",
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start flex-column"
      style={{
        minHeight: "100vh",
        background: "#f4fff6",
        padding: "40px 60px",
      }}
    >
      <Card
        className="border-0 rounded-4 w-100"
        style={{
          background: "#ffffff",
          color: "#333",
          boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
          padding: "30px 40px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = "0 6px 25px rgba(51,136,113,0.25)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "0 2px 15px rgba(0,0,0,0.1)")
        }
      >
        {/* Header */}
        <div
          className="d-flex align-items-center justify-content-start gap-3 mb-4"
          style={{
            borderBottom: "2px solid rgba(51,136,113,0.2)",
            paddingBottom: "15px",
          }}
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "55px",
              height: "55px",
              background: "rgba(51,136,113,0.1)",
              color: "#3daaaa",
            }}
          >
            <FaUserTie size={24} />
          </div>
          <div>
            <h4 className="fw-bold mb-1" style={{ color: "#3daaaa" }}>
              Client Details
            </h4>
            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
              Fill in client info and date details
            </p>
          </div>
        </div>

        {/* Form */}
        <Form onSubmit={handleSubmit}>
          <Row className="g-4 mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Client Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter client name"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Date Section */}
          <div className="d-flex align-items-center gap-2 mb-3">
            <FaCalendarAlt size={20} color="#3daaaa" />
            <h6 className="fw-bold mb-0" style={{ color: "#3daaaa" }}>
              Select Date
            </h6>
          </div>
          <Row className="g-3">
            <Col md={4}>
              <Form.Select name="day" value={formData.day} onChange={handleChange} required>
                <option value="">Day</option>
                {days.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Select name="month" value={formData.month} onChange={handleChange} required>
                <option value="">Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Select name="year" value={formData.year} onChange={handleChange} required>
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {/* Buttons */}
          <div className="text-end mt-5">
            <Button
              type="button"
              variant="outline-secondary"
              className="me-3 px-4 rounded-pill"
              onClick={handleReset}
              style={{
                borderColor: "#338871",
                color: "#338871",
              }}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="px-4 rounded-pill"
              style={{
                backgroundColor: "#338871",
                border: "none",
                fontWeight: "600",
              }}
            >
              Save Client
            </Button>
          </div>
        </Form>

        {/* Show result */}
        {formData.name && formData.day && formData.month && formData.year && (
          <div className="text-center mt-4">
            <h6 className="fw-bold text-success">
              Client <span style={{ color: "#3daaaa" }}>{formData.name}</span> added for{" "}
              {formData.day} {formData.month} {formData.year}
            </h6>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClientDetailsWithDate;
