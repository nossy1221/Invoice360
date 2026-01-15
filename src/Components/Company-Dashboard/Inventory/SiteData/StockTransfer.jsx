import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faPrint,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function StockTransfer() {
  // All transfers list - static data instead of API fetch
  const [transfers, setTransfers] = useState([
    {
      id: 1,
      voucherNo: "VCH-230515-123",
      manualVoucherNo: "MAN-001",
      voucherDate: "2023-05-15",
      destinationWarehouse: "Main Warehouse",
      destinationLocation: "Building A",
      sourceWarehouses: ["Secondary Warehouse"],
      items: [
        {
          id: 1,
          productId: 1,
          itemName: "Laptop",
          sourceWarehouse: "Secondary Warehouse",
          sourceLocation: "Building B",
          quantity: "5",
          rate: "75000.00",
          amount: "375000.00",
          narration: "High demand items transfer"
        }
      ],
      note: "Monthly stock transfer",
      totalAmount: 375000
    },
    {
      id: 2,
      voucherNo: "VCH-230620-456",
      manualVoucherNo: "MAN-002",
      voucherDate: "2023-06-20",
      destinationWarehouse: "Storage Facility",
      destinationLocation: "Building C",
      sourceWarehouses: ["Main Warehouse", "Secondary Warehouse"],
      items: [
        {
          id: 1,
          productId: 2,
          itemName: "Office Chair",
          sourceWarehouse: "Main Warehouse",
          sourceLocation: "Building A",
          quantity: "10",
          rate: "4500.00",
          amount: "45000.00",
          narration: "Bulk transfer"
        },
        {
          id: 2,
          productId: 3,
          itemName: "Desk Lamp",
          sourceWarehouse: "Secondary Warehouse",
          sourceLocation: "Building B",
          quantity: "15",
          rate: "1200.00",
          amount: "18000.00",
          narration: "New stock"
        }
      ],
      note: "Quarterly inventory adjustment",
      totalAmount: 63000
    }
  ]);
  
  const [viewTransfer, setViewTransfer] = useState(null);
  const [editTransfer, setEditTransfer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [voucherNo, setVoucherNo] = useState("");
  const [manualVoucherNo, setManualVoucherNo] = useState("");
  const [voucherDate, setVoucherDate] = useState("");
  const [destinationWarehouse, setDestinationWarehouse] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [items, setItems] = useState([]);
  const [note, setNote] = useState("");
  const [showWarehouseList, setShowWarehouseList] = useState(false);
  const [showItemList, setShowItemList] = useState(false);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    destination: "",
    source: "",
    searchItem: "",
  });

  // Static data instead of API calls
  const [products] = useState([
    {
      id: 1,
      name: "Laptop",
      sku: "LP12345",
      barcode: "LP001",
      sale_price: 75000,
      warehouse_id: 1,
      initial_qty: 15
    },
    {
      id: 2,
      name: "Office Chair",
      sku: "OC67890",
      barcode: "OC002",
      sale_price: 4500,
      warehouse_id: 2,
      initial_qty: 25
    },
    {
      id: 3,
      name: "Desk Lamp",
      sku: "DL54321",
      barcode: "DL003",
      sale_price: 1200,
      warehouse_id: 3,
      initial_qty: 40
    },
    {
      id: 4,
      name: "Wireless Mouse",
      sku: "WM98765",
      barcode: "WM004",
      sale_price: 800,
      warehouse_id: 1,
      initial_qty: 50
    }
  ]);
  
  const [warehouses] = useState([
    { id: 1, name: "Main Warehouse", location: "Building A" },
    { id: 2, name: "Secondary Warehouse", location: "Building B" },
    { id: 3, name: "Storage Facility", location: "Building C" },
    { id: 4, name: "Distribution Center", location: "Building D" }
  ]);

  // Auto-generate voucher
  useEffect(() => {
    if (showModal && !editTransfer) {
      const prefix = "VCH";
      const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
      const random = Math.floor(100 + Math.random() * 900);
      setVoucherNo(`${prefix}-${date}-${random}`);
      setVoucherDate(new Date().toISOString().slice(0, 10));
    }
  }, [showModal, editTransfer]);

  // Edit mode
  useEffect(() => {
    if (editTransfer) {
      setVoucherNo(editTransfer.voucherNo);
      setManualVoucherNo(editTransfer.manualVoucherNo);
      setVoucherDate(editTransfer.voucherDate);
      setDestinationWarehouse(editTransfer.destinationWarehouse);
      setItems([...editTransfer.items]);
      setNote(editTransfer.note);
      setShowModal(true);
    }
  }, [editTransfer]);

  const handleItemSelect = (product) => {
    if (!product) return;
    const newItem = {
      id: Date.now(),
      productId: product.id,
      itemName: product.name,
      sourceWarehouse: "",
      quantity: "1.00",
      rate: product.sale_price.toFixed(2),
      amount: product.sale_price.toFixed(2),
      narration: "",
    };
    setItems([...items, newItem]);
    setItemSearch("");
    setShowItemList(false);
  };

  const updateItemField = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          const qty = parseFloat(updated.quantity) || 0;
          const rate = parseFloat(updated.rate) || 0;
          updated.amount = (qty * rate).toFixed(2);
        }
        return updated;
      }
      return item;
    }));
  };

  const calculateTotalAmount = () => {
    return items.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0).toFixed(2);
  };

  const handleSubmitTransfer = () => {
    if (!voucherNo || !voucherDate || !destinationWarehouse || items.length === 0) {
      alert("Please fill all required fields and add at least one item");
      return;
    }
    for (const item of items) {
      if (!item.sourceWarehouse || !item.quantity || !item.rate) {
        alert("Please fill all fields for each item");
        return;
      }
    }

    const destWh = warehouses.find(w => w.name === destinationWarehouse);
    const transferData = {
      id: editTransfer ? editTransfer.id : Date.now(),
      voucher_no: voucherNo,
      manual_voucher_no: manualVoucherNo,
      transfer_date: voucherDate,
      destination_warehouse_id: destWh?.id || 1,
      destinationWarehouse: destinationWarehouse,
      destinationLocation: destWh?.location || "",
      notes: note,
      items: items.map(item => {
        const srcWh = warehouses.find(w => w.name === item.sourceWarehouse);
        return {
          id: item.id,
          product_id: item.productId,
          source_warehouse_id: srcWh?.id || 1,
          sourceWarehouse: item.sourceWarehouse,
          sourceLocation: srcWh?.location || "",
          qty: parseFloat(item.quantity),
          rate: parseFloat(item.rate),
          amount: parseFloat(item.amount),
          narration: item.narration,
          itemName: item.itemName
        };
      }),
      totalAmount: calculateTotalAmount()
    };

    if (editTransfer) {
      // Update existing transfer
      setTransfers(transfers.map(t => t.id === editTransfer.id ? transferData : t));
      alert("Stock transfer updated successfully!");
    } else {
      // Add new transfer
      setTransfers([...transfers, transferData]);
      alert("Stock transfer created successfully!");
    }

    setShowModal(false);
    resetForm();
    setEditTransfer(null);
  };

  const resetForm = () => {
    setVoucherNo("");
    setManualVoucherNo("");
    setVoucherDate("");
    setDestinationWarehouse("");
    setItemSearch("");
    setItems([]);
    setNote("");
    setShowWarehouseList(false);
    setShowItemList(false);
  };

  const handleDeleteTransfer = (id) => {
    if (window.confirm("Are you sure you want to delete this transfer?")) {
      setTransfers(transfers.filter(t => t.id !== id));
      alert("Deleted successfully!");
    }
  };

  const printTransfer = () => {
    const content = document.getElementById("print-transfer")?.innerHTML;
    if (!content) return;
    const win = window.open("", "", "width=800,height=600");
    win.document.write(`
      <html><head><title>Stock Transfer</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
      </head><body class="p-4">${content}</body></html>
    `);
    win.document.close();
    win.print();
  };

  // Filter transfers
  const filteredTransfers = transfers.filter(t => {
    const date = new Date(t.voucherDate);
    const from = filters.fromDate ? new Date(filters.fromDate) : null;
    const to = filters.toDate ? new Date(filters.toDate) : null;
    if (from && date < from) return false;
    if (to && date > new Date(to.getTime() + 86400000)) return false;
    if (filters.destination && t.destinationWarehouse && 
        !t.destinationWarehouse.toLowerCase().includes(filters.destination.toLowerCase())) return false;
    if (filters.source && t.sourceWarehouses && 
        !t.sourceWarehouses.some(w => w && w.toLowerCase().includes(filters.source.toLowerCase()))) return false;
    if (filters.searchItem && t.items && 
        !t.items.some(i => i.itemName && i.itemName.toLowerCase().includes(filters.searchItem.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Stock Transfer Records</h3>
        <button
          className="btn text-white"
          style={{ backgroundColor: "#53b2a5" }}
          onClick={() => {
            resetForm();
            setEditTransfer(null);
            setShowModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Stock Transfer
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-3">
        <div className="card-body">
          <h5>Filter Transfers</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <input type="date" className="form-control" value={filters.fromDate} onChange={e => setFilters({...filters, fromDate: e.target.value})} />
            </div>
            <div className="col-md-3">
              <input type="date" className="form-control" value={filters.toDate} onChange={e => setFilters({...filters, toDate: e.target.value})} />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Destination" value={filters.destination} onChange={e => setFilters({...filters, destination: e.target.value})} />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Source" value={filters.source} onChange={e => setFilters({...filters, source: e.target.value})} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Search item..." value={filters.searchItem} onChange={e => setFilters({...filters, searchItem: e.target.value})} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-body">
          {filteredTransfers.length === 0 ? (
            <p className="text-center text-muted">No transfers found</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Voucher No</th>
                    <th>Date</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransfers.map(t => (
                    <tr key={t.id}>
                      <td>{t.voucherNo}</td>
                      <td>{t.voucherDate}</td>
                      <td>{t.sourceWarehouses.join(", ")}</td>
                      <td>{t.destinationWarehouse}</td>
                      <td>{t.items.length}</td>
                      <td>R{parseFloat(t.totalAmount).toFixed(2)}</td>
                      <td>
                        <button className="btn btn-sm btn-success me-2" onClick={() => setViewTransfer(t)}>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => setEditTransfer(t)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTransfer(t.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{editTransfer ? "Edit" : "New"} Stock Transfer</h5>
                <button className="btn-close" onClick={() => { setShowModal(false); resetForm(); }}></button>
              </div>
              <div className="modal-body">
                {/* Voucher Info */}
                <div className="row mb-3">
                  <div className="col-md-4">
                    <input className="form-control" value={voucherNo} readOnly />
                    <small>System Voucher No</small>
                  </div>
                  <div className="col-md-4">
                    <input className="form-control" value={manualVoucherNo} onChange={e => setManualVoucherNo(e.target.value)} />
                    <small>Manual Voucher No</small>
                  </div>
                  <div className="col-md-4">
                    <input type="date" className="form-control" value={voucherDate} onChange={e => setVoucherDate(e.target.value)} />
                    <small>Voucher Date</small>
                  </div>
                </div>

                {/* Destination Warehouse */}
                <div className="mb-3">
                  <label>Destination Warehouse</label>
                  <input
                    type="text"
                    className="form-control"
                    value={destinationWarehouse}
                    onChange={e => {
                      setDestinationWarehouse(e.target.value);
                      setShowWarehouseList(true);
                    }}
                    onFocus={() => setShowWarehouseList(true)}
                    placeholder="Select destination warehouse"
                  />
                  {showWarehouseList && (
                    <ul className="list-group mt-1" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      {warehouses.length === 0 ? (
                        <li className="list-group-item">No warehouses available</li>
                      ) : (
                        warehouses
                          .filter(w => w.name && w.name.toLowerCase().includes((destinationWarehouse || "").toLowerCase()))
                          .map(w => (
                            <li
                              key={w.id}
                              className="list-group-item list-group-item-action"
                              onClick={() => {
                                setDestinationWarehouse(w.name);
                                setShowWarehouseList(false);
                              }}
                            >
                              {w.name}
                            </li>
                          ))
                      )}
                    </ul>
                  )}
                </div>

                {/* Select Item */}
                <div className="mb-3">
                  <label>Select Item</label>
                  <input
                    type="text"
                    className="form-control"
                    value={itemSearch}
                    onChange={e => {
                      setItemSearch(e.target.value);
                      setShowItemList(true);
                    }}
                    onFocus={() => setShowItemList(true)}
                    placeholder="Search by name, SKU, or barcode"
                  />
                  {showItemList && (
                    <ul className="list-group mt-1" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {products.length === 0 ? (
                        <li className="list-group-item">No items available</li>
                      ) : (
                        products
                          .filter(p => {
                            const searchLower = (itemSearch || "").toLowerCase();
                            return (p.name && p.name.toLowerCase().includes(searchLower)) ||
                                   (p.sku && p.sku.toLowerCase().includes(searchLower)) ||
                                   (p.barcode && p.barcode.toLowerCase().includes(searchLower));
                          })
                          .map(p => (
                            <li
                              key={p.id}
                              className="list-group-item list-group-item-action"
                              onClick={() => handleItemSelect(p)}
                            >
                              <strong>{p.name}</strong>
                              <div className="small text-muted">
                                {p.sku && `SKU: ${p.sku}`} {p.barcode && `| Barcode: ${p.barcode}`}
                                {p.initial_qty !== undefined && `| Stock: ${p.initial_qty}`}
                              </div>
                            </li>
                          ))
                      )}
                    </ul>
                  )}
                </div>

                {/* Items Table */}
                <div className="table-responsive mb-3">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Source WH</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>Narration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.length > 0 ? (
                        items.map(item => (
                          <tr key={item.id}>
                            <td>{item.itemName}</td>
                            <td>
                              <select
                                className="form-select form-select-sm"
                                value={item.sourceWarehouse}
                                onChange={e => updateItemField(item.id, 'sourceWarehouse', e.target.value)}
                              >
                                <option value="">-- Select --</option>
                                {warehouses.map(w => (
                                  <option key={w.id} value={w.name}>{w.name}</option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={item.quantity}
                                onChange={e => updateItemField(item.id, 'quantity', e.target.value)}
                                min="0"
                                step="0.01"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={item.rate}
                                onChange={e => updateItemField(item.id, 'rate', e.target.value)}
                                min="0"
                                step="0.01"
                              />
                            </td>
                            <td>{parseFloat(item.amount).toFixed(2)}</td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={item.narration}
                                onChange={e => updateItemField(item.id, 'narration', e.target.value)}
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="6" className="text-center">No items added</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Narration */}
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Narration"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <strong>Total: R{calculateTotalAmount()}</strong>
                  <button className="btn btn-success" onClick={handleSubmitTransfer}>
                    {editTransfer ? "Update Transfer" : "Save Transfer"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewTransfer && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Transfer Details</h5>
                <button className="btn-close" onClick={() => setViewTransfer(null)}></button>
              </div>
              <div className="modal-body">
                <div id="print-transfer">
                  <div className="row">
                    <div className="col-md-4"><strong>Voucher:</strong> {viewTransfer.voucherNo}</div>
                    <div className="col-md-4"><strong>Date:</strong> {viewTransfer.voucherDate}</div>
                    <div className="col-md-4"><strong>Destination:</strong> {viewTransfer.destinationWarehouse}</div>
                  </div>
                  <div className="table-responsive mt-3">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Item</th>
                          <th>Source</th>
                          <th>Qty</th>
                          <th>Rate</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewTransfer.items.map(i => (
                          <tr key={i.id}>
                            <td>{i.itemName}</td>
                            <td>{i.sourceWarehouse}</td>
                            <td>{i.quantity}</td>
                            <td>R{parseFloat(i.rate).toFixed(2)}</td>
                            <td>R{parseFloat(i.amount).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {viewTransfer.note && (
                    <div className="mt-3">
                      <strong>Narration:</strong> {viewTransfer.note}
                    </div>
                  )}
                  <div className="mt-3 h5">Total: R{parseFloat(viewTransfer.totalAmount).toFixed(2)}</div>
                </div>
                <div className="mt-3 text-end">
                  <button className="btn btn-primary me-2" onClick={printTransfer}>
                    <FontAwesomeIcon icon={faPrint} /> Print
                  </button>
                  <button className="btn btn-secondary" onClick={() => setViewTransfer(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockTransfer;