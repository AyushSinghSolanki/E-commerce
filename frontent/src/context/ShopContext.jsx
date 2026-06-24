import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [showSearch, setShowSearch] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState({});

  // ================= GET PRODUCTS =================

  const getProducts = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  // ================= ADD TO CART =================

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select product size");

      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};

      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    // Save in backend

    if (token) {
      try {
        await axios.post(
          backend_url + "/api/cart/add",

          { itemId, size },

          {
            headers: { token },
          },
        );
      } catch (error) {
        console.log(error);

        toast.error(error.message);
      }
    }
  };

  // ================= GET USER CART =================

  const getUserCart = async () => {
    try {
      const response = await axios.post(
        backend_url + "/api/cart/get",

        {},

        {
          headers: { token },
        },
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  // ================= CART COUNT =================

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }

    return totalCount;
  };

  // ================= LOAD PRODUCTS =================

  useEffect(() => {
    getProducts();
  }, []);

  // ================= LOAD CART AFTER LOGIN =================

  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  // ================= CONTEXT VALUE =================

  const value = {
    products,

    currency,

    delivery_fee,

    backend_url,

    navigate,

    search,

    setSearch,

    showSearch,

    setShowSearch,

    token,

    setToken,

    cartItems,

    setCartItems,

    addToCart,

    getCartCount,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
