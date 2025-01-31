import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [captainData, setCaptainData] = useState({});

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captain = { email: email, password: password };
    setEmail("");
    setPassword("");

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captain
    );

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    } 
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        {" "}
        <img
          className="w-20 mb-10"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber-Logo.png"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>

          <input
            className="w-full mb-7 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="w-full mb-7 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className="w-full mb-7 px-4 py-2 bg-[#111] text-lg text-white font-semibold placeholder:text-base rounded ">
            Login
          </button>
        </form>
        <p className="text-center">
          Want to join Uber?{" "}
          <Link to={"/captain-signup"} className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to={"/login"}
          className="w-full flex justify-center items-center mb-5 px-4 py-2 bg-orange-500 text-lg text-white font-semibold placeholder:text-base rounded "
        >
          Sign In as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
