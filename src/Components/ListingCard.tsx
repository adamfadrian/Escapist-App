import React, { FC } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { SpinningCircles } from "react-loading-icons";
import { IoLocationOutline } from "react-icons/io5";


interface myProps {
  id: number;
  title: string;
  location: string;
  rating: any;
  price: any;
  overview?: string;
  description?: string;
  facilities?: string;
  image?: string;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => Promise<void>;
  handleDetail?: React.MouseEventHandler;
  editModal?: string;
  loading: boolean;
  imageModal?: string
}

const ListCard: FC<myProps> = ({
  id,
  title,
  location,
  rating,
  image,
  price,
  loading,
  handleDetail,
  handleDelete,
  handleEdit,
  editModal,
  imageModal,
}) => {
  const imgUrl = "https://storage.googleapis.com/alta-airbnb/";

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleEdit?.(id);
  };
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleDelete?.(id);
  };

  if (loading) {
    return (
      <h1 className="flex justify-center">
        <SpinningCircles />
      </h1>
    );
  }
  return (
    <div className="md:w-full w-full h-fit rounded-md lg:max-w-full shadow-md" key={id}>
     
      <label  onClick={handleDetail} htmlFor={imageModal}>
      <div className="relative overflow-hidden h-52">
      <img src={imgUrl + image} alt="" className="rounded-md cursor-pointer w-full" width={400}  />
      </div>
      
      </label>

      <div className=" mt-2 gap-2 flex flex-col mb-5 ml-2">
        <h1 className="text-md font-bold">{title}</h1>
        <p className="text-sm flex items-center font-semibold font-sans"><IoLocationOutline size={15} />{" "}     {location}</p>
        <p className="flex text-sm gap-1 items-center ">
          <AiTwotoneStar className="text-deep-orange-600" />
          {rating}
        </p>
        <p className="">
          <span className="text-orange-600 text-sm font-bold">${price}</span> / night
        </p>
      </div>
      <div className="flex justify-evenly mt-5 mb-5 2xl:mt-36 gap-4">
        <button onClick={handleEditClick}
        className="btn btn-sm w-fit px-5 2xl:px-10 md:px-3 sm:px-3 items-center pt-1 bg-[#4397fb] border-none hover:bg-[#4397fb] hover:translate-y-1">
          <label
            htmlFor={editModal}
            
          >
            Edit
          </label>
        </button>
      
        <button
          type="button"
          className="btn btn-sm w-fit px-5 2xl:px-10 md:px-3 sm:px-3 items-center pt-1 bg-red-500 border-none hover:bg-red-800 hover:translate-y-1"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListCard;
