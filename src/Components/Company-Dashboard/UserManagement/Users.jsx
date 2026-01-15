import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Modal,
  Badge,
} from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaKey } from "react-icons/fa";

const emptyUser = {
  id: null,
  name: "",
  phone: "",
  email: "",
  role: "",
  user_role: "",
  status: "Active",
  img: "",
  password: "",
  confirmPassword: "",
  company_id: null,
};

const statusBadge = (status) => {
  const normalized =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  return (
    <Badge
      style={{
        background: normalized === "Active" ? "#27ae60" : "#e74c3c",
        color: "#fff",
        fontWeight: 500,
        fontSize: 14,
        borderRadius: 8,
        padding: "5px 15px",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#fff",
          marginRight: 6,
        }}
      ></span>
      {normalized}
    </Badge>
  );
};

const Users = () => {
  const mockRoles = [
    { id: "1", role_name: "Admin" },
    { id: "2", role_name: "Manager" },
    { id: "3", role_name: "Sales Executive" },
    { id: "4", role_name: "Support Staff" },
  ];

  const mockUsers = [
    { id: 1, name: "John Doe", phone: "123-456-7890", email: "john@example.com", role: "Admin", user_role: "1", status: "Active", img: "", company_id: 1 },
    { id: 2, name: "Jane Smith", phone: "234-567-8901", email: "jane@example.com", role: "Manager", user_role: "2", status: "Active", img: "", company_id: 1 },
    { id: 3, name: "Robert Johnson", phone: "345-678-9012", email: "robert@example.com", role: "Sales Executive", user_role: "3", status: "Inactive", img: "", company_id: 1 },
    { id: 4, name: "Emily Davis", phone: "456-789-0123", email: "emily@example.com", role: "Support Staff", user_role: "4", status: "Active", img: "", company_id: 1 },
  ];

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [form, setForm] = useState(emptyUser);
  const [previewImg, setPreviewImg] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [userToReset, setUserToReset] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterRole, setFilterRole] = useState("All");

  const companyId = 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      setRoles(mockRoles);
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const uniqueRoles = ["All", ...new Set(roles.map((r) => r.role_name))];

  const filtered = users.filter((u) => {
    const toLower = (str) => (str == null ? "" : String(str).toLowerCase());
    const searchLower = toLower(search);
    const filterNameLower = toLower(filterName);
    const filterEmailLower = toLower(filterEmail);
    const filterPhoneLower = toLower(filterPhone);
    const filterStatusLower = toLower(filterStatus);
    const uName = toLower(u.name);
    const uPhone = toLower(u.phone);
    const uEmail = toLower(u.email);
    const uRole = toLower(u.role);
    const uStatus = toLower(u.status);
    const matchesSearch =
      uName.includes(searchLower) ||
      uPhone.includes(searchLower) ||
      uEmail.includes(searchLower) ||
      uRole.includes(searchLower);
    const matchesName = filterName === "" || uName.includes(filterNameLower);
    const matchesEmail =
      filterEmail === "" || uEmail.includes(filterEmailLower);
    const matchesPhone =
      filterPhone === "" || uPhone.includes(filterPhoneLower);
    const matchesStatus =
      filterStatus === "All" || uStatus === filterStatusLower;
    const matchesRole = filterRole === "All" || u.role === filterRole;
    return (
      matchesSearch &&
      matchesName &&
      matchesEmail &&
      matchesPhone &&
      matchesStatus &&
      matchesRole
    );
  });

  const handleSave = () => {
    if (modalType === "add" && form.password !== form.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    const selectedRole = roles.find((r) => r.id.toString() === form.user_role);
    const roleName = selectedRole ? selectedRole.role_name : "Sales Executive";
    if (modalType === "add") {
      const newUser = {
        ...form,
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        img: previewImg,
        company_id: companyId,
        role: roleName,
      };
      setUsers((prev) => [...prev, newUser]);
      alert("User created successfully!");
    } else if (modalType === "edit") {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === form.id
            ? { ...form, img: previewImg, company_id: companyId, role: roleName }
            : u
        )
      );
      alert("User updated successfully!");
    }
    setTimeout(() => {
      setShowModal(false);
      setForm(emptyUser);
      setPreviewImg("");
    }, 500);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      if (previewImg && previewImg.startsWith("blob:")) URL.revokeObjectURL(previewImg);
      setForm({ ...emptyUser });
      setPreviewImg("");
    }, 300);
  };

  const handleAdd = () => {
    setForm({ ...emptyUser, company_id: companyId });
    setPreviewImg("");
    setModalType("add");
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setForm({ ...user, confirmPassword: "", company_id: user.company_id || companyId });
    setPreviewImg(user.img || "");
    setModalType("edit");
    setShowModal(true);
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    alert("User deleted successfully!");
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <Container fluid className="p-4" style={{ minHeight: "100vh", background: "#f7f9fc" }}>
      {/* Header */}
    <Row className="mb-3 align-items-center">
  <Col>
    <h3 className="fw-bold">Users</h3>
    <p className="text-muted mb-0">Manage your users efficiently</p>
  </Col>
  <Col className="text-end d-flex justify-content-end gap-2">
   

    <Button
      variant="success"
      className="d-flex align-items-center"
      style={{ gap: "6px" }}
      onClick={handleAdd}
    >
      <FaPlus /> Add User
    </Button>
  </Col>
</Row>


      {/* Search */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            placeholder="Search by name, email, phone, or role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      {/* Filters */}
      {showFilters && (
  <Card className="mb-4 shadow-sm">
    <Card.Body>
      <Row className="g-3 align-items-end">
        <Col md={4} sm={6}>
          <Form.Control
            placeholder="Filter by Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </Col>
        <Col md={4} sm={6}>
          <Form.Control
            placeholder="Filter by Email"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
          />
        </Col>
        <Col md={4} sm={6}>
          <Form.Control
            placeholder="Filter by Phone"
            value={filterPhone}
            onChange={(e) => setFilterPhone(e.target.value)}
          />
        </Col>
        <Col md={4} sm={6}>
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Select>
        </Col>
        <Col md={4} sm={6}>
          <Form.Select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4} sm={6} className="text-end">
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center justify-content-center"
            onClick={() => {
              setFilterName("");
              setFilterEmail("");
              setFilterPhone("");
              setFilterStatus("All");
              setFilterRole("All");
            }}
            style={{ gap: "6px" }}
          >
            <FaTimes /> Clear Filters
          </Button>
        </Col>
      </Row>
    </Card.Body>
  </Card>
)}

      {/* Users Table */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0">
            <thead style={{ background: "#f1f3f6" }}>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    No users found.
                  </td>
                </tr>
              )}
              {filtered.map((u, idx) => (
                <tr key={u.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <img
                      src={u.img || "https://via.placeholder.com/40"}
                      alt={u.name}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        objectFit: "cover",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    />
                  </td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.role}</td>
                  <td>{statusBadge(u.status)}</td>
                  <td className="text-end">
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(u)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => confirmDelete(u)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "add" ? "Add User" : "Edit User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={form.user_role}
                  onChange={(e) => setForm({ ...form, user_role: e.target.value })}
                >
                  <option value="">Select Role</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.role_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            {modalType === "add" && (
              <>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </>
            )}
            <Col md={12} className="text-center">
              <img
                src={previewImg || "https://via.placeholder.com/80"}
                alt="Preview"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              />
              <Form.Group className="mt-2">
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    e.target.files[0] &&
                    setPreviewImg(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            {modalType === "add" ? "Add User" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{userToDelete?.name}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Users;
