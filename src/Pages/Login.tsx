import React, { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import resort from "../assets/resort.jpg";
import { HiEye, HiEyeOff, HiOutlineMail } from "react-icons/hi";
import { TfiUnlock } from "react-icons/tfi";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login } from "../store/features/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import mobile from "../assets/mobile.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["userToken"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const bg = {
    backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ), url('${resort}')`,
    backgroundSize: "cover",
  };
  const bgSm = {
    backgroundImage: ` url('${mobile}')`,
    backgroundSize: "cover",
  
  };

  const handleLogin = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          " https://airbnb.my-extravaganza.site/login",
          {
            email: email,
            password: password,
          },
        );
        
        const { data } = response.data;
        
        if (response.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Signed successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setCookie('userToken', data.token, { path: "/" })
          dispatch(login(data));
          navigate("/");
        }
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Email or Password incorrect",
          showConfirmButton: true,
        });
        console.log(error);
      }
    },
    [dispatch, email, navigate, password, setCookie],
  );

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (cookies.userToken) {
      navigate("/home");
    }
  }, [cookies.userToken, navigate]);

  return (
    <Container>
      {
        screen.width > 767 ?
        <div style={bg} className="h-screen w-screen  ">
        <div className="flex items-center mt-4 xl:ml-[200px] md:ml 2xl:p-44 lg:p-10 ">
          <div className="w-fit bg-blue-500 align-middle rounded-xl shadow-xl lg:max-w-md h-full px-5">
            <h1 className="text-2xl font-bold text-center text-white uppercase mt-10 mb-10 2xl:text-4xl">
              LOGIN
            </h1>
            <p className="text-white text-center mb-7 2xl:mb-20">
              To keep connected with us please login with your personal
              information by email adress and password
            </p>
            <form className="flex flex-col" onSubmit={handleLogin}>
              
              <div className="relative z-0 w-full mb-5 2xl:mb-10 group ">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-whitw appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium flex flex-row gap-2 absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <HiOutlineMail size={20} /> Email address
                </label>
              </div>
              <div className="relative z-0 w-full mb-10 group">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="flex flex-row gap-2 peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <TfiUnlock size={20} /> Password
                </label>
                <button
                  type="button"
                  className="absolute right-2 top-2 text-white"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-wide btn-md 2xl:btn-lg flex mx-auto 2xl:mt-10 2xl:mb-10 px-4 py-2 tracking-wide border-orange-alta hover:border-orange-alta text-white transition-colors duration-200 transform bg-orange-alta rounded-md hover:bg-orange-700 focus:outline-none focus:bg-dark-alta"
              >
                <p className="text-xl 2xltext-2xl">Login</p>
              </button>
            </form>

            <p className="mt-8 text-lg font-light text-center text-white mb-10">
              {" "}
              Don't have an account?{" "}
              <p
                onClick={() => navigate('/register')}
                className="font-medium text-white hover:underline hover:text-orange-600"
              >
                Sign up
              </p>
            </p>
          </div>
        </div>
      </div> 
      : 

      <div className="flex flex-col w-screen">
        <div style={bgSm} className="h-full w-full bg-blue-500 z-10"> </div>
      <div className="flex h-screen items-center xl:ml-[200px] md:ml">
        <div className="w-full h-auto p-6 bg-blue-500 align-middle  shadow-xl lg:max-w-xl">
          <h1 className="text-4xl font-bold text-center text-white uppercase mt-10 mb-10">
            LOGIN
          </h1>

          <form className="flex flex-col" onSubmit={handleLogin}>
            
            <div className="relative z-0 w-full mb-10 group ">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium flex flex-row gap-2 absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <HiOutlineMail size={20} /> Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-10 group">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="flex flex-row gap-2 peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <TfiUnlock size={20} /> Password
              </label>
              <button
                type="button"
                className="absolute right-2 top-2 text-white"
                onClick={handleTogglePassword}
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-wide sm:btn-sm md:btn-md lg:btn-lg flex mx-auto mt-10 px-4 py-2 tracking-wide border-orange-alta hover:border-orange-alta text-white transition-colors duration-200 transform bg-orange-alta rounded-md hover:bg-orange-700 focus:outline-none focus:bg-dark-alta"
            >
              <p className="text-2xl">Login</p>
            </button>
          </form>

          <p className="mt-8 text-lg font-light text-center text-white mb-10">
            {" "}
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-white hover:underline hover:text-green-600"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
      </div>
  
      }
    </Container>
  );
};

export default Login;
