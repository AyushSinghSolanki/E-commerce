import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navLinkClass = ({ isActive }) =>
    `relative flex flex-col items-center gap-1 transition-all duration-300
   ${
     isActive
       ? "text-black after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-full after:bg-black after:rounded-full"
       : "text-gray-700 after:absolute after:-bottom-1 after:left-1/2 after:h-[1.5px] after:w-0 after:bg-black after:rounded-full hover:after:w-full hover:after:left-0"
   }
   after:transition-all after:duration-300`;

  const navigate = useNavigate();

  const { setShowSearch, getCartCount, token, setToken } =
    useContext(ShopContext);

  // ================= LOGOUT =================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    setToken("");

    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between py-5 font-medium">
      {/* LOGO */}

      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      {/* DESKTOP MENU */}

      <ul className="hidden sm:flex gap-8 text-sm font-medium">
        <NavLink to="/" className={navLinkClass}>
          <p>HOME</p>
        </NavLink>

        <NavLink to="/collection" className={navLinkClass}>
          <p>COLLECTION</p>
        </NavLink>

        <NavLink to="/about" className={navLinkClass}>
          <p>ABOUT</p>
        </NavLink>

        <NavLink to="/contact" className={navLinkClass}>
          <p>CONTACT</p>
        </NavLink>
      </ul>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-6">
        {/* SEARCH */}

        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />

        {/* PROFILE */}

        <div className="group relative">
          {!token ? (
            <Link to="/login">
              <img
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt=""
              />
            </Link>
          ) : (
            <>
              <img
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt=""
              />

              <div className="hidden group-hover:block absolute right-0 pt-4 z-50">
                <div className="flex flex-col gap-2 w-40 py-3 px-5 bg-slate-100 text-gray-600 rounded shadow-lg">
                  <p
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer hover:text-black"
                  >
                    My Profile
                  </p>

                  <p
                    onClick={() => navigate("/order")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>

                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-red-600"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* CART */}

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />

          <p className="absolute -right-2 -bottom-2 w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* MOBILE MENU */}

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* MOBILE SIDEBAR */}

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 z-50 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          {/* BACK */}

          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />

            <p>Back</p>
          </div>

          {/* LINKS */}

          <NavLink
            to="/"
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
          >
            HOME
          </NavLink>

          <NavLink
            to="/collection"
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
          >
            COLLECTION
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
          >
            ABOUT
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
          >
            CONTACT
          </NavLink>

          {token && (
            <>
              <NavLink
                to="/profile"
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
              >
                MY PROFILE
              </NavLink>

              <NavLink
                to="/order"
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
              >
                MY ORDERS
              </NavLink>

              <p
                onClick={() => {
                  logout();
                  setVisible(false);
                }}
                className="py-2 pl-6 border cursor-pointer"
              >
                LOGOUT
              </p>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
