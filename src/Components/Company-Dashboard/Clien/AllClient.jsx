import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Badge,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { BiPlus, BiSearch, BiX } from "react-icons/bi";

// Dummy Client Data
const initialClients = [
  {
    id: 1,
    name: "Acme Corp",
    contact: "John Doe",
    email: "john@acme.com",
    phone: "+91 9876543210",
    status: "Active",
    type: "Corporate",
    region: "North",
  },
  {
    id: 2,
    name: "Beta Traders",
    contact: "Jane Smith",
    email: "jane@beta.com",
    phone: "+91 9123456780",
    status: "Inactive",
    type: "Individual",
    region: "West",
  },
  {
    id: 3,
    name: "Gamma Enterprises",
    contact: "Rajesh Kumar",
    email: "rajesh@gamma.com",
    phone: "+91 9988776655",
    status: "Active",
    type: "Corporate",
    region: "South",
  },
];

// Badge Colors
const statusColors = { Active: "success", Inactive: "secondary" };
const typeColors = { Corporate: "primary", Individual: "info" };

const AllClients = () => {
  const [clients, setClients] = useState(initialClients);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleView = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleEdit = (client) => {
    alert("Edit client feature coming soon 😉");
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setClients(clients.filter((c) => c.id !== deleteId));
    setShowDeleteModal(false);
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      searchTerm === "" ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="fw-bold text-dark">All Clients</h2>
     <Button
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px', // icon aur text ke beech thoda space
    background: "#3daaaa",
    border: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  }}
  onClick={() => alert("Add new client feature coming soon 😉")}
>
  <BiPlus size={20} /> Add Client
</Button>

      </div>

      {/* Filters & Search */}
      <Row className="mb-4 g-3">
        <Col md={4}>
          <div className="input-group shadow-sm rounded">
            <span className="input-group-text bg-white border-0">
              <BiSearch />
            </span>
            <Form.Control
              placeholder="Search by name/contact"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="light"
                onClick={() => setSearchTerm("")}
                className="border-0"
              >
                <BiX />
              </Button>
            )}
          </div>
        </Col>
        <Col md={3}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="shadow-sm rounded"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Clients Table */}
      <Card className="shadow-sm rounded-4 border-0">
        <div className="table-responsive">
          <Table hover className="mb-0 align-middle text-center">
            <thead className="bg-light text-dark">
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Type</th>
                <th>Region</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-muted py-4">
                    No clients found.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td className="fw-bold">{client.name}</td>
                    <td>{client.contact}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>
                      <Badge
                        bg={statusColors[client.status]}
                        className="rounded-pill px-2 py-1"
                      >
                        {client.status}
                      </Badge>
                    </td>
                    <td>
                      <Badge
                        bg={typeColors[client.type]}
                        className="rounded-pill px-2 py-1"
                      >
                        {client.type}
                      </Badge>
                    </td>
                    <td>{client.region}</td>
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
                       </Button>                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* View Client Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClient && (
            <div>
              <p>
                <strong>Name:</strong> {selectedClient.name}
              </p>
              <p>
                <strong>Contact:</strong> {selectedClient.contact}
              </p>
              <p>
                <strong>Email:</strong> {selectedClient.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedClient.phone}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge bg={statusColors[selectedClient.status]}>
                  {selectedClient.status}
                </Badge>
              </p>
              <p>
                <strong>Type:</strong>{" "}
                <Badge bg={typeColors[selectedClient.type]}>
                  {selectedClient.type}
                </Badge>
              </p>
              <p>
                <strong>Region:</strong> {selectedClient.region}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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
        <Modal.Body>Are you sure you want to delete this client?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
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

export default AllClients;
