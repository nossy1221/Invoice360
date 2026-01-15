import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

// Mock subgroups data
const mockSubgroups = [
  { id: 1, name: "Cash-in-hand" },
  { id: 2, name: "Bank A/Cs" },
  { id: 3, name: "Sundry Debtors" },
  { id: 4, name: "Sundry Creditors" },
  { id: 5, name: "Current Assets" },
  { id: 6, name: "Fixed Assets" },
  { id: 7, name: "Investments" },
  { id: 8, name: "Bank OD A/C" },
  { id: 9, name: "Deposits (Assets)" },
  { id: 10, name: "Current Liabilities" },
  { id: 11, name: "Loans (Liability)" },
  { id: 12, name: "Loans & Advances" },
  { id: 13, name: "Provisions" },
  { id: 14, name: "Purchases A/C" },
  { id: 15, name: "Purchases Return" },
  { id: 16, name: "Sales A/C" },
  { id: 17, name: "Sales Return" },
  { id: 18, name: "Misc. Income" },
  { id: 19, name: "Capital A/C" },
  { id: 20, name: "Direct Expenses" },
  { id: 21, name: "Indirect Expenses" },
  { id: 22, name: "Misc. Expenses" }
];

const AddNewAccountModal = ({ 
  show, 
  onHide, 
  onSave, 
  newAccountData, 
  setNewAccountData,
  showBankDetails,
  setShowBankDetails,
  showAddParentModal,
  setShowAddParentModal,
  selectedMainCategory,
  setSelectedMainCategory,
  parentToChildren,
  accountData,
  handleAddNewParent
}) => {
  // State for the Add Parent Account modal
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAccountSubmitting, setIsAccountSubmitting] = useState(false);
  const [parentAccountForm, setParentAccountForm] = useState({
    mainCategory: '',
    subgroupName: ''
  });
  const [subgroups, setSubgroups] = useState([]);
  const [loadingSubgroups, setLoadingSubgroups] = useState(true);

  // Fetch subgroups when component mounts (using mock data)
  useEffect(() => {
    fetchSubgroups();
  }, []);

  // Function to fetch subgroups (simulated with mock data)
  const fetchSubgroups = async () => {
    try {
      setLoadingSubgroups(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubgroups(mockSubgroups);
    } catch (error) {
      console.error('Error fetching subgroups:', error);
    } finally {
      setLoadingSubgroups(false);
    }
  };

  // Handle saving the parent account (simulated)
  const handleSaveParentAccount = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock response
      const mockResponse = {
        status: true,
        message: "Parent account added successfully",
        data: {
          id: Date.now().toString(),
          category_id: getCategoryID(parentAccountForm.mainCategory),
          name: parentAccountForm.subgroupName,
          created_at: new Date().toISOString()
        }
      };

      // Call handleAddNewParent callback with response data
      handleAddNewParent(mockResponse);
      
      // Reset form after successful submission
      setParentAccountForm({
        mainCategory: '',
        subgroupName: ''
      });
      
      // Refresh subgroups list (add new subgroup to mock data)
      const newSubgroup = {
        id: mockSubgroups.length + 1,
        name: parentAccountForm.subgroupName
      };
      setSubgroups([...subgroups, newSubgroup]);
      
      // Close modal
      setShowAddParentModal(false);
      
    } catch (error) {
      console.error('Error saving parent account:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle saving the new account (simulated)
  const handleSaveAccount = async () => {
    setIsAccountSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the selected subgroup ID
      const selectedSubgroup = subgroups.find(sub => sub.name === newAccountData.subgroup);
      
      // Create a mock response
      const mockResponse = {
        status: true,
        message: "Account added successfully",
        data: {
          id: Date.now().toString(),
          subgroup_id: selectedSubgroup ? selectedSubgroup.id : '',
          account_name: newAccountData.name,
          has_bank_details: showBankDetails ? 1 : 0,
          account_number: showBankDetails ? newAccountData.bankAccountNumber : '',
          ifsc_code: showBankDetails ? newAccountData.bankIFSC : '',
          bank_name_branch: showBankDetails ? newAccountData.bankNameBranch : '',
          phone: newAccountData.phone || '',
          email: newAccountData.email || '',
          created_at: new Date().toISOString()
        }
      };

      // Call onSave callback with response data
      onSave(mockResponse);
      
      // Close modal
      onHide();
      
    } catch (error) {
      console.error('Error saving account:', error);
    } finally {
      setIsAccountSubmitting(false);
    }
  };

  // Helper function to get category ID from category name
  const getCategoryID = (categoryName) => {
    const categoryMap = {
      'assets': 1,
      'liabilities': 2,
      'income': 3,
      'expenses': 4,
      'equity': 5
    };
    return categoryMap[categoryName] || 1;
  };

  // Handle input changes for the parent account form
  const handleParentAccountInputChange = (e) => {
    const { name, value } = e.target;
    setParentAccountForm({
      ...parentAccountForm,
      [name]: value
    });
  };

  return (
    <>
      {/* Main Add New Account Modal */}
      <Modal
        show={show}
        onHide={onHide}
        centered
        backdrop="static"
        size="xl"
        dialogClassName="w-100"
      >
        <div>
          <Modal.Header
            closeButton
            className="bg-light d-flex justify-content-between align-items-center"
          >
            <Modal.Title className="m-2">Add New Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <Form.Label>Subgroup</Form.Label>
                  <Button
                    size="sm"
                    onClick={() => setShowAddParentModal(true)}
                    style={{
                      backgroundColor: "#53b2a5",
                      border: "none",
                      padding: "8px 16px",
                    }}
                  >
                    + Add Parent
                  </Button>
                </div>
                <Form.Select
                  value={newAccountData.subgroup}
                  onChange={(e) => {
                    const subgroup = e.target.value;
                    setNewAccountData({
                      ...newAccountData,
                      subgroup,
                      name: "",
                    });
                  }}
                >
                  <option value="">-- Select Subgroup --</option>
                  {loadingSubgroups ? (
                    <option disabled>Loading subgroups...</option>
                  ) : (
                    subgroups.map((subgroup) => (
                      <option key={subgroup.id} value={subgroup.name}>
                        {subgroup.name}
                      </option>
                    ))
                  )}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-1 ">
                  <Form.Label>Sub of Subgroup (Account Name)</Form.Label>
                  <Button
                    size="sm"
                    onClick={() => setShowAddParentModal(true)}
                    style={{
                      backgroundColor: "#53b2a5",
                      border: "none",
                      padding: "8px 16px",
                    }}
                  >
                    + Add SubGroup
                  </Button>
                </div>
                <Form.Select
                  value={newAccountData.name}
                  onChange={(e) =>
                    setNewAccountData({
                      ...newAccountData,
                      name: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">-- Select Account Name --</option>
                  {accountData.flatMap((group) =>
                    group.rows.map((row) => (
                      <option key={row.name} value={row.name}>
                        {row.name}
                      </option>
                    ))
                  )}
                </Form.Select>
              </Form.Group>

              {(newAccountData.subgroup === "Sundry Debtors" || 
                newAccountData.subgroup === "Sundry Creditors") && (
                <>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          value={newAccountData.phone || ""}
                          onChange={(e) =>
                            setNewAccountData({ ...newAccountData, phone: e.target.value })
                          }
                          placeholder="Enter phone number"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={newAccountData.email || ""}
                          onChange={(e) =>
                            setNewAccountData({ ...newAccountData, email: e.target.value })
                          }
                          placeholder="Enter email address"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  label="Add Bank Details"
                  checked={showBankDetails}
                  onChange={() => setShowBankDetails(!showBankDetails)}
                />
              </Form.Group>

              {showBankDetails && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={newAccountData.bankAccountNumber}
                      onChange={(e) =>
                        setNewAccountData({
                          ...newAccountData,
                          bankAccountNumber: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>IFSC Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={newAccountData.bankIFSC}
                      onChange={(e) =>
                        setNewAccountData({
                          ...newAccountData,
                          bankIFSC: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bank Name & Branch</Form.Label>
                    <Form.Control
                      type="text"
                      value={newAccountData.bankNameBranch}
                      onChange={(e) =>
                        setNewAccountData({
                          ...newAccountData,
                          bankNameBranch: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: "#53b2a5",
                border: "none",
                padding: "8px 16px",
              }}
              onClick={handleSaveAccount}
              disabled={isAccountSubmitting || !newAccountData.subgroup || !newAccountData.name}
            >
              {isAccountSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* Add Parent Account Modal */}
      <Modal
        show={showAddParentModal}
        onHide={() => setShowAddParentModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Add Parent Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Main Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="mainCategory"
                    value={parentAccountForm.mainCategory}
                    onChange={handleParentAccountInputChange}
                  >
                    <option value="">Select Main Type</option>
                    <option value="assets">Assets</option>
                    <option value="liabilities">Liabilities</option>
                    <option value="income">Income</option>
                    <option value="expenses">Expenses</option>
                    <option value="equity">Equity</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Subgroup Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="subgroupName"
                    value={parentAccountForm.subgroupName}
                    onChange={handleParentAccountInputChange}
                    placeholder="Enter subgroup name (e.g., Fixed Assets)"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowAddParentModal(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none" }}
            onClick={handleSaveParentAccount}
            disabled={isSubmitting || !parentAccountForm.mainCategory || !parentAccountForm.subgroupName}
          >
            {isSubmitting ? 'Adding...' : 'Add Subgroup'}
          </Button>
        </Modal.Footer>
      </Modal>


      {/* add account deail */}
        <Modal
        show={showAddParentModal}
        onHide={() => setShowAddParentModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Add Sub of Subgroup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Account Name</Form.Label>
                  <Form.Control
                    as="select"
                    name="mainCategory"
                    value={parentAccountForm.mainCategory}
                    onChange={handleParentAccountInputChange}
                  >
                    <option value="">Enter account name</option>
                    <option value="assets">Assets</option>
                    <option value="liabilities">Liabilities</option>
                    <option value="income">Income</option>
                    <option value="expenses">Expenses</option>
                    <option value="equity">Equity</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Subgroup </Form.Label>
                  <Form.Control
                    type="text"
                    name="subgroupName"
                    value={parentAccountForm.subgroupName}
                    onChange={handleParentAccountInputChange}
                    placeholder="Total"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowAddParentModal(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none" }}
            onClick={handleSaveParentAccount}
            disabled={isSubmitting || !parentAccountForm.mainCategory || !parentAccountForm.subgroupName}
          >
            {isSubmitting ? 'cancel' : 'Add Account'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewAccountModal;