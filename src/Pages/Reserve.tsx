import React, { useEffect, useState } from 'react'
import Datepicker from "react-tailwindcss-datepicker";
import Navbar from '../components/Navbar'

import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2';
import noDate from '../assets/noDate.png'
import { AiTwotoneStar } from 'react-icons/ai'
import Loader from '../components/Loader';

const Reserve = () => {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
    const [dataRoom, setDataRoom] = useState<any>([''])
    const [goPayment, setGoPayment] = useState(false)
    const [diffDays, setDiffDays] = useState(1)
    const [review, setReview] = useState([])
    const [totalReview, setTotalReview] = useState()
    const params = useParams();
    const reserve: any = params.id;
    const [isLoad, setIsLoad] = useState(false)

    // get room by id
    const getRoom = async () => {
        setIsLoad(!isLoad)
        await axios.get(` https://airbnb.my-extravaganza.site/rooms/${reserve}`, {
            headers: { Authorization: `Bearer ${cookies.userToken}` }
        })
            .then((response) => {
                const arr = [response.data.data]
                setDataRoom(arr)
                setIsLoad(false)
            })
            .catch((err) => console.log('err', err))
    }

    // get all reviews
    const getReview = async () => {
        await axios.get(` https://airbnb.my-extravaganza.site/rooms/${reserve}/reviews`, {
            headers: { Authorization: `Bearer ${cookies.userToken}` }
        })
            .then((response) => {
                setReview(response.data.data)
                setTotalReview(response.data.data.length)
            })
            .catch((err) => console.log('err', err))
    }

    useEffect(() => {
        getRoom()
        getReview()
    }, [])

    // date picker
    const [availabelity, setavAilabelity] = useState<any>({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });
    const handleValueChange = (newValue: any) => {
        setavAilabelity(newValue);
        if (newValue == '') {
            setavAilabelity(false)
        }
    }

    // handle different days
    useEffect(() => {
        if (availabelity != '') {
            const startDate: Date = new Date(availabelity.startDate);
            const endDate: Date = new Date(availabelity.endDate);

            const diffInMs: number = endDate.getTime() - startDate.getTime();
            const diffInDays: number = diffInMs / (1000 * 60 * 60 * 24);
            setDiffDays(diffInDays)
            setGoPayment(false)
        }
    }, [availabelity])

    // check availability
    const handleReservation = (id: number, total: number) => {
        setIsLoad(true)
        axios.post(` https://airbnb.my-extravaganza.site/rooms/1/reservations/check`, {
            "check_in": availabelity.startDate,
            "check_out": availabelity.endDate
        }, {
            headers: {
                Authorization: `Bearer ${cookies.userToken}`
            }
        })
            .then(res => {
                navigate('/payment', {
                    state: {
                        id: id,
                        total: total,
                        diffDays: diffDays,
                        startDate: availabelity.startDate,
                        endDate: availabelity.endDate
                    }
                })
            })
            .catch(err => {
                Swal.fire({
                    title: 'Sorry',
                    text: 'this place is not available with the time you specified.',
                    imageUrl: noDate,
                    imageWidth: 300,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                })
            })
        setIsLoad(false)
    }


    return (
        <>
            <Navbar />
            <div className='px-5 md:px py-5'>
                {isLoad ? <Loader /> : ''}
                {dataRoom?.map((item: any, index: number) => {
                    return (
                        <div key={index}>
                            <h1 className='font-bold text-2xl'>{item.name}</h1>
                            <div className='flex flex-row gap-2'>
                                <h3>{item.location}</h3>
                            </div>
                            {/* image reserve  */}
                            <div className='grid grid-cols-1 md:grid-cols-3 py-4 gap-5 '>
                                <div className='w-full grid gap-10 md:grid-cols-1 sm:grid-cols-1 col-span-2'>
                                    <img src={`https://storage.googleapis.com/alta-airbnb/` + item.images?.[0].url_image} className='w-full h-full md:col-span-2 rounded-md' alt="" />
                                    <div>
                                        <div className='w-full grid grid-cols-4 gap-2'>
                                            {
                                                item?.images?.map((item: any, index: number) => {
                                                    return (
                                                        <img src={`https://storage.googleapis.com/alta-airbnb/` + item.url_image} className='w-full h-md rounded-md ' alt="" />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className='p-5 rounded-md w-full h-fit border-2 md:col-span-1 border-[#4397fb] shadow-lg '>
                                    <h1><span className='text-xl font-bold'>${item.price}</span> night</h1>
                                    <p>{item.location}</p>
                                    <div className='border-2 mt-5'>
                                        <Datepicker
                                            placeholder='Check-in - Check-out'
                                            separator={"to"}
                                            useRange={false}
                                            value={availabelity}
                                            onChange={handleValueChange}
                                        />
                                    </div>
                                    <div className='flex justify-between'>
                                        <p>${item.price} x {diffDays} night</p>
                                        <p>Total : ${item.price * diffDays}</p>
                                    </div>
                                    <div onClick={() => handleReservation(item.id, item.price * diffDays)} className='bg-[#4397fb] text-white mt-10 h-10 flex justify-center items-center rounded-md text-xl font-medium cursor-pointer'>Check Available</div>
                                </div>
                            </div>
                            <div>
                                <h1 className='md:text-4xl text-2xl  font-bold'>
                                    hosted by {item.username}
                                </h1>
                                <div className='w-full grid grid-cols-1 md:grid-cols-2 py-5 gap-5'>
                                    <div>
                                        <p>{item.description}</p>
                                        <p>
                                            {item.overview}
                                        </p>
                                        <h1 className='py-5 font-bold text-xl'>What this place offers</h1>
                                        {item.facilities?.map((item: any, index: number) => {
                                            return (
                                                <ul key={index} className='grid grid-cols-1 md:grid-cols-2'>
                                                    <li>{item}</li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <h1 className='text-xl mt-10 font-bold flex items-center gap-2'>{totalReview} reviews</h1>
                            <div className=''>
                                <div className='py-10 grid md:grid-cols-3 grid-cols-1 mr-2 gap-12'>
                                    {review?.map((item: any, index: number) => {
                                        return (
                                            <div className='break-words'>
                                                <p className='font-bold'>{item.username}</p>
                                                <p>{item.created_at}</p>
                                                <div className='flex items-center gap-1'>
                                                    {
                                                        [...Array(item.rating)].map((_, i) => {
                                                            return <AiTwotoneStar key={i} className='text-yellow-900' />
                                                        })
                                                    }
                                                </div>
                                                <p className='md:w-96 w-full mt-3'>{item.comment}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Reserve
