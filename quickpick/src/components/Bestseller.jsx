import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const Bestseller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestSellers = products?.filter((item) => item.bestSeller);
    setBestSeller(bestSellers?.slice(0, 5));
    // console.log(bestSeller);
    
  }, [products]);
  return (
    <div className="my-10">
      <div className="sm:text-3xl text-2xl text-center py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 text-xs md:text-base text-gray-600 sm:text-sm m-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller?.map((item,index) => (
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
