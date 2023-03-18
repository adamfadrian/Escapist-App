import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'


const Profile = () => {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['userToken'])
    const [dataUser, setDataUser] = useState<any>([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('')
    const [address, setAddress] = useState('')
    const [isLoad, setIsLoad] = useState(false)


    const getUser = async () => {
        await axios.get('https://airbnb.my-extravaganza.site/users', {
            headers: {
                Authorization: `Bearer ${cookies.userToken}`
            }
        })
            .then((res) => {
                const response = [res.data.data]
                setDataUser(response)
                setName(res.data.data.name)
                setEmail(res.data.data.email)
                setPhone(res.data.data.phone_number)
                setSex(res.data.data.sex)
                setAddress(res.data.data.address)
            })
    }


    const updateProfile = async (e: any) => {
        e.preventDefault()
        await axios.put('https://airbnb.my-extravaganza.site/users', {
            "name": name,
            "email": email,
            "phone": phone,
            "sex": sex,
            "address": address
        }, {
            headers: {
                Authorization: `Bearer ${cookies.userToken}`
            }
        })
            .then((res) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "succesfully update user data",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
    }

    useEffect(() => {
        if (!cookies.userToken) {
            navigate('/login')
        }
        getUser()
    }, [cookies.userToken])


    const handleDelete = async (e: any) => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Are you sure?',
            text: "Are you sure want to delete Account",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
        })
        await axios.delete('https://airbnb.my-extravaganza.site/users', {
            headers: {
                Authorization: `Bearer ${cookies.userToken}`
            }
        }).then((res) => {
            if (res.data) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "successfully delete user data",
                    showConfirmButton: false,
                    timer: 1500,
                });
                removeCookie('userToken')
                navigate('/')
            }
        }).catch((err) => {
            Swal.fire({
                position: "center",
                icon: "error",
                text: "something went wrong",
                showConfirmButton: false,
                timer: 1500,
            });
        })
    }

    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')

    const handleChangePwd = async (e: any) => {
        setIsLoad(!isLoad)
        e.preventDefault()
        await axios.put('https://airbnb.my-extravaganza.site/users/password',
            {
                old_password: oldPass,
                new_password: newPass
            }, {
            headers: {
                Authorization: `Bearer ${cookies.userToken}`
            }
        }
        ).then((res) => {
            if (res.data) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "succesfully update password",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }

        }).catch((err) => {
            Swal.fire({
                position: "center",
                icon: "error",
                text: "something went wrong",
                showConfirmButton: false,
                timer: 1500,
            });
        })
        setIsLoad(false)
    }
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <Navbar />
            {isLoad ? <Loader /> : ''}
            <div className='px-10 py-10'>
                <h1 className='mb-10 text-2xl font-bold'>Profile</h1>
                <form action="" className='flex flex-col mb-20 '>
                    <div className='flex flex-row justify-center mb-20'>
                        <div className='btn btn-wide bg-white text-black mr-4 hover:text-white' onClick={(e) => handleDelete(e)}>
                            Delete Account
                        </div>
                        <div className=''>
                            <label className='btn btn-wide bg-white text-black hover:text-white' htmlFor="my-modal-3">Change password?</label>
                            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box relative flex flex-col gap-3">
                                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                    <label htmlFor="oldpass">Old password : </label>
                                    <input className='input input-bordered input-accent w-full' type={showPassword ? "text" : "password"} placeholder='old password'
                                        value={oldPass}
                                        onChange={(e) => setOldPass(e.target.value)}
                                    />
                                    <label htmlFor="newpass">New password : </label>
                                    <input className='input input-bordered input-accent w-full' type={showPassword ? "text" : "password"} placeholder='new password'
                                        value={newPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                    />
                                    <div className='flex justify-center mr-4 mt-5'>
                                        <button className='btn btn-wide bg-dark-alta hover:bg-dark-alta translate-y-1'
                                            onClick={handleChangePwd}
                                        >Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <label htmlFor="">Name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className='border-b-2  h-8  mb-5 outline-none' />
                    <label htmlFor="">Email</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className='border-b-2  h-8 mb-5 outline-none' />
                    <label htmlFor="">Password</label>
                    <input type="text" className='border-b-2 h-8 mb-5 outline-none' />
                    <label htmlFor="">Home address</label>
                    <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} className='border-b-2 h-8 mb-5 outline-none' />
                    <label htmlFor="">Phone</label>
                    <input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} className='border-b-2 h-8 mb-5 outline-none' />
                    <label htmlFor="">Gender</label>
                    <input type="text" onChange={(e) => setSex(e.target.value)} value={sex} className='border-b-2 h-8 mb-5 outline-none' />
                    <div className='flex flex-row justify-end gap-5 mt-5'>
                        <button onClick={() => navigate('/account')} className='bg-red-500 text-white px-3 rounded-md text-center text-bold'>Close</button>
                        <button onClick={(e) => updateProfile(e)} className='bg-blue-500 text-white px-3 py-2 rounded-md text-center text-bold' >Save change</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Profile
