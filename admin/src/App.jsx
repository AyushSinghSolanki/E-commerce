import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast styles ke liye

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  /* SCREENSHOT 1: LocalStorage se token check karne ka logic */
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );

  /* Token ko localStorage me hamesha sync rakhne ke liye useEffect */
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* SCREENSHOT 2: Toast notifications container */}
      <ToastContainer />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />

            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600">
              <Routes>
                {/* SCREENSHOT 2: Sabhi child pages me token prop pass kiya gaya hai */}
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
