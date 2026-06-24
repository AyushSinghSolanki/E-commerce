import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const navigate = useNavigate();

  const { backend_url, setToken } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Sign Up");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      // LOGIN

      if (currentState === "Login") {
        response = await axios.post(backend_url + "/api/user/login", {
          email: formData.email,
          password: formData.password,
        });
      }

      // SIGN UP
      else {
        response = await axios.post(backend_url + "/api/user/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      // SUCCESS

      if (response.data.success) {
        // Token save

        if (response.data.token) {
          setToken(response.data.token);

          localStorage.setItem("token", response.data.token);
        }

        // Toast

        if (currentState === "Login") {
          toast.success("Login Successful 🎉");
        } else {
          toast.success("User Registered Successfully 🎉");
        }

        // Clear form

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        // Redirect to home page

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      // FAILURE
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* TITLE */}

      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>

        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* NAME */}

      {currentState === "Sign Up" && (
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-3 py-2 border border-gray-800"
          required
        />
      )}

      {/* EMAIL */}

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email address"
        className="w-full px-3 py-2 border border-gray-800"
        required
      />

      {/* PASSWORD */}

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full px-3 py-2 border border-gray-800"
        required
      />

      {/* LINKS */}

      <div className="w-full flex justify-between text-sm -mt-2">
        <p className="cursor-pointer">Forgot Password?</p>

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      {/* BUTTON */}

      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4 hover:opacity-80"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
