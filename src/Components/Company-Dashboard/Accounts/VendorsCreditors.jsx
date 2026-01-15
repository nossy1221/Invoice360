import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaPlus, FaBook } from 'react-icons/fa';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const VendorsCreditors = () => {
  const navigate = useNavigate();
  
  // Static vendor data instead of API fetch
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "ABC Supplies Ltd",
      nameArabic: "شركة ABC للمستلزمات",
      email: "contact@abcsupplies.com",
      phone: "+1234567890",
      payable: 5000.00,
      address: "123 Business Ave, New York, NY 10001",
      accountType: "Sundry Creditors",
      accountName: "Accounts Payable",
      creationDate: "2023-01-15",
      bankAccountNumber: "1234567890",
      bankIFSC: "ABC1234567",
      bankName: "First National Bank - Main Branch",
      country: "United States",
      state: "New York",
      pincode: "10001",
      stateCode: "NY",
      shippingAddress: "123 Business Ave, New York, NY 10001",
      creditPeriod: "30",
      gstin: "29ABCDE1234F1Z5",
      gstEnabled: true,
      companyLocation: "123 Business Ave, New York, NY 10001",
      companyName: "ABC Supplies Ltd",
      accountBalance: "5000.00"
    },
    {
      id: 2,
      name: "XYZ Manufacturing",
      nameArabic: "شركة XYZ للتصنيع",
      email: "info@xyzmanufacturing.com",
      phone: "+0987654321",
      payable: 7500.00,
      address: "456 Industrial Park, Los Angeles, CA 90001",
      accountType: "Sundry Creditors",
      accountName: "Accounts Payable",
      creationDate: "2023-02-20",
      bankAccountNumber: "0987654321",
      bankIFSC: "XYZ9876543",
      bankName: "Bank of America - Industrial Branch",
      country: "United States",
      state: "California",
      pincode: "90001",
      stateCode: "CA",
      shippingAddress: "456 Industrial Park, Los Angeles, CA 90001",
      creditPeriod: "45",
      gstin: "29FGHIJ5678K2Z6",
      gstEnabled: true,
      companyLocation: "456 Industrial Park, Los Angeles, CA 90001",
      companyName: "XYZ Manufacturing Inc",
      accountBalance: "7500.00"
    },
    {
      id: 3,
      name: "Global Tech Solutions",
      nameArabic: "حلول التكنولوجيا العالمية",
      email: "sales@globaltech.com",
      phone: "+1122334455",
      payable: 3000.00,
      address: "789 Tech Boulevard, San Francisco, CA 94102",
      accountType: "Sundry Creditors",
      accountName: "Accounts Payable",
      creationDate: "2023-03-10",
      bankAccountNumber: "1122334455",
      bankIFSC: "GTS1122334",
      bankName: "Chase Bank - Tech Branch",
      country: "United States",
      state: "California",
      pincode: "94102",
      stateCode: "CA",
      shippingAddress: "789 Tech Boulevard, San Francisco, CA 94102",
      creditPeriod: "60",
      gstin: "29KLMNO9012P3Z7",
      gstEnabled: true,
      companyLocation: "789 Tech Boulevard, San Francisco, CA 94102",
      companyName: "Global Tech Solutions LLC",
      accountBalance: "3000.00"
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showView, setShowView] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Default values for vendor form
  const [vendorFormData, setVendorFormData] = useState({
    name: "",
    accountType: "Sundry Creditors",
    accountName: "",
    balanceType: "Credit",
    payable: "",
    currentBalance: "",
    creationDate: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankName: "",
    country: "",
    state: "",
    pincode: "",
    address: "",
    stateCode: "",
    shippingAddress: "",
    phone: "",
    email: "",
    creditPeriod: "",
    gstin: "",
    gstType: "Registered",
    gstEnabled: true,
    nameArabic: "",
    companyName: "",
    companyLocation: "",
    idCardImage: null,
    extraFile: null,
    accountBalance: "",
  });

  const updateField = (field, value) => {
    setVendorFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddClick = () => {
    setVendorFormData({
      name: "",
      accountType: "Sundry Creditors",
      accountName: "",
      balanceType: "Credit",
      payable: "",
      currentBalance: "",
      creationDate: "",
      bankAccountNumber: "",
      bankIFSC: "",
      bankName: "",
      country: "",
      state: "",
      pincode: "",
      address: "",
      stateCode: "",
      shippingAddress: "",
      phone: "",
      email: "",
      creditPeriod: "",
      gstin: "",
      gstType: "Registered",
      gstEnabled: true,
      nameArabic: "",
      companyName: "",
      companyLocation: "",
      idCardImage: null,
      extraFile: null,
      accountBalance: "",
    });
    setSelectedVendor(null);
    setShowAddEditModal(true);
  };

  const handleEditClick = (vendor) => {
    setVendorFormData({
      name: vendor.name || "",
      nameArabic: vendor.nameArabic || "",
      companyName: vendor.companyName || "",
      companyLocation: vendor.companyLocation || "",
      accountType: vendor.accountType || "Sundry Creditors",
      accountName: vendor.accountName || "",
      balanceType: "Credit",
      payable: vendor.payable || "",
      accountBalance: vendor.payable?.toString() || "",
      creationDate: vendor.creationDate || "",
      bankAccountNumber: vendor.bankAccountNumber || "",
      bankIFSC: vendor.bankIFSC || "",
      bankName: vendor.bankName || "",
      country: vendor.country || "",
      state: vendor.state || "",
      pincode: vendor.pincode || "",
      address: vendor.address || "",
      stateCode: vendor.stateCode || "",
      shippingAddress: vendor.shippingAddress || "",
      phone: vendor.phone || "",
      email: vendor.email || "",
      creditPeriod: vendor.creditPeriod || "",
      gstin: vendor.gstin || "",
      gstType: vendor.gstType || "Registered",
      gstEnabled: vendor.gstEnabled !== undefined ? vendor.gstEnabled : true,
      idCardImage: null,
      extraFile: null,
    });
    setSelectedVendor(vendor);
    setShowAddEditModal(true);
  };

  // SAVE (Create or Update) with local state
  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        if (selectedVendor) {
          // Update existing vendor
          const updatedVendor = {
            ...vendorFormData,
            id: selectedVendor.id,
            payable: parseFloat(vendorFormData.accountBalance) || 0
          };
          setVendors(vendors.map(v => v.id === selectedVendor.id ? updatedVendor : v));
          toast.success("Vendor updated successfully!");
        } else {
          // Create new vendor
          const newVendor = {
            ...vendorFormData,
            id: vendors.length > 0 ? Math.max(...vendors.map(v => v.id)) + 1 : 1,
            payable: parseFloat(vendorFormData.accountBalance) || 0
          };
          setVendors([...vendors, newVendor]);
          toast.success("Vendor added successfully!");
        }
        setShowAddEditModal(false);
        setSelectedVendor(null);
        resetForm();
      } catch (err) {
        console.error("Save Error:", err);
        toast.error("Failed to save vendor. Please try again.");
      } finally {
        setSaving(false);
      }
    }, 500);
  };

  // Helper to reset form
  const resetForm = () => {
    setVendorFormData({
      name: "",
      accountType: "Sundry Creditors",
      accountName: "",
      balanceType: "Credit",
      payable: "",
      currentBalance: "",
      creationDate: "",
      bankAccountNumber: "",
      bankIFSC: "",
      bankName: "",
      country: "",
      state: "",
      pincode: "",
      address: "",
      stateCode: "",
      shippingAddress: "",
      phone: "",
      email: "",
      creditPeriod: "",
      gstin: "",
      gstType: "Registered",
      gstEnabled: true,
      nameArabic: "",
      companyName: "",
      companyLocation: "",
      idCardImage: null,
      extraFile: null,
      accountBalance: "",
    });
  };

  // DELETE VENDOR with local state
  const handleDeleteVendor = () => {
    if (!selectedVendor?.id) {
      toast.error("Vendor ID not found.");
      setShowDelete(false);
      return;
    }
    setDeleting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        setVendors(vendors.filter(v => v.id !== selectedVendor.id));
        toast.success("Vendor deleted successfully!");
        setShowDelete(false);
        setSelectedVendor(null);
      } catch (err) {
        console.error("Delete Error:", err);
        toast.error("Failed to delete vendor. Please try again.");
      } finally {
        setDeleting(false);
      }
    }, 500);
  };

  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.email && v.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (v.phone && v.phone.includes(searchTerm))
  );

  const handleDownloadTemplate = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    let yPos = 20;
    doc.setFontSize(20);
    doc.text("Vendor Detailed Report", 14, yPos);
    yPos += 10;
    const today = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${today}`, 14, yPos);
    yPos += 10;
    if (filteredVendors.length === 0) {
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text("No vendors to display.", 14, yPos);
    } else {
      filteredVendors.forEach((vendor, index) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.setFont("helvetica", "bold");
        doc.text(`Vendor #${index + 1}: ${vendor.name}`, 14, yPos);
        yPos += 8;
        doc.setDrawColor(39, 178, 182);
        doc.line(14, yPos, 200, yPos);
        yPos += 8;
        doc.setFont("helvetica", "normal");
        // Basic Information
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Basic Information:", 14, yPos);
        yPos += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const basicInfo = [
          `Name: ${vendor.name || "-"}`,
          `Phone: ${vendor.phone || "-"}`,
          `Email: ${vendor.email || "-"}`,
          `Account Type: ${vendor.accountType || "Sundry Creditors"}`,
          `Account Name: ${vendor.accountName || "-"}`,
          `Opening Balance: $${vendor.payable ? vendor.payable.toFixed(2) : "0.00"}`,
          `Credit Period: ${vendor.creditPeriod || "N/A"} days`,
          `Creation Date: ${vendor.creationDate || "N/A"}`
        ];
        basicInfo.forEach(line => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          doc.text(line, 16, yPos);
          yPos += 6;
        });
        yPos += 4;
        // Billing Information
        if (vendor.address || vendor.country || vendor.state || vendor.pincode || vendor.stateCode) {
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text("Billing Information:", 14, yPos);
          yPos += 6;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          const billingInfo = [
            `Address: ${vendor.address || "-"}`,
            `Country: ${vendor.country || "India"}`,
            `State: ${vendor.state || "-"}`,
            `Pincode: ${vendor.pincode || "-"}`,
            `State Code: ${vendor.stateCode || "-"}`
          ];
          billingInfo.forEach(line => {
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            doc.text(line, 16, yPos);
            yPos += 6;
          });
          yPos += 4;
        }
        // Shipping Information
        if (vendor.shippingAddress) {
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text("Shipping Information:", 14, yPos);
          yPos += 6;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          doc.text(`Address: ${vendor.shippingAddress || "-"}`, 16, yPos);
          yPos += 8;
        }
        // Bank Details
        if (vendor.bankAccountNumber || vendor.bankIFSC || vendor.bankName) {
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text("Bank Details:", 14, yPos);
          yPos += 6;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          const bankInfo = [];
          if (vendor.bankAccountNumber) bankInfo.push(`Account Number: ${vendor.bankAccountNumber}`);
          if (vendor.bankIFSC) bankInfo.push(`IFSC: ${vendor.bankIFSC}`);
          if (vendor.bankName) bankInfo.push(`Bank & Branch: ${vendor.bankName}`);
          bankInfo.forEach(line => {
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            doc.text(line, 16, yPos);
            yPos += 6;
          });
          yPos += 4;
        }
        // Company & Location
        if (vendor.companyName || vendor.companyLocation) {
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text("Company Information:", 14, yPos);
          yPos += 6;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          if (vendor.companyName) {
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            doc.text(`Company Name: ${vendor.companyName}`, 16, yPos);
            yPos += 6;
          }
          if (vendor.companyLocation) {
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            doc.text(`Google Location: ${vendor.companyLocation}`, 16, yPos);
            yPos += 6;
          }
          yPos += 4;
        }
        // GST Information
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Tax Information:", 14, yPos);
        yPos += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(`GST Enabled: ${vendor.gstEnabled ? "Yes" : "No"}`, 16, yPos);
        yPos += 6;
        // Display GSTIN if available
        if (vendor.gstin) {
          doc.text(`GSTIN: ${vendor.gstin}`, 16, yPos);
          yPos += 6;
        }
        yPos += 8;
        if (index < filteredVendors.length - 1) {
          if (yPos > 250) {
            doc.addPage();
            yPos = 20;
          } else {
            yPos += 10;
          }
        }
      });
    }
    doc.save("vendors_detailed_report.pdf");
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(vendors);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vendors");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Vendors_Export.xlsx");
  };

  const handleImportClick = () => {
    if (window.importFileRef) window.importFileRef.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet);
      const dataWithIds = data.map(item => ({
        ...item,
        id: Date.now() + Math.random()
      }));
      setVendors((prev) => [...prev, ...dataWithIds]);
    };
    reader.readAsBinaryString(file);
  };

  const handleViewLedger = (vendor) => {
    navigate(`/company/ledgervendor`, { state: { vendor } });
  };

  const accountTypes = [
    "Cash-in-hand",
    "Bank A/Cs",
    "Sundry Debtors",
    "Sundry Creditors",
    "Purchases A/C",
    "Purchases Return",
    "Sales A/C",
    "Sales Return",
    "Capital A/C",
    "Direct Expenses",
    "Indirect Expenses"
  ];

  return (
    <div className="p-2">
      <ToastContainer position="top-right" autoClose={3000} />
      <Row className="align-items-center mb-3">
        <Col xs={12} md={4}>
          <h4 className="fw-bold mb-0">Manage Vendors</h4>
        </Col>
        <Col xs={12} md={8}>
          <div className="d-flex flex-wrap gap-2 justify-content-md-end">
            <Button variant="success" className="rounded-pill d-flex align-items-center" onClick={handleImportClick}>Import</Button>
            <input type="file" accept=".xlsx, .xls" ref={(ref) => (window.importFileRef = ref)} onChange={handleImport} style={{ display: "none" }} />
            <Button variant="primary" className="rounded-pill d-flex align-items-center" onClick={handleExport}>Export</Button>
            <Button
              variant="warning"
              className="rounded-pill d-flex align-items-center"
              onClick={handleDownloadTemplate}
              title="Download PDF Report"
            >
              Download PDF
            </Button>
            <Button variant="success" className="rounded-pill d-flex align-items-center" style={{ backgroundColor: "#53b2a5", border: "none" }} onClick={handleAddClick}>
              <FaPlus /> Add Vendor
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mb-3 justify-content-start">
        <Col xs={12} md={6} lg={4}>
          <Form.Control type="text" placeholder="Search vendor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-pill" />
        </Col>
      </Row>
      <div className="card bg-white rounded-3 p-4">
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-light border">
              <tr>
                <th>NO.</th>
                <th>Name (English)</th>
                <th>Name (Arabic)</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Account Type</th>
                <th>Account Name</th>
                <th>Opening Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor, idx) => (
                  <tr key={vendor.id}>
                    <td>{idx + 1}</td>
                    <td>{vendor.name}</td>
                    <td>
                      <span
                        style={{
                          direction: 'rtl',
                          fontFamily: 'Arial, sans-serif',
                          display: 'block',
                          textAlign: 'end',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          minWidth: '100px',
                          maxWidth: '200px',
                        }}
                      >
                        {vendor.nameArabic || "-"}
                      </span>
                    </td>
                    <td>{vendor.email}</td>
                    <td>{vendor.phone}</td>
                    <td>
                      <span className="badge bg-info text-white">
                        {vendor.accountType}
                      </span>
                    </td>
                    <td>{vendor.accountName}</td>
                    <td>{vendor.payable.toFixed(2)}R</td>
                    <td>
                      <div
                        className="d-flex align-items-center gap-2"
                        style={{ minWidth: "220px", whiteSpace: "nowrap" }}
                      >
                        <Button
                          variant="link"
                          className="text-info p-1"
                          size="sm"
                          onClick={() => { setSelectedVendor(vendor); setShowView(true); }}
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </Button>
                        <Button
                          variant="link"
                          className="text-warning p-1"
                          size="sm"
                          onClick={() => handleEditClick(vendor)}
                          title="Edit Vendor"
                        >
                          <FaEdit size={16} />
                        </Button>
                        <Button
                          variant="link"
                          className="text-danger p-1"
                          size="sm"
                          onClick={() => { setSelectedVendor(vendor); setShowDelete(true); }}
                          title="Delete Vendor"
                        >
                          <FaTrash size={16} />
                        </Button>
                        <Button
                          variant="none"
                          className="p-0 text-primary text-decoration-none"
                          onClick={() => handleViewLedger(vendor)}
                          title="View Ledger"
                          style={{
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            padding: "6px 10px",
                            borderRadius: "4px",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                          }}
                        >
                          View Ledger
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    No vendors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
          <small className="text-muted ms-2">
            Showing 1 to {filteredVendors.length} of {filteredVendors.length} results
          </small>
          <nav>
            <ul className="pagination mb-0">
              <li className="page-item disabled"><button className="page-link">&laquo;</button></li>
              <li className="page-item active"><button className="page-link">1</button></li>
              <li className="page-item"><button className="page-link">2</button></li>
              <li className="page-item"><button className="page-link">&raquo;</button></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* View Modal */}
      <Modal show={showView} onHide={() => setShowView(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Vendor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVendor && (
            <>
              <div className="border rounded p-3 mb-4">
                <h6 className="fw-semibold mb-3">Basic Information</h6>
                <Row>
                  <Col md={6}><p><strong>Name:</strong> {selectedVendor.name}</p></Col>
                  <Col md={6}><p><strong>Phone:</strong> {selectedVendor.phone}</p></Col>
                  <Col md={6}><p><strong>Email:</strong> {selectedVendor.email}</p></Col>
                  <Col md={6}>
                    <p>
                      <strong>Account Type:</strong>{" "}
                      {selectedVendor.accountType}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Account Name:</strong>{" "}
                      {selectedVendor.accountName}
                    </p>
                  </Col>
                  <Col md={6}><p><strong>Balance:</strong> {selectedVendor.payable.toFixed(2)}R</p></Col>
                  <Col md={6}><p><strong>Credit Period:</strong> {selectedVendor.creditPeriod || "N/A"}</p></Col>
                  <Col md={6}><p><strong>Creation Date:</strong> {selectedVendor.creationDate || "N/A"}</p></Col>
                </Row>
              </div>
              <div className="border rounded p-3 mb-4">
                <h6 className="fw-semibold mb-3">Billing Information</h6>
                <Row>
                  <Col md={6}><p><strong>Address:</strong> {selectedVendor.address}</p></Col>
                  <Col md={6}><p><strong>Country:</strong> {selectedVendor.country || "India"}</p></Col>
                  <Col md={6}><p><strong>State:</strong> {selectedVendor.state || "N/A"}</p></Col>
                  <Col md={6}><p><strong>Pincode:</strong> {selectedVendor.pincode || "N/A"}</p></Col>
                  <Col md={6}><p><strong>State Code:</strong> {selectedVendor.stateCode || "N/A"}</p></Col>
                </Row>
              </div>
              <div className="border rounded p-3 mb-4">
                <h6 className="fw-semibold mb-3">Shipping Information</h6>
                <Row>
                  <Col md={12}><p><strong>Shipping Address:</strong> {selectedVendor.shippingAddress || "N/A"}</p></Col>
                </Row>
              </div>
              {selectedVendor.bankAccountNumber && (
                <div className="border rounded p-3 mb-4">
                  <h6 className="fw-semibold mb-3">Bank Details</h6>
                  <Row>
                    <Col md={6}><p><strong>Account Number:</strong> {selectedVendor.bankAccountNumber}</p></Col>
                    <Col md={6}><p><strong>IFSC:</strong> {selectedVendor.bankIFSC}</p></Col>
                    <Col md={6}><p><strong>Bank Name & Branch:</strong> {selectedVendor.bankName}</p></Col>
                  </Row>
                </div>
              )}
              {/* GST Information Section */}
              <div className="border rounded p-3 mb-4">
                <h6 className="fw-semibold mb-3">Tax Information</h6>
                <Row>
                  <Col md={6}><p><strong>GST Enabled:</strong> {selectedVendor.gstEnabled ? "Yes" : "No"}</p></Col>
                  <Col md={6}><p><strong>GSTIN:</strong> {selectedVendor.gstin || "N/A"}</p></Col>
                </Row>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal
        show={showAddEditModal}
        onHide={() => setShowAddEditModal(false)}
        size="xl"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>{selectedVendor ? "Edit Vendor" : "Add Vendor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Name (English)</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      setVendorFormData({
                        ...vendorFormData,
                        name: value,
                        accountName:
                          vendorFormData.name === vendorFormData.accountName || !vendorFormData.accountName
                            ? value
                            : vendorFormData.accountName,
                      });
                    }}
                    placeholder="Enter vendor name"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Name (Arabic)</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.nameArabic}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, nameArabic: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.companyName}
                    onChange={(e) =>
                      setVendorFormData({
                        ...vendorFormData,
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
                    value={vendorFormData.companyLocation}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, companyLocation: e.target.value })
                    }
                    placeholder="Enter Google Maps Link"
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
                      setVendorFormData({ ...vendorFormData, idCardImage: e.target.files[0] })
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
                      setVendorFormData({ ...vendorFormData, extraFile: e.target.files[0] })
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
                    value="Sundry Creditors"
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
                    value="Credit"
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
                    value={vendorFormData.accountName}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, accountName: e.target.value })
                    }
                    placeholder="e.g., Vendor A"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Account Balance</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={vendorFormData.accountBalance}
                    onChange={(e) => {
                      const value = e.target.value;
                      setVendorFormData({
                        ...vendorFormData,
                        accountBalance: value || "0.00",
                        payable: parseFloat(value) || 0,
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
                    value={vendorFormData.creationDate}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, creationDate: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Bank Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.bankAccountNumber}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, bankAccountNumber: e.target.value })
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
                    value={vendorFormData.bankIFSC}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, bankIFSC: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Bank Name & Branch</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.bankName}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, bankName: e.target.value })
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
                    value={vendorFormData.country}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, country: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.state}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, state: e.target.value })
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
                    value={vendorFormData.pincode}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, pincode: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.address}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, address: e.target.value })
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
                    value={vendorFormData.stateCode}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, stateCode: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.shippingAddress}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, shippingAddress: e.target.value })
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
                    value={vendorFormData.phone}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, phone: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={vendorFormData.email}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, email: e.target.value })
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
                    value={vendorFormData.creditPeriod}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, creditPeriod: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="d-flex align-items-center">
                  {vendorFormData.gstEnabled && (
                    <div className="flex-grow-1 me-3">
                      <Form.Label>GSTIN</Form.Label>
                      <Form.Control
                        type="text"
                        value={vendorFormData.gstin}
                        onChange={(e) =>
                          setVendorFormData({ ...vendorFormData, gstin: e.target.value })
                        }
                      />
                    </div>
                  )}
                  <div>
                    <Form.Label className="me-2">Enable GST</Form.Label>
                    <Form.Check
                      type="switch"
                      id="gstin-toggle"
                      checked={vendorFormData.gstEnabled}
                      onChange={(e) =>
                        setVendorFormData({
                          ...vendorFormData,
                          gstEnabled: e.target.checked,
                          gstin: e.target.checked ? vendorFormData.gstin : "",
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
          <Button variant="secondary" onClick={() => setShowAddEditModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none" }}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : selectedVendor ? "Update Vendor" : "Save Vendor"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete vendor <strong>"{selectedVendor?.name}"</strong>?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteVendor}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Yes, Delete'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Page Description */}
      <Card className="mb-4 p-3 shadow rounded-4 mt-2">
        <Card.Body>
          <h5 className="fw-semibold border-bottom pb-2 mb-3 text-primary">Page Info</h5>
          <ul className="text-muted fs-6 mb-0" style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
            <li>Manage vendor details including contact and billing information.</li>
            <li>Track payable balances and credit periods.</li>
            <li>Perform CRUD operations: add, view, edit, and delete vendors.</li>
            <li>Import and export vendor data using Excel templates.</li>
            <li>Assign account types and view transaction ledger for each vendor.</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VendorsCreditors;