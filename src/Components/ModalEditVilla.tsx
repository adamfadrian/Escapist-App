import React, { FC, useEffect, useState } from "react";

export interface FormVillaValue {
  name: string;
  overview: string;
  description: string;
  facilities: string;
  location: string;
  price: number | any;
  images: File | null
}

interface FormProps {
  onSubmit: (formValues: FormVillaValue) => void;
  editValues: FormVillaValue;
  editMode: boolean;
}

const initialFormValues: FormVillaValue = {
  name: "",
  overview: "",
  description: "",
  facilities: "",
  location: "",
  price: null,
  images: null
};

const ModalEditVilla: FC<FormProps> = ({ onSubmit, editMode, editValues }) => {
  const [formValues, setFormValues] = useState<FormVillaValue>(editValues);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (editMode || !editMode) {
      setFormValues(editValues);
    }
  }, [editValues, editMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues(initialFormValues);
  };

  const handleImageChange = (e : any) => {
    const selectedImage = e.target.files[0];
    setFormValues((prev) => ({
      ...prev,
      images: selectedImage
      
    }));
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageUrl(imageUrl);
    }
    
  };


  const submitable =
    formValues.name != "" &&
    formValues.overview != "" &&
    formValues.description != "" &&
    formValues.facilities != "" &&
    formValues.location != "" &&
    formValues.price != null &&
    formValues.images != null 
      ? "add-villa-modal"
      : "";
      
  return (
    <div>
      <input type="checkbox" id="add-villa-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-villa-modal"
            className="btn btn-ghost btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-primary text-xl mb-3">
            Edit Your Villa
          </h3>
          <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex justify-center mt-10">
            
              {formValues.images && (
                <img
                  src={imageUrl}
                  alt="Selected image"
                  width={300}
                />
              )}
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                id="image-input"
              />
              <label htmlFor="image-input">Choose an image</label>
            </div>
            <label className="text-primary" htmlFor="name">
              Name
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="name"
              name="name"
              value={formValues.name || ""}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="overview">
              overview
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="overview"
              name="overview"
              value={formValues.overview || ""}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="description">
              Description
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="description"
              name="description"
              value={formValues.description || ""}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="facilities">
              facilities
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="facilities"
              name="facilities"
              value={formValues.facilities || ""}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="location">
              location
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="location"
              name="location"
              value={formValues.location || ""}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="price">
              price
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="number"
              id="price"
              name="price"
              value={formValues.price !== null ? formValues.price : ''}
              onChange={handleInputChange}
            />
            <div className="flex justify-between items-center mt-6">
              <h1 className="text-accent visible">Please enter all fields</h1>
              <button type="submit">
                <label
                  htmlFor={submitable}
                  className="btn bg-orange-alta border border-orange-alta text-white  hover:text-orange-alta hover:bg-white hover:border-orange-alta"
                >
                  Submit
                </label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEditVilla;
