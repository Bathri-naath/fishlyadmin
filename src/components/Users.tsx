import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  address: string;
  mobile: string;
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search term
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState<User[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://api.fishly.co.in/getAllCustomers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(result.data[0].customer);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  // Get the first name of the user for filtering
  const getFirstName = (name: string) => name.split(" ")[0].toLowerCase();

  // Filter users based on search term
  const filteredUsers = users?.filter((user) =>
    getFirstName(user.username).includes(searchTerm.toLowerCase())
  );

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <p className="mb-4">
        Welcome to the users dashboard. Here you can access all the users who
        have signed in to the website.
      </p>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by user name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />

      {/* User List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {currentUsers && currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <div
              key={user._id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <h2 className="text-lg font-medium">
                User Name: {user.username}
              </h2>
              <p>Phone Number: {user.mobile}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {filteredUsers && filteredUsers.length > 0 && (
          <div className="flex space-x-2">
            {Array.from(
              { length: Math.ceil(filteredUsers.length / usersPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === index + 1
                      ? "bg-teal-500 text-white"
                      : "bg-white text-teal-500"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
