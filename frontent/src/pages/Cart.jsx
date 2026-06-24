import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, cartItems, currency, delivery_fee, setCartItems } =
    useContext(ShopContext);

  const navigate = useNavigate();

  // ================= UPDATE QUANTITY =================
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
  };

  // ================= SUBTOTAL =================
  const getSubTotal = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);

      for (const size in cartItems[itemId]) {
        totalAmount += itemInfo.price * cartItems[itemId][size];
      }
    }

    return totalAmount;
  };

  return (
    <div className="pt-14">
      {/* TITLE */}
      <div className="text-2xl mb-8">
        <h1 className="font-medium text-gray-700">YOUR CART</h1>
      </div>

      {/* CART ITEMS */}
      <div>
        {Object.keys(cartItems).length > 0 ? (
          Object.keys(cartItems).map((itemId) => {
            const productData = products.find(
              (product) => product._id === itemId,
            );

            return Object.keys(cartItems[itemId]).map((size) => (
              <div
                key={size}
                className="py-6 border-y text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                {/* PRODUCT */}
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt=""
                  />

                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>

                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 bg-slate-100">
                        {size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(itemId, size, cartItems[itemId][size] - 1)
                    }
                    className="w-8 h-8 bg-gray-100 text-lg rounded-full hover:bg-black hover:text-white transition"
                  >
                    -
                  </button>

                  <p className="text-sm font-medium w-5 text-center">
                    {cartItems[itemId][size]}
                  </p>

                  <button
                    onClick={() =>
                      updateQuantity(itemId, size, cartItems[itemId][size] + 1)
                    }
                    className="w-8 h-8 bg-gray-100 text-lg rounded-full hover:bg-black hover:text-white transition"
                  >
                    +
                  </button>
                </div>

                {/* DELETE */}
                <img
                  onClick={() => updateQuantity(itemId, size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            ));
          })
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">Your Cart Is Empty</p>
          </div>
        )}
      </div>

      {/* TOTAL */}
      {Object.keys(cartItems).length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-112.5">
            <div className="flex justify-between py-3 border-b">
              <p>Subtotal</p>
              <p>
                {currency}
                {getSubTotal()}
              </p>
            </div>

            <div className="flex justify-between py-3 border-b">
              <p>Shipping Fee</p>
              <p>
                {currency}
                {delivery_fee}
              </p>
            </div>

            <div className="flex justify-between py-3 font-semibold">
              <p>Total</p>
              <p>
                {currency}
                {getSubTotal() + delivery_fee}
              </p>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 transition"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
