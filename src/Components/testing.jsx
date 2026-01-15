import React, { useState, useCallback, useMemo } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalForm = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = useCallback(() => {
    setShow(false);
    setShowSuccess(false);
  }, []);

  const handleShow = useCallback(() => setShow(true), []);

  const handleChange = useCallback((e) => {
    e.persist(); // 🔧 Keep event alive through async updates
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowSuccess(true);
  }, [formData]);

  // Memoize modal to prevent unnecessary re-renders
  const modalContent = useMemo(() => (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      onClick={(e) => e.stopPropagation()} // 🔧 Block event bubbling
    >
      <Modal.Header closeButton>
        <Modal.Title>Contact Form</Modal.Title>
      </Modal.Header>

      <Modal.Body onClick={(e) => e.stopPropagation()}>
        {showSuccess && (
          <div className="alert alert-success">
            Form submitted successfully!
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="feedback">Feedback</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Your message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  ), [show, handleClose, formData, handleChange, handleSubmit, showSuccess]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Form Modal
      </Button>
      {modalContent}
    </>
  );
};

export default React.memo(ModalForm);