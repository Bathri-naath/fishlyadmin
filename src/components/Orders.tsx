import React, { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  order: string;
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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const USERS_PER_PAGE = 5;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsersWithOrders();
  }, []);

  const fetchUsersWithOrders = async () => {
    try {
      const response = await axios.post(
        "https://api.fishly.co.in/getAllCustomersWithOrders",
        {},
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

  const postOrder = async (orderId: string, status: string) => {
    const formData = new FormData();
    formData.append("status", status);

    try {
      const response = await axios.post(
        `https://api.fishly.co.in/updateStatusOrder/${orderId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
      fetchUsersWithOrders(); // Refresh data without reloading
    } catch (error) {
      console.log(error);
    }
  };

  // Function to parse the cutting method date
  const parseCuttingDate = (cuttingMethod: string) => {
    const [, details] = cuttingMethod.split(" (");
    const [datePart] = details
      ? details
          .replace(")", "")
          .split(", ")
          .map((str) => str.split(": ")[1])
      : ["N/A"];

    const truncatedDatePart = datePart
      ? datePart.split(" ").slice(0, 4).join(" ")
      : "N/A";

    return truncatedDatePart;
  };

  // Function to parse the cutting method time
  const parseCuttingTime = (cuttingMethod: string) => {
    const [, details] = cuttingMethod.split(" (");
    const [datePart] = details
      ? details
          .replace(")", "")
          .split(", ")
          .map((str) => str.split(": ")[1])
      : ["N/A"];

    const timeFromDate = datePart
      ? datePart.split(" ").slice(4).join(" ")
      : "N/A";

    const truncatedTimePart = timeFromDate.split(" ")[0] || "N/A";

    return truncatedTimePart;
  };

  // Usage in your component
  const parseCuttingMethod = (cuttingMethod: string) => {
    const method = cuttingMethod.split(" (")[0];
    const date = parseCuttingDate(cuttingMethod);
    const time = parseCuttingTime(cuttingMethod);

    return { method, date, time };
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!usersData.length) {
    return <div>No users data available</div>;
  }

  // Function to filter users based on the search term (matching the date in the cutting method)
  const filteredUsers = usersData.filter((user) => {
    return user.orders.some((order) => {
      const { date } = parseCuttingMethod(order.cuttingMethod);
      return date.toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const sortOrders = (orders: Order[]) => {
    const extractOrderDateTime = (order: string) => {
      const regex = /Date: (\d{4}-\d{2}-\d{2}), Time: (\d{2}:\d{2})/;
      const match = order.match(regex);
      return match ? new Date(`${match[1]}T${match[2]}:00`).getTime() : 0;
    };

    return [...orders].sort((a, b) => {
      const timeA = extractOrderDateTime(a.order);
      const timeB = extractOrderDateTime(b.order);
      return timeB - timeA;
    });
  };

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <p className="mb-4">
        Welcome to the orders dashboard. Here you can access all the orders
        placed on the website.
      </p>

      <input
        type="text"
        placeholder="Search by order date..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />

      <div className="space-y-4">
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user) => (
            <div
              key={user._id}
              className="border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              <div className="mb-4">
                <h2 className="text-lg font-medium">Name: {user.username}</h2>
                <p>Phone Number: {user.mobile}</p>
                <p>Address: {user.address || "Address not provided"}</p>
              </div>

              <div className="space-y-2">
                {user.orders.length > 0 ? (
                  sortOrders(user.orders).map((order) => {
                    const { method, date, time } = parseCuttingMethod(
                      order.cuttingMethod
                    );
                    return (
                      <div
                        key={order._id}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
                          <div className="flex-1">
                            <p>
                              <strong>Order ID:</strong> {order._id}
                            </p>
                            <p>
                              <strong>Product:</strong> {order.order}
                            </p>
                            <p>
                              <strong>Cutting Method:</strong> {method}
                            </p>
                            <p>
                              <strong>Status:</strong>{" "}
                              <span
                                className={
                                  order.status === "Delivered"
                                    ? "text-green-600"
                                    : order.status === "In Transit"
                                    ? "text-orange-600"
                                    : order.status === "Preparing"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }
                              >
                                {order.status}
                              </span>
                            </p>
                            <p>
                              <strong>Payment Method:</strong>{" "}
                              {order.paymentMethod}
                            </p>
                          </div>
                          <div className="text-right flex-1">
                            <p>
                              <strong>Date:</strong> {date}
                            </p>
                            <p>
                              <strong>Time:</strong> {time}
                            </p>
                            <p>
                              <strong>Price:</strong> ₹{order.cost}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-start space-x-4">
                          <p>
                            <strong>Update Order Status:</strong>
                          </p>
                          <p
                            className="underline text-yellow-600 cursor-pointer"
                            onClick={() => postOrder(order._id, "Preparing")}
                          >
                            Preparing
                          </p>
                          <p
                            className="underline text-orange-600 cursor-pointer"
                            onClick={() => postOrder(order._id, "In-Transit")}
                          >
                            In Transit
                          </p>
                          <p
                            className="underline text-green-600 cursor-pointer"
                            onClick={() => postOrder(order._id, "Delivered")}
                          >
                            Delivered
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>No orders available</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No matching users found.</div>
        )}
      </div>

      <div className="mt-6">
        <div className="flex justify-center space-x-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === index + 1
                  ? "bg-teal-500 text-white"
                  : "bg-white text-teal-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrdersPage;
