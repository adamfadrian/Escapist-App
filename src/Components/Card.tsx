import React, { FC } from 'react'
import { AiTwotoneStar } from 'react-icons/ai'

interface myProps {
    title: string
    location: string
    price: any
    rating?: number
    overview?: string
    description?: string
    facilities?: string
    image?: string
    handleDetail?: React.MouseEventHandler
}


const Card: FC<myProps> = ({ title, location, price, handleDetail, image ,rating }) => {
    const imgUrl = 'https://storage.googleapis.com/alta-airbnb/'
    return (
        <div className="overflow-hidden shadow-lg md:w-fit w-full h-fit rounded-md cursor-pointer " onClick={handleDetail}>
            <div className='h-44 w-68 md:w-72 relative  overflow-hidden 2xl:w-[450px] 2xl:h-72'>
                <img className="w-full h-auto absolute" src={imgUrl + image} alt="Sunset in the mountains" />
            </div>
            <div className="px-2 py-4">
                <div className="font-semibold text-sm md:text-md  mb-2">{title}</div>
                <p className="text-gray-700 text-base">{location}</p>
                <p className='flex items-center'><AiTwotoneStar className="text-deep-orange-600" /> {rating}</p>
                <p className="text-orange-600 text-sm font-bold">${price}</p>
            </div>
        </div>
    )
}

export default Card
