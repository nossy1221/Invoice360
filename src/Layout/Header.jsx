import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import k1 from "../assets/kiaanlogo-.png";
import newlogo from "../assets/invoiccee-360.png";
import "./Sidebar.css";
import "./header.css";

const Header = ({ onToggleSidebar }) => {
  const [selectedLang, setSelectedLang] = useState("English");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".lang-dropdown")) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang) => {
    setSelectedLang(lang);
    setShowLangDropdown(false);
    // Optional: Add language switching logic here
  };

  return (
    <header
      className="py-3 px-3 header text-light border-bottom border-secondary shadow-sm"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      {/* Mobile View */}
      <div className="d-flex align-items-center justify-content-between d-lg-none">
        {/* Left Section - Toggle Button */}
        <div>
          <button
            className="btn"
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className="fas fa-bars text-white"></i>
          </button>
        </div>

        {/* Center Section - Logo */}
        <div>
          <img
            src={newlogo}
            alt="Logo"
            className="img-fluid sidebar-logo"
            style={{
              maxHeight: "60px",
              width: "120px",
              display: "block !important",
              visibility: "visible !important",
              opacity: "1 !important",
            }}
          />
        </div>

        {/* Right Section - Logout Button */}
        <div>
          <Link to="/" className="text-decoration-none">
            <button
              className="btn btn-outline"
              style={{
                borderColor: "#53b2a5",
                color: "#53b2a5",
                fontWeight: "500",
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </Link>
        </div>
      </div>

      {/* Desktop View - Original Layout */}
      <div className="d-flex align-items-center justify-content-between flex-wrap d-none d-lg-flex">
        {/* Left Section */}
        <div className="d-flex align-items-center flex-grow-1 gap-3">
          {/* Logo Section */}
          <img
            src={newlogo}
            alt="Logo"
            className="img-fluid sidebar-logo"
            style={{
              maxHeight: "60px",
              width: "120px",
              display: "block !important",
              visibility: "visible !important",
              opacity: "1 !important",
            }}
          />
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3">
          {/* 🌐 Language Dropdown */}
          <div className="relative lang-dropdown position-relative">
            <i
              className="fas fa-globe text-white fs-5 cursor-pointer"
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              style={{ cursor: "pointer" }}
            ></i>

            {showLangDropdown && (
              <ul className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50 text-black">
                {["English", "Arabic", "Pashto"].map((lang) => (
                  <li
                    key={lang}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${selectedLang === lang ? "bg-warning text-dark" : ""
                      }`}
                    onClick={() => handleLanguageSelect(lang)}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 🔔 Notifications */}
          <button className="btn position-relative">
            <i className="far fa-bell text-white fs-5"></i>
            <span
              className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
              style={{ width: "10px", height: "10px" }}
            ></span>
          </button>

          {/* 👤 Profile Icon */}
          <div
            className="d-flex align-items-center me-3 ms-2"
            onClick={() => setShowProfileModal(true)}
            style={{ cursor: "pointer" }}
          >
            <div
              className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
              style={{
                width: "35px",
                height: "35px",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              P
            </div>
          </div>

          {/* Profile Modal */}
          <ProfileModal
            show={showProfileModal}
            handleClose={() => setShowProfileModal(false)}
          />

          {/* 🔓 Logout */}
          <Link to="/" className="text-decoration-none">
            <button
              className="btn btn-outline"
              style={{
                borderColor: "#53b2a5",
                color: "#53b2a5",
                fontWeight: "500",
              }}
            >
              <i className="fas fa-sign-out-alt me-1"></i> Logout
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;