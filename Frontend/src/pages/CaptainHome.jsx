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

  // This function is used as a fake driver spreader, so that drivers can have
  // different locations on the grid (In Development Mode, don't use in prod).
  function generateRandomDelhiCoords() {
    // Delhi NCR Bounding Box Coordinates
    // North: Rohini (28.8, 77.0)
    // South: Faridabad (28.3, 77.3)
    // East: Noida (28.5, 77.5)
    // West: Gurugram (28.4, 76.9)
    // Major Landmarks:
    // - IIT Delhi: 28.5455° N, 77.1970° E
    // - Red Fort: 28.6562° N, 77.2410° E
    // - IGI Airport: 28.5562° N, 77.1000° E
    // - Connaught Place: 28.6280° N, 77.2020° E

    const minLat = 28.3; // Southernmost point (Faridabad)
    const maxLat = 28.9; // Northernmost point (Rohini)
    const minLng = 76.8; // Westernmost point (Gurugram)
    const maxLng = 77.5; // Easternmost point (Noida)

    return {
      lat: Number((Math.random() * (maxLat - minLat) + minLat).toFixed(6)),
      lng: Number((Math.random() * (maxLng - minLng) + minLng).toFixed(6)),
    };
  }

  useEffect(() => {
    if (captain && captain._id) {
      console.log("Joining socket room as captain:", captain._id);
      socket.emit("join", { userType: "captain", userId: captain._id });
    } else {
      console.log("No captain found, checking localStorage...");
      let storedCaptain = JSON.parse(localStorage.getItem("captain"));
      setCaptain(storedCaptain);
    }

    const updateLocation = () => {
      // Dev mode → use random Delhi coordinates
      /*
      if (import.meta.env.MODE === "development") {
        console.log("DEV MODE: Generating random Delhi coordinates");
        const coords = generateRandomDelhiCoords();
        console.log("Sending fake location update:", coords);
        socket.emit("update-location-captain", {
          userId: captain?._id,
          location: {
            type: "Point",
            coordinates: [coords.lng, coords.lat],
          },
        });
        return;
      }
        */

      // Production → use real geolocation if available
      console.log("PRODUCTION: Attempting to get real geolocation");
      if (!navigator.geolocation) {
        console.warn("Geolocation is not supported by this browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude ?? null,
            lng: position.coords.longitude ?? null,
          };
          console.log("Sending real location update:", coords);
          socket.emit("update-location-captain", {
            userId: captain?._id,
            location: {
              type: "Point",
              coordinates: [coords.lng, coords.lat],
            },
          });
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    };

    console.log("Starting location updates every 10 seconds");
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation(); // Initial call

    return () => {
      console.log("Cleaning up location updates");
      clearInterval(locationInterval);
    };
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
