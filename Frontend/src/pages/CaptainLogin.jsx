import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [captainData, setCaptainData] = useState({});

  const { captain, setCaptain, updateCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captain = { email: email, password: password };
    setEmail("");
    setPassword("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captain
      );

      if (response.status === 200) {
        const data = response.data;
        //setCaptain(data.captain);
        updateCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      console.log("Error while logging in", err);
    }
  };
  return (
    <div className="md:flex md:justify-between md:items-center ">
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
            <h3 className="text-lg font-medium mb-2 md:text-xl md:mb-4">
              What's your email
            </h3>

            <input
              className="w-full mb-7 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border md:max-w-lg"
              type="email"
              required
              autoComplete="current-password"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2 md:text-xl md:mb-4">
              Enter Password
            </h3>

            <input
              className="w-full mb-7 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border md:max-w-lg md:mb-8"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="w-full mb-7 px-4 py-2 bg-[#111] text-lg text-white font-semibold placeholder:text-base rounded md:max-w-lg ">
              Login
            </button>
          </form>
          <p className="text-center md:text-base">
            Want to join Uber?{" "}
            <Link to={"/captain-signup"} className="text-blue-600 md:text-base">
              Register as a Captain
            </Link>
          </p>
        </div>

        <div>
          <Link
            to={"/login"}
            className="w-full flex justify-center items-center mb-5 px-4 py-2 bg-[#0f0e12c7] text-lg text-white  md:max-w-lg font-semibold placeholder:text-base rounded"
          >
            Sign In as User
          </Link>
        </div>
      </div>

      <div className="hidden md:block h-screen w-1/2 bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover "></div>
    </div>
  );
};

export default CaptainLogin;
