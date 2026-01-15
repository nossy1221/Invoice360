import React, { useState, useRef, useEffect } from "react"; // Added useEffect import
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert'; // Added for error display

const AddProductModal = ({
  showAdd,
  showEdit,
  categories,
  newCategory,
  showAddCategoryModal,
  setShowAdd,
  setShowEdit,
  setShowAddCategoryModal,
  setNewCategory,
  handleAddItem,
  handleUpdateItem,
  handleAddCategory,
  formMode,
  resetForm,
}) => {
  const isEditing = showEdit;
  const isAdding = showAdd;

  // LOCAL STATE for form (fully controlled inside this component)
  const [localNewItem, setLocalNewItem] = useState({
    itemName: '',
    hsn: '',
    barcode: '',
    image: null,
    warehouse: 'Main Warehouse', // Default static warehouse
    itemCategory: '',
    description: '',
    quantity: '',
    sku: '',
    minQty: '',
    date: new Date().toISOString().split('T')[0], // Set default to today
    taxAccount: '',
    cost: '',
    salePriceExclusive: '',
    salePriceInclusive: '',
    discount: '',
    remarks: ''
  });

  const [newUOM, setNewUOM] = useState("");
  const [showAddUOMModal, setShowAddUOMModal] = useState(false);
  const [uoms, setUoms] = useState([
    "Piece", "Box", "KG", "Meter", "Litre"
  ]);

  // Static data instead of API calls
  const [fetchedCategories, setFetchedCategories] = useState([
    "Electronics", "Furniture", "Apparel", "Food", "Books",
    "Automotive", "Medical", "Software", "Stationery", "Other"
  ]);
  
  const [warehouses, setWarehouses] = useState([
    { id: 1, warehouse_name: "Main Warehouse", location: "Building A" },
    { id: 2, warehouse_name: "Secondary Warehouse", location: "Building B" },
    { id: 3, warehouse_name: "Storage Facility", location: "Building C" }
  ]);

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [error, setError] = useState(""); // Added for error handling

  const fileInputRef = useRef(null);

  // Local handleChange
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setLocalNewItem(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // Reset local form
  const resetLocalForm = () => {
    setLocalNewItem({
      itemName: '',
      hsn: '',
      barcode: '',
      image: null,
      warehouse: warehouses.length > 0 ? warehouses[0].warehouse_name : '',
      itemCategory: '',
      description: '',
      quantity: '',
      sku: '',
      minQty: '',
      date: new Date().toISOString().split('T')[0], // Reset to today
      taxAccount: '',
      cost: '',
      salePriceExclusive: '',
      salePriceInclusive: '',
      discount: '',
      remarks: ''
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setError(""); // Clear any errors
  };

  // Add category (now using local state)
  const handleAddCategoryApi = async () => {
    if (!newCategory.trim()) {
      setError("Category name cannot be empty");
      return;
    }
    
    setIsAddingCategory(true);
    setError("");
    
    try {
      // Add the new category to local state
      if (!fetchedCategories.includes(newCategory.trim())) {
        setFetchedCategories(prev => [...prev, newCategory.trim()]);
        
        // Set the newly added category as the selected category
        setLocalNewItem(prev => ({
          ...prev,
          itemCategory: newCategory.trim()
        }));
      } else {
        setError("Category already exists");
        return;
      }

      setNewCategory("");
      setShowAddCategoryModal(false);
      if (handleAddCategory) handleAddCategory();
    } catch (error) {
      console.error("Error adding category:", error);
      setError("Failed to add category");
    } finally {
      setIsAddingCategory(false);
    }
  };

  // Add product (now using local state)
  const handleAddProductApi = async () => {
    // Form validation
    if (!localNewItem.itemName.trim()) {
      setError("Item name is required");
      return;
    }
    
    if (!localNewItem.itemCategory) {
      setError("Please select a category");
      return;
    }
    
    if (!localNewItem.warehouse) {
      setError("Please select a warehouse");
      return;
    }

    setIsAddingProduct(true);
    setError("");
    
    try {
      // Find the selected warehouse ID
      const selectedWarehouse = warehouses.find(w => w.warehouse_name === localNewItem.warehouse);
      const warehouseId = selectedWarehouse ? selectedWarehouse.id : 1;
      
      console.log("Selected warehouse:", selectedWarehouse);
      console.log("Warehouse ID:", warehouseId);

      // Validate warehouse selection
      if (!selectedWarehouse && warehouses.length > 0) {
        setError("No valid warehouse selected");
        return;
      }

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Product added successfully");
      
      // FULL RESET
      resetLocalForm();
      if (resetForm) resetForm(); // Optional parent cleanup
      setShowAdd(false);
      if (handleAddItem) handleAddItem();
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product");
    } finally {
      setIsAddingProduct(false);
    }
  };

  const handleUpdateProductApi = async () => {
    // Form validation
    if (!localNewItem.itemName.trim()) {
      setError("Item name is required");
      return;
    }
    
    if (!localNewItem.itemCategory) {
      setError("Please select a category");
      return;
    }
    
    if (!localNewItem.warehouse) {
      setError("Please select a warehouse");
      return;
    }

    setIsUpdatingProduct(true);
    setError("");
    
    try {
      // TODO: Implement update logic
      console.log("Update product functionality to be implemented");
      resetLocalForm();
      if (resetForm) resetForm();
      setShowEdit(false);
      if (handleUpdateItem) handleUpdateItem();
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product");
    } finally {
      setIsUpdatingProduct(false);
    }
  };

  const handleAddUOM = () => {
    if (!newUOM.trim()) {
      setError("UOM name cannot be empty");
      return;
    }
    
    if (uoms.includes(newUOM.trim())) {
      setError("UOM already exists");
      return;
    }
    
    setUoms(prev => [...prev, newUOM.trim()]);
    setNewUOM("");
    setShowAddUOMModal(false);
  };

  // Set default warehouse for addStock mode with better handling
  useEffect(() => {
    if (formMode === "addStock" && warehouses.length > 0 && !localNewItem.warehouse) {
      setLocalNewItem(prev => ({
        ...prev,
        warehouse: warehouses[0].warehouse_name
      }));
    }
  }, [formMode, warehouses, localNewItem.warehouse]);

  // Reset form when modal is closed (for Add mode)
  const handleClose = () => {
    if (isAdding) {
      resetLocalForm();
    }
    setShowAdd(false);
    setShowEdit(false);
  };

  return (
    <>
      {/* Main Modal */}
      <Modal
        show={isAdding || isEditing}
        onHide={handleClose}
        centered
        size="xl"
        key={isAdding ? 'add-modal' : 'edit-modal'}
      >
        <Modal.Header closeButton>
          <Modal.Title>{isAdding ? "Add Product" : "Edit Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>} {/* Added error display */}
          <Form>
            {/* Rest of the form remains the same */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    name="itemName"
                    value={localNewItem.itemName}
                    onChange={handleChange}
                    placeholder="Enter item name"
                    isInvalid={!!error && !localNewItem.itemName.trim()}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>HSN</Form.Label>
                  <Form.Control
                    name="hsn"
                    value={localNewItem.hsn}
                    onChange={handleChange}
                    placeholder="Enter HSN code"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Barcode</Form.Label>
                  <Form.Control
                    name="barcode"
                    value={localNewItem.barcode}
                    onChange={handleChange}
                    placeholder="Enter barcode"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Item Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    onChange={handleChange}
                    accept="image/*"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Warehouse</Form.Label>
                  {formMode === "addStock" ? (
                    <Form.Control
                      type="text"
                      value={localNewItem.warehouse}
                      readOnly
                      className="bg-light"
                    />
                  ) : (
                    <Form.Select
                      name="warehouse"
                      value={localNewItem.warehouse}
                      onChange={handleChange}
                      isInvalid={!!error && !localNewItem.warehouse}
                    >
                      <option value="">Select Warehouse</option>
                      {warehouses.map((wh) => (
                        <option key={wh.id} value={wh.warehouse_name}>
                          {wh.warehouse_name} - {wh.location}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Label className="mb-0">Item Category</Form.Label>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setShowAddCategoryModal(true)}
                      style={{
                        backgroundColor: "#27b2b6",
                        border: "none",
                        color: "#fff",
                        padding: "6px 16px",
                      }}
                    >
                      + Add New
                    </Button>
                  </div>
                  <Form.Select
                    name="itemCategory"
                    value={localNewItem.itemCategory}
                    onChange={handleChange}
                    className="mt-2"
                    isInvalid={!!error && !localNewItem.itemCategory}
                  >
                    <option value="">Select Category</option>
                    {fetchedCategories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Item Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="description"
                    value={localNewItem.description}
                    onChange={handleChange}
                    placeholder="Enter item description"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Initial Quantity On Hand</Form.Label>
                  <Form.Control
                    name="quantity"
                    type="number"
                    value={localNewItem.quantity}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>SKU</Form.Label>
                  <Form.Control
                    name="sku"
                    value={localNewItem.sku}
                    onChange={handleChange}
                    placeholder="Enter SKU"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Minimum Order Quantity</Form.Label>
                  <Form.Control
                    name="minQty"
                    type="number"
                    value={localNewItem.minQty}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>As Of Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={localNewItem.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Default Tax Account</Form.Label>
                  <Form.Control
                    name="taxAccount"
                    value={localNewItem.taxAccount}
                    onChange={handleChange}
                    placeholder="Enter tax account"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Initial Cost/Unit</Form.Label>
                  <Form.Control
                    name="cost"
                    type="number"
                    value={localNewItem.cost}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Default Sale Price (Exclusive)</Form.Label>
                  <Form.Control
                    name="salePriceExclusive"
                    type="number"
                    value={localNewItem.salePriceExclusive}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Default Purchase Price (Inclusive)</Form.Label>
                  <Form.Control
                    name="salePriceInclusive"
                    type="number"
                    value={localNewItem.salePriceInclusive}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Default Discount %</Form.Label>
                  <Form.Control
                    name="discount"
                    type="number"
                    value={localNewItem.discount}
                    onChange={handleChange}
                    placeholder="0"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    name="remarks"
                    value={localNewItem.remarks}
                    onChange={handleChange}
                    placeholder="Enter remarks"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#27b2b6", borderColor: "#27b2b6" }}
            onClick={isAdding ? handleAddProductApi : handleUpdateProductApi}
            disabled={isAddingProduct || isUpdatingProduct}
          >
            {isAdding ? (
              isAddingProduct ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  Adding...
                </>
              ) : "Add"
            ) : isUpdatingProduct ? (
              <>
                <Spinner as="span" animation="border" size="sm" className="me-2" />
                Updating...
              </>
            ) : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        show={showAddCategoryModal}
        onHide={() => setShowAddCategoryModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>} {/* Added error display */}
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              isInvalid={!!error && !newCategory.trim()}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddCategoryModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#27b2b6", border: "none", color: "#fff" }}
            onClick={handleAddCategoryApi}
            disabled={isAddingCategory}
          >
            {isAddingCategory ? (
              <>
                <Spinner as="span" animation="border" size="sm" className="me-2" />
                Adding...
              </>
            ) : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add UOM Modal */}
      <Modal
        show={showAddUOMModal}
        onHide={() => setShowAddUOMModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New UOM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>} {/* Added error display */}
          <Form.Group>
            <Form.Label>UOM Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new UOM"
              value={newUOM}
              onChange={(e) => setNewUOM(e.target.value)}
              isInvalid={!!error && !newUOM.trim()}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddUOMModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#27b2b6", border: "none", color: "#fff" }}
            onClick={handleAddUOM}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProductModal;