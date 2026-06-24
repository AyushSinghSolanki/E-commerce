import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);

  const [related, setRelated] = useState([]);

  // ================= FETCH RELATED PRODUCTS =================
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      // ================= CATEGORY FILTER =================
      productsCopy = productsCopy.filter((item) => item.category === category);

      // ================= SUBCATEGORY FILTER =================
      productsCopy = productsCopy.filter(
        (item) => item.subCategory === subCategory,
      );

      // ================= LIMIT PRODUCTS =================
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      {/* ================= TITLE ================= */}
      <div className="text-center text-3xl py-2">
        <h2 className="font-semibold text-gray-700">
          RELATED <span className="text-black">PRODUCTS</span>
        </h2>
      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 gap-y-6 mt-6">
        {related.length > 0 ? (
          related.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-gray-500">No Related Products Found</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
