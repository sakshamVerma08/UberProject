import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelClose = useRef(null);

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
          <LocationSearchPanel />
        </div>
      </div>

      <div className="p-3 bg-white z-10 fixed bottom-0">
        <div className="flex border-2 border-black rounded-xl justify-between items-center w-full p-3">
          {" "}
          <img
            className="h-16"
            src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5O2PVmKwYLyptJf2j6AwLaJ8XiBAVt7Z8Cw&s "
            alt="car png"
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-sm ">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm ">2 mins away </h5>
            <p className="font-normal text-sm text-gray-400 ">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="font-semibold text-xl ">₹193.20</h2>
        </div>

        {/* moto png) https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s */}
        {/* auto png) https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s */}
      </div>
    </div>
  );
};

export default Home;
