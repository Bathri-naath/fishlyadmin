import React, { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  order: string; // E.g., "Onsite cut (Date: 2024-11-24, Time: 07:30)"
  cuttingMethod: string;
  cost: string;
  status: string;
  paymentMethod: string;
  transaction_id: string;
  customer_id: string;
}

interface User {
  _id: string;
  username: string;
  address: string;
  mobile: string;
  orders: Order[];
}

const UserOrdersPage: React.FC = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchUsersWithOrders = async () => {
      try {
        const response = await axios.post(
          "https://api.fishly.co.in/getAllCustomersWithOrders",{},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch users data");
        }
         const usersWithOrders = response.data.filter(
           (user: User) => user.orders && user.orders.length > 0
         );
        setUsersData(usersWithOrders);
      } catch (err) {
        setError("Error fetching users data: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersWithOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!usersData.length) {
    return <div>No users data available</div>;
  }

  // Filter users based on search term
  const filteredUsers = usersData.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting function for orders
  const sortOrders = (orders: Order[]) => {
    const extractDateTime = (order: string) => {
      const regex = /Date: (\d{4}-\d{2}-\d{2}), Time: (\d{2}:\d{2})/;
      const match = order.match(regex);
      if (match) {
        const [_, date, time] = match;
        return new Date(`${date}T${time}:00`).getTime();
      }
      return 0;
    };

    return [...orders].sort((a, b) => {
      const timeA = extractDateTime(a.order);
      const timeB = extractDateTime(b.order);
      return timeB - timeA; // Descending order
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <p className="mb-4">
        Welcome to the orders dashboard. Here you can access all the orders
        placed on the website.
      </p>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by user's name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />

      {/* Users and Orders List */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              {/* User Details */}
              <div className="mb-4">
                <h2 className="text-lg font-medium">Name: {user.username}</h2>
                <p>Phone Number: {user.mobile}</p>
                <p>Address: {user.address || "Address not provided"}</p>
              </div>

              {/* Orders for the User */}
              <div className="space-y-2">
                {user.orders.length > 0 ? (
                  sortOrders(user.orders).map((order) => (
                    <div
                      key={order._id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <p>
                        <strong>Order ID:</strong> {order._id}
                      </p>
                      <p>
                        <strong>Product:</strong> {order.order}
                      </p>
                      <p>
                        <strong>Cutting Method:</strong> {order.cuttingMethod}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{order.cost}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={
                            order.status === "Delivered"
                              ? "text-green-600"
                              : order.status === "In Transit"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }
                        >
                          {order.status}
                        </span>
                      </p>
                      <p>
                        <strong>Payment Method:</strong> {order.paymentMethod}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No orders found for this user.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No users found matching the search term.</p>
        )}
      </div>
    </div>
  );
};

export default UserOrdersPage;
