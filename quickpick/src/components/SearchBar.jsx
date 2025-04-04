import React, { useEffect } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
const SearchBar = () => {
    const { search, setSearch,showSearch,setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = React.useState(false);
    const location = useLocation();
    useEffect(() => {
        if(location.pathname.includes('collection')){
            setVisible(true); 
        }
        else{
            setVisible(false);
        }
    },[location])
  return showSearch && visible ? (
    <div className='border-b border-t bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-3 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='w-full flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
            <img src={assets.search_icon} className='h-4 cursor-pointer' alt="" />
        </div>
            <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} className='h-3 cursor-pointer inline' alt="cross" />
    </div>
  ) : null;
}

export default SearchBar
