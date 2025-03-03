import React, { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainDetails = () => {
  // const { captain } = useContext(CaptainDataContext);
  const captain = JSON.parse(localStorage.getItem("captain"));

  if (!captain) {
    return (
      <div className="flex items-center justify-center text-xl font-semibold">
        {" "}
        Loading ...
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1682092603230-1ce7cf8ca451?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwbWFufGVufDB8fDB8fHww"
            alt="User Image"
          />
          <h4 className="text-lg font-medium first-letter:uppercase">
            {captain.fullname.firstname + " " + captain.fullname.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold ">₹295.20</h4>
          <p className="text-sm font-medium text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex justify-center gap-5 items-start p-5 mt-6 bg-gray-100 rounded-xl sm:justify-around">
        <div className="text-center ">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
