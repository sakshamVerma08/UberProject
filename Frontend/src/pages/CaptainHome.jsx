import React from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
const CaptainHome = () => {
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

      <div className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12">
        <RidePopUp />
      </div>
    </div>
  );
};

export default CaptainHome;
