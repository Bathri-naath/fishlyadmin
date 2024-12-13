import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaUsers, FaClipboardList } from "react-icons/fa"; // Example icons for sidebar

const Admin: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-r from-[#81f8bb] to-[#22ccdd] p-6 space-y-6">
        {/* Logo Section */}
        <div className="flex justify-center">
          <Link to="/admin/dashboard">
            <img
              src={logo}
              alt="Fishly Logo"
              className="h-16 w-auto cursor-pointer"
            />
          </Link>
        </div>

        {/* Sidebar Links */}
        <div>
          <p className="text-2xl font-semibold mb-4 flex items-center justify-center">
            Welcome Admin
          </p>
          <div className="space-y-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center text-lg font-medium text-gray-700  hover:text-teal-500 hover:bg-white p-3 rounded-md transition duration-300"
            >
              <FaUsers className="mr-3" /> Users
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center text-lg font-medium text-gray-700 hover:text-teal-500 hover:bg-white p-3 rounded-md transition duration-300"
            >
              <FaClipboardList className="mr-3" /> Orders
            </Link>
            <Link
              to="/admin/products"
              className="flex items-center text-lg font-medium text-gray-700 hover:text-teal-500 hover:bg-white p-3 rounded-md transition duration-300"
            >
              <FaClipboardList className="mr-3" /> Product
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Render nested routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
