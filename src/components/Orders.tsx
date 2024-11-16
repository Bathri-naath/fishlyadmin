import React, { useState } from "react";

const Orders: React.FC = () => {
  // State to manage the search input
  const [searchTerm, setSearchTerm] = useState("");

  // Example order data (replace with actual data from the backend if needed)
  const orders = [
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      address: "123 Main St, Springfield",
      orderItems: "2x Salmon, 1x Tuna",
      cuttingMethod: "Pre-cut",
      date: "2024-11-15",
      time: "10:30 AM",
      paymentMethod: "Cash on Delivery",
      cost: "$45.00",
      status: "Delivered",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "987-654-3210",
      address: "456 Elm St, Gotham City",
      orderItems: "1x Catla, 3x Prawns",
      cuttingMethod: "On-site Cutting",
      date: "2024-11-14",
      time: "2:15 PM",
      paymentMethod: "Pay Online",
      cost: "$78.50",
      status: "In Transit",
    },
    {
      id: 3,
      name: "Alice Johnson",
      phone: "555-555-5555",
      address: "789 Pine St, Metropolis",
      orderItems: "5x Mackerel",
      cuttingMethod: "Whole Fish",
      date: "2024-11-13",
      time: "5:45 PM",
      paymentMethod: "Pay Online",
      cost: "$60.00",
      status: "Pending",
    },
  ];

  // Extract the first name from the user's full name
  const getFirstName = (name: string) => name.split(" ")[0].toLowerCase();

  // Filter orders based on the first name search term
  const filteredOrders = orders.filter((order) =>
    getFirstName(order.name).includes(searchTerm.toLowerCase())
  );

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
        placeholder="Search by user's first name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm flex justify-between"
            >
              {/* Left Section */}
              <div>
                <h2 className="text-lg font-medium">User Name: {order.name}</h2>
                <p>Phone Number: {order.phone}</p>
                <p>Address: {order.address}</p>
                <p>Order Items: {order.orderItems}</p>
                <p>Payment Method: {order.paymentMethod}</p>
                <p>Cost: {order.cost}</p>
                <p className="font-bold">
                  Order Status:{" "}
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
              </div>

              {/* Right Section */}
              <div className="text-right">
                <p>Cutting Method: {order.cuttingMethod}</p>
                <p>Date: {order.date}</p>
                <p>Time: {order.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
