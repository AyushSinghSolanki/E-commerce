import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const handleAddToCart = () => {
    if (!size) {
      toast.error("Please select a size");

      return;
    }

    addToCart(productData._id, size);

    toast.success(`${productData.name} added to cart 🛒`, {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });
  };

  // ================= CONTEXT =================
  const { products, currency, addToCart } = useContext(ShopContext);

  // ================= STATES =================
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const [size, setSize] = useState("");

  // ================= FETCH PRODUCT =================
  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);

    if (foundProduct) {
      setProductData(foundProduct);

      setImage(foundProduct.image[0]);
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    if (products.length > 0) {
      fetchProductData();
    }
  }, [productId, products]);

  // ================= LOADING =================
  if (!productData) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">Loading...</div>
    );
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ================= PRODUCT DATA ================= */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* ================= PRODUCT IMAGES ================= */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* ================= SMALL IMAGES ================= */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer border border-gray-300"
                alt=""
              />
            ))}
          </div>

          {/* ================= MAIN IMAGE ================= */}
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="flex-1">
          {/* ================= PRODUCT NAME ================= */}
          <h1 className="font-medium text-3xl mt-2">{productData.name}</h1>

          {/* ================= RATING ================= */}
          <div className="flex items-center gap-1 mt-3">
            <p className="text-yellow-500">★★★★☆</p>

            <p className="text-sm text-gray-500">(122 Reviews)</p>
          </div>

          {/* ================= PRICE ================= */}
          <p className="mt-5 text-3xl font-semibold">
            {currency}
            {productData.price}
          </p>

          {/* ================= DESCRIPTION ================= */}
          <p className="mt-5 text-gray-500 md:w-4/5 leading-6">
            {productData.description ||
              "Premium quality product with modern design and comfortable fabric. Perfect for daily wear and casual styling."}
          </p>

          {/* ================= SIZE SECTION ================= */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Select Size</p>

            <div className="flex gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border px-5 py-2 transition ${
                    item === size ? "bg-black text-white" : "bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ================= ADD TO CART ================= */}
          <button
            onClick={handleAddToCart}
            className="
    bg-black
    text-white
    px-8
    py-3
    text-sm
    rounded-lg
    active:bg-gray-700
    hover:bg-gray-800
    hover:scale-105
    transition-all
    duration-300
  "
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          {/* ================= EXTRA INFO ================= */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-2">
            <p>✔ 100% Original Product.</p>

            <p>✔ Cash on delivery available.</p>

            <p>✔ Easy return and exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ================= DESCRIPTION & REVIEWS ================= */}
      <div className="mt-20">
        {/* ================= TAB BUTTONS ================= */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("description")}
            className={`border px-5 py-3 text-sm ${
              activeTab === "description" ? "bg-black text-white" : ""
            }`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`border px-5 py-3 text-sm ${
              activeTab === "reviews" ? "bg-black text-white" : ""
            }`}
          >
            Reviews (122)
          </button>
        </div>

        {/* ================= DESCRIPTION CONTENT ================= */}
        {activeTab === "description" && (
          <div className="border px-6 py-6 text-sm text-gray-500 leading-7">
            <p>
              This premium fashion product is designed with high-quality fabric
              and modern styling. It offers superior comfort, durability, and
              trendy looks suitable for every occasion.
            </p>

            <br />

            <p>
              The breathable material and perfect fitting make it ideal for
              daily use. Pair it with jeans, trousers, or jackets to create a
              stylish outfit.
            </p>
          </div>
        )}

        {/* ================= REVIEWS CONTENT ================= */}
        {activeTab === "reviews" && (
          <div className="border px-6 py-6">
            {/* ================= REVIEW 1 ================= */}
            <div className="border-b pb-5 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>

                <div>
                  <h3 className="font-medium">Nakul Bana</h3>

                  <p className="text-yellow-500 text-sm">★★★★★</p>
                </div>
              </div>

              <p className="text-gray-500 text-sm mt-3 leading-6">
                Amazing quality product. Fabric is soft and fitting is perfect.
                Totally worth the price.
              </p>
            </div>

            {/* ================= REVIEW 2 ================= */}
            <div className="border-b pb-5 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>

                <div>
                  <h3 className="font-medium">Saniya Qureshi</h3>

                  <p className="text-yellow-500 text-sm">★★★★☆</p>
                </div>
              </div>

              <p className="text-gray-500 text-sm mt-3 leading-6">
                Product looks exactly like the images. Delivery was fast and
                packaging was good.
              </p>
            </div>

            {/* ================= REVIEW 3 ================= */}
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>

                <div>
                  <h3 className="font-medium">Ayush Solanki</h3>

                  <p className="text-yellow-500 text-sm">★★★★★</p>
                </div>
              </div>

              <p className="text-gray-500 text-sm mt-3 leading-6">
                Very comfortable and stylish. I will definitely buy more
                products from this store.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
