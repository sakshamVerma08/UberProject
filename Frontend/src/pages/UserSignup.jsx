import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setUserData({
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    });
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        {" "}
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber-Logo.png"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="w-1/2 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
              type="text"
              required
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              placeholder="First name"
            />
            <input
              className="w-1/2 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
              type="text"
              required
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              placeholder="Last name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your Email</h3>

          <input
            className="w-full mb-6 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
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
            className="w-full mb-6 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
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
        <p className="text-center">
          Already have an Account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[12px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
