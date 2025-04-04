import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Orders'
import AdminLogin from './components/AdminLogin'
import { Routes , Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
// console.log(backendUrl);


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || "")

  useEffect(()=>{
    if(token){
      localStorage.setItem('token',token);
    }
  },[token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token !== "" ? 
      <>
      <Navbar setToken={setToken}/>
      <hr className='text-gray-200'/>
      <div className='flex w-full'>
        <Sidebar/>
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base '>
          <Routes>
            <Route path='/add' element={<Add token = {token}/>}/>
            <Route path='/list' element={<List token = {token}/>}/>
            <Route path='/order' element={<Order token = {token}/>}/>
          </Routes>
        </div>
      </div>
    </>:<AdminLogin setToken = {setToken}/>
    }
    
    </div>
  )
}

export default App
