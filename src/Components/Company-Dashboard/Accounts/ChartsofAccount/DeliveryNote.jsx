import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

function DeliveryNote() {
  const [notes, setNotes] = useState([
    { id: 1, date: "2025-11-03", customer: "John Doe", product: "Product A", quantity: 10, amount: 500 },
    { id: 2, date: "2025-11-02", customer: "Jane Smith", product: "Product B", quantity: 5, amount: 250 },
    { id: 3, date: "2025-11-01", customer: "Alice Johnson", product: "Product C", quantity: 20, amount: 1000 },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: null, date: "", customer: "", product: "", quantity: "", amount: "" });
  const [noteDate, setNoteDate] = useState("");
  const [noteCustomer, setNoteCustomer] = useState("");
  const [noteProduct, setNoteProduct] = useState("");
  const [noteQuantity, setNoteQuantity] = useState("");
  const [noteAmount, setNoteAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 5;

  // Modal handlers
  const openAdd = () => setShowAdd(true);
  const closeAdd = () => {
    setShowAdd(false);
    setNoteDate("");
    setNoteCustomer("");
    setNoteProduct("");
    setNoteQuantity("");
    setNoteAmount("");
  };

  const openEdit = (note) => { setCurrentNote(note); setShowEdit(true); };
  const closeEdit = () => {
    setShowEdit(false);
    setCurrentNote({ id: null, date: "", customer: "", product: "", quantity: "", amount: "" });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newNote = {
      id: Date.now(),
      date: noteDate,
      customer: noteCustomer,
      product: noteProduct,
      quantity: noteQuantity,
      amount: noteAmount,
    };
    setNotes([...notes, newNote]);
    closeAdd();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setNotes(notes.map((n) => (n.id === currentNote.id ? currentNote : n)));
    closeEdit();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this delivery note?")) {
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.date.includes(searchTerm)
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

  return (
    <div className="container py-4">
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2
          style={{
            fontWeight: "700",
            color: "#2b6777",
            letterSpacing: "1px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          📦 Delivery Notes
        </h2>
        <p className="text-muted">Manage your delivery records easily</p>
      </motion.div>

      {/* Search and Add Button */}
      <div className="d-flex flex-column flex-md-row justify-content-between mb-3 gap-3">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text style={{ backgroundColor: "#3daaaa", color: "white" }}>
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search delivery notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Button
          onClick={openAdd}
          className="d-flex align-items-center gap-2 px-3 py-2"
          style={{
            background: "linear-gradient(135deg, #3daaaa, #60c0c0)",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            transition: "0.3s",
          }}
        >
          <FaPlus /> Add Delivery Note
        </Button>
      </div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          overflowX: "auto",
          padding: "15px",
        }}
      >
        <Table hover responsive>
          <thead style={{ backgroundColor: "#eaf6f6" }}>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {currentNotes.map((note, index) => (
                <motion.tr
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{indexOfFirstNote + index + 1}</td>
                  <td>{note.date}</td>
                  <td>{note.customer}</td>
                  <td>{note.product}</td>
                  <td>{note.quantity}</td>
                  <td>{note.amount}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => openEdit(note)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(note.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </motion.tr>
              ))}
              {currentNotes.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    No delivery notes found.
                  </td>
                </tr>
              )}
            </tbody>
          </AnimatePresence>
        </Table>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-3">
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

      {/* Add Modal */}
      <Modal show={showAdd} onHide={closeAdd} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#3daaaa" }}>New Delivery Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={noteDate} onChange={(e) => setNoteDate(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer</Form.Label>
              <Form.Control type="text" value={noteCustomer} onChange={(e) => setNoteCustomer(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Control type="text" value={noteProduct} onChange={(e) => setNoteProduct(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" value={noteQuantity} onChange={(e) => setNoteQuantity(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" value={noteAmount} onChange={(e) => setNoteAmount(e.target.value)} required />
            </Form.Group>
            <Button type="submit" className="w-100" style={{ backgroundColor: "#3daaaa", border: "none" }}>
              Add Delivery Note
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={closeEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#3daaaa" }}>Edit Delivery Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEdit}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={currentNote.date} onChange={(e) => setCurrentNote({ ...currentNote, date: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer</Form.Label>
              <Form.Control type="text" value={currentNote.customer} onChange={(e) => setCurrentNote({ ...currentNote, customer: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Control type="text" value={currentNote.product} onChange={(e) => setCurrentNote({ ...currentNote, product: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" value={currentNote.quantity} onChange={(e) => setCurrentNote({ ...currentNote, quantity: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" value={currentNote.amount} onChange={(e) => setCurrentNote({ ...currentNote, amount: e.target.value })} required />
            </Form.Group>
            <Button type="submit" className="w-100" style={{ backgroundColor: "#3daaaa", border: "none" }}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DeliveryNote;
