import React, { useState } from "react";

const Dashboard: React.FC = () => {
  // State to manage the search input
  const [searchTerm, setSearchTerm] = useState("");

  // Example user data (you can replace this with actual data from the backend)
  const users = [
    { id: 1, name: "John Doe", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", phone: "987-654-3210" },
    { id: 3, name: "Alice Johnson", phone: "555-555-5555" },
  ];

  const getFirstName = (name: string) => name.split(" ")[0].toLowerCase();

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    getFirstName(user.name).includes(searchTerm.toLowerCase())
  );

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
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <h2 className="text-lg font-medium">User Name: {user.name}</h2>
              <p>Phone Number: {user.phone}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
