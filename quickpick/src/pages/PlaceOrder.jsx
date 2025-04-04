import React from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const[method,setMethod] = useState('');
  const {navigate,backendUrl, token, cartItem, setCartItem,getCartAmount,delivery_fee,products} = useContext(ShopContext);

  const[formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  })

  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data)=>({...data,[name]:value}));
  }

  const initPay = (order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount:order.amout,
      currency:order.currency,
      name:"Order Payment",
      description:"Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async(response) =>{
        console.log(response);
        try {
          const {data} = await axios.post(`${backendUrl}/api/v1/orders/verifyRazorpay`, response, {headers:{token}})
          if(data.success){
            toast.success(data.message)
            navigate('/order')
            setCartItem({})
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open();
  }

  const handleClick = async(e)=>{
    e.preventDefault();
    try {
      let orderItems = [];
      for(const items in cartItem){
        for(const item in cartItem[items]){
          if(cartItem[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      

      switch(method){
        case 'COD':
          const respone = await axios.post(`${backendUrl}/api/v1/orders/place-order`, orderData,{headers:{token}})
          if(respone.status === 200){
            toast.success("Order placed successfully keep shopping")
            setCartItem({})
            navigate('/order')
            
          }else{
            toast.error(respone.data.message)
          }
          break;

        case 'razorPay':
          const response = await axios.post(`${backendUrl}/api/v1/orders/razorpay`, orderData,{headers:{token}})
          if(response.status === 200){
            initPay(response.data.order);
          }
        default:

        break
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
    
  }


  return (
    <form onClick={handleClick} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 mb-60 sm:pt-14 min-h[80vh] border-t '>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input type="text" onChange={handleChange} name='firstName' value={formData.firstName} placeholder="First Name" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          <input type="text" onChange={handleChange} name='lastName' value={formData.lastName} placeholder="Last Name" className="w-full border border-gray-300 rounded-md px-4 py-2" />
        </div>
        <input type="email" onChange={handleChange} name='email' value={formData.email} placeholder="Email" className="w-full border border-gray-300 rounded-md px-4 py-2" />
        <input type="number" onChange={handleChange} name='phoneNumber' value={formData.phoneNumber} placeholder="Phone Number" className="w-full border border-gray-300 rounded-md px-4 py-2" />
        <textarea type="text" onChange={handleChange} name='address' value={formData.address} placeholder="Address" className="w-full border border-gray-300 rounded-md px-4 py-2" />
        <div className='flex gap-3'>
          <input type="text" onChange={handleChange} name='city' value={formData.city} placeholder="City" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          <input type="text" onChange={handleChange} name='state' value={formData.state} placeholder="State" className="w-full border border-gray-300 rounded-md px-4 py-2" />
        </div>
        <div className='flex gap-3'>
          <input type="text" onChange={handleChange} name='country' value={formData.country}  placeholder="Country" className="w-full border border-gray-300 rounded-md px-4 py-2" />
          <input type="number" onChange={handleChange} name='zipCode' value={formData.zipCode} placeholder="Zip Code" className="w-full border border-gray-300 rounded-md px-4 py-2" />
        </div>
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          <div className='flex flex-col lg:flex-row gap-3'>
            {/* <div onClick={()=> setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div> */}
            <div onClick={()=> setMethod('razorPay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorPay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=> setMethod('COD')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'COD' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-md font-medium mx-4'>Cash on delivery</p>
            </div>
          </div>
        </div>

        <div className='w-full sm:text-end text-center mt-8'>
          <button type='submit' className='bg-black text-white text-md px-14 py-3'>Place Order</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
