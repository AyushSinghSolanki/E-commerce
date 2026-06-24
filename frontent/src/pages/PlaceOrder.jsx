import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  const {
    cartItems,
    products,
    currency,
    delivery_fee,
    backend_url,
    token,
    setCartItems,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const [method, setMethod] = useState("stripe");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getSubtotal = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);

      if (!product) continue;

      for (const size in cartItems[itemId]) {
        total += product.price * cartItems[itemId][size];
      }
    }

    return total;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      let orderItems = [];

      for (const itemId in cartItems) {
        const product = products.find((p) => p._id === itemId);

        if (!product) continue;

        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            orderItems.push({
              ...product,
              size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getSubtotal() + delivery_fee,
      };

      // ================= COD =================

      if (method === "cod") {
        const response = await axios.post(
          backend_url + "/api/order/place",
          orderData,
          {
            headers: { token },
          },
        );

        if (response.data.success) {
          toast.success("Order placed successfully");

          setCartItems({});

          navigate("/order");
        } else {
          toast.error(response.data.message);
        }
      }

      // ================= STRIPE =================
      else if (method === "stripe") {
        const response = await axios.post(
          backend_url + "/api/order/stripe",
          orderData,
          {
            headers: { token },
          },
        );

        if (response.data.success) {
          window.location.replace(response.data.session_url);
        } else {
          toast.error(response.data.message);
        }
      }

      // ================= RAZORPAY =================
      else if (method === "razorpay") {
        const response = await axios.post(
          backend_url + "/api/order/razorpay",
          orderData,
          {
            headers: { token },
          },
        );

        if (response.data.success) {
          const order = response.data.order;

          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,

            amount: order.amount,

            currency: order.currency,

            name: "Forever",

            description: "Order Payment",

            order_id: order.id,

            prefill: {
              name: `${formData.firstName} ${formData.lastName}`,

              email: formData.email,

              contact: formData.phone,
            },

            handler: function () {
              toast.success("Payment Successful");

              setCartItems({});

              navigate("/order");
            },

            modal: {
              ondismiss: function () {
                toast.info("Payment cancelled");
              },
            },

            theme: {
              color: "#000000",
            },
          };

          const rzp = new window.Razorpay(options);

          rzp.open();
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || error.message);
    }
  };

  const inputClass =
    "w-full p-3 rounded-lg border border-gray-300 outline-none focus:border-black";

  return (
    <form
      onSubmit={handlePlaceOrder}
      className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 py-6 border-t"
    >
      {/* LEFT */}

      <div className="w-full lg:w-[58%]">
        <h2 className="text-2xl font-semibold mb-6">Delivery Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            className={inputClass}
            onChange={handleChange}
            required
          />

          <input
            name="lastName"
            placeholder="Last Name"
            className={inputClass}
            onChange={handleChange}
            required
          />
        </div>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className={`${inputClass} mt-4`}
          onChange={handleChange}
          required
        />

        <input
          name="street"
          placeholder="Street"
          className={`${inputClass} mt-4`}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            name="city"
            placeholder="City"
            className={inputClass}
            onChange={handleChange}
            required
          />

          <input
            name="state"
            placeholder="State"
            className={inputClass}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            name="zipcode"
            placeholder="Zipcode"
            className={inputClass}
            onChange={handleChange}
            required
          />

          <input
            name="country"
            placeholder="Country"
            className={inputClass}
            onChange={handleChange}
            required
          />
        </div>

        <input
          name="phone"
          placeholder="Phone"
          className={`${inputClass} mt-4`}
          onChange={handleChange}
          required
        />
      </div>

      {/* RIGHT */}

      <div className="w-full lg:w-[38%]">
        <h2 className="text-2xl font-semibold mb-5">Cart Totals</h2>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <p>Subtotal</p>

            <p>
              {currency}
              {getSubtotal()}
            </p>
          </div>

          <div className="flex justify-between">
            <p>Delivery Fee</p>

            <p>
              {currency}
              {delivery_fee}
            </p>
          </div>

          <div className="flex justify-between font-bold border-t pt-4">
            <p>Total</p>

            <p>
              {currency}
              {getSubtotal() + delivery_fee}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>

        <div className="space-y-4">
          {/* Stripe */}

          <div
            onClick={() => setMethod("stripe")}
            className={`flex items-center justify-between border rounded-xl px-5 py-3 cursor-pointer hover:shadow ${
              method === "stripe" ? "border-black" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <img src={assets.stripe_logo} alt="" className="w-14" />

              <div>
                <h3 className="font-semibold">Stripe</h3>

                <p className="text-sm text-gray-500">Credit / Debit Card</p>
              </div>
            </div>

            <input type="radio" checked={method === "stripe"} readOnly />
          </div>

          {/* Razorpay */}

          <div
            onClick={() => setMethod("razorpay")}
            className={`flex items-center justify-between border rounded-xl px-5 py-3 cursor-pointer hover:shadow ${
              method === "razorpay" ? "border-black" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <img src={assets.razorpay_logo} alt="" className="w-14" />

              <div>
                <h3 className="font-semibold">Razorpay</h3>

                <p className="text-sm text-gray-500">UPI, Card, Net Banking</p>
              </div>
            </div>

            <input type="radio" checked={method === "razorpay"} readOnly />
          </div>

          {/* COD */}

          <div
            onClick={() => setMethod("cod")}
            className={`flex items-center justify-between border rounded-xl px-5 py-3 cursor-pointer hover:shadow ${
              method === "cod" ? "border-black" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">💵</div>

              <div>
                <h3 className="font-semibold">Cash On Delivery</h3>

                <p className="text-sm text-gray-500">Pay when delivered</p>
              </div>
            </div>

            <input type="radio" checked={method === "cod"} readOnly />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg mt-8 font-semibold hover:bg-gray-800"
        >
          PLACE ORDER
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
