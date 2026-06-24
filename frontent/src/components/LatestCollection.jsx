import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const sorted = [...products].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );

      setLatestProducts(sorted.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      {/* Heading */}
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals with premium quality and best designs.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.length > 0 ? (
          latestProducts.map((item) => (
            <ProductItem
              key={item._id || item.id}
              id={item._id || item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Loading products...
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;
