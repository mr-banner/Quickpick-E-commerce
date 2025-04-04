import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { NavLink } from "react-router-dom";
import CartTotal from "../components/CartTotal";
const Cart = () => {
  const { products, currency, cartItem, updateQuantity , navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  if(products.length > 0){
    
  }
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
    }
  }, [cartItem,products]);

  return (
    <>
      <div className="  border-t pt-7 ">
        <div className="sm:text-xl text-l text-center mb-3">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        <div>
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={index}
                className="py-3 border-t border-b text-gray-700 grid grid-cols-[ 1fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-3"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20 "
                    src={productData.image[0]}
                    alt=""
                  />

                  <div>
                    <p className="text-s sm:text-lg font-medium ">
                      {" "}
                      {productData.name}
                    </p>
                    <div className="flex gap-2 items-center mt-3 ">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="font-semibold text-sm px-1 sm:px-2 sm:py-1 border bg-slate-50 ">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex sm:inline-flex sm:justify-between gap-3 items-center">
                  <input
                    onChange={(e) =>
                      e.target.value === " " || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 sm:py-2 text-center"
                  />
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal /> 
            <div className="w-full text-center sm:text-end  ">
            <button onClick={()=> navigate('/placeOrder')} className="bg-black text-white text-sm my-8 px-6 py-3">PROCEED TO CHECKOUT</button>
            </div> 
          </div>
        </div>
      </div>

    </>
  );
};

export default Cart;
