import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Badge,
  Row,
  Col,
  Collapse,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
  FaDownload,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
} from "react-icons/fa";
import { saveAs } from "file-saver";

const defaultReturns = [
  {
    id: 1,
    returnNo: "SR-001",
    customer: "John Doe",
    date: "2025-11-01",
    items: 3,
    amount: 1200,
    returnType: "Sales Return",
    status: "Pending",
    itemList: [
      { name: "Item A", qty: 1, price: 400 },
      { name: "Item B", qty: 2, price: 400 },
    ],
  },
  {
    id: 2,
    returnNo: "SR-002",
    customer: "Jane Smith",
    date: "2025-11-03",
    items: 2,
    amount: 850,
    returnType: "Credit Note",
    status: "Completed",
    itemList: [
      { name: "Item C", qty: 1, price: 500 },
      { name: "Item D", qty: 1, price: 350 },
    ],
  },
  {
    id: 3,
    returnNo: "SR-003",
    customer: "Ravi Kumar",
    date: "2025-11-04",
    items: 1,
    amount: 600,
    returnType: "Sales Return",
    status: "Cancelled",
    itemList: [{ name: "Item E", qty: 1, price: 600 }],
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Pending":
      return <Badge bg="warning">{status}</Badge>;
    case "Completed":
      return <Badge bg="success">{status}</Badge>;
    case "Cancelled":
      return <Badge bg="danger">{status}</Badge>;
    default:
      return <Badge bg="secondary">{status}</Badge>;
  }
};

const SalesReturn = () => {
  const [returns, setReturns] = useState(defaultReturns);
  const [showModal, setShowModal] = useState(false);
  const [editReturn, setEditReturn] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add/Edit Modal
  const handleAdd = () => {
    setEditReturn(null);
    setShowModal(true);
  };
  const handleEdit = (ret) => {
    setEditReturn(ret);
    setShowModal(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this return?")) {
      setReturns(returns.filter((r) => r.id !== id));
    }
  };
  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const newReturn = {
      id: editReturn ? editReturn.id : Date.now(),
      returnNo: form.returnNo.value,
      customer: form.customer.value,
      date: form.date.value,
      items: Number(form.items.value),
      amount: Number(form.amount.value),
      returnType: form.returnType.value,
      status: form.status.value,
      itemList: editReturn?.itemList || [],
    };

    if (editReturn) {
      setReturns(
        returns.map((r) => (r.id === editReturn.id ? newReturn : r))
      );
    } else {
      setReturns([newReturn, ...returns]);
    }
    setShowModal(false);
  };

  const toggleRow = (id) => {
    setExpandedRows(
      expandedRows.includes(id)
        ? expandedRows.filter((rowId) => rowId !== id)
        : [...expandedRows, id]
    );
  };

  const exportCSV = () => {
    const headers = [
      "Return No",
      "Customer",
      "Date",
      "Items",
      "Amount",
      "Type",
      "Status",
    ];
    const rows = returns.map((r) => [
      r.returnNo,
      r.customer,
      r.date,
      r.items,
      r.amount,
      r.returnType,
      r.status,
    ]);
    const csvContent =
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sales_returns.csv");
  };

  // Filtered & Paginated Data
  const filteredReturns = returns
    .filter(
      (r) =>
        r.returnNo.toLowerCase().includes(search.toLowerCase()) ||
        r.customer.toLowerCase().includes(search.toLowerCase())
    )
    .filter((r) => (statusFilter ? r.status === statusFilter : true));

  const totalPages = Math.ceil(filteredReturns.length / itemsPerPage);
  const paginatedReturns = filteredReturns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-4">
      <div
      className="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2"
      style={{ rowGap: "8px" }}
    >
      {/* Search Input */}
      <InputGroup style={{ maxWidth: "250px", height: "35px" }}>
        <Form.Control
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ height: "35px", fontSize: "0.9rem" }}
        />
        <Button
          variant="secondary"
          onClick={() => setSearch("")}
          style={{ height: "35px", padding: "0 10px" }}
        >
          <FaSearch size={14} />
        </Button>
      </InputGroup>

      {/* Filter Button */}
       <div className="d-flex gap-2">
      <Button
        variant="outline-secondary"
        onClick={() => setFiltersOpen(!filtersOpen)}
        size="sm"
        style={{ height: "35px", padding: "0 10px", display: "flex", alignItems: "center", gap: "5px" }}
      >
        <FaFilter size={14} /> Filter
      </Button>

      {/* Export Button */}
      <Button
        variant="success"
        onClick={exportCSV}
        size="sm"
        style={{ height: "35px", padding: "0 10px", display: "flex", alignItems: "center", gap: "5px" }}
      >
        <FaDownload size={14} /> Export
      </Button>
      </div>

      {/* Optional: You can show filter panel when filtersOpen */}
      {filtersOpen && (
        <div
          className="p-2 mt-2 border rounded"
          style={{ width: "100%", maxWidth: "400px", background: "#f8f9fa" }}
        >
          {/* Your filter fields go here */}
          <Form.Group className="mb-2">
            <Form.Label>Filter by Role</Form.Label>
            <Form.Select>
              <option>All</option>
              <option>Admin</option>
              <option>User</option>
            </Form.Select>
          </Form.Group>
        </div>
      )}
    </div>

      {/* Status Filter Buttons */}
      <div className="mb-2">
        {["", "Pending", "Completed", "Cancelled"].map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? "primary" : "outline-primary"}
            size="sm"
            className="me-2 rounded-pill"
            onClick={() => setStatusFilter(status)}
          >
            {status || "All"}
          </Button>
        ))}
      </div>

      {/* Table */}
      <div className="table-responsive">
        <Table hover bordered className="align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Return No</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReturns.map((r, idx) => (
              <React.Fragment key={r.id}>
                <tr
                  className="align-middle text-center"
                  style={{ transition: "0.3s", cursor: "pointer" }}
                >
                  <td>{idx + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td onClick={() => toggleRow(r.id)}>
                    {r.returnNo}{" "}
                    {expandedRows.includes(r.id) ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </td>
                  <td>{r.customer}</td>
                  <td>{r.date}</td>
                  <td>{r.items}</td>
                  <td>R{r.amount}</td>
                  <td>
                    <Badge
                      bg={r.returnType === "Sales Return" ? "primary" : "secondary"}
                    >
                      {r.returnType}
                    </Badge>
                  </td>
                  <td>{getStatusBadge(r.status)}</td>
                  <td className="d-flex gap-1 justify-content-center">
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
                  
                  </td>
                </tr>

                {/* Expandable row */}
                {expandedRows.includes(r.id) && (
                  <tr className="bg-light">
                    <td colSpan={9}>
                      <Collapse in={expandedRows.includes(r.id)}>
                        <div>
                          <Table size="sm" bordered>
                            <thead className="text-center">
                              <tr>
                                <th>Item Name</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {r.itemList.map((item, i) => (
                                <tr key={i} className="text-center">
                                  <td>{item.name}</td>
                                  <td>{item.qty}</td>
                                  <td>₹{item.price}</td>
                                  <td>₹{item.qty * item.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => setCurrentPage(1)} />
        <Pagination.Prev
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
      </Pagination>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editReturn ? "Edit Return" : "Add Return"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Return No</Form.Label>
                <Form.Control
                  name="returnNo"
                  defaultValue={editReturn?.returnNo || ""}
                  required
                  className="rounded-pill"
                />
              </Col>
              <Col md={6}>
                <Form.Label>Customer</Form.Label>
                <Form.Control
                  name="customer"
                  defaultValue={editReturn?.customer || ""}
                  required
                  className="rounded-pill"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  defaultValue={editReturn?.date || ""}
                  className="rounded-pill"
                />
              </Col>
              <Col md={4}>
                <Form.Label>Return Type</Form.Label>
                <Form.Select
                  name="returnType"
                  defaultValue={editReturn?.returnType || "Sales Return"}
                  className="rounded-pill"
                >
                  <option>Sales Return</option>
                  <option>Credit Note</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  defaultValue={editReturn?.status || "Pending"}
                  className="rounded-pill"
                >
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </Form.Select>
              </Col>
            </Row>

            <div className="text-end">
              <Button
                variant="secondary"
                className="rounded-pill me-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="rounded-pill">
                {editReturn ? "Update" : "Save"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SalesReturn;
