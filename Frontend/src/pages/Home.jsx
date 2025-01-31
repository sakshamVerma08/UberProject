import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (isPanelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
    }
  }, [isPanelOpen]);

  return (
    <div className="relative h-screen">
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
        <div className="h-[30%] relative bg-white p-5 ">
          {" "}
          <h4 className=" font-semibold  text-2xl">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute bg-gray-500 h-15 w-1 top-[40%] left-7 rounded-full "></div>
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

        <div ref={panelRef} className="h-0 bg-red-500 p-5  "></div>
      </div>
    </div>
  );
};

export default Home;
