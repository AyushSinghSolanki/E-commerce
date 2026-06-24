import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

import { motion } from "framer-motion";

import { Package, CreditCard, ShoppingBag } from "lucide-react";

const Orders = () => {
  const { backend_url, token, currency } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);

  // ================= FETCH ORDERS =================

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/userorders",

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
      console.log(error);

      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // ================= STATUS COLOR =================

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
    <div className="border-t pt-12 px-4 sm:px-8 min-h-screen">
      {/* TITLE */}

      <div className="mb-10">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {/* EMPTY */}

      {orders.length === 0 ? (
        <div
          className="
          flex

          flex-col

          items-center

          justify-center

          py-28
          "
        >
          <ShoppingBag size={60} className="text-gray-400" />

          <h2 className="mt-5 text-2xl font-semibold">No Orders Yet</h2>

          <p className="text-gray-500 mt-2">Your orders will appear here</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, orderIndex) => (
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
                delay: orderIndex * 0.05,
              }}
              className="
              bg-white

              rounded-3xl

              border

              border-gray-200

              shadow-sm

             

              transition-all

              duration-300

              p-6
              "
            >
              {/* ITEMS */}

              <div className="space-y-6">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="
                    flex

                    flex-col

                    lg:flex-row

                    lg:items-center

                    lg:justify-between

                    gap-6

                    border-b

                    last:border-0

                    pb-6

                    last:pb-0
                    "
                  >
                    {/* LEFT */}

                    <div
                      className="
                      flex

                      gap-5

                      flex-1
                      "
                    >
                      <div
                        className="
                        w-24

                        h-24

                        rounded-2xl

                        overflow-hidden

                        bg-gray-100

                        shrink-0
                        "
                      >
                        <img
                          src={item.image[0]}
                          alt=""
                          className="
                          w-full

                          h-full

                          object-cover

                          hover:scale-105

                          transition-all

                          duration-300
                          "
                        />
                      </div>

                      <div>
                        <h2
                          className="
                          text-lg

                          font-semibold

                          text-gray-900
                          "
                        >
                          {item.name}
                        </h2>

                        <div
                          className="
                          flex

                          flex-wrap

                          gap-3

                          mt-3

                          text-sm

                          text-gray-500
                          "
                        >
                          <span
                            className="
                            bg-gray-100

                            px-3

                            py-1

                            rounded-full
                            "
                          >
                            {currency}
                            {item.price}
                          </span>

                          <span
                            className="
                            bg-gray-100

                            px-3

                            py-1

                            rounded-full
                            "
                          >
                            Qty : {item.quantity}
                          </span>

                          <span
                            className="
                            bg-gray-100

                            px-3

                            py-1

                            rounded-full
                            "
                          >
                            Size : {item.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}

                    <div
                      className="
                      flex

                      flex-col

                      gap-4

                      lg:items-end
                      "
                    >
                      {/* PAYMENT */}

                      <div
                        className="
                        flex

                        items-center

                        gap-2

                        text-gray-600
                        "
                      >
                        <CreditCard size={18} />

                        <span>{order.paymentMethod}</span>
                      </div>

                      {/* STATUS */}

                      <div
                        className={`
                        px-4

                        py-2

                        rounded-full

                        text-sm

                        font-medium

                        w-fit

                        ${getStatusColor(order.status)}
                        `}
                      >
                        ● {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
