import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import newlogo from "../../assets/invoiceee-360.png";
import right from "../../assets/account.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Static credentials
    const users = [
      { email: "superadmin@example.com", password: "123456", role: "SuperAdmin" },
      { email: "test@example.com", password: "123456", role: "Company" },
    ];

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Store role in localStorage in lowercase to match Sidebar expectations
      localStorage.setItem("role", user.role.toLowerCase());
      
      // Also store user info for potential future use
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", user.role); // Keep original case for display
      
      toast.success("Login Successfully!");
      
      // Redirect based on role
      if (user.role === "SuperAdmin") {
        navigate("/dashboard");
      } else if (user.role === "Company") {
        navigate("/company/dashboard");
      }
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#023047" }}
    >
      <div className="min-h-screen flex items-center justify-center px-4 py-8 md:py-16 bg-[#023047]">
        <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-xl flex flex-col md:flex-row">
          <ToastContainer position="top-right" autoClose={2000} />

          {/* Left Panel - Login Form */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center mb-8">
                <img src={newlogo} alt="ZirakBook Logo" className="max-h-12" />
                {/* <h1 className="font-semibold mb-1">Accounting</h1> */}
              </div>

              <h6 className="text-xl font-bold text-gray-800 mb-6">
                Welcome Back
              </h6>

              <div className="border-b border-gray-300 mb-4"></div>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Your Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 rounded mr-2"
                    checked={keepLoggedIn}
                    onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                  />
                  Keep me logged in
                </label>
                
                {/* Add Forgot Password Link */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                
                <button
                  onClick={handleLogin}
                  className="w-full text-white py-3 rounded-lg flex items-center justify-center text-base"
                  style={{ backgroundColor: "#023047" }}
                >
                  <span>Log in</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Illustration */}
          <div className="hidden md:flex md:w-1/2 p-6 md:p-10 relative items-center justify-center">
            <img
              src={right}
              alt="Digital Connection"
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-200 rounded-full -mr-10 -mb-10 opacity-70"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;