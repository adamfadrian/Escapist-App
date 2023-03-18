import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import nodata from '../assets/listhosting.jpg'

const Trip = () => {
    const [dataTrip, setDataTrip] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
    const [review, setReview] = useState('')
    const [rate, setRate] = useState<any>()
    const [idRoom, setIdRoom] = useState<number>()
    const [isLoad, setIsLoad] = useState('')

    const getTrip = async () => {
        axios.get(` https://airbnb.my-extravaganza.site/users/reservations?page=1&limit=8`, {
            headers: {
                Authorization: `Bearer ${cookies.userToken}`
            }
        })
            .then((res) => {
                setDataTrip(res.data.data)
            })
            .catch((err) => err)
    }

    useEffect(() => {
        getTrip()
    }, [])

    const handleReview = async () => {
        if (rate && review !== '') {
            const res = await axios.post(` https://airbnb.my-extravaganza.site/rooms/${idRoom}/reviews`, {
                "rating": parseInt(rate),
                "comment": `${review}`
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.userToken}`
                }
            })
                .then((res) => {
                    setReview(isLoad)
                    setRate(0)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        text: "Signed successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <>
            <Navbar />
            {isLoad ? <Loader /> : ''}
            <div className='px-10 py-5 mb-10  ' >
                <h1 className='font-bold text-2xl mb-10'>Trip</h1>
                {/* history payment */}
                {dataTrip
                    ? <>
                        {dataTrip?.map((item: any, index: any) => {
                            return (
                                <div key={index} className='grid md:grid-cols-2 grid-cols-1 gap-2 border-t-4 mb-5 py-5 '>
                                    <div className=' flex flex-col gap-5'>
                                        <h1 className='textmd font-semibold'>{item.room_name}</h1>
                                        <div className='w-full md:w-96  grid grid-cols-2 gap-5'>
                                            <div className='border-2 rounded-md text-center'>{item.check_in}</div>
                                            <div className='border-2 rounded-md text-center'>{item.check_out}</div>
                                        </div>
                                        <p><span className='text-orange-600'>${item.price}</span> x {item.total_night} night</p>
                                        <p className='font-semibold'>Total price : <span className='text-orange-600'>${item.total_price}</span></p>
                                    </div>
                                    <label htmlFor="my-modal-6" onClick={() => setIdRoom(item.room_id)} className="btn w-44 mt-6 bg-blue-600 hover:bg-blue-500 border-none">add review</label>
                                    <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                                    <div className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                                            <textarea name="" id="" onChange={(e) => setReview(e.target.value)} className='w-full resize-none border-2 outline-none' placeholder='add your comment' ></textarea>
                                            <div className="rating">
                                                <input type="radio" value={1} onChange={(e) => setRate(e.target.value)} name="rating-2" className="mask mask-star-2 bg-orange-400" checked  />
                                                <input type="radio" value={2} onChange={(e) => setRate(e.target.value)} name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" value={3} onChange={(e) => setRate(e.target.value)} name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" value={4} onChange={(e) => setRate(e.target.value)} name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                <input type="radio" value={5} onChange={(e) => setRate(e.target.value)} name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                            </div>
                                            <div className="modal-action">
                                                <label htmlFor="my-modal-6" onClick={() => setReview('')} className="btn bg-red-600 hover:bg-red-500 border-none">close</label>
                                                <label htmlFor={rate && review !== '' ? 'my-modal-6' : ''} onClick={() => handleReview()} className="btn bg-green-600 border-none hover:bg-green-500">send</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                    : <div className='flex justify-center'>
                        <img src={nodata} className='w-72 h-auto' alt="" />
                    </div> }
            </div>
        </>
    )
}

export default Trip
