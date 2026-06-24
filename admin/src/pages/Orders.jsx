import React, { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

import { motion } from "framer-motion";

import { Package, MapPin, IndianRupee } from "lucide-react";

const Orders = ({ token }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [orders, setOrders] = useState([]);

  // ================= FETCH ORDERS =================

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/list",

        {},

        {
          headers: {
            token,
          },
        },
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= UPDATE STATUS =================

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/status",

        {
          orderId,

          status: event.target.value,
        },

        {
          headers: {
            token,
          },
        },
      );

      if (response.data.success) {
        toast.success("Status Updated ✅");

        fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Out for delivery":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Packing":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full px-5 py-6">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Orders</h1>

          <p className="text-gray-500 mt-2">Manage customer orders</p>
        </div>

        <div
          className="
          flex

          items-center

          gap-2

          bg-black

          text-white

          px-5

          py-3

          rounded-2xl

          shadow-sm
          "
        >
          <Package size={18} />

          {orders.length}
        </div>
      </div>

      {/* EMPTY STATE */}

      {orders.length === 0 ? (
        <div
          className="
          flex

          flex-col

          items-center

          justify-center

          py-24
          "
        >
          <Package size={60} className="text-gray-400" />

          <p className="mt-5 text-gray-500 text-xl">No Orders Yet</p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.04,
              }}
              className="
              bg-white/95

              backdrop-blur-lg

              rounded-3xl

              p-6

              shadow-sm


              transition-all

              duration-300
              "
            >
              <div
                className="
                flex

                flex-col

                lg:flex-row

                justify-between

                gap-8
                "
              >
                {/* LEFT */}

                <div className="flex-1">
                  {/* CUSTOMER */}

                  <h2
                    className="
                    text-lg

                    font-semibold

                    text-gray-900
                    "
                  >
                    {order.address.firstName} {order.address.lastName}
                  </h2>

                  {/* ADDRESS */}

                  <div
                    className="
                    flex

                    items-center

                    gap-2

                    text-gray-500

                    mt-3
                    "
                  >
                    <MapPin size={16} />

                    <span>
                      {order.address.city}, {order.address.country}
                    </span>
                  </div>

                  {/* ITEMS */}

                  <div className="mt-6">
                    <p className="font-medium mb-3">Ordered Items</p>

                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="
                            flex

                            items-center

                            gap-3

                            text-gray-600
                            "
                        >
                          <div
                            className="
                              w-2

                              h-2

                              rounded-full

                              bg-black
                              "
                          />

                          <p>
                            {item.name}
                            {" × "}
                            {item.quantity} ({item.size})
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div
                  className="
                  flex

                  flex-col

                  gap-5

                  `min-w-55
                  "
                >
                  {/* PRICE */}

                  <div>
                    <p className="text-gray-500 text-sm">Total Amount</p>

                    <div
                      className="
                      flex

                      items-center

                      gap-1

                      text-2xl

                      font-bold
                      "
                    >
                      <IndianRupee size={20} />

                      {order.amount}
                    </div>
                  </div>

                  {/* CURRENT STATUS */}

                  <div>
                    <span
                      className={`
                      px-4

                      py-2

                      rounded-full

                      text-sm

                      font-medium

                      ${getStatusColor(order.status)}
                      `}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* STATUS SELECT */}

                  <select
                    value={order.status}
                    onChange={(e) =>
                      statusHandler(
                        e,

                        order._id,
                      )
                    }
                    className="
                    w-full

                    border

                    border-gray-300

                    rounded-2xl

                    px-4

                    py-3

                    outline-none

                    focus:border-black

                    transition-all
                    "
                  >
                    <option>Order Placed</option>

                    <option>Packing</option>

                    <option>Shipped</option>

                    <option>Out for delivery</option>

                    <option>Delivered</option>
                  </select>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
