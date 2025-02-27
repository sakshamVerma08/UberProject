import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;

      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      console.log("Not Done correctly");
    }
  };
  return (
    <div className="md:flex md:justify-between md:items-center">
      <div className="p-7 h-screen flex flex-col justify-between">
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
            <h3 className="text-lg font-medium mb-2 md:text-xl md:mb-4  ">
              What's your name
            </h3>
            <div className="flex gap-4 mb-6">
              <input
                className="w-1/2 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border md:max-w-lg"
                type="text"
                required
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                placeholder="First name"
              />
              <input
                className="w-1/2 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border md:max-w-lg"
                type="text"
                required
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                placeholder="Last name"
              />
            </div>

            <h3 className="text-lg font-medium mb-2 md:text-xl md:mb-4">
              What's your Email
            </h3>

            <input
              className="w-full mb-6 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border md:max-w-lg"
              type="email"
              required
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
              className="w-full mb-6 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border md:max-w-lg md:mb-8"
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />

            <button className="w-full mb-6 px-4 py-2 bg-[#111] text-lg text-white font-semibold placeholder:text-lg rounded ">
              Signup
            </button>
          </form>
          <p className="text-center md:text-lg">
            Already have an Account?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-[12px] leading-tight md:text-sm">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>

      <div className="hidden md:block h-screen w-1/2 bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover "></div>
    </div>
  );
};

export default UserSignup;
