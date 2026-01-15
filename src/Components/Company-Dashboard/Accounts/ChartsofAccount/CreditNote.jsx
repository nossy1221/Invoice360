import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  InputGroup,
  FormControl,
  Pagination,
  Card,
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function CreditNote() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      date: "2025-11-03",
      customer: "John Doe",
      description: "Returned Product A",
      quantity: 2,
      rate: 100,
      amount: 200,
    },
    {
      id: 2,
      date: "2025-11-02",
      customer: "Jane Smith",
      description: "Returned Product B",
      quantity: 1,
      rate: 250,
      amount: 250,
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    date: "",
    customer: "",
    description: "",
    quantity: "",
    rate: "",
    amount: "",
  });

  const [noteDate, setNoteDate] = useState("");
  const [noteCustomer, setNoteCustomer] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [noteQuantity, setNoteQuantity] = useState("");
  const [noteRate, setNoteRate] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 5;

  const openAdd = () => setShowAdd(true);
  const closeAdd = () => {
    setShowAdd(false);
    setNoteDate("");
    setNoteCustomer("");
    setNoteDesc("");
    setNoteQuantity("");
    setNoteRate("");
  };

  const openEdit = (note) => {
    setCurrentNote(note);
    setShowEdit(true);
  };
  const closeEdit = () => {
    setShowEdit(false);
    setCurrentNote({
      id: null,
      date: "",
      customer: "",
      description: "",
      quantity: "",
      rate: "",
      amount: "",
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newNote = {
      id: Date.now(),
      date: noteDate,
      customer: noteCustomer,
      description: noteDesc,
      quantity: noteQuantity,
      rate: noteRate,
      amount: noteQuantity * noteRate,
    };
    setNotes([...notes, newNote]);
    closeAdd();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedNote = {
      ...currentNote,
      amount: currentNote.quantity * currentNote.rate,
    };
    setNotes(notes.map((n) => (n.id === currentNote.id ? updatedNote : n)));
    closeEdit();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this credit note?")) {
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.date.includes(searchTerm)
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

  return (
    <div className="credit-new-container py-3">
      <h2
        className="credit-new-title mb-4 fw-bold"
        style={{ color: "#3daaaa" }}
      >
        Credit Notes
      </h2>

      {/* 🔍 Search & Add */}
      <div className="d-flex flex-column flex-md-row justify-content-between mb-4 gap-2">
        <InputGroup style={{ maxWidth: "350px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search credit notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Button
          className="d-flex align-items-center gap-2 shadow-sm"
          style={{
            backgroundColor: "#3daaaa",
            borderColor: "#3daaaa",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#2b8888")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#3daaaa")
          }
          onClick={openAdd}
        >
          <FaPlus /> Add Credit Note
        </Button>
      </div>

      {/* 📋 Notes List */}
      <div
        className="credit-new-table-wrapper"
        style={{ overflowX: "auto", transition: "0.3s" }}
      >
        {currentNotes.map((note, index) => (
          <Card
            key={note.id}
            className="mb-3 shadow-sm credit-note-card border-0"
            style={{
              borderRadius: "12px",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(0, 0, 0, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
            }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between flex-wrap align-items-start">
                <div>
                  <h6 style={{ color: "#3daaaa" }}>{note.customer}</h6>
                  <p className="mb-1 text-secondary">{note.description}</p>
                  <small className="text-muted">{note.date}</small>
                </div>
                <div className="text-end">
                  <p className="mb-1">
                    <strong>Qty:</strong> {note.quantity}
                  </p>
                  <p className="mb-1">
                    <strong>Rate:</strong> R{note.rate}
                  </p>
                  <h6 className="fw-semibold text-dark">
                    Amount: R{note.amount}
                  </h6>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button
                  variant="warning"
                  size="sm"
                  className="shadow-sm"
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#e0a800")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#ffc107")
                  }
                  onClick={() => openEdit(note)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="shadow-sm"
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#c82333")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#dc3545")
                  }
                  onClick={() => handleDelete(note.id)}
                >
                  <FaTrash />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}

        {currentNotes.length === 0 && (
          <p className="text-center text-muted">No credit notes found.</p>
        )}
      </div>

      {/* 🔢 Pagination */}
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

      {/* ➕ Add Modal */}
      <Modal show={showAdd} onHide={closeAdd} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Credit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={noteDate}
                onChange={(e) => setNoteDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer</Form.Label>
              <Form.Control
                type="text"
                value={noteCustomer}
                onChange={(e) => setNoteCustomer(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={noteDesc}
                onChange={(e) => setNoteDesc(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={noteQuantity}
                onChange={(e) => setNoteQuantity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rate</Form.Label>
              <Form.Control
                type="number"
                value={noteRate}
                onChange={(e) => setNoteRate(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: "#3daaaa",
                borderColor: "#3daaaa",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#2b8888")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#3daaaa")
              }
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ✏️ Edit Modal */}
      <Modal show={showEdit} onHide={closeEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Credit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEdit}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={currentNote.date}
                onChange={(e) =>
                  setCurrentNote({ ...currentNote, date: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer</Form.Label>
              <Form.Control
                type="text"
                value={currentNote.customer}
                onChange={(e) =>
                  setCurrentNote({ ...currentNote, customer: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={currentNote.description}
                onChange={(e) =>
                  setCurrentNote({ ...currentNote, description: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={currentNote.quantity}
                onChange={(e) =>
                  setCurrentNote({ ...currentNote, quantity: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rate</Form.Label>
              <Form.Control
                type="number"
                value={currentNote.rate}
                onChange={(e) =>
                  setCurrentNote({ ...currentNote, rate: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={currentNote.quantity * currentNote.rate}
                readOnly
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: "#3daaaa",
                borderColor: "#3daaaa",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#2b8888")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#3daaaa")
              }
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreditNote;
