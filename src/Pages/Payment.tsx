import Container from "../components/Container";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import Card from "../components/Card";
import { useCookies } from "react-cookie";
import Loader from "../components/Loader";
import Swal from "sweetalert2";

const Payment = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<any>([])
  const [isLoad, setIsLoad] = useState(false)

  // get detail data for payment
  const dataPayment = async () => {
    setIsLoad(true)
    await axios.get(` https://airbnb.my-extravaganza.site/rooms/${location?.state?.id}`, {
      headers: {
        Authorization: `Bearer ${cookies.userToken}}`,
      },
    })
      .then((res) => {
        const response = [res.data.data]
        setData(response)
      })
    setIsLoad(false)
  }

  useEffect(() => {
    dataPayment()
  }, [])

  // handle payment
  const handlePayment = (id: any) => {
    setIsLoad(true)
    axios.post(` https://airbnb.my-extravaganza.site/rooms/${id}/reservations`, {
      "check_in": `${location?.state?.startDate}`,
      "check_out": `${location?.state?.endDate}`
    }, {
      headers: {
        Authorization: `Bearer ${cookies.userToken}`,
      },
    })
      .then((res) => {
        window.open(res.data.data.redirect_url, "_blank");
        navigate('/trip')
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "your balance is not enough",
          showConfirmButton: true,
        });
      })
    setIsLoad(false)
  }


  return (
    <div className="flex flex-col h-full">
      {isLoad ? <Loader /> : ''}
      <Navbar />
      <div className="flex flex-col bg-gradient-to-r px-10 min-h-screen ">
        <h1 className="px-5 mt-10 text-3xl md:text-4xl  text-dark-alta flex mx-auto font-sans font-bold">
          Payment & Confirm
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:cols-row-2 w-full md:mx-auto mt-20 md:mt-24 gap-5 pb-32 md:px-32">
          {/* Card 1 */}
          <div className="card w-full mb-5 h-full">
            {data?.map((item: any, index: any) => {
              return (
                <Card title={item.name} location={item.location} image={item.images?.[0].url_image} price={item.price} />
              )
            })}
          </div>
          {/* Card 2 */}
          <div className="grid grid-rows-2 gap-5">
            <div className="card w-full bg-base-100 shadow-xl border md:w-full">
              <div className="card-body md:px-12">
                <select className="text-primary select select-bordered">
                  <option value="">Visa</option>
                  <option value="alta-pay">Alta-pay</option>
                  <option value="">OVO</option>
                  <option value="">Gopay</option>
                </select>
                <input
                  className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10 mt-5"
                  type="text"
                  placeholder="name on card"
                />
                <div className="flex flex-col md:flex-row md:gap-3 mt-5">
                  <input
                    className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10 md:w-1/2"
                    type="text"
                    placeholder="name on card"
                  />
                  <input
                    className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10 md:w-1/2"
                    type="text"
                    placeholder="name on card"
                  />
                </div>
                <div className="flex flex-col md:flex-row md:gap-2 mt-5">
                  <p className="flex my-auto w-60 md:w-auto">
                    Expiration Date :
                  </p>
                  <select className="text-primary select select-bordered">
                    <option value="">Visa</option>
                    <option value="">Alta-pay</option>
                    <option value="">OVO</option>
                    <option value="">Gopay</option>
                  </select>
                  <input
                    className="input input-bordered w-full bg-white border border-gray-400 md:w-60"
                    type="text"
                    placeholder="name on card"
                  />
                </div>
              </div>
            </div>
            {/* End Card 2 */}

            {/* Card 3 */}
            {data?.map((item: any, index: number) => {
              return (
                <div key={index} className="card w-full bg-base-100 shadow-xl border mb-5 h-full">
                  <div className="card-body">
                    <h1 className="text-2xl">{item.name}</h1>
                    <div className="flex flex-row gap-2 mt-5">
                      <FaCalendar className="h-6 w-6 my-auto text-gray-500" />
                      <div>{location?.state?.startDate}</div>
                      -
                      <div>{location?.state?.endDate}</div>
                    </div>
                    <div className="flex flex-col gap-3 mt-10">
                      <p className="font-bold">
                        <span className="text-orange-alta">${item.price}</span> x {location?.state?.diffDays} night
                      </p>
                      <p className="font-bold">
                        total price : <span className="text-orange-alta">${location?.state?.total}</span>
                      </p>
                    </div>
                    <div className="flex justify-center md:justify-end mt-10">
                      <button
                        className="btn btn-wide flex bg-dark-alta text-white hover:bg-dark-alta hover:text-white hover:translate-y-1"
                        onClick={() => handlePayment(item.id)}
                      >
                        Confirm and Pay
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
            {/* End Card 3 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
