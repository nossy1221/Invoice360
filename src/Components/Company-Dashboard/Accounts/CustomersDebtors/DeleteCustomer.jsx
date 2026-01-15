import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { toast } from "react-toastify";

const DeleteCustomer = ({ show, onHide, onConfirm, customerId }) => {
  const [error, setError] = useState(null);

  const handleDelete = () => {
    if (!customerId) {
      const errorMsg = "Customer ID is missing";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    try {
      setError(null);
      
      // Simulate successful deletion
      onConfirm();
      onHide();
      toast.success("Customer deleted successfully");
    } catch (err) {
      console.error("Error deleting customer:", err);
      const errorMessage = "An error occurred while deleting customer";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>Are you sure you want to delete this customer?</p>
        <p className="text-muted">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button 
          variant="danger" 
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCustomer;