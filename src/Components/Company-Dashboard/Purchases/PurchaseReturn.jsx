import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Table,
  Badge,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { BiPlus, BiSearch } from "react-icons/bi";

// Dummy initial returns data
const initialReturns = [
  {
    id: 1,
    returnNo: "PR-1001",
    invoiceNo: "PINV-2045",
    vendor: "VendorA",
    date: "20-07-2025",
    items: 2,
    status: "Processed",
    amount: 15000,
    warehouse: "Main Warehouse",
    referenceId: "REF-1001",
    autoVoucherNo: "VR-1001",
  },
  {
    id: 2,
    returnNo: "PR-1002",
    invoiceNo: "PINV-2046",
    vendor: "VendorB",
    date: "21-07-2025",
    items: 1,
    status: "Pending",
    amount: 8000,
    warehouse: "North Branch",
    referenceId: "REF-1002",
    autoVoucherNo: "VR-1002",
  },
];

// Badge colors
const statusColors = {
  Processed: "success",
  Pending: "warning",
  Approved: "info",
  Rejected: "danger",
};

const PurchaseReturn = () => {
  const [returns, setReturns] = useState(initialReturns);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Filters & search
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewClick = (item) => {
    setSelectedReturn(item);
    setShowViewModal(true);
  };

  const handleEditClick = (item) => {
    // your edit logic here
    alert("Edit feature coming soon 😉");
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setReturns(returns.filter((r) => r.id !== deleteId));
    setShowDeleteModal(false);
  };

  const filteredReturns = returns.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.returnNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="fw-bold text-dark">Purchase Returns</h2>
        <div className="d-flex gap-2 flex-wrap">
       <Button
  style={{
    backgroundColor: '#3daaaa',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '5px', // icon aur text ke beech spacing
    padding: '6px 12px',
  }}
  size="sm"
>
  <BiPlus size={18} /> New Return
</Button>


        </div>
      </div>

      {/* Filters */}
      <Row className="mb-4 g-3">
        <Col md={4}>
          <div className="input-group shadow-sm rounded">
            <span className="input-group-text bg-white border-0">
              <BiSearch />
            </span>
            <Form.Control
              type="text"
              placeholder="Search vendor / return #"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Col>
        <Col md={3}>
          <Form.Select
            className="shadow-sm rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">Status: All</option>
            <option value="Processed">Processed</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Table */}
      <Card className="shadow-sm rounded-4 border-0">
        <div className="table-responsive">
          <Table hover className="mb-0 text-center align-middle">
            <thead className="bg-light text-dark">
              <tr>
                <th>REF ID</th>
                <th>Auto Voucher</th>
                <th>Return #</th>
                <th>Invoice #</th>
                <th>Vendor</th>
                <th>Warehouse</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReturns.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-muted py-4">
                    No returns found.
                  </td>
                </tr>
              ) : (
                filteredReturns.map((item) => (
                  <tr key={item.id} className="align-middle">
                    <td className="text-primary fw-medium">{item.referenceId}</td>
                    <td className="text-primary fw-medium">{item.autoVoucherNo}</td>
                    <td className="fw-bold">{item.returnNo}</td>
                    <td>{item.invoiceNo}</td>
                    <td>{item.vendor}</td>
                    <td>{item.warehouse}</td>
                    <td>{item.date}</td>
                    <td className="fw-bold">R{item.amount.toLocaleString()}</td>
                    <td>
                      <Badge
                        bg={statusColors[item.status]}
                        className="rounded-pill px-2 py-1"
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2 justify-content-center">
                        <Button
                         size="sm"
                         onClick={() => handleView(c)}
                         title="View"
                         style={{
                           backgroundColor: "#00bfff",  // sky blue
                           borderColor: "#00bfff",
                           color: "#fff",
                         }}
                         variant=""  // variant hatana important hai, warna bootstrap override kar dega
                       >
                         <FaEye />
                       </Button>
                       
                       
                           {/* Pencil/Edit button - Yellow */}
                           <Button
                             size="sm"
                             onClick={() => handleEdit(c)}
                             title="Edit"
                             style={{
                               backgroundColor: "#f1c40f",  // yellow
                               borderColor: "#f1c40f",
                               color: "#fff",
                             }}
                           >
                             <FaEdit />
                           </Button>
                       
                           {/* Delete button - Red */}
                         <Button
                         size="sm"
                         onClick={() => handleDelete(c)}
                         title="Delete"
                         style={{
                           backgroundColor: "#e74c3c",  // red
                           borderColor: "#e74c3c",
                           color: "#fff",
                         }}
                         variant=""  // variant hatao ya empty string
                       >
                         <FaTrash />
                       </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* View Modal */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Purchase Return Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReturn && (
            <div>
              <Row className="mb-2">
                <Col md={6}>
                  <strong>REF ID:</strong> {selectedReturn.referenceId}
                </Col>
                <Col md={6}>
                  <strong>Auto Voucher:</strong> {selectedReturn.autoVoucherNo}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <strong>Return #:</strong> {selectedReturn.returnNo}
                </Col>
                <Col md={6}>
                  <strong>Invoice #:</strong> {selectedReturn.invoiceNo}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <strong>Vendor:</strong> {selectedReturn.vendor}
                </Col>
                <Col md={6}>
                  <strong>Warehouse:</strong> {selectedReturn.warehouse}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <strong>Date:</strong> {selectedReturn.date}
                </Col>
                <Col md={6}>
                  <strong>Amount:</strong> R{selectedReturn.amount.toLocaleString()}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col md={6}>
                  <strong>Status:</strong>{" "}
                  <Badge bg={statusColors[selectedReturn.status]}>
                    {selectedReturn.status}
                  </Badge>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this return?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PurchaseReturn;
