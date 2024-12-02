import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { login } from "./store";
import Login from "./components/Login";
// import { Dispatch } from "react";
import Dashboard from "./components/Users";
import UserDetails from "./components/UserDetails";
import UserOrdersPage from "./components/Orders";
import Admin from "./components/Admin";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check if the token is present in sessionStorage to auto-login
    const token = sessionStorage.getItem("token");
    const uid = sessionStorage.getItem("uid");
    if (token && uid) {
      dispatch(login({ token, uid }));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/admin/dashboard" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/*" element={<Admin />}>
        {/* Admin-specific pages */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<UserOrdersPage />} />
        <Route path="user-details" element={<UserDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
