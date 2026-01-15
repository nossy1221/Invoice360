import React, { useState, useRef } from 'react';

function InventoryAdjustment() {
  // Static data instead of API calls
  const [allItems, setAllItems] = useState([
    { id: 1, name: 'Laptop', unit: 'Piece' },
    { id: 2, name: 'Office Chair', unit: 'Piece' },
    { id: 3, name: 'Wireless Mouse', unit: 'Piece' },
    { id: 4, name: 'Desk Lamp', unit: 'Piece' },
    { id: 5, name: 'Monitor', unit: 'Piece' },
    { id: 6, name: 'Keyboard', unit: 'Piece' },
    { id: 7, name: 'Headphones', unit: 'Piece' },
    { id: 8, name: 'USB Cable', unit: 'Piece' }
  ]);

  const [allWarehouses, setAllWarehouses] = useState([
    { id: 1, warehouse_name: 'Main Warehouse', location: 'Building A' },
    { id: 2, warehouse_name: 'Secondary Warehouse', location: 'Building B' },
    { id: 3, warehouse_name: 'Storage Facility', location: 'Building C' }
  ]);

  const [adjustments, setAdjustments] = useState([
    {
      id: 1,
      voucherNo: 'ADJ-230515-123',
      manualVoucherNo: 'MAN-001',
      voucherDate: '2023-05-15',
      adjustmentType: 'Add Stock',
      items: [
        { id: 1, item: 1, itemName: 'Laptop', warehouse: 1, warehouseName: 'Main Warehouse', quantity: '5', rate: '75000', unit: 'Piece', amount: 375000, narration: 'New stock arrival' },
        { id: 2, item: 2, itemName: 'Office Chair', warehouse: 2, warehouseName: 'Secondary Warehouse', quantity: '10', rate: '4500', unit: 'Piece', amount: 45000, narration: 'Replacement stock' }
      ],
      narration: 'Monthly stock addition',
      totalAmount: 420000
    },
    {
      id: 2,
      voucherNo: 'ADJ-230620-456',
      manualVoucherNo: 'MAN-002',
      voucherDate: '2023-06-20',
      adjustmentType: 'Remove Stock',
      items: [
        { id: 1, item: 3, itemName: 'Wireless Mouse', warehouse: 1, warehouseName: 'Main Warehouse', quantity: '20', rate: '800', unit: 'Piece', amount: 16000, narration: 'Damaged items removed' }
      ],
      narration: 'Damaged items removal',
      totalAmount: 16000
    },
    {
      id: 3,
      voucherNo: 'ADJ-230710-789',
      manualVoucherNo: 'MAN-003',
      voucherDate: '2023-07-10',
      adjustmentType: 'Adjust Value',
      items: [
        { id: 1, item: 4, itemName: 'Desk Lamp', warehouse: 3, warehouseName: 'Storage Facility', quantity: '15', rate: '1200', unit: 'Piece', amount: 18000, narration: 'Price adjustment' }
      ],
      narration: 'Price adjustment due to market changes',
      totalAmount: 18000
    }
  ]);

  // States
  const [viewAdjustment, setViewAdjustment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingAdjustment, setEditingAdjustment] = useState(null);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [adjustmentToDelete, setAdjustmentToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [adjustmentType, setAdjustmentType] = useState('Add Stock');
  const [rows, setRows] = useState([]);
  const [narration, setNarration] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [voucherDate, setVoucherDate] = useState('');
  const [voucherNo, setVoucherNo] = useState('');
  const [manualVoucherNo, setManualVoucherNo] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItemDropdown, setShowItemDropdown] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    type: '',
    sourceWarehouse: '',
    searchItem: '',
    autoVoucherNo: '',
    manualVoucherNo: ''
  });

  const itemDropdownRef = useRef(null);

  // Initialize filtered items
  useEffect(() => {
    setFilteredItems(allItems);
  }, [allItems]);

  // Auto-generate voucher when opening modal
  useEffect(() => {
    if (showModal && !editingAdjustment) {
      const prefix = "ADJ";
      const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
      const randomNum = Math.floor(100 + Math.random() * 900);
      setVoucherNo(`${prefix}-${date}-${randomNum}`);
      setVoucherDate(new Date().toISOString().slice(0, 10));
    } else if (showModal && editingAdjustment) {
      // When editing, ensure items have itemName and warehouseName
      const enrichedItems = editingAdjustment.items.map(item => {
        // Safety: if itemName missing, try to get from allItems
        let itemName = item.itemName;
        let warehouseName = item.warehouseName;

        if (!itemName || itemName === 'Unknown Item') {
          const foundItem = allItems.find(i => i.id === item.item);
          itemName = foundItem?.name || 'Unknown Item';
        }

        if (!warehouseName || warehouseName === 'Unknown Warehouse') {
          const foundWh = allWarehouses.find(w => w.id === item.warehouse);
          warehouseName = foundWh?.warehouse_name || 'Unknown Warehouse';
        }

        return {
          ...item,
          itemName,
          warehouseName
        };
      });

      setAdjustmentType(editingAdjustment.adjustmentType);
      setRows(enrichedItems);
      setNarration(editingAdjustment.narration || '');
      setTotalAmount(editingAdjustment.totalAmount);
      setVoucherDate(editingAdjustment.voucherDate);
      setVoucherNo(editingAdjustment.voucherNo);
      setManualVoucherNo(editingAdjustment.manualVoucherNo || '');
    }
  }, [showModal, editingAdjustment, allItems, allWarehouses]);

  // Filter items
  useEffect(() => {
    if (itemSearch === '') {
      setFilteredItems(allItems);
    } else {
      const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(itemSearch.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [itemSearch, allItems]);

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemDropdownRef.current && !itemDropdownRef.current.contains(event.target)) {
        setShowItemDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recalculate total
  useEffect(() => {
    const total = rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);
    setTotalAmount(total);
  }, [rows]);

  // Filter adjustments
  const filteredAdjustments = adjustments.filter(adjustment => {
    const adjDate = new Date(adjustment.voucherDate);
    const from = filters.fromDate ? new Date(filters.fromDate) : null;
    const to = filters.toDate ? new Date(filters.toDate) : null;

    if (from && adjDate < from) return false;
    if (to && adjDate > new Date(to.getTime() + 86400000)) return false;
    if (filters.type && adjustment.adjustmentType !== filters.type) return false;
    if (filters.sourceWarehouse) {
      const match = adjustment.items.some(item =>
        item.warehouseName.toLowerCase().includes(filters.sourceWarehouse.toLowerCase())
      );
      if (!match) return false;
    }
    if (filters.searchItem) {
      const search = filters.searchItem.toLowerCase();
      const match = adjustment.items.some(item => item.itemName.toLowerCase().includes(search));
      if (!match) return false;
    }
    if (filters.autoVoucherNo && !adjustment.voucherNo.toLowerCase().includes(filters.autoVoucherNo.toLowerCase())) return false;
    if (filters.manualVoucherNo && adjustment.manualVoucherNo && 
        !adjustment.manualVoucherNo.toLowerCase().includes(filters.manualVoucherNo.toLowerCase())) return false;

    return true;
  });

  // Handlers
  const handleRowNarrationChange = (id, value) => {
    setRows(prev => prev.map(row => row.id === id ? { ...row, narration: value } : row));
  };

  const handleItemSelect = (item) => {
    const newRowId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    const newRow = {
      id: newRowId,
      item: item.id,
      itemName: item.name,
      warehouse: '',
      warehouseName: '',
      quantity: '0',
      rate: '',
      unit: item.unit,
      amount: 0,
      narration: ''
    };
    setRows([...rows, newRow]);
    setItemSearch('');
    setShowItemDropdown(false);
  };

  const handleFieldChange = (id, field, value) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          const q = parseFloat(updatedRow.quantity) || 0;
          const r = parseFloat(updatedRow.rate) || 0;
          updatedRow.amount = q * r;
        }
        if (field === 'warehouse') {
          const wh = allWarehouses.find(w => w.id == value);
          updatedRow.warehouseName = wh?.warehouse_name?.trim() || '';
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleRemoveRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    const apiAdjustmentType = adjustmentType === 'Add Stock' ? 'add'
      : adjustmentType === 'Remove Stock' ? 'remove'
      : 'adjust';

    const itemsPayload = rows.map(row => ({
      product_id: row.item,
      warehouse_id: parseInt(row.warehouse) || null,
      quantity: parseFloat(row.quantity) || 0,
      rate: parseFloat(row.rate) || 0,
      narration: row.narration || ''
    })).filter(item => item.product_id && item.warehouse_id);

    if (itemsPayload.length === 0) {
      alert('Please add at least one item with valid warehouse.');
      setIsSubmitting(false);
      return;
    }

    const newAdjustment = {
      id: editingAdjustment ? editingAdjustment.id : adjustments.length + 1,
      voucherNo: voucherNo,
      manualVoucherNo: manualVoucherNo || '',
      voucherDate: voucherDate,
      adjustmentType: adjustmentType,
      items: rows,
      narration: narration || '',
      totalAmount: totalAmount,
    };

    if (editingAdjustment) {
      // Update existing adjustment
      setAdjustments(adjustments.map(adj => adj.id === editingAdjustment.id ? newAdjustment : adj));
    } else {
      // Add new adjustment
      setAdjustments([...adjustments, newAdjustment]);
    }

    setShowModal(false);
    setEditingAdjustment(null);
    resetForm();
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setAdjustmentType('Add Stock');
    setRows([]);
    setNarration('');
    setTotalAmount(0);
    setVoucherDate('');
    setVoucherNo('');
    setManualVoucherNo('');
    setItemSearch('');
    setFilteredItems(allItems);
    setShowItemDropdown(false);
  };

  const handleEditAdjustment = (adjustment) => {
    setEditingAdjustment(adjustment);
    setShowModal(true);
  };

  const handleDeleteClick = (adjustment) => {
    setAdjustmentToDelete(adjustment);
    setShowDeleteWarning(true);
  };

  const confirmDelete = () => {
    if (!adjustmentToDelete) return;
    setAdjustments(adjustments.filter(adj => adj.id !== adjustmentToDelete.id));
    setShowDeleteWarning(false);
    setAdjustmentToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteWarning(false);
    setAdjustmentToDelete(null);
  };

  const handlePrintAdjustment = () => window.print();
  const handlePrintModal = () => window.print();

  return (
    <div className="container py-4">
      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-dark">Inventory Adjustment Records</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingAdjustment(null);
            setShowModal(true);
          }}
          style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
        >
          + Add Inventory Adjustment
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-2">
        <div className="card-body">
          <h5>Filter Adjustments</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label>From Date</label>
              <input type="date" className="form-control" value={filters.fromDate} onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })} />
            </div>
            <div className="col-md-3">
              <label>To Date</label>
              <input type="date" className="form-control" value={filters.toDate} onChange={(e) => setFilters({ ...filters, toDate: e.target.value })} />
            </div>
            <div className="col-md-3">
              <label>Adjustment Type</label>
              <select className="form-control" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                <option value="">All Types</option>
                <option value="Add Stock">Add Stock</option>
                <option value="Remove Stock">Remove Stock</option>
                <option value="Adjust Value">Adjust Value</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>Source Warehouse</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type warehouse name..."
                value={filters.sourceWarehouse}
                onChange={(e) => setFilters({ ...filters, sourceWarehouse: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <label>Auto Voucher No</label>
              <input type="text" className="form-control" placeholder="Search by auto voucher..." value={filters.autoVoucherNo} onChange={(e) => setFilters({ ...filters, autoVoucherNo: e.target.value })} />
            </div>
            <div className="col-md-3">
              <label>Manual Voucher No</label>
              <input type="text" className="form-control" placeholder="Search by manual voucher..." value={filters.manualVoucherNo} onChange={(e) => setFilters({ ...filters, manualVoucherNo: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label>Search Item</label>
              <input type="text" className="form-control" placeholder="Search by item name..." value={filters.searchItem} onChange={(e) => setFilters({ ...filters, searchItem: e.target.value })} />
            </div>
          </div>
        </div>
      </div>

      {/* Adjustments Table */}
      <div className="card">
        <div className="card-body">
          {adjustments.length === 0 ? (
            <p className="text-center text-muted">No inventory adjustments yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="thead-light">
                  <tr>
                    <th>Auto Voucher No</th>
                    <th>Manual Voucher No</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Source Warehouse</th>
                    <th>Items</th>
                    <th>Total Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdjustments.map(adjustment => {
                    const warehouseText = [...new Set(adjustment.items.map(i => i.warehouseName))].join(", ") || "Not specified";
                    return (
                      <tr key={adjustment.id}>
                        <td>{adjustment.voucherNo}</td>
                        <td>{adjustment.manualVoucherNo || '-'}</td>
                        <td>{adjustment.voucherDate}</td>
                        <td>{adjustment.adjustmentType}</td>
                        <td>{warehouseText}</td>
                        <td>{adjustment.items.length} item(s)</td>
                        <td>${adjustment.totalAmount.toFixed(2)}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn btn-sm p-2" style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5", color: "white", width: "36px", height: "36px", padding: "0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px" }} onClick={() => setViewAdjustment(adjustment)} title="View Details"><i className="fas fa-eye"></i></button>
                            <button className="btn btn-sm p-2" style={{ backgroundColor: "#ffc107", borderColor: "#ffc107", color: "white", width: "36px", height: "36px", padding: "0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px" }} onClick={() => handleEditAdjustment(adjustment)} title="Edit Adjustment"><i className="fas fa-edit"></i></button>
                            <button className="btn btn-sm p-2" style={{ backgroundColor: "#dc3545", borderColor: "#dc3545", color: "white", width: "36px", height: "36px", padding: "0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px" }} onClick={() => handleDeleteClick(adjustment)} title="Delete Adjustment"><i className="fas fa-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingAdjustment ? 'Edit Inventory Adjustment' : 'New Inventory Adjustment'}</h5>
                <div>
                  <button type="button" className="btn btn-primary me-2" onClick={handlePrintModal}><i className="fas fa-print me-1"></i> Print</button>
                  <button type="button" className="close" onClick={() => { setShowModal(false); setEditingAdjustment(null); resetForm(); }}>&times;</button>
                </div>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label>System Voucher No</label>
                      <input type="text" className="form-control" value={voucherNo} readOnly />
                    </div>
                    <div className="col-md-4">
                      <label>Manual Voucher No</label>
                      <input type="text" className="form-control" value={manualVoucherNo} onChange={(e) => setManualVoucherNo(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label>Voucher Date</label>
                      <input type="date" className="form-control" value={voucherDate} onChange={(e) => setVoucherDate(e.target.value)} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Adjustment Type</label>
                    <div className="d-flex flex-wrap gap-3">
                      {['Add Stock', 'Remove Stock', 'Adjust Value'].map(type => (
                        <div key={type} className="form-check">
                          <input className="form-check-input" type="radio" name="adjustmentType" id={`type-${type.replace(/\s+/g, '-')}`} checked={adjustmentType === type} onChange={() => setAdjustmentType(type)} />
                          <label className="form-check-label" htmlFor={`type-${type.replace(/\s+/g, '-')}`}>{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Item Selection */}
                  <div className="mb-4">
                    <label className="form-label">Select Item</label>
                    <div className="position-relative" ref={itemDropdownRef}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for an item..."
                        value={itemSearch}
                        onChange={(e) => setItemSearch(e.target.value)}
                        onFocus={() => setShowItemDropdown(true)}
                        onClick={() => setShowItemDropdown(true)}
                      />
                      {showItemDropdown && (
                        <ul className="dropdown-menu show w-100" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                          {filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                              <li key={item.id}>
                                <button className="dropdown-item" type="button" onClick={() => handleItemSelect(item)}>
                                  {item.name} ({item.unit})
                                </button>
                              </li>
                            ))
                          ) : (
                            <li><span className="dropdown-item-text">No items found</span></li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="table-responsive mb-4">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Item</th>
                          <th>Source Warehouse</th>
                          <th>Quantity</th>
                          <th>Rate</th>
                          <th>Amount</th>
                          <th>Actions</th>
                          <th>Narration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map(row => (
                          <tr key={row.id}>
                            <td><input type="text" className="form-control" value={row.itemName} readOnly /></td>
                            <td>
                              <select className="form-select" value={row.warehouse} onChange={(e) => handleFieldChange(row.id, 'warehouse', e.target.value)}>
                                <option value="">Select Warehouse</option>
                                {allWarehouses.map(wh => (
                                  <option key={wh.id} value={wh.id}>{wh.warehouse_name} ({wh.location})</option>
                                ))}
                              </select>
                            </td>
                            <td><input type="number" className="form-control" value={row.quantity} onChange={(e) => handleFieldChange(row.id, 'quantity', e.target.value)} min="0" /></td>
                            <td><input type="number" className="form-control" value={row.rate} onChange={(e) => handleFieldChange(row.id, 'rate', e.target.value)} min="0" step="0.01" /></td>
                            <td><input type="text" className="form-control" value={row.amount.toFixed(2)} readOnly /></td>
                            <td className="text-center">
                              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveRow(row.id)} title="Remove Item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                              </button>
                            </td>
                            <td>
                              <textarea className="form-control" rows="1" value={row.narration} onChange={(e) => handleRowNarrationChange(row.id, e.target.value)} placeholder="Enter narration..." />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Additional Note</label>
                        <textarea className="form-control" rows="3" value={narration} onChange={(e) => setNarration(e.target.value)} placeholder="Enter a general note..." />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex flex-column h-100 justify-content-end">
                        <div className="mb-3">
                          <label className="form-label">Total Value</label>
                          <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control" value={totalAmount.toFixed(2)} readOnly />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => { setShowModal(false); setEditingAdjustment(null); resetForm(); }}>Cancel</button>
                    <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : (editingAdjustment ? 'Update Adjustment' : 'Save Adjustment')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewAdjustment && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Inventory Adjustment Details</h5>
                <div>
                  <button type="button" className="btn btn-primary me-2" onClick={handlePrintAdjustment}><i className="fas fa-print me-1"></i> Print</button>
                  <button type="button" className="close" onClick={() => setViewAdjustment(null)}>&times;</button>
                </div>
              </div>
              <div className="modal-body" id="adjustment-print-content">
                <div className="row mb-3">
                  <div className="col-md-4"><label><strong>System Voucher No</strong></label><p>{viewAdjustment.voucherNo}</p></div>
                  <div className="col-md-4"><label><strong>Manual Voucher No</strong></label><p>{viewAdjustment.manualVoucherNo || '-'}</p></div>
                  <div className="col-md-4"><label><strong>Date</strong></label><p>{viewAdjustment.voucherDate}</p></div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4"><label><strong>Adjustment Type</strong></label><p>{viewAdjustment.adjustmentType}</p></div>
                </div>
                <div className="table-responsive mb-4">
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Item</th>
                        <th>Source Warehouse</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>Narration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewAdjustment.items.map(item => (
                        <tr key={item.id}>
                          <td><div>{item.itemName}</div><small className="text-muted">({item.unit})</small></td>
                          <td>{item.warehouseName || '-'}</td>
                          <td>{item.quantity || '-'}</td>
                          <td>{item.rate ? `$${parseFloat(item.rate).toFixed(2)}` : '-'}</td>
                          <td>{item.amount ? `$${parseFloat(item.amount).toFixed(2)}` : '-'}</td>
                          <td>{item.narration || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {viewAdjustment.narration && (
                  <div className="form-group mb-3">
                    <label><strong>Additional Note</strong></label>
                    <p className="border p-2 bg-light rounded">{viewAdjustment.narration}</p>
                  </div>
                )}
                <div className="d-flex justify-content-between align-items-center">
                  <h5><strong>Total Amount: ${viewAdjustment.totalAmount.toFixed(2)}</strong></h5>
                  <button className="btn btn-secondary" onClick={() => setViewAdjustment(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteWarning && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="close" onClick={cancelDelete}>&times;</button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this inventory adjustment?</p>
                <p><strong>Voucher No:</strong> {adjustmentToDelete?.voucherNo}</p>
                <p><strong>Date:</strong> {adjustmentToDelete?.voucherDate}</p>
                <p><strong>Type:</strong> {adjustmentToDelete?.adjustmentType}</p>
                <p><strong>Total Amount:</strong> ${adjustmentToDelete?.totalAmount.toFixed(2)}</p>
                <p className="text-danger">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryAdjustment;