import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem.jsx";

const Collection = () => {
  // ================= CONTEXT =================
  const { products, search } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // ================= FILTER + SEARCH + SORT =================
  useEffect(() => {
    let productsCopy = products.slice();

    // ================= SEARCH FILTER =================
    if (search.trim() !== "") {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // ================= CATEGORY FILTER =================
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    // ================= SUBCATEGORY FILTER =================
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    // ================= SORTING =================
    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
  }, [products, category, subCategory, sortType, search]);

  // ================= CATEGORY TOGGLE =================
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // ================= SUBCATEGORY TOGGLE =================
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10">
      {/* ================= FILTER SECTION ================= */}
      <div className="min-w-60">
        {/* ================= MOBILE FILTER TOGGLE ================= */}
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </p>

        {/* ================= CATEGORY FILTER ================= */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                value="Men"
                checked={category.includes("Men")}
                onChange={toggleCategory}
              />
              Men
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                value="Women"
                checked={category.includes("Women")}
                onChange={toggleCategory}
              />
              Women
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                value="Kids"
                checked={category.includes("Kids")}
                onChange={toggleCategory}
              />
              Kids
            </label>
          </div>
        </div>

        {/* ================= TYPE FILTER ================= */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                value="Topwear"
                checked={subCategory.includes("Topwear")}
                onChange={toggleSubCategory}
              />
              Topwear
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                value="Bottomwear"
                checked={subCategory.includes("Bottomwear")}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                value="Winterwear"
                checked={subCategory.includes("Winterwear")}
                onChange={toggleSubCategory}
              />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS SECTION ================= */}
      <div className="flex-1">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            ALL <span className="text-black">COLLECTIONS</span>
          </h2>

          {/* ================= SORT DROPDOWN ================= */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className="border border-gray-300 text-sm px-3 py-2 outline-none"
          >
            <option value="relevant">Sort by: Relevant</option>

            <option value="low-high">Sort by: Low to High</option>

            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-gray-500 text-lg">No Products Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
