import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { FaCheck, FaCrown } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Pages.css";

const Pricing = () => {
  const staticPlans = [
    {
      name: "Bronze",
      price: 129.0,
      billing_cycle: "Monthly",
      modules: [
        "Admin dashboard",
        "Dashboard Overview",
        "Single User",
        "Client Statements",
        "Invoicing and Quoting",
        "Recurring Invoices",
        "Send quote via WhatsApp",
      ],
    },
    {
      name: "Silver",
      price: 169.0,
      billing_cycle: "Monthly",
      modules: [
        "Admin dashboard",
        "Dashboard Overview",
        "Multi users - 2+",
        "Multi Store Inventory Management",
        "Client Statements",
        "Invoicing and Quoting",
        "Expense Management",
        "Recurring Invoices",
        "Payment Tracking",
        "Accounting Reports",
        "Send quote via WhatsApp",
        "Tax Calculation",
        "Expense Tracking",
        "WhatsApp",
      ],
    },
    {
      name: "Gold",
      price: 249.0,
      billing_cycle: "Monthly",
      modules: [
        "Admin dashboard",
        "Dashboard Overview",
        "Multi users - 5+",
        "Multi Store Inventory Management",
        "Client Statements",
        "Invoicing and Quoting",
        "Expense Management",
        "Recurring Invoices",
        "Payment Tracking",
        "Accounting Reports",
        "Send quote via WhatsApp",
        "Tax Calculation",
        "Expense Tracking",
        "WhatsApp",
        "Bank Reconciliation",
        "Financial Reports",
      ],
    },
  ];

  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingDuration, setBillingDuration] = useState("Monthly");
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    startDate: "",
  });

  useEffect(() => {
    const mappedPlans = staticPlans.map((plan) => {
      let buttonColor = "#007bff";
      const nameLower = plan.name.toLowerCase();
      if (nameLower === "bronze") buttonColor = "#b87333";
      else if (nameLower === "silver") buttonColor = "#C0C0C0";
      else if (nameLower === "gold") buttonColor = "#FFD700";

      const features = plan.modules.map((mod) => ({
        text: mod,
        included: true,
      }));

      return {
        name: plan.name,
        price: plan.price,
        duration: plan.billing_cycle,
        buttonColor,
        btnText: `Buy ${plan.name}`,
        features,
      };
    });

    setPlans(mappedPlans);
    AOS.init({ duration: 1000 });
  }, []);

  const handleBuyClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleDurationChange = (e) => setBillingDuration(e.target.value);
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      plan: selectedPlan.name,
      billing: billingDuration,
      price:
        billingDuration === "Monthly"
          ? selectedPlan.price
          : selectedPlan.price * 12,
      ...formData,
    });
    alert("Thank you! We'll contact you shortly.");
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
    setFormData({ companyName: "", email: "", startDate: "" });
  };

  return (
    <div className="py-5" style={{ background: "#f8f9fa" }}>
      <Container>
        <Row className="text-center mb-5">
          <h2 className="fw-bold">Our Pricing Plans</h2>
          <p className="text-muted">
            Choose the plan that fits your business needs
          </p>
        </Row>

        <Row className="justify-content-center">
          {plans.map((plan, idx) => (
            <Col
              key={idx}
              md={6}
              lg={4}
              className="mb-4"
              data-aos="zoom-in"
              data-aos-delay={idx * 150}
            >
              <div
                className="p-4 rounded shadow-sm h-100"
                style={{
                  background: "#fff",
                  borderTop: `4px solid ${plan.buttonColor}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 25px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                }}
              >
                <div className="text-center mb-3">
                  <FaCrown
                    size={28}
                    style={{ color: plan.buttonColor, marginBottom: "8px" }}
                  />
                  <h5 className="fw-bold">{plan.name}</h5>
                  <small className="text-muted">{plan.duration}</small>
                  <h3 className="my-3" style={{ color: plan.buttonColor }}>
                    R{plan.price}
                  </h3>
                </div>

                <ul className="list-unstyled mb-4">
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      className="d-flex align-items-start mb-2"
                      style={{ fontSize: "0.95rem" }}
                    >
                      <FaCheck className="text-success me-2 mt-1" />
                      {feat.text}
                    </li>
                  ))}
                </ul>

                <Button
                  style={{
                    backgroundColor: plan.buttonColor,
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    width: "100%",
                    padding: "0.75rem 1rem",
                  }}
                  onClick={() => handleBuyClick(plan)}
                >
                  {plan.btnText}
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Purchase Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Complete Your Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPlan && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Selected Plan</Form.Label>
                <Form.Control value={selectedPlan.name} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Billing Duration</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Monthly"
                    name="billingDuration"
                    value="Monthly"
                    checked={billingDuration === "Monthly"}
                    onChange={handleDurationChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Yearly"
                    name="billingDuration"
                    value="Yearly"
                    checked={billingDuration === "Yearly"}
                    onChange={handleDurationChange}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                style={{
                  backgroundColor: selectedPlan.buttonColor,
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  width: "100%",
                  padding: "0.75rem 1rem",
                }}
              >
                Confirm Purchase
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Pricing;
