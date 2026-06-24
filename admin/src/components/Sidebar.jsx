import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const navStyle = ({ isActive }) =>
    `group relative flex items-center gap-3 border border-gray-300 border-r-0 px-4 py-3 rounded-l-xl overflow-hidden
     transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:shadow-lg
     
     ${
       isActive
         ? "bg-gradient-to-r from-gray-100 to-white shadow-md"
         : "bg-white hover:bg-gray-50"
     }`;

  return (
    <div className="w-[18%] min-h-screen border-r border-gray-200 bg-white">
      <div className="flex flex-col gap-5 pt-8 pl-[18%] text-[15px]">
        {/* Add Items */}

        <NavLink className={navStyle} to="/add">
          {/* Active Indicator */}
          <span className="absolute left-0 top-0 h-full w-1 bg-black opacity-0 group-hover:opacity-100 transition-all duration-300"></span>

          <img
            className="w-5 h-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
            src={assets.add_icon}
            alt=""
          />

          <p className="hidden md:block font-medium transition-all duration-300 group-hover:translate-x-1">
            Add Items
          </p>
        </NavLink>

        {/* List Items */}

        <NavLink className={navStyle} to="/list">
          <span className="absolute left-0 top-0 h-full w-1 bg-black opacity-0 group-hover:opacity-100 transition-all duration-300"></span>

          <img
            className="w-5 h-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
            src={assets.order_icon}
            alt=""
          />

          <p className="hidden md:block font-medium transition-all duration-300 group-hover:translate-x-1">
            List Items
          </p>
        </NavLink>

        {/* Orders */}

        <NavLink className={navStyle} to="/orders">
          <span className="absolute left-0 top-0 h-full w-1 bg-black opacity-0 group-hover:opacity-100 transition-all duration-300"></span>

          <img
            className="w-5 h-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
            src={assets.order_icon}
            alt=""
          />

          <p className="hidden md:block font-medium transition-all duration-300 group-hover:translate-x-1">
            Orders
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
