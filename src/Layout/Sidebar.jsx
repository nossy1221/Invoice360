import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/invoiccee-360.png";
import "./Sidebar.css";

const Sidebar = ({ isMobile, onLinkClick }) => {
  const { pathname } = useLocation();
  const [activePath, setActivePath] = useState(pathname);
  const [role, setRole] = useState("");
  const [expandedMenu, setExpandedMenu] = useState({});

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const handleMenuClick = (path) => {
    setActivePath(path);
    if (isMobile) {
      const offcanvas = window.bootstrap?.Offcanvas.getInstance(
        document.getElementById("mobileSidebar")
      );
      offcanvas?.hide();
    }
    onLinkClick?.();
  };

  const toggleMenu = (menuKey) => {
    setExpandedMenu((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  // ---------------------- Dropdown Section Renderer ----------------------
  const renderDropdownSection = (title, mainItem, subItems) => {
    const menuKey = mainItem.to;
    const isExpanded = expandedMenu[menuKey];

    return (
      <div className="mb-3" key={menuKey}>
        <div className="text-white fw-bold px-3 py-1" style={sectionTitleStyle}>
          {title}
        </div>

        <div
          className={`nav-link d-flex align-items-center sidebar-link px-3 py-2 ${
            isExpanded ||
            subItems.some((item) => item.to === activePath)
              ? "active-link"
              : ""
          }`}
          style={{ ...linkStyle, cursor: "pointer" }}
          onClick={() => toggleMenu(menuKey)}
        >
          <i className={`me-3 ${mainItem.icon}`} style={iconStyle}></i>
          <span>{mainItem.label}</span>
          <i
            className={`ms-auto fas ${
              isExpanded ? "fa-chevron-up" : "fa-chevron-down"
            }`}
            style={{ fontSize: "0.8rem", opacity: 0.7 }}
          ></i>
        </div>

        {isExpanded && (
          <div className="submenu ps-4">
            {subItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => handleMenuClick(item.to)}
                className={`nav-link d-flex align-items-center sidebar-link px-3 py-1 small ${
                  activePath === item.to ? "active-sublink" : ""
                }`}
                style={{
                  ...linkStyle,
                  paddingLeft: "2.8rem",
                  fontSize: "14px",
                  color: "#ccc",
                }}
              >
                <i
                  className={`me-2 ${item.icon}`}
                  style={{ ...iconStyle, fontSize: "14px" }}
                ></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ---------------------- Flat Section Renderer ----------------------
  const renderFlatSection = (title, items) => (
    <div className="mb-3" key={title}>
      <div className="text-white fw-bold px-3 py-1" style={sectionTitleStyle}>
        {title}
      </div>
      {items.map(({ to, icon, label }) => (
        <div className="nav-item ps-2" key={to}>
          <Link
            to={to}
            onClick={() => handleMenuClick(to)}
            className={`nav-link d-flex align-items-center sidebar-link px-3 py-2 ${
              activePath === to ? "active-link" : ""
            }`}
            style={linkStyle}
          >
            <i className={`me-3 ${icon}`} style={iconStyle}></i>
            <span>{label}</span>
          </Link>
        </div>
      ))}
    </div>
  );

  // ---------------------- MENU ITEMS ----------------------
  const getMenuItems = () => {
    const menuItems = {
      superadmin: [
        renderFlatSection("Admin Dashboard", [
          { to: "/dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
          { to: "/superadmin/company", icon: "fas fa-building", label: "Company" },
          { to: "/superadmin/planpricing", icon: "fas fa-tags", label: "Plans & Pricing" },
          { to: "/superadmin/requestplan", icon: "fas fa-envelope-open", label: "Request Plan" },
          { to: "/superadmin/payments", icon: "fas fa-credit-card", label: "Payments" },
        ]),
      ],

      company: [
        renderFlatSection("Admin Dashboard", [
          { to: "/company/dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
        ]),

        // ✅ Dropdown for User Management
        renderDropdownSection(
          "User Management",
          { to: "/user-management", icon: "fas fa-users", label: "User Management" },
          [
            { to: "/company/users", icon: "fas fa-user", label: "Users" },
            { to: "/company/rolespermissions", icon: "fas fa-user-shield", label: "Roles & Permissions" },
          ]
        ),

        // ✅ Dropdown for Clients
        renderDropdownSection(
          "Clients",
          { to: "/clients", icon: "fas fa-user-friends", label: "Clients" },
          [
            { to: "/company/NewClient", icon: "fas fa-user-plus", label: "New Clients" },
            { to: "/company/AllClients", icon: "fas fa-users", label: "All Clients" },
          ]
        ),

        // ✅ Dropdowns for all major sections
        renderDropdownSection(
          "Sales",
          { to: "/sales", icon: "fas fa-shopping-bag", label: "Sales" },
          [
            { to: "/company/quotation", icon: "fas fa-file-signature", label: "Quotation" },
            { to: "/company/sales-order", icon: "fas fa-shopping-bag", label: "Sales Order" },
            { to: "/company/invoice-tab", icon: "fas fa-file-invoice-dollar", label: "Invoice" },
            { to: "/company/payment", icon: "fas fa-money-check-alt", label: "Payment" },
            { to: "/company/salesreturn", icon: "fas fa-undo-alt", label: "Sales Return" },
          ]
        ),

        renderDropdownSection(
          "Purchases",
          { to: "/purchases", icon: "fas fa-shopping-cart", label: "Purchases" },
          [
            { to: "/company/purchase-quotation", icon: "fas fa-file-signature", label: "Purchase Quotation" },
            { to: "/company/purchase-order", icon: "fas fa-shopping-cart", label: "Purchase Order" },
            { to: "/company/goods-receipt", icon: "fas fa-box-open", label: "Goods Receipt" },
            { to: "/company/bill", icon: "fas fa-file-invoice-dollar", label: "Bill" },
            { to: "/company/payment-purchase", icon: "fas fa-money-check-alt", label: "Payment" },
            { to: "/company/purchasereturn", icon: "fas fa-undo-alt", label: "Purchase Return" },
          ]
        ),

        renderDropdownSection(
          "Accounting",
          { to: "/accounting", icon: "fas fa-calculator", label: "Accounting" },
          [
            { to: "/company/DeliveryNote", icon: "fas fa-truck", label: "Delivery Note" },
            { to: "/company/CreditNote", icon: "fas fa-file-invoice-dollar", label: "Credit Note" },
            { to: "/company/allacounts", icon: "fas fa-calendar-day", label: "Charts of Accounts" },
            { to: "/company/customersdebtors", icon: "fas fa-hand-holding-usd", label: "Customers/Debtors" },
            { to: "/company/vendorscreditors", icon: "fas fa-user-tie", label: "Vendors/Creditors" },
            { to: "/company/cashflow", icon: "fas fa-coins", label: "Cash Flow" },
            { to: "/company/profitloss", icon: "fas fa-chart-pie", label: "Profit & Loss" },
            { to: "/company/balancesheet", icon: "fas fa-balance-scale", label: "Balance Sheet" },
            { to: "/company/expense", icon: "fas fa-money-bill", label: "Expenses" },
            { to: "/company/vatreport", icon: "fas fa-file-invoice-dollar", label: "Vat Report" },
            { to: "/company/taxreport", icon: "fas fa-file-alt", label: "Tax Report" },
          ]
        ),

        renderDropdownSection(
          "Inventory",
          { to: "/inventory", icon: "fas fa-boxes", label: "Inventory" },
          [
            { to: "/company/warehouse", icon: "fas fa-warehouse", label: "Warehouse" },
            { to: "/company/inventorys", icon: "fas fa-boxes", label: "Product List" },
            { to: "/company/service", icon: "fas fa-cogs", label: "Service" },
            { to: "/company/createvoucher", icon: "fas fa-file-invoice", label: "Create Voucher" },
            { to: "/company/stocktranfer", icon: "fas fa-exchange-alt", label: "Stock Transfer" },
            { to: "/company/unitofmeasure", icon: "fas fa-ruler-combined", label: "Unit of Measure" },
          ]
        ),

        renderDropdownSection(
          "Payroll",
          { to: "/payroll", icon: "fas fa-user-tie", label: "Payroll" },
          [
            { to: "/company/employeemanagement", icon: "fas fa-user-tie", label: "Employee Management" },
            { to: "/company/salarystructure", icon: "fas fa-money-bill-wave", label: "Salary Structure" },
            { to: "/company/generatepayroll", icon: "fas fa-file-invoice-dollar", label: "Generate Payroll" },
            { to: "/company/payslipreports", icon: "fas fa-receipt", label: "Payslip Report" },
            { to: "/company/payrollreports", icon: "fas fa-file-invoice", label: "Payroll Report" },
            { to: "/company/payrollsettings", icon: "fas fa-cogs", label: "Payroll Setting" },
          ]
        ),

        renderDropdownSection(
          "Reports",
          { to: "/reports", icon: "fas fa-chart-line", label: "Reports" },
          [
            { to: "/company/salesreport", icon: "fas fa-chart-line", label: "Sales Report" },
            { to: "/company/purchasereport", icon: "fas fa-file-invoice-dollar", label: "Purchase Report" },
            { to: "/company/posreport", icon: "fas fa-shopping-cart", label: "POS Report" },
            { to: "/company/inventorysummary", icon: "fas fa-clipboard-list", label: "Inventory Summary" },
            { to: "/company/daybook", icon: "fas fa-calendar-day", label: "DayBook" },
            { to: "/company/journalentries", icon: "fas fa-book", label: "Journal Entries" },
            { to: "/company/ledger", icon: "fas fa-book", label: "Ledger" },
            { to: "/company/trialbalance", icon: "fas fa-balance-scale", label: "Trial Balance" },
          ]
        ),

        renderDropdownSection(
          "Settings",
          { to: "/settings", icon: "fas fa-cog", label: "Settings" },
          [
            { to: "/company/companyinfo", icon: "fas fa-building", label: "Company Info" },
          ]
        ),
      ],
    };

    return menuItems[role] || null;
  };

  // ---------------------- Styles ----------------------
  const linkStyle = {
    fontWeight: 500,
    fontSize: "15px",
    color: "#fff",
    paddingLeft: "2.5rem",
  };

  const iconStyle = {
    width: "16px",
    minWidth: "16px",
    textAlign: "center",
    fontSize: "17px",
    color: "#fff",
  };

  const sectionTitleStyle = {
    fontSize: "13px",
    textTransform: "uppercase",
    color: "#ddd",
    marginBottom: "4px",
  };

  // ---------------------- Return ----------------------
  return (
    <div
      className="sidebar d-flex flex-column position-fixed start-0"
      style={{ height: "100vh", width: "250px" }}
    >
      <div className="d-flex justify-content-between align-items-center py-2">
        {isMobile && (
          <div className="d-flex align-items-center ms-3 mt-3">
            <img
              src={logo}
              alt="Company Logo"
              style={{ height: "50px", width: "120px" }}
            />
          </div>
        )}
        <button
          type="button"
          className="btn btn-outline-light ms-auto d-lg-none me-2 mt-3"
          onClick={() =>
            window.bootstrap
              ?.Offcanvas.getInstance(document.getElementById("mobileSidebar"))
              ?.hide()
          }
          style={{ padding: "4px 10px", borderRadius: "6px" }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Scrollable Menu */}
      <div
        className="sidebar-menu-container"
        style={{
          overflowY: "auto",
          flexGrow: 1,
          paddingBottom: "20px",
          maxHeight: "calc(100vh - 70px)",
        }}
      >
        <div className="p-2">{getMenuItems()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
