import React, { useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";

const UnitOfMeasure = () => {
  // States
  const [units, setUnits] = useState([
    { id: 1, unit_name: "Kilogram", weight_per_unit: "1 KG" },
    { id: 2, unit_name: "Gram", weight_per_unit: "0.001 KG" },
    { id: 3, unit_name: "Liter", weight_per_unit: "1 L" },
    { id: 4, unit_name: "Milliliter", weight_per_unit: "0.001 L" },
    { id: 5, unit_name: "Piece", weight_per_unit: "0.5 KG" },
    { id: 6, unit_name: "Dozen", weight_per_unit: "6 KG" },
    { id: 7, unit_name: "Box", weight_per_unit: "2.5 KG" },
    { id: 8, unit_name: "Pack", weight_per_unit: "0.25 KG" },
    { id: 9, unit_name: "Roll", weight_per_unit: "1.2 KG" },
    { id: 10, unit_name: "Meter", weight_per_unit: "0.8 KG" },
    { id: 11, unit_name: "Centimeter", weight_per_unit: "0.008 KG" },
    { id: 12, unit_name: "Square Meter", weight_per_unit: "1.5 KG" },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [unitName, setUnitName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [editId, setEditId] = useState(null);

  const [newUOM, setNewUOM] = useState("");
  const [showAddUOMModal, setShowAddUOMModal] = useState(false);
  const [uoms, setUoms] = useState([
    "Kilogram", "Gram", "Liter", "Milliliter", "Piece", 
    "Dozen", "Box", "Pack", "Roll", "Meter", "Centimeter", "Square Meter"
  ]);

  // For Unit Details Modal
  const [showUOMModal, setShowUOMModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [weightPerUnit, setWeightPerUnit] = useState("");

  // For Delete Confirmation Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle Create/Edit Unit Modal
  const handleModalClose = () => {
    setShowModal(false);
    setUnitName("");
    setAbbreviation("");
    setEditId(null);
  };

  const handleModalShow = (data = null) => {
    if (data) {
      setEditId(data.id);
      setUnitName(data.unit_name || "");
      setWeightPerUnit(data.weight_per_unit || "");
    }
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (editId) {
      // Update existing unit
      setUnits(units.map(u => u.id === editId ? { ...u, unit_name: unitName, weight_per_unit: weightPerUnit } : u));
      alert("Unit updated successfully!");
    } else {
      // Create new unit
      const newId = units.length > 0 ? Math.max(...units.map(u => u.id)) + 1 : 1;
      setUnits([...units, { id: newId, unit_name: unitName, weight_per_unit: weightPerUnit }]);
      alert("Unit created successfully!");
    }
    handleModalClose();
  };

  // Delete Unit - Show confirmation modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    setUnits(units.filter(u => u.id !== deleteId));
    alert("Unit deleted successfully.");
    setDeleteId(null);
  };

  // Pagination
  const totalPages = Math.ceil(units.length / itemsPerPage);
  const currentItems = units.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Import Excel
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
        const newUnits = data.map((item, index) => {
          const newId = units.length > 0 ? Math.max(...units.map(u => u.id)) + index + 1 : index + 1;
          return {
            id: newId,
            unit_name: item["Unit Name"] || "",
            weight_per_unit: item["Weight per Unit"] || "",
          };
        });
        
        setUnits([...units, ...newUnits]);
        alert("Units imported successfully!");
      } catch (error) {
        console.error("Import Error:", error);
        alert("Failed to import units. Please try again.");
      }
    };
    reader.readAsBinaryString(file);
  };

  // Export to Excel
  const handleExport = () => {
    const exportData = units.map(({ unit_name, weight_per_unit }) => ({
      "Unit Name": unit_name || "",
      "Weight per Unit": weight_per_unit || "",
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Units");
    XLSX.writeFile(wb, "unit-of-measure.xlsx");
  };

  // Download Template
  const handleDownloadTemplate = () => {
    const template = [{ 
      "Unit Name": "",
      "Weight per Unit": "" 
    }];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "uom-template.xlsx");
  };

  // Page Change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Add New UOM
  const handleAddUOM = () => {
    const uomName = newUOM.trim();

    if (!uomName) {
      alert("Please enter a valid UOM name.");
      return;
    }

    if (uoms.includes(uomName)) {
      alert("This UOM already exists.");
      return;
    }

    setUoms([...uoms, uomName]);
    setSelectedUnit(uomName);
    setNewUOM("");
    setShowAddUOMModal(false);
    alert("UOM added successfully!");
  };

  // Submit Unit Details
  const handleSubmitUnitDetails = () => {
    if (!selectedUnit || !weightPerUnit) {
      alert("Please fill all fields");
      return;
    }

    const newId = units.length > 0 ? Math.max(...units.map(u => u.id)) + 1 : 1;
    setUnits([...units, { id: newId, unit_name: selectedUnit, weight_per_unit: weightPerUnit }]);
    
    alert("Unit details saved successfully!");
    setShowUOMModal(false);
    setSelectedUnit("");
    setWeightPerUnit("");
  };

  return (
    <div className="mx-md-5 mt-5 mx-3">
      <div className="shadow p-4">
        <div className="d-flex justify-content-between flex-wrap gap-2">
          <h4 className="fw-semibold">Manage Unit of Measure</h4>
          <div className="d-flex gap-2 flex-wrap">
            <Button
              className="rounded-pill text-white"
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
              onClick={() => document.getElementById("excelImport").click()}
            >
              <i className="fas fa-file-import me-2" /> Import
            </Button>

            <input
              type="file"
              id="excelImport"
              accept=".xlsx, .xls"
              style={{ display: "none" }}
              onChange={handleImport}
            />

            <Button
              className="rounded-pill text-white"
              style={{ backgroundColor: "#fd7e14", borderColor: "#fd7e14" }}
              onClick={handleExport}
            >
              <i className="fas fa-file-export me-2" /> Export
            </Button>

            <Button
              className="rounded-pill text-white"
              style={{ backgroundColor: "#ffc107", borderColor: "#ffc107" }}
              onClick={handleDownloadTemplate}
            >
              <i className="fas fa-download me-2" /> Download Template
            </Button>

            <Button
              className="set_btn text-white fw-semibold"
              style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}
              onClick={() => setShowUOMModal(true)}
            >
              <i className="fa fa-plus me-2"></i>
              Create Unit
            </Button>
          </div>
        </div>

        <div className="table-responsive mt-3">
          <Table bordered striped hover>
            <thead className="table-light">
              <tr>
                <th>S.No</th>
                <th>Unit Name</th>
                <th>Weight per Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((u, index) => (
                  <tr key={u.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{u.unit_name || ""}</td>
                    <td>{u.weight_per_unit || ""}</td>
                    <td>
                      <Button
                        variant="link"
                        className="text-warning p-0 me-2"
                        onClick={() => handleModalShow(u)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="link"
                        className="text-danger p-0 me-2"
                        onClick={() => handleDeleteClick(u.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No units found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2 px-2">
          <span className="small text-muted">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, units.length)} of {units.length} entries
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0 flex-wrap">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link rounded-start"
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    style={
                      currentPage === index + 1
                        ? { backgroundColor: '#3daaaa', borderColor: '#3daaaa', color: 'white' }
                        : {}
                    }
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link rounded-end"
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Edit Unit Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Unit" : "Add Unit"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Unit Name</Form.Label>
              <Form.Select
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                required
              >
                <option value="">Select Unit</option>
                {uoms.map((uom, idx) => (
                  <option key={idx} value={uom}>
                    {uom}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Weight per Unit</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 0.5 KG"
                value={weightPerUnit}
                onChange={(e) => setWeightPerUnit(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleModalClose}
            style={{
              border: 'none',
              color: '#fff',
              padding: '6px 16px',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleFormSubmit}
            style={{
              backgroundColor: '#27b2b6',
              border: 'none',
              color: '#fff',
              padding: '6px 16px',
            }}
          >
            {editId ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Unit Details Modal */}
      <Modal show={showUOMModal} onHide={() => setShowUOMModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Unit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <Form.Label className="mb-0">Unit of Measurement (UOM)</Form.Label>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setShowAddUOMModal(true)}
                  style={{
                    backgroundColor: '#27b2b6',
                    border: 'none',
                    color: '#fff',
                    padding: '6px 12px',
                    fontSize: '12px',
                  }}
                >
                  + Add New
                </Button>
              </div>
              <Form.Select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="mt-2"
              >
                <option value="">Select Unit</option>
                {uoms.map((uom, idx) => (
                  <option key={idx} value={uom}>
                    {uom}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Weight per Unit</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 0.5 KG"
                value={weightPerUnit}
                onChange={(e) => setWeightPerUnit(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUOMModal(false)}
            style={{
              border: 'none',
              color: '#fff',
              padding: '6px 16px',
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitUnitDetails}
            style={{
              backgroundColor: '#27b2b6',
              border: 'none',
              color: '#fff',
              padding: '6px 16px',
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add New UOM Modal */}
      <Modal show={showAddUOMModal} onHide={() => setShowAddUOMModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New UOM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Unit of Measurement</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Pack, Dozen, Roll"
              value={newUOM}
              onChange={(e) => setNewUOM(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddUOMModal(false)}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: '#27b2b6',
              border: 'none',
              color: '#fff',
              padding: '6px 16px',
            }}
            onClick={handleAddUOM}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this unit?</p>
          <p className="text-muted small">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UnitOfMeasure;