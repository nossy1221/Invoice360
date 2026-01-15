import React, { useState } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import AddProductModal from '../../Inventory/AddProductModal';

const QuotationTab = ({
  formData,
  handleChange,
  handleItemChange,
  addItem,
  removeItem,
  renderItemsTable,
  renderAttachmentFields,
  calculateTotalAmount,
  calculateTotalWithTaxAndDiscount,
  handleSkip,
  handleSaveDraft,
  handleSaveNext,
  handleNext,
  showAdd,
  showEdit,
  newItem,
  categories,
  newCategory,
  showUOMModal,
  showAddCategoryModal,
  setShowAdd,
  setShowEdit,
  setShowUOMModal,
  setShowAddCategoryModal,
  setNewCategory,
  handleProductChange,
  handleAddItem,
  handleUpdateItem,
  handleAddCategory
}) => {
  const navigate = useNavigate();
  
  // Static company data instead of API fetch
  const [companyInfo] = useState({
    name: 'Your Company Name',
    email: 'company@example.com',
    logo_url: null
  });

  // Static customer data instead of API fetch
  const [customerList] = useState([
    { id: 1, name_english: 'Customer A', address: '123 Main St', email: 'customerA@example.com', phone: '555-1234' },
    { id: 2, name_english: 'Customer B', address: '456 Oak Ave', email: 'customerB@example.com', phone: '555-5678' },
    { id: 3, name_english: 'Customer C', address: '789 Pine Rd', email: 'customerC@example.com', phone: '555-9012' }
  ]);

  return (
    <Form>
      {/* Header: Logo + Company Info + Title */}
      <Row className="mb-4 mt-3">
        <Col md={3} className="d-flex align-items-center justify-content-center">
          <div
            className="border rounded d-flex flex-column align-items-center justify-content-center"
            style={{ height: "120px", width: "100%", borderStyle: "dashed", cursor: "pointer", overflow: "hidden" }}
            onClick={() => document.getElementById('logo-upload')?.click()}
          >
            {companyInfo.logo_url ? (
              <img
                src={companyInfo.logo_url.trim()}
                alt="Company Logo"
                style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
              />
            ) : (
              <>
                <FontAwesomeIcon icon={faUpload} size="2x" className="text-muted" />
                <small>Upload Logo</small>
              </>
            )}
            <input id="logo-upload" type="file" accept="image/*" hidden />
          </div>
        </Col>
        <Col md={6}>
          <div className="d-flex flex-column gap-1">
            {/* Company Name - Static value */}
            <Form.Control
              type="text"
              value={companyInfo.name || ''}
              readOnly
              placeholder="Company Name"
              className="form-control-no-border"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", fontWeight: "bold" }}
            />
            {/* Address - editable */}
            <Form.Control
              type="text"
              value={formData.quotation.companyAddress}
              onChange={(e) => handleChange("quotation", "companyAddress", e.target.value)}
              placeholder="Company Address, City, State, Pincode......."
              className="form-control-no-border"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
            />
            {/* Email - Static value */}
            <Form.Control
              type="email"
              value={companyInfo.email || ''}
              readOnly
              placeholder="Company Email"
              className="form-control-no-border"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
            />
            {/* Phone - editable */}
            <Form.Control
              type="text"
              value={formData.quotation.companyPhone}
              onChange={(e) => handleChange("quotation", "companyPhone", e.target.value)}
              placeholder="Phone No........"
              className="form-control-no-border"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
            />
          </div>
        </Col>
        <Col md={3} className="d-flex flex-column align-items-end justify-content-center">
          <h2 className="text-success mb-0">QUOTATION</h2>
          <hr
            style={{
              width: "80%",
              borderColor: "#28a745",
              marginTop: "5px",
              marginBottom: "10px",
            }}
          />
        </Col>
      </Row>
      <hr
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#28a745",
          border: "none",
          marginTop: "5px",
          marginBottom: "10px",
        }}
      />
      {/* Quotation & Customer Info */}
      <Row className="mb-4 d-flex justify-content-between">
        <Col md={8}>
          <h5>Quotation To</h5>
          {/* Customer Dropdown */}
          <Form.Group className="mb-2">
            <Form.Select
              value={formData.quotation.customerId || ''}
              onChange={(e) => {
                const customerId = e.target.value;
                const selectedCustomer = customerList.find(cust => cust.id == customerId);
                if (selectedCustomer) {
                  handleChange("quotation", "billToName", selectedCustomer.name_english || '');
                  handleChange("quotation", "billToAddress", selectedCustomer.address || '');
                  handleChange("quotation", "billToEmail", selectedCustomer.email || '');
                  handleChange("quotation", "billToPhone", selectedCustomer.phone || '');
                  handleChange("quotation", "customerId", customerId);
                } else {
                  handleChange("quotation", "billToName", '');
                  handleChange("quotation", "billToAddress", '');
                  handleChange("quotation", "billToEmail", '');
                  handleChange("quotation", "billToPhone", '');
                  handleChange("quotation", "customerId", '');
                }
              }}
              className="form-control-no-border"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
            >
              <option value="">Select Customer...</option>
              {customerList.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name_english}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              value={formData.quotation.billToAddress}
              onChange={(e) => handleChange("quotation", "billToAddress", e.target.value)}
              placeholder="Customer Address"
              className="form-control-no-border"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              value={formData.quotation.billToEmail}
              onChange={(e) => handleChange("quotation", "billToEmail", e.target.value)}
              placeholder="Email"
              className="form-control-no-border"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              value={formData.quotation.billToPhone}
              onChange={(e) => handleChange("quotation", "billToPhone", e.target.value)}
              placeholder="Phone"
              className="form-control-no-border"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
            />
          </Form.Group>
          <div className="mt-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate('/Company/CustomersDebtors')}
              title="Add Customer"
            >
              Add Customer
            </Button>
          </div>
        </Col>
        <Col md={4} className="d-flex flex-column align-items-start">
          <div className="d-flex flex-column gap-2" style={{ maxWidth: "400px", width: "100%" }}>
            {/* System Reference No (Auto) */}
            <Form.Group className="mb-0">
              <div className="d-flex justify-content-between align-items-center">
                <Form.Label
                  className="mb-0"
                  style={{
                    fontSize: "0.9rem",
                    color: "#6c757d",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    marginRight: "8px"
                  }}
                >
                  Ref No.
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.quotation.referenceId}
                  readOnly
                  className="form-control-no-border text-end"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    minHeight: "auto",
                    padding: "0",
                    fontWeight: "500",
                    backgroundColor: "#f8f9fa",
                    color: "#495057",
                    cursor: "not-allowed",
                    textAlign: "right",
                    flexGrow: 1
                  }}
                />
              </div>
            </Form.Group>
            {/* Manual Customer Ref (Optional) */}
            <Form.Group className="mb-0">
              <div className="d-flex justify-content-between align-items-center">
                <Form.Label
                  className="mb-0 flex-shrink-0 me-2"
                  style={{
                    fontSize: "0.9rem",
                    color: "#6c757d",
                    whiteSpace: "nowrap"
                  }}
                >
                  Customer Ref (Optional)
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.quotation.customerReference || ""}
                  onChange={(e) => handleChange("quotation", "customerReference", e.target.value)}
                  placeholder="e.g. CUST-REF-001"
                  className="form-control-no-border text-end flex-grow-1"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    minHeight: "auto",
                    padding: "0.375rem 0.75rem",
                    textAlign: "right"
                  }}
                />
              </div>
            </Form.Group>
            {/* Quotation No (Auto) */}
            <Form.Group className="mb-0">
              <div className="d-flex justify-content-between align-items-center">
                <Form.Label
                  className="mb-0"
                  style={{
                    fontSize: "0.9rem",
                    color: "#6c757d",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    marginRight: "8px"
                  }}
                >
                  Quotation No.
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.quotation.quotationNo}
                  readOnly
                  className="form-control-no-border text-end"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    minHeight: "auto",
                    padding: "0",
                    fontWeight: "500",
                    backgroundColor: "#f8f9fa",
                    color: "#495057",
                    cursor: "not-allowed",
                    textAlign: "right",
                    flexGrow: 1
                  }}
                />
              </div>
            </Form.Group>
            {/* Manual QUO No (Optional) */}
            <Form.Group className="mb-0">
              <div className="d-flex justify-content-between align-items-center">
                <Form.Label
                  className="mb-0 flex-shrink-0 me-2"
                  style={{
                    fontSize: "0.9rem",
                    color: "#6c757d",
                    whiteSpace: "nowrap"
                  }}
                >
                  Manual QUO No (Optional)
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.quotation.manualQuotationRef || ""}
                  onChange={(e) => handleChange("quotation", "manualQuotationRef", e.target.value)}
                  placeholder="e.g. QUO-CUST-001"
                  className="form-control-no-border text-end flex-grow-1"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    minHeight: "auto",
                    padding: "0.375rem 0.75rem",
                    textAlign: "right"
                  }}
                />
              </div>
            </Form.Group>
            {/* ============= QUOTATION DATE ============= */}
            <Row className="align-items-center g-2 mb-2">
              <Col md="auto" className="p-0">
                <Form.Label
                  className="mb-0 flex-shrink-0 me-2"
                  style={{
                    fontSize: "0.9rem",
                    color: "#6c757d",
                    whiteSpace: "nowrap"
                  }}
                >
                  Quotation Date
                </Form.Label>
              </Col>
              <Col className="p-0">
                <Form.Control
                  type="date"
                  value={formData.quotation.quotationDate}
                  onChange={(e) => handleChange("quotation", "quotationDate", e.target.value)}
                  style={{
                    border: "1px solid #495057",
                    fontSize: "1rem"
                  }}
                />
              </Col>
            </Row>
            {/* ============= VALID TILL ============= */}
            <Row className="align-items-center g-2 mb-2">
              <Col md="auto" className="p-0">
                <Form.Label
                  className="mb-0 flex-shrink-0 me-2"
                  style={{
                    fontSize: "0.9rem",
                    color: "#6c757d",
                    whiteSpace: "nowrap"
                  }}
                >
                  Valid Till
                </Form.Label>
              </Col>
              <Col className="p-0">
                <Form.Control
                  type="date"
                  value={formData.quotation.validDate}
                  onChange={(e) => handleChange("quotation", "validDate", e.target.value)}
                  style={{
                    border: "1px solid #495057",
                    fontSize: "1rem"
                  }}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      {/* Items Table */}
      <Row className="mb-4">
        <Col>
          {renderItemsTable("quotation")}
        </Col>
      </Row>
      <hr
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#28a745",
          border: "none",
          marginTop: "5px",
          marginBottom: "10px",
        }}
      />
      {/* Totals - Moved to left side */}
      <Row className="mb-4 mt-2">
        <Col md={4}>
          <Table bordered size="sm" className="dark-bordered-table">
            <tbody>
              <tr>
                <td className="fw-bold">Sub Total:</td>
                <td>
                  R{formData.quotation.items.reduce((sum, item) =>
                    sum + (parseFloat(item.rate) || 0) * (parseInt(item.qty) || 0), 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Tax:</td>
                <td>
                  R{formData.quotation.items.reduce((sum, item) => {
                    const subtotal = (parseFloat(item.rate) || 0) * (parseInt(item.qty) || 0);
                    return sum + (subtotal * (parseFloat(item.tax) || 0)) / 100;
                  }, 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Discount:</td>
                <td>
                  R{formData.quotation.items.reduce((sum, item) => sum + (parseFloat(item.discount) || 0), 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Total:</td>
                <td className="fw-bold">
                  R{calculateTotalWithTaxAndDiscount(formData.quotation.items).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <hr
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#28a745",
          border: "none",
          marginTop: "5px",
          marginBottom: "10px",
        }}
      />
      {/* Bank & Notes */}
      <Row className="mb-4">
        <h5>Bank Details</h5>
        <Col
          md={6}
          className="p-2 rounded"
          style={{ border: "1px solid #343a40" }}
        >
          {['bankName', 'accountNo', 'accountHolder', 'ifsc'].map(field => (
            <Form.Group key={field} className="mb-2">
              <Form.Control
                type="text"
                placeholder={{
                  bankName: 'Bank Name',
                  accountNo: 'Account No.',
                  accountHolder: 'Account Holder',
                  ifsc: 'IFSC Code',
                }[field]}
                value={formData.quotation[field] || ""}
                onChange={(e) => handleChange("quotation", field, e.target.value)}
                className="form-control-no-border"
                style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
              />
            </Form.Group>
          ))}
        </Col>
        <Col md={6}>
          <h5>Notes</h5>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter any additional notes"
            value={formData.quotation.notes || ""}
            onChange={(e) => handleChange("quotation", "notes", e.target.value)}
            style={{ border: "1px solid #343a40" }}
          />
        </Col>
      </Row>
      <hr
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#28a745",
          border: "none",
          marginTop: "5px",
          marginBottom: "10px",
        }}
      />
      {/* Terms & Footer */}
      <Row className="mb-4">
        <Col>
          <Form.Group>
            <Form.Label>Terms & Conditions</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.quotation.terms}
              onChange={(e) => handleChange("quotation", "terms", e.target.value)}
              placeholder="e.g. Payment within 15 days"
              style={{ border: "1px solid #343a40" }}
            />
          </Form.Group>
        </Col>
      </Row>
      {/* Attachment Fields */}
      {renderAttachmentFields("quotation")}
      <Row className="text-center mb-4">
        <Col>
          <p><strong>Thank you for your business!</strong></p>
          <p className="text-muted">www.yourcompany.com</p>
        </Col>
      </Row>
      {/* Navigation */}
      <div className="d-flex justify-content-between mt-5">
        <Button variant="secondary" onClick={handleSkip}>Skip</Button>
        <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
        <Button variant="primary" onClick={handleSaveNext}>Save & Next</Button>
        <Button variant="success" onClick={handleNext}>Next</Button>
      </div>
    </Form>
  );
};

export default QuotationTab;