import React from 'react'
import {RiHome2Fill} from 'react-icons/ri'
import {FaStore,FaUserFriends,FaUsers} from 'react-icons/fa'
import {TfiTag} from 'react-icons/tfi'
import {IoFlag} from 'react-icons/io5'
import { MdOutlineFavorite } from "react-icons/md";
import {NavLink} from 'react-router-dom'

const menuOptions = [
    {
        label : 'Home',
        icon: <RiHome2Fill size={20} className='text-blue-500'/>,
        bgColor: 'bg-blue-500/10',
        path: '/home'
    },
    {
        label : 'Frinds',
        icon: <FaUserFriends size={20} className='text-green-500'/>,
        bgColor: 'bg-green-500/10',
        path: '/frinds'
    },
    {
        label : 'Groups',
        icon: <FaUsers size={20} className='text-orange-500'/>,
        bgColor: 'bg-orange-500/10',
        path: '/groups'
    },
    {
        label : 'Marketplace',
        icon: <FaStore size={20} className='text-violet-500'/>,
        bgColor: 'bg-violet-500/10',
        path: '/marketplace'
    },
    {
        label : 'Saved',
        icon: <TfiTag size={20} className='text-red-500'/>,
        bgColor: 'bg-red-500/10',
        path: '/saved'
    },
    {
        label : 'Pages',
        icon: <IoFlag size={20} className='text-sky-500'/>,
        bgColor: 'bg-sky-500/10',
        path: '/pages'
    },
    {
        label : 'Favorites',
        icon: <MdOutlineFavorite size={20} className='text-pink-500'/>,
        bgColor: 'bg-pink-500/10',
        path: '/favorites'
    }
]




export default function Sidebar() {
  return (
    <>
        <div className="p-4 rounded-lg">
            <div className="flex flex-col gap-1">
                {menuOptions.map((options)=>(
                    <NavLink key={options.label} to={options.path} className={({isActive})=>`flex items-center gap-2 rounded-xl p-2 ${isActive ? options.bgColor : ''}`}>
                        <div className = {`${options.bgColor} p-2 rounded-full`} >
                            {options.icon}
                        </div>
                        <span className='text-sm font-medium'>{options.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    </>
  )
}
