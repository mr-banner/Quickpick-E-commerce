import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [sortType, setSortType] = useState("relavant");

  const handleCategoryChange = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories(categories.filter((item) => item !== e.target.value));
    } else {
      setCategories([...categories, e.target.value]);
    }
  };

  const handleTypeChange = (e) => {
    if (types.includes(e.target.value)) {
      setTypes(types.filter((item) => item !== e.target.value));
    } else {
      setTypes([...types, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];
    if(categories.length > 0){
      productsCopy = productsCopy.filter((item) => categories.includes(item.category));
    }

    if(types.length > 0){
      productsCopy = productsCopy.filter((item) => types.includes(item.subCategory));
    }

    if(search && showSearch){
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredProducts(productsCopy);
  }

  const sortProducts = ()=>{
    let productsCopy = [...filteredProducts];

    switch (sortType) {
      case 'low-high':
          setFilteredProducts(productsCopy.sort((a,b)=> a.price - b.price));
        break;
      case 'high-low':
          setFilteredProducts(productsCopy.sort((a,b)=> b.price - a.price));
          break;
      default:
        applyFilter()
        break;
    }
  }


  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  },[categories,types,search,showSearch,products]);

  useEffect(() => {
    sortProducts();
  },[sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-6">
      <div className="min-w-60">
        <p className="text-2xl flex items-center cursor-pointer gap-3">
          FILTERS
          <img
            onClick={handleFilterClick}
            src={assets.dropdown_icon}
            alt="Icon"
            className={`h-4 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-md font-light text-gray-700">
            <p className="flex gap-3">
              <input type="checkbox" value={"Men"} className="w-3" onChange={handleCategoryChange} />
              Men
            </p>
            <p className="flex gap-3">
              <input type="checkbox" value={"Women"} className="w-3" onChange={handleCategoryChange}/>
              Women
            </p>
            <p className="flex gap-3">
              <input type="checkbox" value={"Kids"} className="w-3" onChange={handleCategoryChange}/>
              Kids
            </p>
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-md font-light text-gray-700">
            <p className="flex gap-3">
              <input type="checkbox" value={"Topwear"} className="w-3" onChange={handleTypeChange} />
              Topwear
            </p>
            <p className="flex gap-3">
              <input type="checkbox" value={"Bottomwear"} className="w-3" onChange={handleTypeChange}/>
              Bottomwear
            </p>
            <p className="flex gap-3">
              <input type="checkbox" value={"Winterwear"} className="w-3" onChange={handleTypeChange}/>
              Winterwear
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-4 mt-6 sm:mt-0 text-base sm:text-2xl">
          <Title text1={"ALL"} text2={"PRODUCTS"} />
          <select onChange={(e)=>setSortType(e.target.value)} className="border border-gray-300 text-sm p-2">
            <option value="relavant">Sort by: relavant</option>
            <option value="low-high">Sort by: low-high</option>
            <option value="high-low">Sort by: high-low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
