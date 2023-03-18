import React, { FC, useState } from "react";
import Navbar from "../components/Navbar";
import axios, { AxiosRequestConfig } from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { Navigate, useNavigate } from "react-router-dom";

const Hosting = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [overview, setOverview] = useState("");
  const [facilities, setFacilities] = useState("");
  const [price, setPrice] = useState<number>();
  const [image, setImage] = useState<File>();
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [isLoad, setIsLoad] = useState(false)
  const navigate = useNavigate()

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !name ||
      !location ||
      !description ||
      !overview ||
      !facilities ||
      !price ||
      !image
    ) {
      console.error("All fields are required");
      return;
    }

    const data = new FormData();
    if (image instanceof File) {
      data.append("image", image);
    }
    data.append("image", image);
    data.append("overview", overview);
    data.append("facilities", facilities);
    data.append("price", price?.toString() || "");
    data.append("name", name);
    data.append("location", location);
    data.append("description", description);

    try {
      setIsLoad(!isLoad)
      const res = await axios.post("https://airbnb.my-extravaganza.site/rooms", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${cookies.userToken}`,
        },
      });
      if (res.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Successfully add Villa",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/listhosting')
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Villa Already uploaded",
        showConfirmButton: true,
      });
      console.error(error);
    }
    setIsLoad(false)
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      console.log(file);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Navbar />
      {isLoad ? <Loader /> : ''}
      <form onSubmit={uploadFile} className="flex flex-col lg:px-32 h-full overflow-hidden mb-20">
        <div className="card shadow-md mt-20">
          <div className="card-body">
            <div className="flex flex-col gap-4 ">
              <div className="flex justify-center mt-10">
                {image && (
                  <img src={URL.createObjectURL(image)} alt="Selected image" width={400} />
                )}
                <input
                  type="file"
                  name="file1"
                  onChange={handleFileInputChange}
                  id=""
                />{" "}
                <br />
              </div>
              <input
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                className="mx-auto input input-bordered input-accent w-full max-w-4xl"
                type="text"
                placeholder="name"
                name="name"
              />
              <input
                value={location || ""}
                onChange={(e) => setLocation(e.target.value)}
                className="mx-auto input input-bordered input-accent w-full max-w-4xl "
                type="text"
                placeholder="Location"
                name="location"
              />
              <input
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
                className="mx-auto input input-bordered input-accent w-full max-w-4xl "
                type="text"
                placeholder="Description"
                name="description"
              />
              <input
                value={overview || ""}
                onChange={(e) => setOverview(e.target.value)}
                className="mx-auto input input-bordered input-accent w-full max-w-4xl "
                type="text"
                placeholder="overview"
                name="overview"
              />
              <input
                value={facilities || ""}
                onChange={(e) => setFacilities(e.target.value)}
                className="mx-auto input input-bordered input-accent w-full max-w-4xl "
                type="text"
                placeholder="facilities"
                name="facilities"
              />
              <input
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                className="mx-auto input input-bordered input-accent w-full max-w-4xl "
                type="number"
                placeholder="Price"
                name="price"
              />
              <button
                type="submit"
                className="btn btn-wide bg-dark-alta text-white hover:bg-dark-alta hover:text-white hover:translate-y-1 lg:mt-5 mx-auto "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Hosting;
