import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import logo from "../assets/logo.png";

const Login: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = () => {
    // Store login status in localStorage (or sessionStorage)
    localStorage.setItem("isLoggedIn", "true");

    // Navigate to the admin page after successful login
    navigate("/admin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo Section */}
      <div className="mb-4">
        <img
          src={logo}
          alt="Fishly Logo"
          className="h-12 w-auto md:h-14" // Slightly larger size for the logo
        />
      </div>

      {/* Login Box Container */}
      <div className="w-full max-w-xs md:max-w-md p-6 bg-white rounded-xl shadow-lg">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>

        {/* Mobile Number Input */}
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* Login Button */}
        <button
          type="button"
          onClick={handleLogin} // Call handleLogin function on click
          className="w-full p-3 text-white rounded-lg bg-gradient-to-r from-[#81f8bb] to-[#22ccdd] hover:from-[#22ccdd] hover:to-[#81f8bb]"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
