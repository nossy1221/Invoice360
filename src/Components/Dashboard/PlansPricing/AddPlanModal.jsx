import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Card, Button, InputGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import CustomUserLimitModal from "./CustomUserLimitModal";
import CustomStorageCapacityModal from "./CustomStorageCapacityModal";
import CustomInvoiceLimitModal from "./CustomInvoiceLimitModal";
import AddModuleModal from "./AddModuleModal";
import Swal from "sweetalert2";

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
];

// Static modules data
const staticModules = [
  { id: 1, label: "Basic Analytics", price: 2.99 },
  { id: 2, label: "Email Support", price: 1.99 },
  { id: 3, label: "Advanced Analytics", price: 4.99 },
  { id: 4, label: "Priority Support", price: 3.99 },
  { id: 5, label: "Custom Branding", price: 2.99 },
  { id: 6, label: "API Access", price: 5.99 },
  { id: 7, label: "Advanced Reporting", price: 6.99 },
  { id: 8, label: "Dedicated Account Manager", price: 15.99 },
];

const getCurrencySymbol = (currencyCode) => {
  const currency = currencies.find(c => c.code === currencyCode);
  return currency ? currency.symbol : "$";
};

const calculateTotalPrice = (basePrice, selectedModules, currencyCode) => {
  let total = parseFloat(basePrice) || 0;
  selectedModules.forEach(module => {
    total += parseFloat(module.price) || 0;
  });
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${total.toFixed(2)}`;
};

const AddPlanModal = ({ show, handleClose, handleAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    basePrice: "",
    billing: "Monthly",
    status: "Active",
    subscribers: "0",
    descriptions: [""],
    selectedModules: [
      { id: 1, name: "Account", price: 0 }
    ],
    invoiceLimit: 10,
    additionalInvoicePrice: 2.00,
    userLimit: 1,
    storageCapacity: 5,
    currency: "USD"
  });
  
  const [availableModules, setAvailableModules] = useState([]);
  const [showCustomUserLimitModal, setShowCustomUserLimitModal] = useState(false);
  const [showCustomStorageCapacityModal, setShowCustomStorageCapacityModal] = useState(false);
  const [showCustomInvoiceLimitModal, setShowCustomInvoiceLimitModal] = useState(false);
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set static modules when modal is shown
  useEffect(() => {
    if (show) {
      setAvailableModules(staticModules);
      
      // Set default selected module if none are selected
      if (formData.selectedModules.length === 0 && staticModules.length > 0) {
        setFormData(prev => ({
          ...prev,
          selectedModules: [
            { 
              id: staticModules[0].id, 
              name: staticModules[0].label, 
              price: 0 
            }
          ]
        }));
      }
    }
  }, [show]);
  
  const handleDescriptionChange = (index, value) => {
    const updated = [...formData.descriptions];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, descriptions: updated }));
  };
  
  const addDescriptionField = () => {
    setFormData((prev) => ({ ...prev, descriptions: [...prev.descriptions, ""] }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleInvoiceLimitChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ 
      ...prev, 
      invoiceLimit: value === "unlimited" ? "unlimited" : parseInt(value)
    }));
  };
  
  const handleUserLimitChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ 
      ...prev, 
      userLimit: value === "unlimited" ? "unlimited" : parseInt(value)
    }));
  };
  
  const handleStorageCapacityChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ 
      ...prev, 
      storageCapacity: value === "unlimited" ? "unlimited" : parseInt(value)
    }));
  };
  
  const handleCustomUserLimitSave = (newLimit) => {
    setFormData(prev => ({ ...prev, userLimit: newLimit }));
    setShowCustomUserLimitModal(false);
  };
  
  const handleCustomStorageCapacitySave = (newCapacity) => {
    setFormData(prev => ({ ...prev, storageCapacity: newCapacity }));
    setShowCustomStorageCapacityModal(false);
  };
  
  const handleCustomInvoiceLimitSave = (newLimit) => {
    setFormData(prev => ({ ...prev, invoiceLimit: newLimit }));
    setShowCustomInvoiceLimitModal(false);
  };
  
  const handleModuleToggle = (module) => {
    setFormData(prev => {
      const isSelected = prev.selectedModules.some(m => m.id === module.id);
      
      if (isSelected) {
        return {
          ...prev,
          selectedModules: prev.selectedModules.filter(m => m.id !== module.id)
        };
      } else {
        return {
          ...prev,
          selectedModules: [
            ...prev.selectedModules,
            { 
              id: module.id, 
              name: module.label, 
              price: 0
            }
          ]
        };
      }
    });
  };
  
  const handleModulePriceChange = (moduleId, price) => {
    setFormData(prev => ({
      ...prev,
      selectedModules: prev.selectedModules.map(module => 
        module.id === moduleId ? { ...module, price: parseFloat(price) || 0 } : module
      )
    }));
  };
  
  const handleModuleAdded = (newModule) => {
    // Add the new module to the available modules list
    setAvailableModules(prev => [...prev, newModule]);
  };
  
  const handleDeleteModule = async (moduleId, moduleName) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete the "${moduleName}" module. This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Yes, delete it!",
      });
      
      if (result.isConfirmed) {
        // Remove the module from available modules list
        setAvailableModules(prev => prev.filter(module => module.id !== moduleId));
        
        // If the module was selected, remove it from selected modules as well
        setFormData(prev => ({
          ...prev,
          selectedModules: prev.selectedModules.filter(module => module.id !== moduleId)
        }));
        
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `The "${moduleName}" module has been deleted.`,
        });
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete module. Please try again.",
      });
    }
  };
  
  const onAdd = async () => {
    try {
      setIsSubmitting(true);
      
      // Create a new plan object with the form data
      const newPlan = {
        id: Date.now(), // Generate a temporary ID
        name: formData.name,
        base_price: parseFloat(formData.basePrice) || 0,
        currency: formData.currency,
        invoice_limit: formData.invoiceLimit === "unlimited" ? -1 : parseInt(formData.invoiceLimit),
        additional_invoice_price: formData.invoiceLimit === "unlimited" ? 0 : parseFloat(formData.additionalInvoicePrice) || 0,
        user_limit: formData.userLimit === "unlimited" ? -1 : parseInt(formData.userLimit),
        storage_capacity_gb: formData.storageCapacity === "unlimited" ? -1 : parseInt(formData.storageCapacity),
        billing_cycle: formData.billing,
        status: formData.status,
        description: formData.descriptions.filter(desc => desc.trim() !== "").join("\n"),
        modules: formData.selectedModules.map(module => ({
          id: module.id,
          label: module.name,
          price: parseFloat(module.price) || 0
        })),
        subscribers: 0
      };
      
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Plan added successfully!",
      });
      
      // Call the parent's handleAdd function
      handleAdd(newPlan);
      
      // Reset form
      setFormData({ 
        name: "", 
        basePrice: "", 
        billing: "Monthly", 
        status: "Active", 
        subscribers: "0",
        descriptions: [""],
        selectedModules: staticModules.length > 0 
          ? [{ id: staticModules[0].id, name: staticModules[0].label, price: 0 }] 
          : [],
        invoiceLimit: 10,
        additionalInvoicePrice: 2.00,
        userLimit: 1,
        storageCapacity: 5,
        currency: "USD"
      });
      
      // Close the modal
      handleClose();
    } catch (error) {
      console.error("Error adding plan:", error);
      
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add plan. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const totalPrice = calculateTotalPrice(
    parseFloat(formData.basePrice) || 0, 
    formData.selectedModules,
    formData.currency
  );
  
  const currencySymbol = getCurrencySymbol(formData.currency);
  
  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header style={{ backgroundColor: "#53b2a5", color: "#fff" }}>
          <Modal.Title>Add New Plan ({formData.currency})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Plan Name</Form.Label>
                  <Form.Control name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Base Price ({currencySymbol})</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="basePrice" 
                    value={formData.basePrice} 
                    onChange={handleChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Currency</Form.Label>
                  <Form.Select name="currency" value={formData.currency} onChange={handleChange}>
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} ({currency.symbol}) - {currency.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Invoice Limit</Form.Label>
                  <InputGroup>
                    <Form.Select 
                      name="invoiceLimit" 
                      value={formData.invoiceLimit || ""} 
                      onChange={handleInvoiceLimitChange}
                    >
                      <option value="10">10 invoices</option>
                      <option value="50">50 invoices</option>
                      <option value="100">100 invoices</option>
                      <option value="500">500 invoices</option>
                      <option value="1000">1000 invoices</option>
                      <option value="unlimited">Unlimited</option>
                    </Form.Select>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setShowCustomInvoiceLimitModal(true)}
                    >
                      Custom
                    </Button>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Number of invoices included in the base price
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Additional Invoice Price ({currencySymbol})</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="additionalInvoicePrice" 
                    value={formData.additionalInvoicePrice || ""} 
                    onChange={handleChange} 
                    step="0.01"
                    disabled={formData.invoiceLimit === "unlimited"}
                  />
                  <Form.Text className="text-muted">
                    {formData.invoiceLimit === "unlimited" 
                      ? "Not applicable for unlimited plans" 
                      : "Price per invoice beyond the limit"}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>User Limit</Form.Label>
                  <InputGroup>
                    <Form.Select 
                      name="userLimit" 
                      value={formData.userLimit || ""} 
                      onChange={handleUserLimitChange}
                    >
                      <option value="1">1 user</option>
                      <option value="3">3 users</option>
                      <option value="5">5 users</option>
                      <option value="10">10 users</option>
                      <option value="20">20 users</option>
                      <option value="50">50 users</option>
                      <option value="unlimited">Unlimited</option>
                    </Form.Select>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setShowCustomUserLimitModal(true)}
                    >
                      Custom
                    </Button>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Maximum number of users allowed
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Storage Capacity</Form.Label>
                  <InputGroup>
                    <Form.Select 
                      name="storageCapacity" 
                      value={formData.storageCapacity || ""} 
                      onChange={handleStorageCapacityChange}
                    >
                      <option value="5">5 GB</option>
                      <option value="10">10 GB</option>
                      <option value="20">20 GB</option>
                      <option value="50">50 GB</option>
                      <option value="100">100 GB</option>
                      <option value="200">200 GB</option>
                      <option value="500">500 GB</option>
                      <option value="unlimited">Unlimited</option>
                    </Form.Select>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setShowCustomStorageCapacityModal(true)}
                    >
                      Custom
                    </Button>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Storage capacity included in the plan
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Billing Cycle</Form.Label>
                  <Form.Select name="billing" value={formData.billing} onChange={handleChange}>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Deprecated">InActive</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="mb-0">Modules</Form.Label>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={() => setShowAddModuleModal(true)}
                >
                  Add New Module
                </Button>
              </div>
              <Card className="mb-3">
                <Card.Body>
                  {availableModules.map(module => {
                    const isSelected = formData.selectedModules?.some(m => m.id === module.id);
                    const selectedModule = formData.selectedModules?.find(m => m.id === module.id);
                    
                    return (
                      <Row key={module.id} className="mb-3 align-items-center">
                        <Col md={5}>
                          <Form.Check 
                            type="checkbox"
                            id={`module-${module.id}`}
                            label={module.label}
                            checked={isSelected || false}
                            onChange={() => handleModuleToggle(module)}
                          />
                        </Col>
                        <Col md={5}>
                          {isSelected && (
                            <InputGroup>
                              <InputGroup.Text>{currencySymbol}</InputGroup.Text>
                              <Form.Control
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Enter price"
                                value={selectedModule.price || ""}
                                onChange={(e) => handleModulePriceChange(module.id, e.target.value)}
                              />
                            </InputGroup>
                          )}
                        </Col>
                        <Col md={2} className="text-end">
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            onClick={() => handleDeleteModule(module.id, module.label)}
                            title="Delete Module"
                          >
                            <BsTrash />
                          </Button>
                        </Col>
                      </Row>
                    );
                  })}
                </Card.Body>
              </Card>
              <div className="alert alert-info">
                <strong>Total Price: {totalPrice}</strong> (Base Price + Selected Modules)
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Descriptions</Form.Label>
              {formData.descriptions.map((desc, idx) => (
                <div key={idx} className="d-flex mb-2 gap-2 align-items-center">
                  <Form.Control
                    value={desc}
                    onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                    placeholder={`Description ${idx + 1}`}
                  />
                  {idx === formData.descriptions.length - 1 && (
                    <Button variant="outline-success" size="sm" onClick={addDescriptionField}>
                      +
                    </Button>
                  )}
                </div>
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>Close</Button>
          <Button 
            style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5" }} 
            onClick={onAdd}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Plan"}
          </Button>
        </Modal.Footer>
      </Modal>
      
      <CustomUserLimitModal 
        show={showCustomUserLimitModal}
        handleClose={() => setShowCustomUserLimitModal(false)}
        handleSave={handleCustomUserLimitSave}
        currentUserLimit={formData.userLimit}
      />
      
      <CustomStorageCapacityModal 
        show={showCustomStorageCapacityModal}
        handleClose={() => setShowCustomStorageCapacityModal(false)}
        handleSave={handleCustomStorageCapacitySave}
        currentStorageCapacity={formData.storageCapacity}
      />
      
      <CustomInvoiceLimitModal 
        show={showCustomInvoiceLimitModal}
        handleClose={() => setShowCustomInvoiceLimitModal(false)}
        handleSave={handleCustomInvoiceLimitSave}
        currentInvoiceLimit={formData.invoiceLimit}
      />
      
      <AddModuleModal 
        show={showAddModuleModal}
        handleClose={() => setShowAddModuleModal(false)}
        onModuleAdded={handleModuleAdded}
      />
    </>
  );
};

export default AddPlanModal;