import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmPanel from "../context/ConfirmPanel";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelClose = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitForDriverOpen, setWaitForDriverOpen] = useState(false);
  const vehicleFoundRef = useRef(null);
  const waitForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (isPanelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
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
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
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

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="w-16 absolute top-5 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber-Logo.png"
      />

      <div className="h-screen w-screen">
        {/* Temporary Image */}
        <img
          className="h-full w-full object-cover"
          src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
          alt="temporary image"
        />
      </div>

      <div className=" flex flex-col justify-end absolute h-screen top-0 w-full ">
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
            <div className="line absolute bg-gray-500 h-15 w-1 top-[40%] left- rounded-full "></div>
            <input
              className="bg-[#eee] px-12 py-2 rounded-lg text-base w-full mt-4"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              onClick={() => {
                setIsPanelOpen(true);
              }}
              type="text"
              placeholder="Enter a pickup location"
            />
            <input
              className="bg-[#eee] px-12 py-2 rounded-lg text-base w-full mt-4"
              type="text"
              value={drop}
              onChange={(e) => {
                setDrop(e.target.value);
              }}
              onClick={() => {
                setIsPanelOpen(true);
              }}
              placeholder="Enter a drop location"
            />
          </form>
        </div>

        <div ref={panelRef} className="h-0 bg-white p-5  ">
          <LocationSearchPanel
            vehiclePanel={vehiclePanel}
            setIsPanelOpen={setIsPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/* ******************* */}
      {/* ********   VEHICLE PANEL ************/}

      <div
        ref={vehiclePanelRef}
        className="bg-white z-10 fixed bottom-0 w-full translate-y-full px-3 py-10  border-white"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRideRef}
        className="bg-white z-10 fixed bottom-0 w-full translate-y-full px-3 py-12  border-white"
      >
        <ConfirmPanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="bg-white z-10 fixed bottom-0 w-full translate-y-full px-3 py-12  border-white"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
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
