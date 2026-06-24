import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { token, setToken } = useContext(ShopContext);

  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    name: localStorage.getItem("userName") || "User",
    email: localStorage.getItem("userEmail") || "",
  });

  if (!token) {
    navigate("/login");
    return null;
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    setToken("");

    toast.success("Logged out successfully");

    navigate("/");
  };

  const saveProfile = () => {
    localStorage.setItem("userName", user.name);

    localStorage.setItem("userEmail", user.email);

    toast.success("Profile updated");

    setEdit(false);
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div
        className="
        w-full max-w-md
        bg-white/90
        backdrop-blur-lg
        border border-gray-200
        rounded-3xl
        p-7
        shadow-xl
        hover:shadow-2xl
        transition-all
        duration-500
        "
      >
        {/* Heading */}

        <h1 className="text-2xl font-bold text-center mb-7">My Profile</h1>

        {/* Avatar */}

        <div className="flex justify-center mb-8">
          <div
            className="
            w-20 h-20
            rounded-full
            bg-linear-to-br
            from-gray-200
            to-gray-300

            flex
            items-center
            justify-center

            text-3xl
            font-bold

            shadow-lg

            transition-all
            duration-500

            hover:scale-110
            hover:rotate-6
            "
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Name */}

        <div className="mb-5">
          <label className="text-sm font-semibold text-gray-600">Name</label>

          <input
            type="text"
            value={user.name}
            disabled={!edit}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
            className="
            w-full
            mt-2
            px-4
            py-3

            border
            border-gray-300

            rounded-xl

            outline-none

            transition-all
            duration-300

            focus:ring-2
            focus:ring-gray-400

            hover:shadow-md

            disabled:bg-gray-50
            "
          />
        </div>

        {/* Email */}

        <div className="mb-7">
          <label className="text-sm font-semibold text-gray-600">Email</label>

          <input
            type="email"
            value={user.email}
            disabled={!edit}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            className="
            w-full
            mt-2
            px-4
            py-3

            border
            border-gray-300

            rounded-xl

            outline-none

            transition-all
            duration-300

            focus:ring-2
            focus:ring-gray-400

            hover:shadow-md

            disabled:bg-gray-50
            "
          />
        </div>

        {/* Buttons */}

        <div className="flex gap-3">
          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="
              flex-1

              bg-black
              text-white

              py-3

              rounded-xl

              font-medium

              transition-all
              duration-300

              hover:scale-105
              hover:shadow-lg
              "
            >
              Edit
            </button>
          ) : (
            <button
              onClick={saveProfile}
              className="
              flex-1

              bg-green-600
              text-white

              py-3

              rounded-xl

              font-medium

              transition-all
              duration-300

              hover:scale-105
              hover:shadow-lg
              "
            >
              Save
            </button>
          )}

          <button
            onClick={logout}
            className="
            flex-1

            bg-red-500
            text-white

            py-3

            rounded-xl

            font-medium

            transition-all
            duration-300

            hover:scale-105
            hover:shadow-lg
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
