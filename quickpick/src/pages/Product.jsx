import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import Title from "../components/Title";

const Product = () => {
  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  console.log(size);

  useEffect(() => {
    fetchProduct();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="Product Image"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto object-cover" alt="" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium sm:text-2xl text-lg">
            {productData.name}
          </h1>
          <div className="flex gap-2 mt-2 items-center">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2"> (1,20,897)</p>
          </div>
          <p className="mt-3 text-2xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-3 text-gray-500 text-lg md:w-4/5 leading-normal">
            {productData.description}
          </p>
          <div className="flex gap-4 flex-col mt-8">
            <p className="text-lg font-medium">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 bg-gray-200 ${
                    item === size
                      ? "border-x-slate-800 bg-slate-950 text-slate-100"
                      : ""
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => addToCart(productData._id ,size)}
          className="bg-slate-950 text-slate-100 sm:text-base text-sm px-8 py-3 mt-4 shadow-xl active:bg-gray-300 active:text-gray-950 hover:bg-gray-300 hover:text-gray-950">
            ADD TO CART
          </button>
          <div className="border-t mt-8">
            <p className="mt-8 mb-2 text-gray-400 text-md">
              100% Original product.
            </p>
            <p className="mt-2 mb-2 text-gray-400 text-md">
              Cash on delivery is available on this product.
            </p>
            <p className="mt-2 mb-2 text-gray-400 text-md">
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(1,20,897)</p>
        </div>
        <div className="border py-8 px-5">
          <p className="text-gray-500 text-md">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p className="text-gray-500 text-md mt-5">
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      <div className="mt-20 text-center sm:text-3xl text-lg">
        <Title text1={'RELATED'} text2={'PRODUCTS'}/>
          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
