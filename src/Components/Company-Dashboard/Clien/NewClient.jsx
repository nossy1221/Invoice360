import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FaEye, FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

const defaultClients = [
  {
    id: 1,
    name: "Alpha Corp",
    contactName: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    company: "Alpha Corp",
    address: "123 Market St, Mumbai",
    gstin: "27ABCDE1234F2Z5",
    createdAt: "2024-09-12",
    isActive: true,
  },
  {
    id: 2,
    name: "Beta LLC",
    contactName: "Jane Smith",
    email: "janesmith@example.com",
    phone: "9876512340",
    company: "Beta LLC",
    address: "456 Industrial Rd, Pune",
    gstin: "27ZYXWV9876M1Z2",
    createdAt: "2024-10-24",
    isActive: false,
  },
  {
    id: 3,
    name: "Gamma Inc",
    contactName: "Mike Johnson",
    email: "mikej@example.com",
    phone: "9812345670",
    company: "Gamma Inc",
    address: "789 Business Park, Bangalore",
    gstin: "29LMNOP4567Q3Z1",
    createdAt: "2025-01-15",
    isActive: true,
  },
];

const Clients = () => {
  const [clients, setClients] = useState(defaultClients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Modals & form state
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selected, setSelected] = useState(null);

  const emptyForm = {
    name: "",
    contactName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    gstin: "",
    isActive: true,
  };

  const [form, setForm] = useState(emptyForm);

  // Filtered clients based on search/status/date
  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contactName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && c.isActive) ||
      (statusFilter === "Inactive" && !c.isActive);

    const clientDate = new Date(c.createdAt);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesDate =
      (!from || clientDate >= from) && (!to || clientDate <= to);

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Handlers
  const openAdd = () => {
    setForm(emptyForm);
    setShowAdd(true);
  };

  const handleAddSave = () => {
    if (!form.name.trim()) return;
    const newClient = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setClients((prev) => [newClient, ...prev]);
    setShowAdd(false);
  };

  const handleEdit = (client) => {
    setSelected(client);
    setForm({
      name: client.name,
      contactName: client.contactName,
      email: client.email,
      phone: client.phone,
      company: client.company,
      address: client.address,
      gstin: client.gstin,
      isActive: client.isActive,
    });
    setShowEdit(true);
  };

  const handleEditSave = () => {
    if (!form.name.trim()) return;
    setClients((prev) =>
      prev.map((c) =>
        c.id === selected.id ? { ...c, ...form, id: c.id } : c
      )
    );
    setShowEdit(false);
  };

  const handleView = (client) => {
    setSelected(client);
    setShowView(true);
  };

  const handleDelete = (client) => {
    setSelected(client);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    setClients((prev) => prev.filter((c) => c.id !== selected.id));
    setShowDelete(false);
  };

  const toggleStatus = (id) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  return (
    <div className="p-4" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 style={{ fontWeight: 600 }}>Client</h4>
          <p style={{ marginBottom: 0, color: "#666" }}>Manage your clients</p>
        </div>
        <div>
       <Button
  style={{
    display: "flex",          // icon + text ek line me
    alignItems: "center",     // vertically center align
    gap: "5px",               // icon aur text ke beech space
    whiteSpace: "nowrap",     // text wrap na ho
    padding: "6px 12px",      // thodi width control ke liye
    backgroundColor: "#3daaaa",
    borderColor: "#3daaaa",
    fontSize: "14px",         // text size
  }}
  onClick={openAdd}
>
  <FaUserPlus />
  + Add Client
</Button>

        </div>
      </div>

      {/* Card */}
      <Card>
        <Card.Body>
          {/* Filters */}
          <div className="d-flex flex-wrap gap-3 mb-3 align-items-end">
            <div>
              <Form.Label>Search Client</Form.Label>
              <InputGroup style={{ maxWidth: 320 }}>
                <Form.Control
                  placeholder="Enter client name or contact"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </div>

            <div>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ minWidth: 150 }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </div>

            <div>
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                style={{ minWidth: 140 }}
              />
            </div>

            <div>
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={{ minWidth: 140 }}
              />
            </div>

            <div>
              <Form.Label>&nbsp;</Form.Label>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                  setFromDate("");
                  setToDate("");
                }}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <Table responsive className="align-middle mb-0" style={{ minWidth: 800 }}>
              <thead>
                <tr style={{ background: "#f2f2f2" }}>
                  <th>Client</th>
                  <th>Contact</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th style={{ minWidth: 150 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div className="text-muted" style={{ fontSize: 13 }}>{c.company}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{c.contactName}</div>
                      <div className="text-muted" style={{ fontSize: 13 }}>
                        {c.email} • {c.phone}
                      </div>
                    </td>
                    <td>{c.createdAt}</td>
                    <td>
                      <span
                        onClick={() => toggleStatus(c.id)}
                        title={`Click to mark as ${c.isActive ? "Inactive" : "Active"}`}
                        style={{
                          background: c.isActive ? "#27ae60" : "#e74c3c",
                          color: "#fff",
                          padding: "6px 12px",
                          borderRadius: 20,
                          fontSize: 13,
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                      >
                        {c.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  <td>
  <div className="d-flex gap-2">
    {/* Eye button - Sky Blue */}
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
                ))}

                {filteredClients.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-4">
                      No clients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Add Client Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                placeholder="Enter client name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Name</Form.Label>
              <Form.Control
                placeholder="Contact person"
                value={form.contactName}
                onChange={(e) => setForm({ ...form, contactName: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email & Phone</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Form.Control
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                placeholder="Company / Organization"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>GSTIN (optional)</Form.Label>
              <Form.Control
                placeholder="GSTIN"
                value={form.gstin}
                onChange={(e) => setForm({ ...form, gstin: e.target.value })}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Active"
              checked={form.isActive}
              onChange={() => setForm({ ...form, isActive: !form.isActive })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
          <Button
            style={{ background: "#53b2a5", border: "none" }}
            onClick={handleAddSave}
            disabled={!form.name.trim()}
          >
            Add Client
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Client Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                placeholder="Enter client name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Name</Form.Label>
              <Form.Control
                placeholder="Contact person"
                value={form.contactName}
                onChange={(e) => setForm({ ...form, contactName: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email & Phone</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Form.Control
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                placeholder="Company / Organization"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>GSTIN (optional)</Form.Label>
              <Form.Control
                placeholder="GSTIN"
                value={form.gstin}
                onChange={(e) => setForm({ ...form, gstin: e.target.value })}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Active"
              checked={form.isActive}
              onChange={() => setForm({ ...form, isActive: !form.isActive })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button
            style={{ background: "#53b2a5", border: "none" }}
            onClick={handleEditSave}
            disabled={!form.name.trim()}
          >
            Update Client
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Client Modal */}
      <Modal show={showView} onHide={() => setShowView(false)} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <h5 style={{ marginBottom: 6 }}>{selected.name}</h5>
              <p className="text-muted mb-2" style={{ marginBottom: 8 }}>
                {selected.company}
              </p>

              <p style={{ marginBottom: 6 }}>
                <strong>Contact:</strong> {selected.contactName}
              </p>
              <p style={{ marginBottom: 6 }}>
                <strong>Email:</strong> {selected.email}
              </p>
              <p style={{ marginBottom: 6 }}>
                <strong>Phone:</strong> {selected.phone}
              </p>
              <p style={{ marginBottom: 6 }}>
                <strong>Address:</strong> {selected.address}
              </p>
              <p style={{ marginBottom: 6 }}>
                <strong>GSTIN:</strong> {selected.gstin || "—"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`badge ${selected.isActive ? "bg-success" : "bg-danger"} ms-2`}>
                  {selected.isActive ? "Active" : "Inactive"}
                </span>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirm */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{selected?.name}</b>? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <p className="text-muted text-center mt-3">
        Manage and track clients — add client details, contact info, GSTIN and status.
      </p>
    </div>
  );
};

export default Clients;
