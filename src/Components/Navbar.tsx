import React, {FC, useState, useEffect, useCallback } from 'react'
import { Select, Option } from "@material-tailwind/react";

import Swal from 'sweetalert2';
import { AiOutlineHome } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router'
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../store/features/userSlice';
import logo from '../assets/logo.png'

interface myProps {
    handleSearch?: any
}


const Navbar:FC<myProps> = ({handleSearch}) => {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
    const [isOpen, setIsOpen] = useState(false);
    const [scroll, setScroll] = useState<any>()

    const dispatch = useDispatch()

    const goProfile = () => {
        navigate('/account')
    }

    const goHome = () => {
        navigate('/home')
    }


    const handleLogout = useCallback(() => {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Logout successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                dispatch(logout());
                removeCookie("userToken");
                navigate("/");
            }
        });
    }, []);

    useEffect(() => {
        if (!cookies.userToken) {
            dispatch(logout());
            navigate('/')
        }
    }, [cookies.userToken, dispatch, navigate]);



    const scrolly = addEventListener('scroll', function () {
        setScroll(window.scrollY)
    })

    window.scrollY
    return (
        <div className=' sticky w-full top-0 z-50'>
            {screen.width > 767
                ? <div className={`w-full h-20 2xl:h-28 flex flex-row justify-between px-10 items-center bg-white duration-500  shadow-md`}>
                    <img onClick={goHome} className='w-32 ml-8 h-32 mt-5 cursor-pointer' src={logo} />
                    <div className='flex bg-[#eeeeee] rounded-lg px-2 items-center' >
                        <input onChange={(e) => handleSearch(e.target.value) } type="text" className='outline-none py-2 px-4 w-72 text-md bg-transparent' />
                        <BiSearch className='text-[#4397fb] text-2xl  ' />
                    </div>
                    <div className="relative inline-block text-left">
                        <button
                            className="px-10 py-2 font-medium text-gray-700 bg-transparent rounded-md hover:bg-transparent outline-none focus:outline-none focus:ring-2 focus:ring-translate"
                            aria-haspopup="true"
                            aria-expanded={isOpen}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <CgProfile className={`text-4xl cursor-pointer text-[#4397fb]`} />
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 z-10 w-full mt-2 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-gray-200" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <div className="py-1" role="none">
                                    <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={goProfile}>Account</a>
                                    <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" >Log-out</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                : <div className='w-full h-20 fixed bottom-0 flex flex-row justify-around items-center bg-[#4397fb]'>
                    <AiOutlineHome onClick={goHome} className='text-4xl text-white cursor-pointer' />
                    <CgProfile onClick={goProfile} className='text-4xl cursor-pointer text-white' />
                </div>
            }
        </div>
    )
}

export default Navbar
