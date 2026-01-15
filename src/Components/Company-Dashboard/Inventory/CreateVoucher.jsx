// 📄 File Name: CreateVoucher.js
import React, { useState, useRef } from "react";
import { Button, Form, Table, Modal, Row, Col } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash, FaSignature, FaCamera, FaTimes } from "react-icons/fa";
import SignatureCanvas from "react-signature-canvas";
import AddProductModal from "./AddProductModal";

// ✅ Constants
const VOUCHER_TYPES = [
  "Expense", "Income", "Contra", "Journal", "Credit Note", "Debit Note",
  "Opening Balance", "Current balance", "Closing balance", "Sales", "Purchase", "Delivery challans"
];
const CUSTOMERS = ["ABC Traders", "XYZ Pvt Ltd", "John Doe Enterprises"];
const VENDORS = [
  "Global Supplies", "House Rent Allowance - HRA", "Al Farwaniya Old-Rent",
  "Al Salam Store-Rent", "Hawally Store-Rent", "Amghara Warehouse-Rent",
  "Home-Rent", "Rent paid", "Shop275-Rent"
];
const ACCOUNTS = [
  { id: "CASH1", name: "Cash Account 1" },
  { id: "CASH2", name: "Cash Account 2" },
  { id: "BANK", name: "Bank Account" },
  { id: "ASSET1", name: "Asset Account 1" },
  { id: "ASSET2", name: "Asset Account 2" },
];
const accountTypeToNames = {
  "Direct Income": ["Sales", "Service Revenue", "Commission Income"],
  "Indirect Income": ["Interest Income", "Dividend Income", "Rent Received"],
  "Asset": ["Cash", "Bank", "Inventory", "Furniture", "Machinery"],
  "Liability": ["Loan", "Creditors", "Outstanding Expenses"],
  "Equity": ["Capital", "Retained Earnings"],
};

// ✅ Initial Form Data
const initialFormData = {
  date: new Date().toISOString().split('T')[0],
  partyName: "",
  customerVendor: "",
  voucherNo: "INV0001",
  receiptNo: "",
  paymentMode: "",
  items: [{ description: "", rate: 0, quantity: 1, amount: 0 }],
  note: "",
  reference: "",
  billNo: "",
  signature: null,
  photo: null,
  partyEmail: "",
  partyAddress: "",
  partyPhone: "",
  customerEmail: "",
  customerAddress: "",
  customerPhone: "",
  logo: null,
  attachments: [],
  isGST: false,
  gstRate: 18,
  isTax: false,
  taxRate: 5,
  discount: 0,
  discountAccount: "",
  companyName: "Your Company Name",
  fromAccount: "",
  toAccount: "",
  accountType: "",
  accountName: "",
  accountNameSearch: "",
  currentBalance: 0,
  closingBalance: 0,
  openingBalance: 0,
  deliveryAddress: "",
  transferAmount: 0,
};

// ✅ CreateVoucherModal (unchanged)
const CreateVoucherModal = ({ show, onHide, onSave, editData }) => {
  const [voucherType, setVoucherType] = useState(editData?.voucherType || "Receipt");
  const [formData, setFormData] = useState(editData || initialFormData);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const sigCanvas = useRef(null);
  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const attachmentInputRef = useRef(null);
  const pdfRef = useRef();
  const [printLanguage, setPrintLanguage] = useState("both");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showUOMModal, setShowUOMModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    "Electronics", "Furniture", "Apparel", "Food", "Books",
    "Automotive", "Medical", "Software", "Stationery", "Other",
  ]);
  const [newItem, setNewItem] = useState({
    name: '', category: '', hsn: '', tax: 0, sellingPrice: 0, uom: 'PCS'
  });

  React.useEffect(() => {
    if (editData) {
      setVoucherType(editData.voucherType);
      setFormData(editData);
    } else {
      setVoucherType("Receipt");
      setFormData(initialFormData);
    }
  }, [editData, show]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === 'rate' || field === 'quantity' ? (parseFloat(value) || 0) : value;
    if (field === 'rate' || field === 'quantity') {
      newItems[index].amount = newItems[index].rate * newItems[index].quantity;
    }
    setFormData({ ...formData, items: newItems });
  };

  const addNewItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", rate: 0, quantity: 1, amount: 0 }]
    });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'sellingPrice' || name === 'tax' ? parseFloat(value) || 0 : value
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const toggleGST = () => setFormData(prev => ({ ...prev, isGST: !prev.isGST }));
  const toggleTax = () => setFormData(prev => ({ ...prev, isTax: !prev.isTax }));

  const calculateSubtotal = () => {
    let subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0);
    if ((voucherType === "Expense" || voucherType === "Income") && formData.discount > 0) {
      subtotal -= (subtotal * formData.discount) / 100;
    }
    return subtotal;
  };

  const calculateGST = () => {
    const subtotal = calculateSubtotal();
    return formData.isGST && formData.gstRate ? (subtotal * formData.gstRate) / 100 : 0;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return formData.isTax && formData.taxRate ? (subtotal * formData.taxRate) / 100 : 0;
  };

  const totals = {
    subtotal: calculateSubtotal(),
    gst: calculateGST(),
    tax: calculateTax(),
    total: calculateSubtotal() + calculateGST() + calculateTax()
  };

  const handleSubmit = () => {
    if (!voucherType) return;
    if (voucherType === "Contra") {
      if (!formData.fromAccount || !formData.toAccount || !formData.transferAmount || formData.transferAmount <= 0) {
        alert("Please fill From Account, To Account, and Transfer Amount.");
        return;
      }
    }
    if (voucherType === "Current balance") {
      if (!formData.accountType || !formData.accountName || formData.currentBalance <= 0) {
        alert("Please fill Account Type, Account Name, and Current Balance.");
        return;
      }
    }
    if (voucherType === "Closing balance") {
      if (!formData.accountType || !formData.accountName || formData.closingBalance <= 0) {
        alert("Please fill Account Type, Account Name, and Closing Balance.");
        return;
      }
    }
    if (voucherType === "Opening Balance") {
      if (!formData.accountType || !formData.accountName || formData.openingBalance <= 0) {
        alert("Please fill Account Type, Account Name, and Opening Balance.");
        return;
      }
    }

    const finalData = {
      voucherType,
      ...formData,
      subtotal: totals.subtotal,
      gstAmount: totals.gst,
      taxAmount: totals.tax,
      total: totals.total,
      status: "Pending"
    };
    onSave(finalData);
    setFormData(initialFormData);
    setVoucherType("Receipt");
    onHide();
  };

  const handleSaveSignature = () => {
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      setFormData({ ...formData, signature: signatureData });
      setShowSignatureModal(false);
    }
  };

  const handleClearSignature = () => {
    if (sigCanvas.current) sigCanvas.current.clear();
  };

  const handlePhotoUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, [field]: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (field) => {
    setFormData({ ...formData, [field]: null });
    if (field === 'logo' && logoInputRef.current) logoInputRef.current.value = "";
    else if (field === 'photo' && fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveAttachment = (index) => {
    const updated = formData.attachments.filter((_, i) => i !== index);
    setFormData({ ...formData, attachments: updated });
    if (attachmentInputRef.current && updated.length === 0) attachmentInputRef.current.value = "";
  };

  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const readerPromises = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ name: file.name, type: file.type, data: reader.result });
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readerPromises).then(newAttachments => {
      setFormData({ ...formData, attachments: [...formData.attachments, ...newAttachments] });
    });
  };

  const getHeaderTitle = () => {
    switch (voucherType) {
      case "Purchase": return "PURCHASE BILL";
      case "Expense": return "EXPENSE VOUCHER";
      case "Income": return "INCOME VOUCHER";
      case "Contra": return "CONTRA VOUCHER";
      default: return "VOUCHER";
    }
  };

  const getFromLabel = () => {
    switch (voucherType) {
      case "Expense": return "Paid From (Cash/Bank)";
      case "Income": return "Received Into (Cash/Bank)";
      case "Contra": return "From Account";
      default: return "From";
    }
  };

  const getToLabel = () => {
    switch (voucherType) {
      case "Expense": return "Paid To (Vendor)";
      case "Income": return "Received From (Customer)";
      case "Contra": return "To Account";
      default: return "To";
    }
  };

  const renderFromField = () => {
    if (voucherType === "Contra") {
      return (
        <Form.Select name="fromAccount" value={formData.fromAccount} onChange={handleChange}>
          <option value="">Select From Account</option>
          {ACCOUNTS.map(acc => <option key={acc.id} value={acc.name}>{acc.name}</option>)}
        </Form.Select>
      );
    }
    if (voucherType === "Receipt") {
      return (
        <Form.Select name="partyName" value={formData.partyName} onChange={handleChange}>
          <option value="">Select Customer</option>
          {CUSTOMERS.map(name => <option key={name} value={name}>{name}</option>)}
        </Form.Select>
      );
    }
    if (["Expense", "Income"].includes(voucherType)) {
      return (
        <Form.Select name="fromAccount" value={formData.fromAccount} onChange={handleChange}>
          <option value="">Select Account</option>
          {ACCOUNTS.map(acc => <option key={acc.id} value={acc.name}>{acc.name}</option>)}
        </Form.Select>
      );
    }
    return (
      <>
        <Form.Control name="partyName" value={formData.partyName} onChange={handleChange} placeholder="Company Name" />
        <Form.Control name="partyEmail" value={formData.partyEmail} onChange={handleChange} placeholder="Email" className="mt-2" />
        <Form.Control name="partyAddress" value={formData.partyAddress} onChange={handleChange} placeholder="Address" className="mt-2" />
        <Form.Control name="partyPhone" value={formData.partyPhone} onChange={handleChange} placeholder="Phone" className="mt-2" />
      </>
    );
  };

  const renderToField = () => {
    if (voucherType === "Contra") {
      return (
        <Form.Select name="toAccount" value={formData.toAccount} onChange={handleChange}>
          <option value="">Select To Account</option>
          {ACCOUNTS.map(acc => <option key={acc.id} value={acc.name}>{acc.name}</option>)}
        </Form.Select>
      );
    }
    if (["Expense"].includes(voucherType)) {
      return (
        <Form.Select name="customerVendor" value={formData.customerVendor} onChange={handleChange}>
          <option value="">Select Vendor</option>
          {VENDORS.map(name => <option key={name} value={name}>{name}</option>)}
        </Form.Select>
      );
    }
    if (voucherType === "Income") {
      return (
        <Form.Select name="customerVendor" value={formData.customerVendor} onChange={handleChange}>
          <option value="">Select Customer</option>
          {CUSTOMERS.map(name => <option key={name} value={name}>{name}</option>)}
        </Form.Select>
      );
    }
    return <Form.Control name="customerVendor" value={formData.customerVendor} onChange={handleChange} placeholder="Name" />;
  };

  const printLabels = {
    en: {
      salesInvoice: "SALES INVOICE",
      receipt: "RECEIPT",
      purchaseBill: "PURCHASE BILL",
      payment: "PAYMENT",
      expenseVoucher: "EXPENSE VOUCHER",
      incomeVoucher: "INCOME VOUCHER",
      contraVoucher: "CONTRA VOUCHER",
      journalVoucher: "JOURNAL VOUCHER",
      creditNote: "CREDIT NOTE",
      debitNote: "DEBIT NOTE",
      stockAdjustment: "STOCK/INVENTORY ADJUSTMENT",
      openingBalance: "OPENING BALANCE",
      from: "From",
      to: "To",
      voucherNo: "Voucher No",
      receiptNo: "Receipt No",
      date: "Date",
      product: "Product",
      rate: "Rate",
      qty: "Qty",
      amount: "Amount",
      subtotal: "Subtotal",
      gst: "GST",
      tax: "Tax",
      total: "Total",
      notes: "Notes",
      signature: "Signature",
      photo: "Photo",
      attachments: "Attachments",
      transferAmount: "Transfer Amount",
      receivedFrom: "Received From (Customer)",
      purchasedFrom: "Purchased From (Vendor)",
      paidTo: "Paid To (Vendor)",
      soldTo: "Sold To (Customer)",
      fromAccount: "From Account",
      toAccount: "To Account",
      companyName: "Company Name",
      paidFrom: "Paid From",
      // paidTo: "Paid To",
      receivedFrom: "Received From",
      receivedInto: "Received Into"
    },
    ar: {
      salesInvoice: "فاتورة مبيعات",
      receipt: "إيصال",
      purchaseBill: "فاتورة شراء",
      payment: "دفع",
      expenseVoucher: "سند مصروفات",
      incomeVoucher: "سند إيرادات",
      contraVoucher: "سند مقاصة",
      journalVoucher: "سند يومية",
      creditNote: "إشعار دائن",
      debitNote: "إشارة مدين",
      stockAdjustment: "تسوية المخزون",
      openingBalance: "رصيد افتتاحي",
      from: "من",
      to: "إلى",
      voucherNo: "رقم السند",
      receiptNo: "رقم الإيصال",
      date: "التاريخ",
      product: "المنتج",
      rate: "السعر",
      qty: "الكمية",
      amount: "المبلغ",
      subtotal: "المجموع الفرعي",
      gst: "ضريبة القيمة المضافة",
      tax: "ضريبة",
      total: "المجموع",
      notes: "ملاحظات",
      signature: "التوقيع",
      photo: "صورة",
      attachments: "مرفقات",
      transferAmount: "مبلغ التحويل",
      receivedFrom: "مستلم من (العميل)",
      purchasedFrom: "مشترى من (المورد)",
      paidTo: "مدفوع ل (المورد)",
      soldTo: "مباع ل (العميل)",
      fromAccount: "من الحساب",
      toAccount: "إلى الحساب",
      companyName: "اسم الشركة",
      paidFrom: "دفع من",
      // paidTo: "دفع إلى",
      receivedFrom: "مستلم من",
      receivedInto: "تم الاستلام في"
    }
  };

  const handlePrint = () => {
    const printContent = pdfRef.current;
    if (!printContent) {
      alert("No content to print!");
      return;
    }
    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write('<html><head><title>Print Voucher</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
      table { width: 100%; border-collapse: collapse; margin: 20px 0; }
      th, td { border: 1px solid #000; padding: 8px; text-align: left; }
      .text-end { text-align: right; }
      .fw-bold { font-weight: bold; }
      hr { border: 2px solid #28a745; margin: 10px 0; }
      h2, h4, h5 { color: #28a745; }
      img { max-width: 100%; height: auto; }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => printWindow.print();
  };

  const getPrintLabel = (key) => {
    if (printLanguage === "both") {
      return (
        <>
          <div style={{ fontWeight: "bold" }}>{printLabels.ar[key]}</div>
          <div style={{ fontSize: "small", color: "#555" }}>{printLabels.en[key]}</div>
        </>
      );
    }
    return printLabels[printLanguage][key];
  };

  const getPrintHeaderTitle = () => {
    switch (voucherType) {
      case "Purchase": return printLanguage === "both" ? <>{printLabels.ar.purchaseBill}<br />{printLabels.en.purchaseBill}</> : printLabels[printLanguage].purchaseBill;
      case "Expense": return printLanguage === "both" ? <>{printLabels.ar.expenseVoucher}<br />{printLabels.en.expenseVoucher}</> : printLabels[printLanguage].expenseVoucher;
      case "Contra": return printLanguage === "both" ? <>{printLabels.ar.contraVoucher}<br />{printLabels.en.contraVoucher}</> : printLabels[printLanguage].contraVoucher;
      case "Income": return printLanguage === "both" ? <>{printLabels.ar.incomeVoucher}<br />{printLabels.en.incomeVoucher}</> : printLabels[printLanguage].incomeVoucher;
      default: return printLanguage === "both" ? <>سند<br />VOUCHER</> : printLanguage === "ar" ? "سند" : "VOUCHER";
    }
  };

  const getPrintFromLabel = () => {
    switch (voucherType) {
      case "Expense": return getPrintLabel("paidFrom");
      case "Income": return getPrintLabel("receivedInto");
      case "Contra": return getPrintLabel("fromAccount");
      default: return getPrintLabel("from");
    }
  };

  const getPrintToLabel = () => {
    switch (voucherType) {
      case "Expense": return getPrintLabel("paidTo");
      case "Income": return getPrintLabel("receivedFrom");
      case "Contra": return getPrintLabel("toAccount");
      default: return getPrintLabel("to");
    }
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category) {
      alert("Product name and category are required!");
      return;
    }
    const itemToAdd = {
      description: newItem.name,
      rate: parseFloat(newItem.sellingPrice) || 0,
      quantity: 1,
      amount: parseFloat(newItem.sellingPrice) || 0,
      hsn: newItem.hsn,
      tax: parseFloat(newItem.tax) || 0,
      uom: newItem.uom
    };
    setFormData(prev => ({ ...prev, items: [...prev.items, itemToAdd] }));
    setNewItem({ name: '', category: '', hsn: '', tax: 0, sellingPrice: 0, uom: 'PCS' });
    setShowAdd(false);
  };

  const handleUpdateItem = () => setShowEdit(false);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories(prev => [...prev, newCategory.trim()]);
      setNewItem(prev => ({ ...prev, category: newCategory.trim() }));
      setNewCategory('');
    }
    setShowAddCategoryModal(false);
  };

  const renderProductSection = () => (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <h6 className="fw-bold">PRODUCT DETAILS</h6>
        <Button size="sm" onClick={() => setShowAdd(true)} style={{ backgroundColor: "#53b2a5", border: "none", padding: "6px 12px", fontWeight: "500" }}>
          + Add Product
        </Button>
      </div>
      <Table bordered className="mb-3">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>RATE</th>
            <th>QTY</th>
            <th>AMOUNT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {formData.items.map((item, index) => (
            <tr key={index}>
              <td><Form.Control value={item.description} onChange={e => handleItemChange(index, "description", e.target.value)} placeholder="Enter product name" /></td>
              <td><Form.Control type="number" value={item.rate} onChange={e => handleItemChange(index, "rate", parseFloat(e.target.value) || 0)} placeholder="Rate" /></td>
              <td><Form.Control type="number" value={item.quantity} onChange={e => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)} placeholder="Qty" /></td>
              <td>R{item.amount.toFixed(2)}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => removeItem(index)} disabled={formData.items.length <= 1}><FaTimes /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="outline-primary" size="sm" className="mb-4" onClick={addNewItem}>+ Add Item</Button>
    </>
  );

  const renderCustomForm = () => {
    if (voucherType === "Contra") {
      return (
        <div className="border p-4 mb-4 bg-light">
          <h6 className="fw-bold mb-3">Contra Voucher Details</h6>
          <Form.Group className="mb-3"><Form.Label>From Account</Form.Label><Form.Control type="text" name="fromAccount" value={formData.fromAccount} onChange={handleChange} placeholder="Enter account name" /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>To Account</Form.Label><Form.Control type="text" name="toAccount" value={formData.toAccount} onChange={handleChange} placeholder="Enter account name" /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Transfer Amount (R)</Form.Label><Form.Control type="number" name="transferAmount" value={formData.transferAmount} onChange={handleChange} placeholder="Enter amount" min="0" step="0.01" /></Form.Group>
          {renderProductSection()}
        </div>
      );
    }

    if (["Current balance", "Closing balance", "Opening Balance"].includes(voucherType)) {
      const balanceType = voucherType === "Current balance" ? "currentBalance"
        : voucherType === "Closing balance" ? "closingBalance" : "openingBalance";
      const label = voucherType === "Current balance" ? "Current Balance"
        : voucherType === "Closing balance" ? "Closing Balance" : "Opening Balance";

      return (
        <div className="border p-4 mb-4 bg-light">
          <h6 className="fw-bold mb-3">{label} Entry</h6>
          <Form.Group className="mb-3">
            <Form.Label>Account Type *</Form.Label>
            <Form.Select value={formData.accountType} onChange={e => setFormData({ ...formData, accountType: e.target.value })}>
              <option value="">Select Type</option>
              {Object.keys(accountTypeToNames).map(type => <option key={type} value={type}>{type}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 position-relative">
            <Form.Label>Account Name *</Form.Label>
            <Form.Control type="text" placeholder="Search or type account name..." value={formData.accountNameSearch} onChange={e => setFormData({ ...formData, accountNameSearch: e.target.value })} />
            {formData.accountNameSearch && accountTypeToNames[formData.accountType]?.filter(name => name.toLowerCase().includes(formData.accountNameSearch.toLowerCase())).length > 0 && (
              <ul style={{ position: "absolute", top: "100%", left: 0, right: 0, maxHeight: "150px", overflowY: "auto", listStyle: "none", padding: 0, margin: 0, border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "#fff", zIndex: 100 }}>
                {accountTypeToNames[formData.accountType].filter(name => name.toLowerCase().includes(formData.accountNameSearch.toLowerCase())).map(name => (
                  <li key={name} className="list-group-item list-group-item-action" style={{ fontSize: "14px", padding: "6px 12px", cursor: "pointer" }} onClick={() => setFormData({ ...formData, accountName: name, accountNameSearch: name })} onMouseDown={e => e.preventDefault()}>{name}</li>
                ))}
              </ul>
            )}
            <input type="hidden" name="accountName" value={formData.accountName || ""} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{label} (R) *</Form.Label>
            <Form.Control type="number" step="0.01" min="0" value={formData[balanceType]} onChange={e => setFormData({ ...formData, [balanceType]: parseFloat(e.target.value) || 0 })} required />
          </Form.Group>
          {renderProductSection()}
        </div>
      );
    }

    if (voucherType === "Sales") {
      return (
        <div className="border p-4 mb-4 bg-light">
          <h6 className="fw-bold mb-3">Sales Invoice</h6>
          <Form.Group className="mb-3">
            <Form.Label>Customer *</Form.Label>
            <Form.Select name="partyName" value={formData.partyName} onChange={handleChange}>
              <option value="">Select Customer</option>
              {CUSTOMERS.map(name => <option key={name} value={name}>{name}</option>)}
            </Form.Select>
          </Form.Group>
          {renderProductSection()}
        </div>
      );
    }

    return renderProductSection();
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit Voucher" : "Create Voucher"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div ref={pdfRef} style={{ display: 'none' }} dir={printLanguage === "ar" || printLanguage === "both" ? "rtl" : "ltr"}>
              <div className="text-center mb-4">
                {formData.logo && <img src={formData.logo} alt="Logo" style={{ width: '150px', height: '100px', objectFit: 'contain' }} />}
                <h2 style={{ color: '#28a745' }}>{getPrintHeaderTitle()}</h2>
                <hr style={{ border: '2px solid #28a745', margin: '10px 0' }} />
                <h4>{formData.companyName}</h4>
              </div>
              <Row className="mb-5">
                <Col md={6}>
                  <h6 className="fw-bold">{getPrintFromLabel()}</h6>
                  {voucherType === "Contra" ? <p><strong>{formData.fromAccount}</strong></p> : (
                    <>
                      <p><strong>{formData.partyName}</strong></p>
                      {voucherType !== "Sales" && (
                        <>
                          <p>{formData.partyEmail}</p>
                          <p>{formData.partyAddress}</p>
                          <p>{formData.partyPhone}</p>
                        </>
                      )}
                    </>
                  )}
                </Col>
                <Col md={6}>
                  <h6 className="fw-bold">{getPrintToLabel()}</h6>
                  {voucherType === "Contra" ? <p><strong>{formData.toAccount}</strong></p> : (
                    <>
                      <p><strong>{formData.customerVendor}</strong></p>
                      <p>{formData.customerEmail}</p>
                      <p>{formData.customerAddress}</p>
                      <p>{formData.customerPhone}</p>
                    </>
                  )}
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={6}>
                  <p><strong>{getPrintLabel("voucherNo")}:</strong> {formData.voucherNo}</p>
                  {voucherType === "Receipt" && formData.receiptNo && <p><strong>{getPrintLabel("receiptNo")}:</strong> {formData.receiptNo}</p>}
                </Col>
                <Col md={6}>
                  <p><strong>{getPrintLabel("date")}:</strong> {formData.date}</p>
                </Col>
              </Row>
              {voucherType === "Contra" ? (
                <p><strong>{getPrintLabel("transferAmount")}:</strong> R{formData.transferAmount.toFixed(2)}</p>
              ) : (
                <Table bordered className="mb-4">
                  <thead>
                    <tr>
                      <th>{getPrintLabel("product")}</th>
                      <th>{getPrintLabel("rate")}</th>
                      <th>{getPrintLabel("qty")}</th>
                      <th>{getPrintLabel("amount")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.description}</td>
                        <td>R{item.rate.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td>R{item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              {voucherType !== "Contra" && (
                <Row className="mb-4">
                  <Col md={{ span: 4, offset: 8 }}>
                    <Table borderless>
                      <tbody>
                        <tr><td className="fw-bold">{getPrintLabel("subtotal")}</td><td className="text-end">R{totals.subtotal.toFixed(2)}</td></tr>
                        {formData.isGST && <tr><td>{getPrintLabel("gst")} ({formData.gstRate}%)</td><td className="text-end">R{totals.gst.toFixed(2)}</td></tr>}
                        {formData.isTax && <tr><td>{getPrintLabel("tax")} ({formData.taxRate}%)</td><td className="text-end">R{totals.tax.toFixed(2)}</td></tr>}
                        <tr><td className="fw-bold">{getPrintLabel("total")}</td><td className="text-end">R{totals.total.toFixed(2)}</td></tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              )}
              {formData.note && <div className="mb-4"><h6>{getPrintLabel("notes")}:</h6><p>{formData.note}</p></div>}
              {formData.signature && <div className="mb-4"><h6>{getPrintLabel("signature")}:</h6><img src={formData.signature} alt="Signature" style={{ width: "200px", height: "80px" }} /></div>}
              {formData.photo && <div className="mb-4"><h6>{getPrintLabel("photo")}:</h6><img src={formData.photo} alt="Voucher Photo" style={{ width: "300px", height: "auto" }} /></div>}
              {formData.attachments.length > 0 && (
                <div className="mb-4">
                  <h6>{getPrintLabel("attachments")}:</h6>
                  {formData.attachments.map((file, idx) => <div key={idx}><a href={file.data} target="_blank" rel="noreferrer">{file.name}</a></div>)}
                </div>
              )}
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Voucher Type</Form.Label>
              <Form.Select value={voucherType} onChange={e => setVoucherType(e.target.value)}>
                <option value="">Select Type</option>
                {VOUCHER_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter Company Name" />
                </Form.Group>
              </div>
              <div className="text-end">
                {formData.logo ? (
                  <div className="position-relative">
                    <img src={formData.logo} alt="Logo" style={{ width: '150px', height: '100px', objectFit: 'contain' }} className="border p-1" />
                    <Button variant="danger" size="sm" className="position-absolute top-0 end-0 translate-middle" onClick={() => handleRemovePhoto('logo')}><FaTimes /></Button>
                  </div>
                ) : (
                  <div onClick={() => logoInputRef.current.click()} style={{ width: "250px", height: "150px", cursor: "pointer", border: "1px dashed #ccc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span>LOGO</span>
                    <small className="text-muted">Click to upload</small>
                    <input type="file" ref={logoInputRef} onChange={e => handlePhotoUpload(e, 'logo')} accept="image/*" style={{ display: "none" }} />
                  </div>
                )}
              </div>
            </div>
            <Row className="mb-5">
              <Col md={6}>
                <h6 className="fw-bold mb-3 text-dark">{getFromLabel()}</h6>
                {renderFromField()}
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-3 text-dark">{getToLabel()}</h6>
                {renderToField()}
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{voucherType === "Receipt" ? "Receipt Number" : "Voucher Number"}</Form.Label>
                  <Form.Control name="voucherNo" value={formData.voucherNo} onChange={handleChange} placeholder="VOUCH-001" />
                </Form.Group>
                {voucherType === "Receipt" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Voucher Number</Form.Label>
                    <Form.Control name="receiptNo" value={formData.receiptNo} onChange={handleChange} placeholder="VOUCH-001" />
                  </Form.Group>
                )}
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            {renderCustomForm()}
            {voucherType !== "Contra" && (
              <Row className="mb-4">
                <Col md={{ span: 4, offset: 8 }}>
                  <Table borderless>
                    <tbody>
                      <tr><td className="fw-bold">Subtotal</td><td className="text-end">R{totals.subtotal.toFixed(2)}</td></tr>
                      {formData.isGST && <tr><td>GST ({formData.gstRate}%)</td><td className="text-end">R{totals.gst.toFixed(2)}</td></tr>}
                      {formData.isTax && <tr><td>Tax ({formData.taxRate}%)</td><td className="text-end">R{totals.tax.toFixed(2)}</td></tr>}
                      <tr><td className="fw-bold">Total</td><td className="text-end">R{totals.total.toFixed(2)}</td></tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            )}
            <Form.Group className="mb-4">
              <Form.Control as="textarea" rows={3} placeholder="Notes" name="note" value={formData.note} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-4">
              <div className="d-flex align-items-center gap-3">
                {formData.signature ? (
                  <>
                    <div className="border p-2" style={{ width: "200px", height: "80px" }}>
                      <img src={formData.signature} alt="Signature" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={() => setFormData({ ...formData, signature: null })}><FaTimes /> Remove</Button>
                  </>
                ) : (
                  <Button style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5" }} size="sm" onClick={() => setShowSignatureModal(true)}><FaSignature /> Add Signature</Button>
                )}
              </div>
            </Form.Group>
            <h6 className="fw-bold mb-3 border-bottom pb-2">Photos</h6>
            <Form.Group className="mb-4">
              <div className="d-flex align-items-center gap-3 flex-wrap">
                {formData.photo ? (
                  <>
                    <div className="border p-2" style={{ width: "200px", height: "150px" }}>
                      <img src={formData.photo} alt="Attached" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={() => handleRemovePhoto('photo')}><FaTimes /> Remove</Button>
                  </>
                ) : (
                  <Button style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5" }} size="sm" onClick={() => fileInputRef.current.click()}><FaCamera /> Add Photo</Button>
                )}
                <input type="file" ref={fileInputRef} onChange={e => handlePhotoUpload(e, 'photo')} accept="image/*" style={{ display: "none" }} />
              </div>
            </Form.Group>
            <h6 className="fw-bold mb-3 border-bottom pb-2">Reference Documents</h6>
            <Form.Group className="mb-4">
              <div className="d-flex align-items-center gap-3 flex-wrap">
                {formData.attachments && formData.attachments.length > 0 ? (
                  formData.attachments.map((file, index) => (
                    <div key={index} className="border p-2 position-relative" style={{ width: "400px" }}>
                      <div className="d-flex align-items-center">
                        <span className="text-truncate" style={{ maxWidth: "400px" }} title={file.name}>{file.name}</span>
                        <Button variant="danger" size="sm" className="ms-2" onClick={() => handleRemoveAttachment(index)}><FaTimes /></Button>
                      </div>
                      {file.type.startsWith("image/") && (
                        <div className="mt-2">
                          <img src={file.data} alt="attachment" style={{ width: "100%", maxHeight: "100px", objectFit: "cover" }} />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <Button style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5" }} size="sm" onClick={() => attachmentInputRef.current.click()}>📎 Add File</Button>
                )}
                <input type="file" ref={attachmentInputRef} onChange={handleAttachmentUpload} accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" multiple style={{ display: "none" }} />
              </div>
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="d-flex gap-2">
                <Button variant={printLanguage === "en" ? "primary" : "outline-primary"} size="sm" onClick={() => setPrintLanguage("en")}>English</Button>
                <Button variant={printLanguage === "ar" ? "primary" : "outline-primary"} size="sm" onClick={() => setPrintLanguage("ar")}>العربية</Button>
                <Button variant={printLanguage === "both" ? "primary" : "outline-primary"} size="sm" onClick={() => setPrintLanguage("both")}>English + العربية</Button>
              </div>
              <div className="d-flex gap-2">
                <Button variant="outline-secondary" className="rounded-pill" onClick={onHide}>Cancel</Button>
                <Button variant="outline-info" onClick={handlePrint}>🖨️ Print</Button>
                <Button style={{ backgroundColor: "#53b2a5", border: "none", borderRadius: "50px", fontWeight: 600 }} onClick={handleSubmit}>
                  {editData ? "Update Voucher" : "Save Voucher"}
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal show={showSignatureModal} onHide={() => setShowSignatureModal(false)} centered>
          <Modal.Header closeButton><Modal.Title>Add Signature</Modal.Title></Modal.Header>
          <Modal.Body>
            <div className="border" style={{ width: "100%", height: "200px" }}>
              <SignatureCanvas ref={sigCanvas} penColor="black" canvasProps={{ width: "100%", height: "200px" }} />
            </div>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="secondary" onClick={handleClearSignature}>Clear</Button>
              <Button style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5" }} onClick={handleSaveSignature}>Save Signature</Button>
            </div>
          </Modal.Body>
        </Modal>
      </Modal>
      <AddProductModal
        showAdd={showAdd}
        showEdit={showEdit}
        newItem={newItem}
        categories={categories}
        newCategory={newCategory}
        showUOMModal={showUOMModal}
        showAddCategoryModal={showAddCategoryModal}
        setShowAdd={setShowAdd}
        setShowEdit={setShowEdit}
        setShowUOMModal={setShowUOMModal}
        setShowAddCategoryModal={setShowAddCategoryModal}
        setNewCategory={setNewCategory}
        handleChange={handleProductChange}
        handleAddItem={handleAddItem}
        handleUpdateItem={handleUpdateItem}
        handleAddCategory={handleAddCategory}
      />
    </>
  );
};

// VoucherViewModal (unchanged)
const VoucherViewModal = ({ show, onHide, voucher }) => {
  const pdfRef = useRef();
  if (!voucher) return <Modal show={show} onHide={onHide}><Modal.Body>No data</Modal.Body></Modal>;
  const subtotal = voucher.items.reduce((sum, item) => sum + item.amount, 0);
  const adjustedSubtotal = voucher.voucherType === "Expense" && voucher.discount > 0
    ? subtotal - (subtotal * voucher.discount) / 100
    : subtotal;
  const gstAmount = voucher.isGST ? (adjustedSubtotal * voucher.gstRate) / 100 : 0;
  const taxAmount = voucher.isTax ? (adjustedSubtotal * voucher.taxRate) / 100 : 0;
  const total = adjustedSubtotal + gstAmount + taxAmount;
  const handlePrint = () => {
    const printContent = pdfRef.current;
    if (!printContent) return;
    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write('<html><head><title>Print</title><style>');
    printWindow.document.write(`body { font-family: Arial, sans-serif; margin: 20px; } table, img { max-width: 100%; }`);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => printWindow.print();
  };
  return (
    <Modal show={show} onHide={onHide} centered size="xl">
      <Modal.Header closeButton><Modal.Title>Voucher Details</Modal.Title></Modal.Header>
      <Modal.Body>
        <div ref={pdfRef} style={{ display: 'none' }}>
          <h2>{voucher.voucherType}</h2>
          <p><strong>From:</strong> {voucher.partyName || voucher.fromAccount}</p>
          <p><strong>To:</strong> {voucher.customerVendor || voucher.toAccount}</p>
          <p><strong>Voucher No:</strong> {voucher.voucherNo}</p>
          <p><strong>Date:</strong> {voucher.date}</p>
          {voucher.voucherType === "Contra" ? (
            <p><strong>Transfer Amount:</strong> R{voucher.transferAmount.toFixed(2)}</p>
          ) : (
            <Table bordered><tbody>{voucher.items.map((i, idx) => <tr key={idx}><td>{i.description}</td><td>R{i.amount.toFixed(2)}</td></tr>)}</tbody></Table>
          )}
          <p><strong>Total:</strong> R{total.toFixed(2)}</p>
          {voucher.signature && <img src={voucher.signature} alt="sig" style={{ width: "200px" }} />}
        </div>
        <h4 className="fw-bold">{voucher.voucherType}</h4>
        <p><strong>From:</strong> {voucher.partyName || voucher.fromAccount || "N/A"}</p>
        <p><strong>To:</strong> {voucher.customerVendor || voucher.toAccount || "N/A"}</p>
        <p><strong>Voucher No:</strong> {voucher.voucherNo}</p>
        <p><strong>Date:</strong> {voucher.date}</p>
        {voucher.voucherType === "Contra" ? (
          <p><strong>Transfer Amount:</strong> R{voucher.transferAmount.toFixed(2)}</p>
        ) : (
          <Table bordered><tbody>{voucher.items.map((i, idx) => <tr key={idx}><td>{i.description}</td><td>R{i.amount.toFixed(2)}</td></tr>)}</tbody></Table>
        )}
        <p><strong>Total:</strong> R{total.toFixed(2)}</p>
        {voucher.signature && <div><h6>Signature:</h6><img src={voucher.signature} alt="sig" style={{ maxWidth: "200px" }} /></div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-info" onClick={handlePrint}>🖨️ Print</Button>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

// 🔥 Main Component
const CreateVoucher = () => {
  const [showModal, setShowModal] = useState(false);
  const [editVoucher, setEditVoucher] = useState(null);
  const [viewVoucher, setViewVoucher] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  
  // Static voucher data instead of API fetch
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      voucherType: "Expense",
      date: "2023-05-15",
      customerVendor: "Global Supplies",
      voucherNo: "EXP001",
      receiptNo: "",
      items: [
        { description: "Office Supplies", rate: 1500, quantity: 2, amount: 3000 },
        { description: "Printing Paper", rate: 500, quantity: 5, amount: 2500 }
      ],
      note: "Monthly office supplies",
      logo: null,
      signature: null,
      photo: null,
      attachments: [],
      companyName: "Your Company Name",
      total: 5500,
      status: "Pending",
      fromAccount: "Cash Account 1",
      toAccount: "",
      partyName: "",
      partyEmail: "",
      partyAddress: "",
      partyPhone: "",
      customerEmail: "",
      customerAddress: "",
      customerPhone: "",
      isGST: false,
      gstRate: 0,
      isTax: false,
      taxRate: 0,
      discount: 0,
      discountAccount: "",
      transferAmount: 0,
      accountType: "",
      accountName: "",
      accountNameSearch: "",
      currentBalance: 0,
      closingBalance: 0,
      openingBalance: 0,
      deliveryAddress: ""
    },
    {
      id: 2,
      voucherType: "Income",
      date: "2023-06-20",
      customerVendor: "ABC Traders",
      voucherNo: "INC001",
      receiptNo: "",
      items: [
        { description: "Consulting Services", rate: 10000, quantity: 1, amount: 10000 }
      ],
      note: "Monthly consulting fee",
      logo: null,
      signature: null,
      photo: null,
      attachments: [],
      companyName: "Your Company Name",
      total: 10000,
      status: "Pending",
      fromAccount: "Bank Account",
      toAccount: "",
      partyName: "",
      partyEmail: "",
      partyAddress: "",
      partyPhone: "",
      customerEmail: "",
      customerAddress: "",
      customerPhone: "",
      isGST: false,
      gstRate: 0,
      isTax: false,
      taxRate: 0,
      discount: 0,
      discountAccount: "",
      transferAmount: 0,
      accountType: "",
      accountName: "",
      accountNameSearch: "",
      currentBalance: 0,
      closingBalance: 0,
      openingBalance: 0,
      deliveryAddress: ""
    },
    {
      id: 3,
      voucherType: "Contra",
      date: "2023-07-10",
      customerVendor: "",
      voucherNo: "CON001",
      receiptNo: "",
      items: [],
      note: "Fund transfer between accounts",
      logo: null,
      signature: null,
      photo: null,
      attachments: [],
      companyName: "Your Company Name",
      total: 5000,
      status: "Pending",
      fromAccount: "Cash Account 1",
      toAccount: "Bank Account",
      partyName: "",
      partyEmail: "",
      partyAddress: "",
      partyPhone: "",
      customerEmail: "",
      customerAddress: "",
      customerPhone: "",
      isGST: false,
      gstRate: 0,
      isTax: false,
      taxRate: 0,
      discount: 0,
      discountAccount: "",
      transferAmount: 5000,
      accountType: "",
      accountName: "",
      accountNameSearch: "",
      currentBalance: 0,
      closingBalance: 0,
      openingBalance: 0,
      deliveryAddress: ""
    }
  ]);

  // Handle Save (Create or Update)
  const handleSaveVoucher = (voucher) => {
    if (editVoucher !== null) {
      // Update existing voucher
      setVouchers(prev => {
        const updated = [...prev];
        updated[editVoucher] = { ...voucher, id: prev[editVoucher].id };
        return updated;
      });
      alert("Voucher updated successfully!");
    } else {
      // Add new voucher
      const newVoucher = {
        ...voucher,
        id: vouchers.length > 0 ? Math.max(...vouchers.map(v => v.id)) + 1 : 1,
      };
      setVouchers(prev => [...prev, newVoucher]);
      alert("Voucher created successfully!");
    }
    setShowModal(false);
    setEditVoucher(null);
  };

  // Handle Delete
  const handleDelete = (idx) => {
    if (!window.confirm("Are you sure you want to delete this voucher?")) return;
    setVouchers(vouchers.filter((_, i) => i !== idx));
    alert("Voucher deleted successfully!");
  };

  const handleEdit = (idx) => {
    setEditVoucher(idx);
    setShowModal(true);
  };

  const handleView = (idx) => {
    setViewVoucher(vouchers[idx]);
    setShowViewModal(true);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Vouchers</h4>
        <Button
          style={{ backgroundColor: "#53b2a5", border: "none", borderRadius: "50px", fontWeight: 600 }}
          onClick={() => { setEditVoucher(null); setShowModal(true); }}
        >
          Create Voucher
        </Button>
      </div>
      <div className="table-responsive">
        <Table bordered hover responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Date</th>
              <th>Customer/Vendor</th>
              <th>Voucher No</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((v, i) => (
              <tr key={v.id || i}>
                <td>{i + 1}</td>
                <td>{v.voucherType}</td>
                <td>{v.date}</td>
                <td>{v.customerVendor}</td>
                <td>{v.voucherNo}</td>
                <td>R{v.total?.toFixed(2) || 0}</td>
                <td>
                  <Button variant="link" onClick={() => handleView(i)} aria-label="View"><FaEye /></Button>
                  <Button variant="link" onClick={() => handleEdit(i)} aria-label="Edit"><FaEdit /></Button>
                  <Button variant="link" onClick={() => handleDelete(i)} aria-label="Delete"><FaTrash /></Button>
                </td>
              </tr>
            ))}
            {vouchers.length === 0 && (
              <tr><td colSpan="8" className="text-center">No vouchers found</td></tr>
            )}
          </tbody>
        </Table>
      </div>
      <CreateVoucherModal
        show={showModal}
        onHide={() => { setShowModal(false); setEditVoucher(null); }}
        onSave={handleSaveVoucher}
        editData={editVoucher !== null ? vouchers[editVoucher] : null}
      />
      <VoucherViewModal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        voucher={viewVoucher}
      />
    </div>
  );
};

export default CreateVoucher;