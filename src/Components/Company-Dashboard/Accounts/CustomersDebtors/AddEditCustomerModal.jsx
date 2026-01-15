import React, { useState } from "react";
import { Button, Col, Form, Modal, Row, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEditCustomerModal = ({
  show,
  onHide,
  editMode,
  customerFormData,
  setCustomerFormData,
  onSave,
  customerId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveCustomer = () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Basic form validation
      if (!customerFormData.name.trim()) {
        setError("Customer name is required");
        toast.error("Customer name is required");
        setIsSubmitting(false);
        return;
      }

      if (!customerFormData.phone.trim()) {
        setError("Phone number is required");
        toast.error("Phone number is required");
        setIsSubmitting(false);
        return;
      }

      if (!customerFormData.email.trim()) {
        setError("Email is required");
        toast.error("Email is required");
        setIsSubmitting(false);
        return;
      }

      // Create a copy of the form data to save
      const customerToSave = { ...customerFormData };
      
      // Call the onSave function with the customer data
      onSave(customerToSave, editMode ? "edit" : "add");
      
      // Show success message
      toast.success(editMode ? "Customer updated successfully!" : "Customer added successfully!");
      
      // Close the modal
      onHide();
    } catch (error) {
      console.error("Error saving customer:", error);
      const errorMessage = "An error occurred while saving customer";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIdCardImageChange = (e) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.match("image.*")) {
        if (validateImageFile(file)) {
          setCustomerFormData({
            ...customerFormData,
            idCardImage: file,
          });
        } else {
          setError(
            "Invalid ID card image. Please upload a valid image file (JPEG, PNG, or JPG under 5MB)."
          );
          toast.error(
            "Invalid ID card image. Please upload a valid image file (JPEG, PNG, or JPG under 5MB)."
          );
        }
      } else {
        setError("Please select an image file for ID card");
        toast.error("Please select an image file for ID card");
      }
    }
  };

  const handleExtraFileChange = (e) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.match("image.*")) {
        if (validateImageFile(file)) {
          setCustomerFormData({
            ...customerFormData,
            extraFile: file,
          });
        } else {
          setError(
            "Invalid image file. Please upload a valid image file (JPEG, PNG, or JPG under 5MB)."
          );
          toast.error(
            "Invalid image file. Please upload a valid image file (JPEG, PNG, or JPG under 5MB)."
          );
        }
      } else {
        setCustomerFormData({
          ...customerFormData,
          extraFile: file,
        });
      }
    }
  };

  const validateImageFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) return false;
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) return false;
    return true;
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>{editMode ? "Edit Customer" : "Add Customer"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Name (English)</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCustomerFormData({
                      ...customerFormData,
                      name: value,
                      accountName:
                        customerFormData.name === customerFormData.accountName
                          ? value
                          : customerFormData.accountName,
                    });
                  }}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Name (Arabic)</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.nameArabic}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      nameArabic: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.companyName}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      companyName: e.target.value,
                    })
                  }
                  placeholder="Enter company name"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Company Google Location</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.companyLocation}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      companyLocation: e.target.value,
                    })
                  }
                  placeholder="Enter Google Maps link"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>ID Card Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleIdCardImageChange}
                />
                {customerFormData.idCardImage ? (
                  <div className="mt-2">
                    <small className="text-muted">
                      {customerFormData.idCardImage instanceof File
                        ? customerFormData.idCardImage.name
                        : "Previously uploaded"}
                    </small>
                  </div>
                ) : editMode ? (
                  <div className="mt-2">
                    <small className="text-muted">
                      Previously uploaded (re-upload to change)
                    </small>
                  </div>
                ) : null}
                <Form.Text className="text-muted">
                  JPEG, PNG or JPG (max 5MB)
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Any File</Form.Label>
                <Form.Control type="file" onChange={handleExtraFileChange} />
                {customerFormData.extraFile ? (
                  <div className="mt-2">
                    <small className="text-muted">
                      {customerFormData.extraFile instanceof File
                        ? customerFormData.extraFile.name
                        : "Previously uploaded"}
                    </small>
                  </div>
                ) : editMode ? (
                  <div className="mt-2">
                    <small className="text-muted">
                      Previously uploaded (re-upload to change)
                    </small>
                  </div>
                ) : null}
                <Form.Text className="text-muted">
                  Any file type. If image, max 5MB
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Account Type</Form.Label>
                <Form.Control
                  type="text"
                  value="Sundry Debtors"
                  readOnly
                  disabled
                  style={{ backgroundColor: "#fff" }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Balance Type</Form.Label>
                <Form.Control
                  type="text"
                  value="Debit"
                  readOnly
                  disabled
                  style={{ backgroundColor: "#fff" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Account Name</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.accountName}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      accountName: e.target.value,
                    })
                  }
                  placeholder=""
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Account Balance</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={customerFormData.accountBalance}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCustomerFormData({
                      ...customerFormData,
                      accountBalance: value || "0.00",
                    });
                  }}
                  placeholder="Enter account balance"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Creation Date</Form.Label>
                <Form.Control
                  type="date"
                  value={customerFormData.creationDate}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      creationDate: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Bank Account Number</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.bankAccountNumber}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      bankAccountNumber: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Bank IFSC</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.bankIFSC}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      bankIFSC: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Bank Name & Branch</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.bankName}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      bankName: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.country}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      country: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.state}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      state: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.pincode}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      pincode: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.address}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>State Code</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.stateCode}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      stateCode: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.shippingAddress}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      shippingAddress: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={customerFormData.phone}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={customerFormData.email}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Credit Period (days)</Form.Label>
                <Form.Control
                  type="number"
                  value={customerFormData.creditPeriod}
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      creditPeriod: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="d-flex align-items-center">
                {customerFormData.gstEnabled && (
                  <div className="flex-grow-1 me-3">
                    <Form.Label>GSTIN</Form.Label>
                    <Form.Control
                      type="text"
                      value={customerFormData.gstin}
                      onChange={(e) =>
                        setCustomerFormData({
                          ...customerFormData,
                          gstin: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                <div>
                  <Form.Label className="me-2">Enable</Form.Label>
                  <Form.Check
                    type="switch"
                    id="gstin-toggle"
                    checked={customerFormData.gstEnabled}
                    onChange={(e) =>
                      setCustomerFormData({
                        ...customerFormData,
                        gstEnabled: e.target.checked,
                        gstin: e.target.checked ? customerFormData.gstin : "",
                      })
                    }
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: "#53b2a5", border: "none" }}
          onClick={handleSaveCustomer}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : editMode
            ? "Update Customer"
            : "Save Customer"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditCustomerModal;