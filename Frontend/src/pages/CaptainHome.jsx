import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUpPanel from "../components/ConfirmRidePopUpPanel";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);
  const { socket } = useContext(SocketContext);
  let { captain, setCaptain } = useContext(CaptainDataContext);

  const [ride, setRide] = useState(null);

  useEffect(() => {
    if (captain && captain._id) {
      socket.emit("join", { userType: "captain", userId: captain._id });
    } else {
      let storedCaptain = JSON.parse(localStorage.getItem("captain"));
      setCaptain(storedCaptain);
    }

    if (captain && captain._id) {
      socket.emit("join", { userType: "captain", userId: captain._id });
    }
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain?._id,
            location: {
              lat: position.coords.latitude ?? null,
              lng: position.coords.longitude ?? null,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, [captain]);

  socket.on("new-ride-request", (data) => {
    console.log("\nRide Received:\n");
    console.log("\n RIDE:\n ", data);
    setRide(data);
    setRidePopUpPanel(true);
  });

  async function confirmRide() {
    if (!ride || !ride._id) {
      console.log("Ride or ride id is missing");
      toast.error("Something went wrong. Please try to accept the ride again");
      return;
    }

    if (!captain || !captain._id) {
      console.log("Captain or captain id is missing");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        console.log("Ride Accepted by captain\n");
        toast.success(response.data.message);
      } else if (response.status === 400) {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log("Error in Confirming the ride", err);
      toast.error("Something went wrong. Please try again");
    }

    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);
  }

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopUpPanel]);
  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUpPanel]);

  return (
    <div className="h-screen ">
      <div className="fixed top-0 p-3 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber-Logo.png"
        />
        <Link
          to="/captains/logout"
          className=" flex items-center justify-center rounded-full bg-white w-10 h-10 "
        >
          <i className="ri-logout-box-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
          alt="temporary image"
        />
      </div>

      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
      >
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          confirmRide={confirmRide}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
      {/* <div
        ref={confirmRidePopUpPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
      >
        <ConfirmRidePopUpPanel
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div> */}
    </div>
  );
};

export default CaptainHome;
