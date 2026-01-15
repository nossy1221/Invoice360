import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaUserPlus, 
  FaUserFriends, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaFileInvoice,
  FaSearch,
  FaFilter,
  FaPlus,
  FaMoneyBillWave,
  FaChartLine,
  FaUniversity,
  FaHandHoldingUsd
} from "react-icons/fa";

// Mock data for accounts (same as before)
const mockAccountData = [
  {
    type: "Assets",
    rows: [
      { name: "Cash-in-hand", bal: "5000.00", id: "1", has_bank_details: false },
      { name: "Bank A/Cs", bal: "25000.00", id: "2", has_bank_details: true, account_number: "1234567890", ifsc_code: "HDFC0000123", bank_name_branch: "HDFC Bank, Main Branch" },
      { name: "Sundry Debtors", bal: "15000.00", id: "3", has_bank_details: false },
      { name: "Fixed Assets", bal: "100000.00", id: "4", has_bank_details: false },
    ]
  },
  {
    type: "Liabilities",
    rows: [
      { name: "Sundry Creditors", bal: "12000.00", id: "5", has_bank_details: false },
      { name: "Loans (Liability)", bal: "50000.00", id: "6", has_bank_details: false },
    ]
  },
  {
    type: "Income",
    rows: [
      { name: "Sales A/C", bal: "75000.00", id: "7", has_bank_details: false },
      { name: "Misc. Income", bal: "5000.00", id: "8", has_bank_details: false },
    ]
  },
  {
    type: "Expenses",
    rows: [
      { name: "Direct Expenses", bal: "20000.00", id: "9", has_bank_details: false },
      { name: "Indirect Expenses", bal: "15000.00", id: "10", has_bank_details: false },
    ]
  }
];

// Mock API (same as before)
const api = {
  get: async (url) => {
    if (url === "/accounts/parents") {
      return Promise.resolve({
        data: [
          { _id: "1", name: "Assets" },
          { _id: "2", name: "Liabilities" },
          { _id: "3", name: "Equity" },
          { _id: "4", name: "Income" },
          { _id: "5", name: "Expenses" },
        ],
      });
    }
    return Promise.resolve({ data: [] });
  },
  post: async (url, data) => {
    console.log("Mock API POST to", url, "with data:", data);
    return Promise.resolve({ data: { _id: Date.now().toString(), ...data } });
  },
};

const AllAccounts = () => {
  const navigate = useNavigate();
  
  // Define parent-to-children mapping
  const [parentToChildren, setParentToChildren] = useState({
    "Assets": ["Cash-in-hand", "Bank A/Cs", "Sundry Debtors", "Current Assets", "Fixed Assets", "Investments", "Bank OD A/C", "Deposits (Assets)"],
    "Liabilities": ["Sundry Creditors", "Current Liabilities", "Loans (Liability)", "Loans & Advances", "Provisions"],
    "Income": ["Purchases A/C", "Purchases Return", "Sales A/C", "Sales Return", "Misc. Income"],
    "Expenses": ["Capital A/C", "Direct Expenses", "Indirect Expenses", "Misc. Expenses"]
  });
  
  // State declarations
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [showAddParentModal, setShowAddParentModal] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [accountType, setAccountType] = useState("Sundry Creditors");
  const [isTaxEnabled, setIsTaxEnabled] = useState(true);
  const [taxNumber, setTaxNumber] = useState("TAX123456");
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [parentAccounts, setParentAccounts] = useState([]);
  const [loadingParentAccounts, setLoadingParentAccounts] = useState(false);
  const [accountData, setAccountData] = useState(mockAccountData);
  const [filterName, setFilterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [actionModal, setActionModal] = useState({
    show: false,
    mode: null,
  });

  // Form states (simplified for demo)
  const [vendorFormData, setVendorFormData] = useState({
    name: "",
    accountType: "Sundry Creditors",
  });
  
  const [customerFormData, setCustomerFormData] = useState({
    name: "",
    accountType: "Sundry Debtors",
  });

  const [newAccountData, setNewAccountData] = useState({
    type: "",
    subgroup: "", 
    name: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankNameBranch: "",
    parentId: "",
    balance: "0.00",
  });

  useEffect(() => {
    const fetchParentAccounts = async () => {
      setLoadingParentAccounts(true);
      try {
        const response = await api.get("/accounts/parents");
        setParentAccounts(response.data);
      } catch (error) {
        console.error("Failed to fetch parent accounts:", error);
      } finally {
        setLoadingParentAccounts(false);
      }
    };

    fetchParentAccounts();
  }, []);

  // Handlers (same as before)
  const handleSaveVendor = () => {
    console.log("Vendor Saved:", vendorFormData);
    setShowVendorModal(false);
  };
  
  const handleSaveCustomer = () => {
    console.log("Customer Saved:", customerFormData);
    setShowCustomerModal(false);
  };

  const handleSaveNewAccount = async () => {
    try {
      await api.post("/accounts", newAccountData);
      setShowNewAccountModal(false);
    } catch (error) {
      console.error("Failed to save new account:", error);
    }
  };

  const handleAddNewParent = () => {
    if (!selectedMainCategory) {
      alert("Please select a main category");
      return;
    }
  
    setParentToChildren((prev) => {
      const updated = { ...prev };
      if (!updated[selectedMainCategory]) {
        updated[selectedMainCategory] = [selectedMainCategory];
      }
      return updated;
    });
  
    setNewAccountData((prev) => ({
      ...prev,
      parentType: selectedMainCategory,
    }));
  
    setSelectedMainCategory("");
    setShowAddParentModal(false);
  };

  const handleViewAccount = (type, name) => {
    setSelectedAccount({ type, name });
    setActionModal({ show: true, mode: 'view' });
  };
  
  const handleEditAccount = (type, name) => {
    const accountGroup = accountData.find((acc) => acc.type === type);
    const row = accountGroup?.rows.find((r) => r.name === name);

    setSelectedAccount({
      type,
      name,
      balance: row ? parseFloat(row.bal) : 0,
    });
    setActionModal({ show: true, mode: 'edit' });
  };
  
  const handleDeleteAccount = (type, name) => {
    setSelectedAccount({ type, name });
    setActionModal({ show: true, mode: 'delete' });
  };
  
  const handleViewLedger = (type, name) => {
    navigate("/company/ledgerpageaccount", {
      state: { accountName: name, accountType: type },
    });
  };

  const handleSaveEditedAccount = (updatedAccount) => {
    console.log("Account updated:", updatedAccount);
    setActionModal({ show: false, mode: null });
  };

  const handleDeleteConfirmed = () => {
    console.log("Account deleted:", selectedAccount);
    setActionModal({ show: false, mode: null });
  };

  // Filter account data
  const filteredAccountData = accountData.filter((accountGroup) => {
    const typeMatches = accountGroup.type
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const nameMatches = accountGroup.rows.some((row) =>
      row.name.trim().toLowerCase().includes(filterName.toLowerCase())
    );
    return typeMatches || nameMatches;
  });

  // Calculate total balance
  const calculateTotalBalance = (accountGroup) => {
    return accountGroup.rows
      .filter((row) => row.name.trim() !== "")
      .reduce((total, row) => {
        const bal = parseFloat(row.bal) || 0;
        return total + bal;
      }, 0);
  };

  // Get account type icon
  const getAccountTypeIcon = (type) => {
    switch (type) {
      case "Assets":
        return <FaMoneyBillWave className="text-green-500" />;
      case "Liabilities":
        return <FaHandHoldingUsd className="text-red-500" />;
      case "Income":
        return <FaChartLine className="text-blue-500" />;
      case "Expenses":
        return <FaUniversity className="text-orange-500" />;
      default:
        return <FaMoneyBillWave className="text-gray-500" />;
    }
  };

  // Get account type color
  const getAccountTypeColor = (type) => {
    switch (type) {
      case "Assets":
        return "bg-green-50 border-green-200";
      case "Liabilities":
        return "bg-red-50 border-red-200";
      case "Income":
        return "bg-blue-50 border-blue-200";
      case "Expenses":
        return "bg-orange-50 border-orange-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              All Accounts
            </h1>
            <p className="text-gray-600">Manage your financial accounts and track balances</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setShowNewAccountModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700   text-sm px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaPlus className="text-lg" />
              Add New Account
            </button>
            
            <button
              onClick={() => setShowVendorModal(true)}
              className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700  px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaUserPlus className="text-lg" />
              Add Vendor
            </button>
            
            <button
              onClick={() => setShowCustomerModal(true)}
              className="flex items-center gap-2 text-sm bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700  px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaUserFriends className="text-lg" />
              Add Customer
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {accountData.map((accountGroup, index) => {
            const total = calculateTotalBalance(accountGroup);
            return (
              <div 
                key={accountGroup.type}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-teal-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getAccountTypeColor(accountGroup.type).replace('bg-', 'bg-').replace('border-', 'border-')}`}>
                    {getAccountTypeIcon(accountGroup.type)}
                  </div>
                  <span className="text-2xl font-bold text-gray-800">
                    R{total.toLocaleString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  {accountGroup.type}
                </h3>
                <p className="text-gray-500 text-sm">
                  {accountGroup.rows.length} accounts
                </p>
              </div>
            );
          })}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex flex-col lg:flex-row lg:items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Accounts
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by account name or type..."
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                />
              </div>
            </div>
            
            <button
              onClick={() => setFilterName("")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Account Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Account Name
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAccountData.length > 0 ? (
                  filteredAccountData.map((accountGroup) => {
                    const totalBalance = calculateTotalBalance(accountGroup);
                    return (
                      <React.Fragment key={accountGroup.type}>
                        {/* Group Header */}
                        <tr className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <td colSpan="4" className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getAccountTypeColor(accountGroup.type)}`}>
                                {getAccountTypeIcon(accountGroup.type)}
                              </div>
                              <h3 className="text-lg font-bold text-gray-800">
                                {accountGroup.type}
                              </h3>
                              <span className="text-sm text-gray-500 ml-2">
                                ({accountGroup.rows.length} accounts)
                              </span>
                            </div>
                          </td>
                        </tr>
                        
                        {/* Account Rows */}
                        {accountGroup.rows
                          .filter((row) => row.name.trim() !== "")
                          .map((row, index) => (
                            <tr 
                              key={`${accountGroup.type}-${index}`}
                              className="hover:bg-blue-50 transition-all duration-200 group"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-8 rounded-full ${
                                    accountGroup.type === "Assets" ? "bg-green-500" :
                                    accountGroup.type === "Liabilities" ? "bg-red-500" :
                                    accountGroup.type === "Income" ? "bg-blue-500" : "bg-orange-500"
                                  }`}></div>
                                  <span className="text-sm font-medium text-gray-700">
                                    {accountGroup.type}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                                    <FaMoneyBillWave className="text-teal-600 text-sm" />
                                  </div>
                                  <span className="font-medium text-gray-800">
                                    {row.name}
                                  </span>
                                  {row.has_bank_details && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                      Bank Account
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span className={`text-lg font-bold ${
                                  parseFloat(row.bal) >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  R{parseFloat(row.bal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                  <button
                                    onClick={() => handleViewAccount(accountGroup.type, row.name)}
                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 transform hover:scale-110"
                                    title="View"
                                  >
                                    <FaEye />
                                  </button>
                                  <button
                                    onClick={() => handleEditAccount(accountGroup.type, row.name)}
                                    className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-all duration-200 transform hover:scale-110"
                                    title="Edit"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAccount(accountGroup.type, row.name)}
                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 transform hover:scale-110"
                                    title="Delete"
                                  >
                                    <FaTrash />
                                  </button>
                                  <button
                                    onClick={() => handleViewLedger(accountGroup.type, row.name)}
                                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700  rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                                  >
                                    <FaFileInvoice />
                                    Ledger
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        
                        {/* Total Row */}
                        {totalBalance !== 0 && (
                          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 font-semibold">
                            <td colSpan="2" className="px-6 py-4 text-right">
                              Total {accountGroup.type} Balance:
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`text-lg font-bold ${
                                totalBalance >= 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                R{Math.abs(totalBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                {totalBalance < 0 && ' (CR)'}
                              </span>
                            </td>
                            <td></td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FaSearch className="text-4xl mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No accounts found</p>
                        <p className="text-sm mt-1">Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
            📊 Accounts Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Assets
              </h4>
              <p className="text-gray-600 text-sm">
                Resources owned by the business that provide future economic benefits
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Liabilities
              </h4>
              <p className="text-gray-600 text-sm">
                Obligations and debts owed to creditors and other parties
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Income & Expenses
              </h4>
              <p className="text-gray-600 text-sm">
                Track revenue generation and operational costs for better financial management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Modals (Placeholder) */}
      {showVendorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-scale-in">
            <h3 className="text-xl font-bold mb-4">Add Vendor</h3>
            <input
              type="text"
              placeholder="Vendor Name"
              className="w-full p-3 border border-gray-300 rounded-xl mb-4"
              value={vendorFormData.name}
              onChange={(e) => setVendorFormData({...vendorFormData, name: e.target.value})}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowVendorModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVendor}
                className="flex-1 px-4 py-3 bg-teal-500  rounded-xl hover:bg-teal-600 transition-colors"
              >
                Save Vendor
              </button>
            </div>
          </div>
        </div>
      )}

      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-scale-in">
            <h3 className="text-xl font-bold mb-4">Add Customer</h3>
            <input
              type="text"
              placeholder="Customer Name"
              className="w-full p-3 border border-gray-300 rounded-xl mb-4"
              value={customerFormData.name}
              onChange={(e) => setCustomerFormData({...customerFormData, name: e.target.value})}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowCustomerModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCustomer}
                className="flex-1 px-4 py-3 bg-teal-500  rounded-xl hover:bg-teal-600 transition-colors"
              >
                Save Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AllAccounts;