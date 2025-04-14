import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = { email: email, password: password };
    setEmail("");
    setPassword("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      console.log("Login Failed");
    }
  };
  return (
    <div className="md:flex justify-between  items-center">
      <div className="p-7 h-screen flex flex-col justify-between md:max-w-lg md:ml-2 ">
        <div>
          {" "}
          <img
            className="w-16 mb-10 md:w-20 lg:w-24"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber-Logo.png"
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2 md:text-xl md:mb-3">
              What's your email
            </h3>

            <input
              className="w-full mb-7 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border md:max-w-2xl lg:max-w-6xl"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2 md:text-xl md:mb-3">
              Enter Password
            </h3>

            <input
              className="w-full mb-7 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border md:max-w-2xl lg:max-w-6xl"
              type="password"
              required
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="w-full mb-7 px-4 py-2 bg-[#111] text-lg text-white font-semibold placeholder:text-base rounded md:px-auto md:py-2 md:text-xl md:placeholder:text-2xl md:max-w-lg md:mt-5 ">
              Login
            </button>
          </form>
          <p className="text-center md:text-lg ">
            New here?{" "}
            <Link to={"/signup"} className="text-blue-600">
              Create a new Account
            </Link>
          </p>
        </div>

        <div>
          <Link
            to={"/captain-login"}
            className="w-full flex justify-center items-center mb-5 px-4 py-2 bg-[#0f0e12c7] text-lg text-white font-semibold placeholder:text-base rounded md:max-w-lg "
          >
            Sign In as Captain
          </Link>
        </div>
      </div>

      <div className="hidden md:block h-screen w-1/2 bg-[url(https://images.unsplash.com/photo-1554260570-83dc2f46ef79?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover "></div>
    </div>
  );
};

export default UserLogin;
