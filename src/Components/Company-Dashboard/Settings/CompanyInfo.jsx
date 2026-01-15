import React, { useState } from 'react';
import { Form, Button, Container, Image, Nav, Tab, Card } from 'react-bootstrap';
import {
  FaBuilding,
  FaUser,
  FaMoneyBillWave,
  FaFileInvoice,
  FaImage,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const CompanyInfo = () => {
  const [formData, setFormData] = useState({
    // === Company Info ===
    companyName: '',
    companyEmail: '',
    phoneNumber: '',
    fax: '',
    website: '',
    address: '',
    country: '',
    city: '',
    state: '',
    postalCode: '',
    currency: '',

    // === User Profile ===
    fullName: '',
    jobTitle: '',
    department: '',
    profileImage: null,

    // === Banking Details ===
    bankName: '',
    accountNumber: '',
    iban: '',
    swiftCode: '',
    bankAddress: '',

    // === Logos ===
    companyIcon: null,
    favicon: null,
    companyLogo: null,
    companyDarkLogo: null,

    // === Invoice Settings ===
    invoiceTemplateId: 'template1',
    purchaseTemplateId: 'purchase1',
    receiptTemplateId: 'receipt1',
    headerLabel: 'Invoice No.',
    footerTerms: '',
    footerNote: '',
    footerBankDetails: '',
    showDescription: true,
    showItemName: true,
    showPrice: true,
    showQuantity: true,
    showTotal: true,
  });

  const [previewImages, setPreviewImages] = useState({
    companyIcon: null,
    favicon: null,
    companyLogo: null,
    companyDarkLogo: null,
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImages((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadButtonStyle = {
    backgroundColor: '#002d4d',
    borderColor: '#002d4d',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const previewImageStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    padding: '2px',
  };

  // Options
  const currencyOptions = [
    { value: '', label: 'Select Currency' },
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'INR', label: 'INR - Indian Rupee' },
    { value: 'AED', label: 'AED - UAE Dirham' },
    { value: 'SAR', label: 'SAR - Saudi Riyal' },
  ];

  const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'USA', label: 'USA' },
    { value: 'India', label: 'India' },
    { value: 'UAE', label: 'UAE' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  ];

  const stateOptions = [
    { value: '', label: 'Select State' },
    { value: 'California', label: 'California' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Dubai', label: 'Dubai' },
  ];

  const cityOptions = [
    { value: '', label: 'Select City' },
    { value: 'New York', label: 'New York' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Dubai', label: 'Dubai' },
  ];

  // Templates
  const invoiceTemplates = [
    { id: 'template1', name: 'General Invoice 1', img: '/templates/inv1.png' },
    { id: 'template2', name: 'General Invoice 2', img: '/templates/inv2.png' },
  ];

  const purchaseTemplates = [
    { id: 'purchase1', name: 'Purchase Template 1', img: '/templates/purchase1.png' },
  ];

  const receiptTemplates = [
    { id: 'receipt1', name: 'Receipt Template 1', img: '/templates/receipt1.png' },
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px 0' }}>
      <Container className="p-4" style={{ maxWidth: '1200px' }}>
        <h1 className="mb-3" style={{ fontSize: '24px', fontWeight: '600' }}>
          Settings
        </h1>
        <p className="mb-4 text-muted">Manage your company, profile, banking, and invoice settings.</p>

        <Tab.Container defaultActiveKey="company">
          <Nav variant="tabs" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="company" className='p-2 d-flex'>
                <FaBuilding className="me-2" /> Company Information
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="profile" className='p-2 d-flex'>
                <FaUser className="me-2" /> User Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="banking" className='p-2 d-flex'>
                <FaMoneyBillWave className="me-2" /> Banking Details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="invoice" className='p-2 d-flex'>
                <FaFileInvoice className="me-2" /> Invoice / Quote Settings
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* === COMPANY INFORMATION === */}
            <Tab.Pane eventKey="company" >
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">Company Information</h5>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Company Name *"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="email"
                          placeholder="Company Email *"
                          name="companyEmail"
                          value={formData.companyEmail}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="tel"
                          placeholder="Phone Number *"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Fax"
                          name="fax"
                          value={formData.fax}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Address *</Form.Label>
                    <Form.Control as="textarea" rows={2} name="address" value={formData.address} onChange={handleChange} />
                  </Form.Group>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Country *</Form.Label>
                        <Form.Select name="country" value={formData.country} onChange={handleChange}>
                          {countryOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">City *</Form.Label>
                        <Form.Select name="city" value={formData.city} onChange={handleChange}>
                          {cityOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">State *</Form.Label>
                        <Form.Select name="state" value={formData.state} onChange={handleChange}>
                          {stateOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Postal Code *</Form.Label>
                        <Form.Control
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Currency *</Form.Label>
                    <Form.Select name="currency" value={formData.currency} onChange={handleChange}>
                      {currencyOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Logo Uploads */}
                  <h6 className="fw-bold mt-4 mb-3">Company Logos & Icons</h6>
                  {['companyIcon', 'favicon', 'companyLogo', 'companyDarkLogo'].map((field) => (
                    <Form.Group className="mb-3" key={field}>
                      <Form.Label className="fw-bold text-capitalize">{field.replace(/([A-Z])/g, ' $1')}:</Form.Label>
                      <div className="d-flex align-items-center">
                        <Button as="label" htmlFor={`${field}-upload`} style={uploadButtonStyle}>
                          Choose File
                          <Form.Control
                            type="file"
                            id={`${field}-upload`}
                            className="d-none"
                            name={field}
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Button>
                        {previewImages[field] && (
                          <Image src={previewImages[field]} alt={`${field} preview`} style={previewImageStyle} className="ms-2" />
                        )}
                      </div>
                    </Form.Group>
                  ))}

                  <div className="d-flex justify-content-end mt-4">
                    <Button variant="outline-secondary" className="me-3 px-4">
                      Cancel
                    </Button>
                    <Button className="px-4" style={{ backgroundColor: '#002d4d', borderColor: '#002d4d' }}>
                      Save Changes
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Tab.Pane>

            {/* === USER PROFILE === */}
            <Tab.Pane eventKey="profile">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">User Profile</h5>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Full Name *"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Job Title"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Profile Image</Form.Label>
                    <div className="d-flex align-items-center">
                      <Button as="label" htmlFor="profileImage-upload" style={uploadButtonStyle}>
                        Choose File
                        <Form.Control
                          type="file"
                          id="profileImage-upload"
                          className="d-none"
                          name="profileImage"
                          onChange={handleChange}
                          accept="image/*"
                        />
                      </Button>
                      {previewImages.profileImage && (
                        <Image
                          src={previewImages.profileImage}
                          alt="Profile preview"
                          style={{ ...previewImageStyle, width: '100px', height: '100px' }}
                          className="ms-2"
                        />
                      )}
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-end mt-4">
                    <Button variant="outline-secondary" className="me-3 px-4">
                      Cancel
                    </Button>
                    <Button className="px-4" style={{ backgroundColor: '#002d4d', borderColor: '#002d4d' }}>
                      Save Profile
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Tab.Pane>

            {/* === BANKING DETAILS === */}
            <Tab.Pane eventKey="banking">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">Banking Details</h5>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Bank Name *"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Account Number *"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="IBAN"
                          name="iban"
                          value={formData.iban}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="SWIFT/BIC Code"
                          name="swiftCode"
                          value={formData.swiftCode}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Bank Address"
                          name="bankAddress"
                          value={formData.bankAddress}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-4">
                    <Button variant="outline-secondary" className="me-3 px-4">
                      Cancel
                    </Button>
                    <Button className="px-4" style={{ backgroundColor: '#002d4d', borderColor: '#002d4d' }}>
                      Save Banking Info
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Tab.Pane>

            {/* === INVOICE SETTINGS === */}
            <Tab.Pane eventKey="invoice">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">Invoice / Quote Settings</h5>

                  {/* Invoice Templates */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Invoice Template</Form.Label>
                    <div className="row g-3 mt-2">
                      {invoiceTemplates.map((tmpl) => (
                        <div key={tmpl.id} className="col-12 col-md-6 col-lg-4">
                          <div
                            className={`border rounded overflow-hidden ${
                              formData.invoiceTemplateId === tmpl.id ? 'border-primary border-2' : 'border-secondary'
                            }`}
                            onClick={() => setFormData((prev) => ({ ...prev, invoiceTemplateId: tmpl.id }))}
                            style={{ cursor: 'pointer' }}
                          >
                            <img
                              src={tmpl.img}
                              alt={tmpl.name}
                              className="w-100"
                              style={{ height: '150px', objectFit: 'cover', backgroundColor: '#f8f9fa' }}
                            />
                            <div className="p-2 bg-light d-flex justify-content-between align-items-center">
                              <small>{tmpl.name}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Form.Group>

                  {/* Footer Text */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Header Text</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., Invoice No."
                      name="headerLabel"
                      value={formData.headerLabel}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Footer Text</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Terms & Conditions"
                      name="footerTerms"
                      value={formData.footerTerms}
                      onChange={handleChange}
                      className="mb-2"
                    />
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Note"
                      name="footerNote"
                      value={formData.footerNote}
                      onChange={handleChange}
                      className="mb-2"
                    />
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Bank Details"
                      name="footerBankDetails"
                      value={formData.footerBankDetails}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Field Visibility */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Customize Invoice Fields</Form.Label>
                    <div className="d-flex flex-column gap-2">
                      {[
                        { label: 'Description', name: 'showDescription' },
                        { label: 'Item Name', name: 'showItemName' },
                        { label: 'Price', name: 'showPrice' },
                        { label: 'Quantity', name: 'showQuantity' },
                        { label: 'Total', name: 'showTotal' },
                      ].map((field) => (
                        <Form.Check
                          key={field.name}
                          type="checkbox"
                          label={field.label}
                          name={field.name}
                          checked={formData[field.name]}
                          onChange={(e) =>
                            setFormData({ ...formData, [field.name]: e.target.checked })
                          }
                        />
                      ))}
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-end mt-4">
                    <Button variant="outline-secondary" className="me-3 px-4">
                      Cancel
                    </Button>
                    <Button className="px-4" style={{ backgroundColor: '#002d4d', borderColor: '#002d4d' }}>
                      Save Invoice Settings
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default CompanyInfo;