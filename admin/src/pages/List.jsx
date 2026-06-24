import axios from "axios";
import React, { useEffect, useState } from "react";

import { BACKEND_URL, currency } from "../App";

import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/product/remove",

        {
          productId: id,
        },

        {
          headers: {
            token,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);

        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full px-4 py-3">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">All Products</h1>

        <p className="text-gray-500 mt-2">Manage all your products here</p>
      </div>

      {/* TABLE HEADER */}

      <div
        className="
        hidden

        md:grid

        grid-cols-[90px_3fr_1.5fr_1fr_80px]

        bg-gray-100

        rounded-2xl

        px-6

        py-4

        font-medium

        text-gray-700

        mb-4
        "
      >
        <p>Image</p>

        <p>Name</p>

        <p>Category</p>

        <p>Price</p>

        <p>Delete</p>
      </div>

      {/* PRODUCT LIST */}

      <div className="flex flex-col gap-4">
        {list.map((item) => (
          <div
            key={item._id}
            className="
            grid

            md:grid-cols-[90px_3fr_1.5fr_1fr_80px]

            gap-4

            items-center

            bg-white

            border

            border-gray-200

            rounded-2xl

            px-5

            py-4

            shadow-sm

            

            transition-all

            duration-300
            "
          >
            {/* IMAGE */}

            <img
              className="
              w-16

              h-16

              object-cover

              rounded-xl

              bg-gray-100
              "
              src={item.image[0]}
              alt=""
            />

            {/* NAME */}

            <p className="font-medium text-gray-800">{item.name}</p>

            {/* CATEGORY */}

            <p className="text-gray-500">{item.category}</p>

            {/* PRICE */}

            <p className="font-semibold text-gray-800">
              {currency}
              {item.price}
            </p>

            {/* DELETE */}

            <button
              onClick={() => removeProduct(item._id)}
              className="
              w-10

              h-10

              rounded-full

              flex

              items-center

              justify-center

              text-red-500

              hover:bg-red-50

             

              transition-all

              duration-300
              "
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
