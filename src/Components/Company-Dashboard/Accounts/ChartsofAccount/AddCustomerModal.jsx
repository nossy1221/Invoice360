import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const AddCustomerModal = ({ show, onHide, onSave, customerFormData, setCustomerFormData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call with timeout instead of actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock response object
      const mockResponse = {
        status: true,
        message: "Customer saved successfully",
        data: {
          id: Date.now().toString(),
          ...customerFormData,
          account_type: 'Sundry Debtors',
          balance_type: 'Debit',
          created_at: new Date().toISOString()
        }
      };
      
      // Call onSave callback with mock response data
      onSave(mockResponse);
      
      // Reset form after successful submission
      setCustomerFormData({
        name: '',
        nameArabic: '',
        companyName: '',
        companyLocation: '',
        accountName: '',
        accountBalance: '0.00',
        creationDate: '',
        bankAccountNumber: '',
        bankIFSC: '',
        bankName: '',
        country: '',
        state: '',
        pincode: '',
        address: '',
        stateCode: '',
        shippingAddress: '',
        phone: '',
        email: '',
        creditPeriod: '',
        gstEnabled: false,
        gstin: '',
        idCardImage: null,
        extraFile: null,
      });
      
      // Close modal
      onHide();
      
    } catch (error) {
      console.error('Error saving customer:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>Add Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                      accountName: customerFormData.name === customerFormData.accountName 
                        ? value 
                        : customerFormData.accountName,
                    });
                  }}
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
                  placeholder="Add Location"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>ID Card Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      idCardImage: e.target.files[0],
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Any File</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setCustomerFormData({
                      ...customerFormData,
                      extraFile: e.target.files[0],
                    })
                  }
                />
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
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: "#53b2a5", border: "none" }}
          onClick={handleSave}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Customer'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCustomerModal;