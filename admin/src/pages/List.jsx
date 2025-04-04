import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import Loading from '../components/deleteloader/DeleteLoader';

const List = ({token}) => {
  const price = "$"
  const [products,setProducts] = useState([]);
  const[loading,setLoading] = useState(false)

  const fetchProduct = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/v1/products/getAllProducts")
      if(response.status === 200){
        setProducts(response.data.data);
      }else{
        toast.error(error.response?.data?.errors)
      }
      
    } catch (error) {
      toast.error(error.response?.data?.errors);
    }
  }

  useEffect(()=>{
    fetchProduct();
  },[products])

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      console.log(loading);
      
      const response = await axios.delete(`${backendUrl}/api/v1/products/deleteProduct/${String(id)}`, {
        headers: { token }
      });
      
  
      if (response.status === 200) {
        setLoading(false)
        setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
        toast.success(response.data.message || "Product deleted successfully!");
      }
  
    } catch (error) {
      setLoading(false);
      console.error("Error deleting product:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };
  



  return loading ? (<Loading/>) : (
    <>
    <div>
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-200 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>
      {
        products.map((product,index) => (
          <div key={index} className=' mt-2 grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border gap-2 border-gray-300 text-sm'>
            <img className='w-20' src={product.image[0]} alt="" />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{price}{product.price}</p>
            <p onClick={() => deleteProduct(product._id)} className='mb-5.5'><img className='w-5 h-5 absolute right-[175px]  text-center cursor-pointer' src={assets.delete_icon} alt="" /></p>
          </div>
        ))
      }
    </div>
    </>
  )
}

export default List
