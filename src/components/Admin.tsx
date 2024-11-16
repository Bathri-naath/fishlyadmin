import { Link, Route, Routes } from "react-router-dom"; // Import necessary routing components
import logo from "../assets/logo.png"; // Import the logo
import Dashboard from "./Dashboard"; // Import the Dashboard component
import UserOrdersPage from "./Orders"; // Import the Orders component
import UserDetails from "./UserDetails"; // Import the UserDetails component

const Admin: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Logo Section */}
      <div className="flex justify-center px-4 py-4">
        <Link to="/admin/dashboard">
          <img
            src={logo}
            alt="Fishly Logo"
            className="h-16 w-auto cursor-pointer"
          />
        </Link>
      </div>

      {/* Sidebar Overlay - Full Height */}
      <div className="absolute top-0 left-0 w-64 bg-gray-200 p-6 z-10 h-full">
        {/* Welcome Admin Text */}
        <div className="text-xl font-bold mb-6 text-center">Welcome Admin</div>

        {/* Sidebar Links */}
        <div className="space-y-4">
          <Link
            to="/admin/dashboard" // Correct path to include '/admin'
            className="block text-lg font-medium text-gray-700 hover:text-teal-500"
          >
            Users
          </Link>
          <Link
            to="/admin/orders" // Correct path to include '/admin'
            className="block text-lg font-medium text-gray-700 hover:text-teal-500"
          >
            Orders
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pl-64 p-8">
        {/* Nested Routes for different admin sections */}
        <Routes>
          {/* Define the admin section pages */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<UserOrdersPage />} />
          <Route path="user-details" element={<UserDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
