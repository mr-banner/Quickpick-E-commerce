import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-200'>
      <div className='flex flex-col gap-4 pl-[20%] pt-6 text-[15px]'>
        <NavLink to='/add' className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-sm">
            <img src={assets.add_icon} className='w-7 h-7' alt="" />
            <p className='hidden md:block'>Add items</p>
        </NavLink>
        <NavLink to='/list' className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-sm">
            <img src={assets.list_icon} className='w-7 h-7' alt="" />
            <p className='hidden md:block'>List items</p>
        </NavLink>
        <NavLink to='/order' className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-sm">
            <img src={assets.order_icon} className='w-7 h-7' alt="" />
            <p className='hidden md:block'>Order items</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
