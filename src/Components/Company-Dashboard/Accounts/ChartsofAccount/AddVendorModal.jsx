import React, { useState } from "react";
import { 
  FaUserTie, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaIdCard, 
  FaFileAlt, 
  FaCreditCard, 
  FaCalendarAlt,
  FaUniversity,
  FaGlobeAmericas,
  FaPhone,
  FaEnvelope,
  FaShippingFast,
  FaSave,
  FaTimes
} from "react-icons/fa";

const AddVendorModal = ({ show, onHide, onSave, vendorFormData, setVendorFormData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResponse = {
        status: true,
        message: "Vendor saved successfully",
        data: {
          id: Date.now().toString(),
          ...vendorFormData,
          account_type: 'Sundry Creditors',
          balance_type: 'Credit',
          created_at: new Date().toISOString()
        }
      };
      
      onSave(mockResponse);
      
      setVendorFormData({
        name: '',
        nameArabic: '',
        companyName: '',
        companyLocation: '',
        accountName: '',
        accountBalance: '0.00',
        creationDate: '',
        bankAccountNumber: '',
        bankIFSC: '',
        bankName: '',
        country: '',
        state: '',
        pincode: '',
        address: '',
        stateCode: '',
        shippingAddress: '',
        phone: '',
        email: '',
        creditPeriod: '',
        gstEnabled: false,
        gstin: '',
        idCardImage: null,
        extraFile: null,
      });
      
      onHide();
      
    } catch (error) {
      console.error('Error saving vendor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onHide}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <FaUserTie className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Add New Vendor</h2>
                  <p className="text-teal-100 text-sm">Create a new vendor account</p>
                </div>
              </div>
              <button
                onClick={onHide}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
              >
                <FaTimes className="text-white text-lg" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex overflow-x-auto">
              {[
                { id: "basic", label: "Basic Info", icon: FaUserTie },
                { id: "company", label: "Company Details", icon: FaBuilding },
                { id: "account", label: "Account Info", icon: FaCreditCard },
                { id: "bank", label: "Bank Details", icon: FaUniversity },
                { id: "address", label: "Address", icon: FaMapMarkerAlt },
                { id: "contact", label: "Contact", icon: FaPhone },
                { id: "documents", label: "Documents", icon: FaFileAlt },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeSection === tab.id
                      ? "border-teal-500 text-teal-600 bg-white"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="text-sm" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[60vh] p-6">
            <form className="space-y-6">
              {/* Basic Information */}
              {activeSection === "basic" && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaUserTie className="text-teal-500" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name (English) *
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.name}
                        onChange={(e) => {
                          const value = e.target.value;
                          setVendorFormData({
                            ...vendorFormData,
                            name: value,
                            accountName:
                              vendorFormData.name === vendorFormData.accountName || !vendorFormData.accountName
                                ? value
                                : vendorFormData.accountName,
                          });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="Enter vendor name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name (Arabic)
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.nameArabic}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            nameArabic: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="اسم البائع"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.companyName}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            companyName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="Enter company name"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Company Details */}
              {activeSection === "company" && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaBuilding className="text-teal-500" />
                    Company Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Location
                      </label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={vendorFormData.companyLocation}
                          onChange={(e) =>
                            setVendorFormData({
                              ...vendorFormData,
                              companyLocation: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                          placeholder="Add location"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaIdCard className="inline mr-1 text-gray-400" />
                          ID Card
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setVendorFormData({
                              ...vendorFormData,
                              idCardImage: e.target.files[0],
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaFileAlt className="inline mr-1 text-gray-400" />
                          Other File
                        </label>
                        <input
                          type="file"
                          onChange={(e) =>
                            setVendorFormData({
                              ...vendorFormData,
                              extraFile: e.target.files[0],
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Information */}
              {activeSection === "account" && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaCreditCard className="text-teal-500" />
                    Account Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Type
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value="Sundry Creditors"
                          disabled
                          className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-600"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Auto</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Balance Type
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value="Credit"
                          disabled
                          className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-600"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Auto</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Name
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.accountName}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            accountName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="Account name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Balance
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          step="0.01"
                          value={vendorFormData.accountBalance}
                          onChange={(e) => {
                            const value = e.target.value;
                            setVendorFormData({
                              ...vendorFormData,
                              accountBalance: value || "0.00",
                            });
                          }}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaCalendarAlt className="inline mr-1 text-gray-400" />
                        Creation Date
                      </label>
                      <input
                        type="date"
                        value={vendorFormData.creationDate}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            creationDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Credit Period (days)
                      </label>
                      <input
                        type="number"
                        value={vendorFormData.creditPeriod}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            creditPeriod: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Details */}
              {activeSection === "bank" && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaUniversity className="text-teal-500" />
                    Bank Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.bankAccountNumber}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            bankAccountNumber: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="Enter account number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank IFSC Code
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.bankIFSC}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            bankIFSC: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="IFSC code"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Name & Branch
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.bankName}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            bankName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="Bank name and branch details"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Address Information */}
              {activeSection === "address" && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-teal-500" />
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaGlobeAmericas className="inline mr-1 text-gray-400" />
                        Country
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.country}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            country: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="Country"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.state}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            state: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="State"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.pincode}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            pincode: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="Postal code"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State Code
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.stateCode}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            stateCode: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="State code"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.address}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            address: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="Full address"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaShippingFast className="inline mr-1 text-gray-400" />
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        value={vendorFormData.shippingAddress}
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            shippingAddress: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                        placeholder="Shipping address (if different)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              {activeSection === "contact" && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaPhone className="text-teal-500" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={vendorFormData.phone}
                          onChange={(e) =>
                            setVendorFormData({
                              ...vendorFormData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                          placeholder="Phone number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={vendorFormData.email}
                          onChange={(e) =>
                            setVendorFormData({
                              ...vendorFormData,
                              email: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* GST Section */}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        GST Information
                      </label>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${vendorFormData.gstEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                          {vendorFormData.gstEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={vendorFormData.gstEnabled}
                            onChange={(e) =>
                              setVendorFormData({
                                ...vendorFormData,
                                gstEnabled: e.target.checked,
                                gstin: e.target.checked ? vendorFormData.gstin : "",
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    {vendorFormData.gstEnabled && (
                      <div className="animate-fade-in">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GSTIN Number
                        </label>
                        <input
                          type="text"
                          value={vendorFormData.gstin}
                          onChange={(e) =>
                            setVendorFormData({
                              ...vendorFormData,
                              gstin: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                          placeholder="GSTIN number"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Documents */}
              {activeSection === "documents" && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaFileAlt className="text-teal-500" />
                    Document Upload
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 transition-all duration-200">
                      <FaIdCard className="mx-auto text-3xl text-gray-400 mb-3" />
                      <h4 className="font-medium text-gray-700 mb-2">ID Card Image</h4>
                      <p className="text-sm text-gray-500 mb-4">Upload vendor's identification card</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            idCardImage: e.target.files[0],
                          })
                        }
                        className="hidden"
                        id="idCardInput"
                      />
                      <label
                        htmlFor="idCardInput"
                        className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer"
                      >
                        Choose File
                      </label>
                      {vendorFormData.idCardImage && (
                        <p className="text-sm text-green-600 mt-2">
                          Selected: {vendorFormData.idCardImage.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 transition-all duration-200">
                      <FaFileAlt className="mx-auto text-3xl text-gray-400 mb-3" />
                      <h4 className="font-medium text-gray-700 mb-2">Additional Documents</h4>
                      <p className="text-sm text-gray-500 mb-4">Upload any other relevant files</p>
                      <input
                        type="file"
                        onChange={(e) =>
                          setVendorFormData({
                            ...vendorFormData,
                            extraFile: e.target.files[0],
                          })
                        }
                        className="hidden"
                        id="extraFileInput"
                      />
                      <label
                        htmlFor="extraFileInput"
                        className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer"
                      >
                        Choose File
                      </label>
                      {vendorFormData.extraFile && (
                        <p className="text-sm text-green-600 mt-2">
                          Selected: {vendorFormData.extraFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                Step {["basic", "company", "account", "bank", "address", "contact", "documents"].indexOf(activeSection) + 1} of 7
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={onHide}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                >
                  <FaSave />
                  {isSubmitting ? 'Saving...' : 'Save Vendor'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddVendorModal;