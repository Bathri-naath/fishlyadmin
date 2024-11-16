import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Use Navigate for redirects
import Admin from "./components/Admin"; // Import Admin component
import Login from "./components/Login"; // Import Login component

const App: React.FC = () => {
  const isLoggedIn = sessionStorage.getItem("uid"); // Check if the user is logged in

  useEffect(() => {
    // If not logged in, redirect to login page
    if (!isLoggedIn && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, [isLoggedIn]);

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        {/* Route for login */}
        <Route path="/login" element={<Login />} />

        {/* Route for Admin page */}
        <Route
          path="/admin/*"
          element={isLoggedIn ? <Admin /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
