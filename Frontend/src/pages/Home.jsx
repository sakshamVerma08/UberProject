import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmPanel from "../context/ConfirmPanel";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelClose = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitForDriverOpen, setWaitForDriverOpen] = useState(false);
  const [pickupSuggestion, setPickupSuggestion] = useState([]);
  const [destinationSuggestion, setDestinationSuggestion] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState("");

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const vehicleFoundRef = useRef(null);
  const waitForDriverRef = useRef(null);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPickupSuggestion(response.data);
    } catch(err){
      console.log("error in getting map suggestions", err.message);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDestinationSuggestion(response.data);
    } catch (err) {
      console.log(
        "error in handleDestination change method (Home.jsx)",
        err.message
      );
      console.log("No ride found !");
    }
  };

  async function findTrip() {
    setVehiclePanel(true);
    setIsPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup,
          destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.data || response.data.status === "NOT_FOUND") {
      alert(
        "Invalid Route ! Please make sure your pickup and drop destination are in the same state"
      );
    }
    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    console.log("createRide data = ", response.data);
  }

  useEffect(() => {
    if (!user || !user._id) {
      console.log("User ID is NULL:", user);
      return;
    }
    socket.emit("join", { userType: "user", userId: user?._id });

    socket.on("ride-confirmed", (ride) => {
      setWaitForDriverOpen(true);
    });
  }, [user]);

  
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (isPanelOpen) {
      gsap.to(panelRef.current, {
        height: "60%",
      });

      gsap.to(panelClose.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });

      gsap.to(panelClose.current, {
        opacity: 0,
      });
    }
  }, [isPanelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);
  useGSAP(() => {
    if (vehicleFound) {
      gsap.fromTo(
        vehicleFoundRef.current,
        { transform: "translateY(100%)" },
        { transform: "translateY(0)", duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);
  useGSAP(() => {
    if (waitForDriverOpen) {
      gsap.to(waitForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitForDriverOpen]);

  const handleLogout = async () => {
    try {
      navigate("/users/logout");
    } catch (err) {
      console.log("Logout failed: \n\n", err);
    }
  };
  return (
    <div className="relative h-screen overflow-hidden ">
      <div className="fixed top-0 p-3 flex items-center justify-between w-full z-50">
        <img
          className="w-16 top-5 left-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber-Logo.png"
        />

        <i
          className="ri-logout-box-line cursor-pointer text-xl m-2"
          onClick={handleLogout}
        ></i>
      </div>

      <div className="h-screen w-screen">
        {/* Temporary Image */}
        <img
          className="h-full w-full object-cover "
          src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
          alt="temporary image"
        />
      </div>

      <div className=" flex flex-col justify-end absolute h-screen top-0 w-full  ">
        <div className="h-[30%] relative bg-white p-6 ">
          {" "}
          <h5
            ref={panelClose}
            onClick={() => {
              setIsPanelOpen(false);
            }}
            className="absolute opacity-0 top-5 text-2xl right-2"
          >
            <i className="ri-arrow-down-line"></i>
          </h5>
          <h4 className=" font-semibold  text-2xl">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            {/* <div className="line absolute bg-gray-500 h-15 w-1 top-[40%] left-10 rounded-full "></div> */}
            <input
              className="bg-[#eee] px-12 py-2 rounded-lg text-base w-full mt-4" 
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setIsPanelOpen(true);
                setActiveField("pickup");
              }}
              type="text"
              placeholder="Enter your Pickup"
            />

            <input
              className="bg-[#eee] px-12 py-2 rounded-lg text-base w-full mt-4"
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                // setIsPanelOpen(true);
                setActiveField("destination");
              }}
              placeholder="Enter your Destination"
            />
          </form>
          <div className="flex items-center justify-center bg-red-400 mt-4">
            {" "}
            <button
              className="bg-black text-white rounded-lg p-2 w-full "
              onClick={findTrip}
            >
              Find Rides
            </button>
          </div>
        </div>

        <div ref={panelRef} className="h-0 bg-white p-5  ">
          <LocationSearchPanel
            vehiclePanel={vehiclePanel}
            setIsPanelOpen={setIsPanelOpen}
            setVehiclePanel={setVehiclePanel}
            suggestions={
              activeField === "pickup"
                ? pickupSuggestion
                : destinationSuggestion
            }
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* ******************* */}
      {/* ********   VEHICLE PANEL ************/}

      <div
        ref={vehiclePanelRef}
        className="bg-white z-30 fixed bottom-0 w-full translate-y-full px-3 py-10  border-white"
      >
        <VehiclePanel
          fare={fare}
          selectVehicle={setVehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRideRef}
        className="bg-white z-10 fixed bottom-0 w-full translate-y-full px-3 py-12  border-white"
      >
        <ConfirmPanel
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare[vehicleType]}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="bg-white z-10 fixed bottom-0 w-full translate-y-[120%] px-3 py-12  border-white "
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          vehicleType={vehicleType}
          fare={fare[vehicleType]}
          pickup={pickup}
          destination={destination}
        />
      </div>
      <div
        ref={waitForDriverRef}
        className="bg-white z-10 fixed bottom-0 w-full translate-y-full px-3 py-12  border-white"
      >
        <WaitForDriver setWaitForDriverOpen={setWaitForDriverOpen} />
      </div>
    </div>
  );
};

export default Home;
