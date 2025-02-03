import { React, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen relative">
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

      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
          alt="temporary image"
        />
      </div>

      <div className="h-1/5 p-6 flex items-center justify-between relative">
        {/* DO CONDITIONAL RENDERING OF UP AND DOWN ARROW HERE, DEPENDING ON WHETHER THE RIDE IS GOING ON OR FINISHED*/}

        <h5
          onClick={() => {
            setFinishRidePanel(true);
          }}
          className=" text-right text-lg mb-5 absolute top-2 w-[93%] "
        >
          <i className="ri-arrow-up-line text-2xl"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away </h4>
        <button className=" bg-green-600 p-2 px-8 font-semibold text-white rounded-lg">
          Finish Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
