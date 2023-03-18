import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import listhosting from "../assets/listhosting.jpg";
import { useCookies } from "react-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import ModalEditVilla, { FormVillaValue } from "../components/ModalEditVilla";
import ModalFotoEdit, { AddFoto } from "../components/ModalFotoEdit";
import ListCard from "../components/ListingCard";
import Loader from "../components/Loader";

const ListHosting = () => {
  const [getListing, setGetListing] = useState<any[]>(['']);
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false)

  const getAllList = async () => {
    setIsLoad(!isLoad)
    try {
      const response = await axios.get(
        "https://airbnb.my-extravaganza.site/rooms/users/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.userToken}`,
          },
        },
      );
      setLoading(true);
      setGetListing(response.data.data);
    } catch (error) { }
    setIsLoad(false)
  };


  useEffect(() => {
    getAllList();
  }, []);


  // edit value VIlla
  const initialVillaValues: FormVillaValue = {
    name: "",
    overview: "",
    description: "",
    facilities: "",
    location: "",
    price: null,
    images: null
  }

  const [villaEditValues, setVillaEditValues] = useState<FormVillaValue>(initialVillaValues);
  const [editMode, setEditMode] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState<number>();

  const handleEditModal = (id: number) => {
    const properties = getListing.find((card: any) => card.id === id);
    if (!properties) {
      return;
    }
    setEditMode(true);
    setVillaEditValues({
      name: properties.name,
      overview: properties.overview,
      description: properties.description,
      facilities: typeof properties.facilities === 'string' ? properties.facilities.split(",") : [],
      location: properties.location,
      price: properties.price,
      images: properties.images,
    });
    setSelectedVilla(id);
  }

  const editList = async (values: FormVillaValue) => {
    setIsLoad(!isLoad)
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("overview", values.overview);
    formData.append("description", values.description);
    formData.append("facilities", values.facilities);
    formData.append("location", values.location);
    formData.append("price", values.price?.toString() || "");
    formData.append("image", values.images || "");
    console.log();
    try {
      const response = await axios.put(`https://airbnb.my-extravaganza.site/rooms/${selectedVilla}`, formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.userToken}`,
            "Content-Type": "multipart/form-data"
          }
        })
      console.log(selectedVilla);
      if (response.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Villa Edited Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        getAllList();
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoad(false)
  };


  // handle Delete
  const handleDelete = async (id: number) => {
    try {
      
      const response = await axios.delete(
        ` https://airbnb.my-extravaganza.site/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      }
      )
      if (response.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Successfully Delete Villa",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      getAllList()
    } catch (error) {
      console.error(error);
    }
  };

  // add newPhoto
  const initialPhoto: AddFoto = {
    room_id: "",
    image: null
  }

  const [editImgVilla, setEditImgVilla] = useState<AddFoto>(initialPhoto)
  const [selectImg, setSelectImg] = useState<string>()

  //handleModalFor add Foto
  const handleEditFoto = useCallback((room_id: string) => {
    const editProp = getListing.find((item: any) => item.images[0].room_id === room_id);

    if (!editProp) {
      return;
    }
    setEditMode(true);
    setSelectImg(room_id);
    setEditImgVilla({
      room_id: editProp.images[0].room_id,
      image: editProp.images[0].url_image
    });
  }, [getListing]);

  // fetch image with method Post
  const EditImage2 = async (x: AddFoto, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    if (x.room_id !== undefined) {
      data.append("room_id", x.room_id);
    }
    if (x.image !== null) {
      data.append("image", x.image);
    }
    try {
      const res = await axios.post(
        "https://airbnb.my-extravaganza.site/images",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.userToken}`,
          },
        }
      );
      if (res.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Successfully Add New Photo",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      getAllList()
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Can't post Image or invalid Input",
        showConfirmButton: true,
      });
      console.error(error);
    }
  };

  return (
    <>
      {isLoad ? <Loader /> : ''}
      <div className="flex flex-col ">
        <Navbar />
        <ModalFotoEdit
          onSubmit={EditImage2}
          newFoto={editImgVilla}
          editMode={editMode}

        />
        <ModalEditVilla
          onSubmit={editList}
          editValues={villaEditValues}
          editMode={editMode}
        />
        <div className="grid grid-cols-1 mx-auto md:grid-cols-3 lg:px-20 2xl:grid-cols-4 xl:px-20 px-5 gap-5 max-h-80 mt-20 min-h-screen mb-96"> 
          
          {getListing && loading === true ? (
            getListing?.map((item: any, i: number) => {
              return (
                <>
                  <ListCard
                    handleDetail={() => handleEditFoto(item.images[0].room_id)}
                    image={item.images[0].url_image}
                    key={i}
                    id={item.id}
                    title={item.name}
                    description={item.description}
                    price={item.price}
                    rating={item.avg_ratings}
                    location={item.location}
                    handleDelete={handleDelete}
                    handleEdit={() => handleEditModal(item.id)}
                    editModal="add-villa-modal"
                    imageModal="add-foto-modal"
                    loading={false} />
                </>
              );
            })
          ) : (
            <div className="flex justify-center">
              <img
                src={getListing.length === 0 ? listhosting : ""}
                className="h-96"
              />
            </div>
          )}
        </div>
        <div className="flex lg:sticky absolute lg:right-0 lg:bottom-20 xl:bottom-[20] xl:right-20 ">
          <button
            className="text-[#4397fb]"
            onClick={() => navigate("/hosting")}
          >
            <MdOutlineAddCircleOutline size={80} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ListHosting;
