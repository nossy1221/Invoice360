// InventoryItems.js
import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaPlus, FaInfoCircle } from 'react-icons/fa';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import AddProductModal from './AddProductModal';
import { BiTransfer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const InventoryItems = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [quantityRange, setQuantityRange] = useState("All");
  
  // Static inventory data instead of API fetch
  const [items, setItems] = useState([
    {
      id: 1,
      itemName: "Laptop",
      hsn: "8471",
      barcode: "LP123456",
      description: "High-performance laptop",
      quantity: 15,
      date: "2023-05-15",
      cost: 75000,
      value: 85000,
      minQty: 5,
      taxAccount: "GST 18%",
      discount: 5,
      remarks: "Latest model",
      image: null,
      status: "In Stock",
      warehouse_id: 1,
      item_category_id: 1,
      warehouse: "Main Warehouse",
      itemCategory: "Electronics",
      sku: "LP-001"
    },
    {
      id: 2,
      itemName: "Office Chair",
      hsn: "9401",
      barcode: "CH789012",
      description: "Ergonomic office chair",
      quantity: 8,
      date: "2023-06-20",
      cost: 4500,
      value: 5500,
      minQty: 3,
      taxAccount: "GST 12%",
      discount: 10,
      remarks: "Comfortable design",
      image: null,
      status: "In Stock",
      warehouse_id: 1,
      item_category_id: 2,
      warehouse: "Main Warehouse",
      itemCategory: "Furniture",
      sku: "CH-002"
    },
    {
      id: 3,
      itemName: "Wireless Mouse",
      hsn: "8471",
      barcode: "MS345678",
      description: "Bluetooth wireless mouse",
      quantity: 0,
      date: "2023-07-10",
      cost: 800,
      value: 1200,
      minQty: 10,
      taxAccount: "GST 18%",
      discount: 0,
      remarks: "Battery included",
      image: null,
      status: "Out of Stock",
      warehouse_id: 2,
      item_category_id: 1,
      warehouse: "Secondary Warehouse",
      itemCategory: "Electronics",
      sku: "MS-003"
    },
    {
      id: 4,
      itemName: "Desk Lamp",
      hsn: "9405",
      barcode: "DL901234",
      description: "LED desk lamp with adjustable arm",
      quantity: 25,
      date: "2023-08-05",
      cost: 1200,
      value: 1800,
      minQty: 5,
      taxAccount: "GST 12%",
      discount: 15,
      remarks: "Energy efficient",
      image: null,
      status: "In Stock",
      warehouse_id: 2,
      item_category_id: 2,
      warehouse: "Secondary Warehouse",
      itemCategory: "Furniture",
      sku: "DL-004"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWarehouse, setSelectedWarehouse] = useState("All");

  // For filters, we use the transformed warehouse/category display names
  const uniqueCategories = ["All", ...new Set(items.map(item => item.itemCategory))];
  const uniqueWarehouses = ["All", ...new Set(items.map(item => item.warehouse))];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.itemCategory === selectedCategory;
    const matchesWarehouse = selectedWarehouse === "All" || item.warehouse === selectedWarehouse;
    let matchesQuantity = true;
    const qty = item.quantity;
    switch (quantityRange) {
      case "Negative": matchesQuantity = qty < 0; break;
      case "0-10": matchesQuantity = qty >= 0 && qty <= 10; break;
      case "10-50": matchesQuantity = qty > 10 && qty <= 50; break;
      case "50-100": matchesQuantity = qty > 50 && qty <= 100; break;
      case "100+": matchesQuantity = qty > 100; break;
      case "Low Quantity": matchesQuantity = qty <= item.minQty; break;
      default: matchesQuantity = true;
    }
    return matchesSearch && matchesCategory && matchesWarehouse && matchesQuantity;
  });

  // Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Modal handlers
  const handleAddItem = () => {
    // Refresh list after add - in real app this would fetch from API
    // For static demo, we'll just show a message
    alert("New item added successfully!");
  };

  const handleUpdateItem = () => {
    // Refresh list after edit/delete - in real app this would fetch from API
    // For static demo, we'll just show a message
    alert("Item updated successfully!");
  };

  // Export/Import
  const handleDownloadTemplate = () => {
    const headers = [["itemName", "hsn", "barcode", "description", "quantity", "cost", "value", "minQty", "taxAccount", "discount", "remarks"]];
    const ws = XLSX.utils.aoa_to_sheet(headers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "InventoryTemplate");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Inventory_Template.xlsx");
  };

  const handleExport = () => {
    const exportData = items.map(item => ({
      itemName: item.itemName,
      hsn: item.hsn,
      barcode: item.barcode,
      description: item.description,
      quantity: item.quantity,
      cost: item.cost,
      value: item.value,
      minQty: item.minQty,
      taxAccount: item.taxAccount,
      discount: item.discount,
      remarks: item.remarks
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "InventoryExport");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Inventory_Export.xlsx");
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet);
      // In real app, you'd send this to your API for import
      alert("Import functionality should be handled via API endpoint");
    };
    reader.readAsBinaryString(file);
  };

  const handleProductClick = (item, e) => {
    if (e && (e.target.closest('button') || e.target.closest('.btn'))) return;
    navigate(`/company/inventorydetails/${item.id}`, { state: { item } });
  };

  const handleSendAll = () => {
    alert("All items sent successfully!");
  };

  const handleSendItem = (item) => {
    alert(`Item "${item.itemName}" sent successfully!`);
  };

  return (
    <div className="mt-4 p-2">
      <Row className="align-items-center mb-3">
        <Col md={4}>
          <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
            <BiTransfer size={40} color="green" />
            <span>Inventory Product</span>
          </h4>
        </Col>
        <Col md={8} className="text-md-end d-flex flex-wrap gap-2 justify-content-md-end">
          <Button style={{ backgroundColor: '#00c78c', border: 'none', color: '#fff', padding: '6px 16px' }} onClick={handleImportClick}>
            Import
          </Button>
          <input type="file" accept=".xlsx, .xls" ref={fileInputRef} onChange={handleImport} style={{ display: 'none' }} />
          <Button style={{ backgroundColor: '#ff7e00', border: 'none', color: '#fff', padding: '6px 16px' }} onClick={handleExport}>
            Export
          </Button>
          <Button style={{ backgroundColor: '#f6c100', border: 'none', color: '#000', padding: '6px 16px' }} onClick={handleDownloadTemplate}>
            Download Template
          </Button>
          <Button onClick={() => setShowAdd(true)} style={{ backgroundColor: '#27b2b6', border: 'none', color: '#fff', padding: '6px 16px' }}>
            Add Product
          </Button>
          <Button style={{ backgroundColor: '#17a2b8', border: 'none', color: '#fff', padding: '6px 16px', marginLeft: '8px' }} onClick={handleSendAll}>
            Send All
          </Button>
          {selectedItems.length > 0 && (
            <Button style={{ backgroundColor: '#28a745', border: 'none', color: '#fff' }} onClick={() => alert(`${selectedItems.length} item(s) sent!`)}>
              Send Selected ({selectedItems.length})
            </Button>
          )}
          {selectedItems.length > 0 && (
            <Button variant="outline-secondary" size="sm" onClick={() => setSelectedItems([])} className="ms-2">
              Clear
            </Button>
          )}
          {/* Simplified modal props */}
          <AddProductModal 
            showAdd={showAdd}
            showEdit={showEdit}
            setShowAdd={setShowAdd}
            setShowEdit={setShowEdit}
            handleAddItem={handleAddItem}
            handleUpdateItem={handleUpdateItem}
            selectedItem={selectedItem}
          />
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-3 px-3 py-2 align-items-center g-2">
        <Col xs={12} sm={3}>
          <Form.Control type="text" placeholder="Search item..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-pill" />
        </Col>
        <Col xs={12} sm={3}>
          <Form.Select className="rounded-pill" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {uniqueCategories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
          </Form.Select>
        </Col>
        <Col xs={12} sm={3}>
          <Form.Select className="rounded-pill" value={selectedWarehouse} onChange={(e) => setSelectedWarehouse(e.target.value)}>
            {uniqueWarehouses.map((wh, idx) => <option key={idx} value={wh}>{wh}</option>)}
          </Form.Select>
        </Col>
        <Col xs={12} sm={3}>
          <Form.Select className="rounded-pill" value={quantityRange} onChange={(e) => setQuantityRange(e.target.value)}>
            <option value="All">All Quantities</option>
            <option value="Negative">Negative Quantity</option>
            <option value="Low Quantity">Low Quantity</option>
            <option value="0-10">0 - 10</option>
            <option value="10-50">10 - 50</option>
            <option value="50-100">50 - 100</option>
            <option value="100+">100+</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Table */}
      <div className="card bg-white rounded-3 p-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th><Form.Check type="checkbox" checked={selectedItems.length === filteredItems.length && filteredItems.length > 0} onChange={handleSelectAll} disabled={filteredItems.length === 0} /></th>
                <th>Product</th>
                <th>Category</th>
                <th>HSN</th>
                <th>Quantity</th>
                <th>Warehouse</th>
                <th>Cost</th>
                <th>Sale Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td><Form.Check type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleSelectItem(item.id)} /></td>
                    <td style={{ color: "#007bff", fontWeight: "bold", cursor: "pointer" }} onClick={(e) => handleProductClick(item, e)}>
                      {item.itemName}
                    </td>
                    <td>{item.itemCategory}</td>
                    <td>{item.hsn}</td>
                    <td>{item.quantity}</td>
                    <td>{item.warehouse}</td>
                    <td>R{item.cost.toFixed(2)}</td>
                    <td>R{item.value.toFixed(2)}</td>
                    <td>
                      <span className={`badge px-3 py-1 rounded-pill fw-semibold ${item.status === "In Stock" ? "bg-success text-white" : "bg-danger text-white"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="link" className="text-info p-0" onClick={(e) => { e.stopPropagation(); setSelectedItem(item); setShowView(true); }} title="Quick View"><FaEye /></Button>
                        <Button variant="link" className="text-warning p-0" onClick={(e) => { e.stopPropagation(); setSelectedItem(item); setShowEdit(true); }} title="Edit"><FaEdit /></Button>
                        <Button variant="link" className="text-danger p-0" onClick={(e) => { e.stopPropagation(); setSelectedItem(item); /* Delete handled in modal */ }} title="Delete"><FaTrash /></Button>
                        <Button variant="link" className="text-primary p-0" onClick={(e) => { e.stopPropagation(); navigate(`/company/inventorydetails/${item.id}`, { state: { item } }); }} title="View Details">Details</Button>
                        <Button variant="link" className="text-success p-0" onClick={(e) => { e.stopPropagation(); handleSendItem(item); }} title="Send Item">Send</Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="10" className="text-center">No items found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
          <small className="text-muted ms-2">Showing 1 to {filteredItems.length} of {filteredItems.length} results</small>
          {/* Static pagination - remove if not paginating */}
          <nav><ul className="pagination mb-0"><li className="page-item disabled"><button className="page-link">&laquo;</button></li><li className="page-item active"><button className="page-link">1</button></li><li className="page-item"><button className="page-link">&raquo;</button></li></ul></nav>
        </div>
      </div>

      {/* View Modal */}
      <Modal show={showView} onHide={() => setShowView(false)} centered size="lg">
        <Modal.Header closeButton><Modal.Title>Item Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <Row className="mb-3">
                <Col md={6}><strong>Item Name:</strong> {selectedItem.itemName}</Col>
                <Col md={6}><strong>HSN:</strong> {selectedItem.hsn}</Col>
                <Col md={6}><strong>Barcode:</strong> {selectedItem.barcode}</Col>
                <Col md={6}><strong>SKU:</strong> {selectedItem.sku}</Col>
                <Col md={12}><strong>Description:</strong> {selectedItem.description}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}><strong>Quantity:</strong> {selectedItem.quantity}</Col>
                <Col md={6}><strong>Date:</strong> {selectedItem.date}</Col>
                <Col md={6}><strong>Cost:</strong> R{selectedItem.cost.toFixed(2)}</Col>
                <Col md={6}><strong>Sale Price:</strong> R{selectedItem.value.toFixed(2)}</Col>
                <Col md={6}><strong>Min Order Qty:</strong> {selectedItem.minQty}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}><strong>Tax Account:</strong> {selectedItem.taxAccount}</Col>
                <Col md={6}><strong>Discount %:</strong> {selectedItem.discount}</Col>
                <Col md={12}><strong>Remarks:</strong> {selectedItem.remarks}</Col>
              </Row>
              {selectedItem.image && (
                <Row className="mb-3">
                  <Col md={12}>
                    <strong>Image:</strong><br />
                    <img src={selectedItem.image} alt="item" style={{ maxHeight: '200px', marginTop: '10px', maxWidth: '100%' }} />
                  </Col>
                </Row>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Page Description */}
      <Card className="mb-4 p-3 shadow rounded-4 mt-2">
        <Card.Body>
          <h5 className="fw-semibold border-bottom pb-2 mb-3 text-primary">Page Info</h5>
          <ul className="text-muted fs-6 mb-0" style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
            <li>Manage inventory products with full CRUD operations.</li>
            <li>Import/export data in Excel format.</li>
            <li>View detailed product information.</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InventoryItems;