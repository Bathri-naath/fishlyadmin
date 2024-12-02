import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  address: string;
  mobile: string;
}

const Dashboard: React.FC = () => {
  // State to manage the search input
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");
  const [users, setUsers] = useState<User[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://api.fishly.co.in/getAllCustomers",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token in the Authorization header
            },
          }
        );
        setUsers(result.data[0].customer);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Example user data (you can replace this with actual data from the backend)
  // const users = [
  //   { id: 1, name: "John Doe", phone: "123-456-7890" },
  //   { id: 2, name: "Jane Smith", phone: "987-654-3210" },
  //   { id: 3, name: "Alice Johnson", phone: "555-555-5555" },
  // ];

  const getFirstName = (name: string) => name.split(" ")[0].toLowerCase();

  // Filter users based on the search term
  const filteredUsers = users?.filter((user) =>
    getFirstName(user.username).includes(searchTerm.toLowerCase())
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
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
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
    </div>
  );
};

export default Dashboard;
