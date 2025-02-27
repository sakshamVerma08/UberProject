import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // const [captainData, setCaptainData] = useState({});

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState(1);
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain, updateCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        //setCaptain(data.captain);
        updateCaptain(data.captain);

        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      console.log("Error during Signup", err);
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };
  return (
    <div className="md:flex md:justify-center md:items-center">
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          {" "}
          <img
            className="w-20 mb-10 "
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
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

            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>

            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                {/* <label className="block text-lg font-medium mb-2">
                Vehicle Color:
              </label> */}
                <input
                  type="text"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  className="w-full px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
                  placeholder="Enter vehicle color"
                />
              </div>
              <div className="w-1/2">
                {/* <label className="block text-lg font-medium mb-2">
                Vehicle Plate:
              </label> */}
                <input
                  type="text"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className="w-full px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
                  placeholder="Enter vehicle plate"
                />
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                {/* <label className="block text-lg font-medium mb-2">
                Vehicle Capacity:
              </label> */}
                <input
                  type="number"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  className="w-full px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
                  placeholder="Enter vehicle capacity"
                  min="1"
                />
              </div>
              <div className="w-1/2">
                {/* <label className="block text-lg font-medium mb-2">
                Vehicle Type:
              </label> */}
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
                >
                  <option value="">Select Type</option>
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>

            <button className="w-full mb-6 px-4 py-2 bg-[#111] text-lg text-white font-semibold placeholder:text-lg rounded ">
              Signup as Captain
            </button>
          </form>
          <p className="text-center">
            Already have an Account?{" "}
            <Link to={"/captain-login"} className="text-blue-600">
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

      <div className="hidden md:block h-screen w-1/2 bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover "></div>
    </div>
  );
};

export default CaptainSignup;
