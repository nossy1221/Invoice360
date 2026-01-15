import React, { useState } from "react";
import { BsListUl, BsPencilSquare, BsEye, BsChevronLeft, BsChevronRight, BsTrash } from "react-icons/bs";
import { Button, Card, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PlansPricing.css";
import Swal from "sweetalert2";
import EditPlanModal from "./EditPlanModal";
import ViewPlanModal from "./ViewPlanModal";
import AddPlanModal from "./AddPlanModal";

// Available currencies
const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
];

// Badge styles for plan names
const badgeStyles = {
  Bronze: {
    backgroundImage: "linear-gradient(to right, #ad7c59, #cd7f32, #a97142)",
    color: "#fff",
    boxShadow: "0 0 6px rgba(173, 124, 89, 0.5)",
  },
  Silver: {
    backgroundImage: "linear-gradient(to right, #c0c0c0, #d8d8d8, #b0b0b0)",
    color: "#000",
    boxShadow: "0 0 6px rgba(192, 192, 192, 0.6)",
  },
  Gold: {
    backgroundImage: "linear-gradient(to right, #f5d76e, #ffd700, #e6be8a)",
    color: "#000",
    boxShadow: "0 0 6px rgba(255, 215, 0, 0.5)",
  },
  Platinum: {
    backgroundImage: "linear-gradient(to right, #e5e4e2, #f9f9fb, #cfd8dc)",
    color: "#000",
    boxShadow: "0 0 6px rgba(180, 200, 220, 0.5)",
  },
  Premium: {
    backgroundImage: "linear-gradient(to right, #FFD700, #FFA500, #FF8C00)",
    color: "#fff",
    boxShadow: "0 0 6px rgba(255, 140, 0, 0.5)",
  },
};

// Helper function to get currency symbol
const getCurrencySymbol = (currencyCode) => {
  if (!currencyCode) return "$";
  const currency = currencies.find(c => c.code === currencyCode);
  return currency ? currency.symbol : "$";
};

// Helper function to calculate total price based on selected modules and invoice limit
const calculateTotalPrice = (basePrice, selectedModules, currencyCode) => {
  try {
    let total = parseFloat(basePrice) || 0;
    if (selectedModules && Array.isArray(selectedModules)) {
      selectedModules.forEach(module => {
        total += parseFloat(module.price || module.module_price || 0);
      });
    }
    const symbol = getCurrencySymbol(currencyCode);
    return `${symbol}${total.toFixed(2)}`;
  } catch (error) {
    console.error("Error calculating total price:", error);
    return "$0.00";
  }
};

// Helper function to format modules for display
const formatModulesForDisplay = (modules, currencyCode) => {
  try {
    if (!modules || !Array.isArray(modules) || modules.length === 0) {
      return <span className="text-muted">—</span>;
    }
    const symbol = getCurrencySymbol(currencyCode);
    const maxDisplay = 3;
    if (modules.length <= maxDisplay) {
      return (
        <div className="d-flex flex-wrap gap-1">
          {modules.map((module, index) => (
            <Badge key={index} bg="secondary" className="me-1">
              {module.name || module.label} ({symbol}{parseFloat(module.price || module.module_price).toFixed(2)})
            </Badge>
          ))}
        </div>
      );
    }
    const displayedModules = modules.slice(0, 2);
    const remainingCount = modules.length - 2;
    return (
      <div className="d-flex flex-wrap gap-1">
        {displayedModules.map((module, index) => (
          <Badge key={index} bg="secondary" className="me-1">
            {module.name || module.label} ({symbol}{parseFloat(module.price || module.module_price).toFixed(2)})
          </Badge>
        ))}
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={`tooltip-modules`}>
              {modules.slice(2).map((module, index) => (
                <div key={index}>{module.name || module.label} ({symbol}{parseFloat(module.price || module.module_price).toFixed(2)})</div>
              ))}
            </Tooltip>
          }
        >
          <Badge bg="secondary" className="me-1">
            +{remainingCount} more
          </Badge>
        </OverlayTrigger>
      </div>
    );
  } catch (error) {
    console.error("Error formatting modules:", error);
    return <span className="text-muted">—</span>;
  }
};

// Helper function to format invoice limit for display
const formatInvoiceLimit = (limit) => {
  try {
    if (limit === -1 || limit === "unlimited") return "Unlimited";
    return `${limit} invoices`;
  } catch (error) {
    console.error("Error formatting invoice limit:", error);
    return "Unknown";
  }
};

// Helper function to format user limit for display
const formatUserLimit = (limit) => {
  try {
    if (limit === -1 || limit === "unlimited") return "Unlimited";
    return `${limit} users`;
  } catch (error) {
    console.error("Error formatting user limit:", error);
    return "Unknown";
  }
};

// Helper function to format storage capacity for display
const formatStorageCapacity = (capacity) => {
  try {
    if (capacity === -1 || capacity === "unlimited") return "Unlimited";
    return `${capacity} GB`;
  } catch (error) {
    console.error("Error formatting storage capacity:", error);
    return "Unknown";
  }
};

// Static data for plans
const staticPlans = [
  {
    id: 1,
    name: "Bronze",
    base_price: 9.99,
    currency: "USD",
    invoice_limit: 10,
    additional_invoice_price: 1.50,
    user_limit: 1,
    storage_capacity_gb: 5,
    billing_cycle: "Monthly",
    status: "Active",
    description: "Perfect for individuals getting started",
    modules: [
      { id: 1, name: "Basic Analytics", price: 2.99 },
      { id: 2, name: "Email Support", price: 1.99 }
    ],
    subscribers: 24
  },
  {
    id: 2,
    name: "Silver",
    base_price: 19.99,
    currency: "USD",
    invoice_limit: 50,
    additional_invoice_price: 1.00,
    user_limit: 3,
    storage_capacity_gb: 15,
    billing_cycle: "Monthly",
    status: "Active",
    description: "Great for small businesses",
    modules: [
      { id: 1, name: "Advanced Analytics", price: 4.99 },
      { id: 2, name: "Priority Support", price: 3.99 },
      { id: 3, name: "Custom Branding", price: 2.99 }
    ],
    subscribers: 18
  },
  {
    id: 3,
    name: "Gold",
    base_price: 39.99,
    currency: "USD",
    invoice_limit: 100,
    additional_invoice_price: 0.75,
    user_limit: 5,
    storage_capacity_gb: 30,
    billing_cycle: "Monthly",
    status: "Active",
    description: "Ideal for growing businesses",
    modules: [
      { id: 1, name: "Advanced Analytics", price: 4.99 },
      { id: 2, name: "Priority Support", price: 3.99 },
      { id: 3, name: "Custom Branding", price: 2.99 },
      { id: 4, name: "API Access", price: 5.99 }
    ],
    subscribers: 12
  },
  {
    id: 4,
    name: "Platinum",
    base_price: 79.99,
    currency: "USD",
    invoice_limit: -1,
    additional_invoice_price: 0,
    user_limit: 10,
    storage_capacity_gb: 100,
    billing_cycle: "Monthly",
    status: "Active",
    description: "For established businesses",
    modules: [
      { id: 1, name: "Advanced Analytics", price: 4.99 },
      { id: 2, name: "24/7 Support", price: 7.99 },
      { id: 3, name: "Custom Branding", price: 2.99 },
      { id: 4, name: "API Access", price: 5.99 },
      { id: 5, name: "Advanced Reporting", price: 6.99 }
    ],
    subscribers: 8
  },
  {
    id: 5,
    name: "Premium",
    base_price: 149.99,
    currency: "USD",
    invoice_limit: -1,
    additional_invoice_price: 0,
    user_limit: -1,
    storage_capacity_gb: -1,
    billing_cycle: "Monthly",
    status: "Active",
    description: "For large enterprises",
    modules: [
      { id: 1, name: "Advanced Analytics", price: 4.99 },
      { id: 2, name: "24/7 Support", price: 7.99 },
      { id: 3, name: "Custom Branding", price: 2.99 },
      { id: 4, name: "API Access", price: 5.99 },
      { id: 5, name: "Advanced Reporting", price: 6.99 },
      { id: 6, name: "Dedicated Account Manager", price: 15.99 }
    ],
    subscribers: 3
  },
  {
    id: 6,
    name: "Bronze",
    base_price: 99.99,
    currency: "USD",
    invoice_limit: 10,
    additional_invoice_price: 1.50,
    user_limit: 1,
    storage_capacity_gb: 5,
    billing_cycle: "Yearly",
    status: "Inactive",
    description: "Perfect for individuals getting started",
    modules: [
      { id: 1, name: "Basic Analytics", price: 2.99 },
      { id: 2, name: "Email Support", price: 1.99 }
    ],
    subscribers: 5
  }
];

const PlanPricing = () => {
  const [plans, setPlans] = useState(staticPlans);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [viewPlan, setViewPlan] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlans = plans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(plans.length / itemsPerPage));
  
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  const handleEditClick = (plan) => {
    try {
      if (!plan) {
        throw new Error("Invalid plan data");
      }
      
      // Convert API response format to component format with null checks
      const formattedPlan = {
        id: plan.id || null,
        name: plan.name || "",
        basePrice: plan.base_price || 0,
        billing: plan.billing_cycle || "Monthly",
        selectedModules: plan.modules || [],
        descriptions: plan.description ? [plan.description] : [""],
        invoiceLimit: plan.invoice_limit === -1 ? "unlimited" : (plan.invoice_limit || 10),
        additionalInvoicePrice: plan.additional_invoice_price || 0,
        userLimit: plan.user_limit === -1 ? "unlimited" : (plan.user_limit || 1),
        storageCapacity: plan.storage_capacity_gb === -1 ? "unlimited" : (plan.storage_capacity_gb || 5),
        currency: plan.currency || "USD",
        status: plan.status || "Active"
      };
      
      setSelectedPlan(formattedPlan);
      setShowModal(true);
    } catch (error) {
      console.error("Error formatting plan data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to process plan data. Please try again.",
      });
    }
  };
  
  const handleDeleteClick = async (planId) => {
    try {
      if (!planId) {
        throw new Error("Invalid plan ID");
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This plan will be deleted permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Yes, delete it!",
      });
      
      if (result.isConfirmed) {
        // Update local state
        const updatedPlans = plans.filter(plan => plan.id !== planId);
        setPlans(updatedPlans);
        
        // Adjust pagination if needed
        if (currentPlans.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        
        Swal.fire("Deleted!", "The plan has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete plan. Please try again.",
      });
    }
  };
  
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };
  
  const handleSaveChanges = async (updatedPlan) => {
    try {
      // Update local state with the updated plan
      const updatedPlans = plans.map(plan => 
        plan.id === updatedPlan.id ? { ...plan, ...updatedPlan } : plan
      );
      setPlans(updatedPlans);
      
      setShowModal(false);
      
      Swal.fire("Success!", "Plan has been updated successfully.", "success");
    } catch (error) {
      console.error("Error updating plan:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update plan. Please try again.",
      });
    }
  };
  
  const handleViewClick = (plan) => {
    try {
      if (!plan) {
        throw new Error("Invalid plan data");
      }
      
      // Convert API response format to component format with null checks
      const formattedPlan = {
        id: plan.id || null,
        name: plan.name || "",
        basePrice: plan.base_price || 0,
        billing: plan.billing_cycle || "Monthly",
        selectedModules: plan.modules || [],
        descriptions: plan.description ? [plan.description] : [""],
        invoiceLimit: plan.invoice_limit === -1 ? "unlimited" : (plan.invoice_limit || 10),
        additionalInvoicePrice: plan.additional_invoice_price || 0,
        userLimit: plan.user_limit === -1 ? "unlimited" : (plan.user_limit || 1),
        storageCapacity: plan.storage_capacity_gb === -1 ? "unlimited" : (plan.storage_capacity_gb || 5),
        currency: plan.currency || "USD",
        status: plan.status || "Active"
      };
      
      setViewPlan(formattedPlan);
      setViewModal(true);
    } catch (error) {
      console.error("Error formatting plan data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to process plan data. Please try again.",
      });
    }
  };
  
  const handleAddPlan = (newPlan) => {
    try {
      if (!newPlan) {
        throw new Error("Invalid plan data");
      }
      
      // Add the new plan to the beginning of the list
      setPlans([newPlan, ...plans]);
      setShowAddModal(false);
      setCurrentPage(1); // Reset to first page when adding new plan
    } catch (error) {
      console.error("Error adding plan:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add plan. Please try again.",
      });
    }
  };
  
  return (
    <div className="plans-page p-4">
      <div className="header-section mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h4 className="fw-bold d-flex align-items-center gap-2">
            <span role="img" aria-label="coin">💰</span> Plans & Pricing
          </h4>
          <p className="text-muted">
            Manage your subscription plans, pricing options.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)} style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5" }}>
          + Add Plan
        </Button>
      </div>
  
      <div className="card">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">View All Plans</h6>
          <div className="table-responsive">
            <table className="table table-hover plans-table">
              <thead className="table-light">
                <tr>
                  <th>Plan Name</th>
                  <th>Currency</th>
                  <th>Base Price</th>
                  <th>Total Price</th>
                  <th>Invoice Limit</th>
                  <th>Additional Invoice Price</th>
                  <th>User Limit</th>
                  <th>Storage Capacity</th>
                  <th>Billing Cycle</th>
                  <th>Status</th>
                  <th>Modules</th>
                  <th>Subscribers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPlans.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="text-center py-4">
                      No plans found. Click 'Add Plan' to create a new plan.
                    </td>
                  </tr>
                ) : (
                  currentPlans.map((plan) => {
                    try {
                      // Calculate total price for this plan with null checks
                      const totalPrice = calculateTotalPrice(
                        plan.base_price, 
                        plan.modules || [], 
                        plan.currency || "USD"
                      );
                      
                      return (
                        <tr key={plan.id}>
                          <td>
                            <span
                              className="badge px-3 py-2 rounded-pill fw-semibold"
                              style={{
                                ...(badgeStyles[plan.name] || {
                                  backgroundColor: "#b2dfdb",
                                  color: "#000",
                                }),
                              }}
                            >
                              {plan.name || "Unnamed Plan"}
                            </span>
                          </td>
                          <td>{plan.currency || "USD"}</td>
                          <td>{getCurrencySymbol(plan.currency)}{plan.base_price || 0}</td>
                          <td><strong>{totalPrice}</strong></td>
                          <td>{formatInvoiceLimit(plan.invoice_limit)}</td>
                          <td>
                            {plan.invoice_limit === -1 
                              ? "Not applicable" 
                              : `${getCurrencySymbol(plan.currency)}${plan.additional_invoice_price || 0}/invoice`}
                          </td>
                          <td>{formatUserLimit(plan.user_limit)}</td>
                          <td>{formatStorageCapacity(plan.storage_capacity_gb)}</td>
                          <td>{plan.billing_cycle || "Monthly"}</td>
                          <td>
                            <span className={`badge ${plan.status === "Inactive" ? "bg-warning text-dark" : "bg-success"}`}>
                              {plan.status || "Active"}
                            </span>
                          </td>
                          <td>
                            {formatModulesForDisplay(plan.modules || [], plan.currency || "USD")}
                          </td>
                          <td>{plan.subscribers || 0}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button 
                                className="btn btn-sm text-warning p-0" 
                                onClick={() => handleEditClick(plan)}
                                title="Edit"
                              >
                                <BsPencilSquare size={18} />
                              </button>
                              <button
                                className="btn btn-sm text-info p-0"
                                onClick={() => handleViewClick(plan)}
                                title="View"
                              >
                                <BsEye size={18} />
                              </button>
                              <button
                                className="btn btn-sm text-danger p-0"
                                onClick={() => handleDeleteClick(plan.id)}
                                title="Delete"
                              >
                                <BsTrash size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    } catch (error) {
                      console.error("Error rendering plan row:", error, plan);
                      return (
                        <tr key={plan.id || Math.random()}>
                          <td colSpan="13" className="text-center text-danger">
                            Error displaying plan data
                          </td>
                        </tr>
                      );
                    }
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {plans.length > 0 && (
            <div className="d-flex justify-content-between align-items-center px-2 py-2">
              <div className="text-muted small">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, plans.length)} of {plans.length} results
              </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#6c757d",
                    borderColor: "#53b2a5",
                  }}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <BsChevronLeft />
                </button>
                <div className="d-flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`btn btn-sm ${currentPage === page ? 'active' : ''}`}
                      style={{
                        backgroundColor: currentPage === page ? "#53b2a5" : "white",
                        color: currentPage === page ? "white" : "#53b2a5",
                        borderColor: "#53b2a5",
                      }}
                      onClick={() => paginate(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  className="btn btn-sm rounded"
                  style={{
                    backgroundColor: "#53b2a5",
                    color: "white",
                    borderColor: "#53b2a5",
                  }}
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <BsChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {selectedPlan && (
        <EditPlanModal
          show={showModal}
          handleClose={handleModalClose}
          plan={selectedPlan}
          handleSave={handleSaveChanges}
        />
      )}
      
      {viewPlan && (
        <ViewPlanModal
          show={viewModal}
          handleClose={() => setViewModal(false)}
          plan={viewPlan}
        />
      )}
      
      {showAddModal && (
        <AddPlanModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          handleAdd={handleAddPlan}
        />
      )}
    </div>
  );
};

export default PlanPricing;