import React, { useEffect } from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
        className=" text-right text-lg mb-5 absolute top-5 w-[93%] "
      >
        <i className="cursor-pointer ri-arrow-down-line text-3xl "></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-3">New Ride Available!</h3>

      <div className="flex items-center justify-between p-3 mt-4 rounded-lg bg-gray-300">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cove"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsdrJhuv3FcZmEE9MHYjIaJ5DOxSIQ39BWg&s"
            alt="user-image"
          />
          <h2 className="font-medium text-lg">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full">
          <div className="flex items-center gap-5  border-b-2 p-3 border-gray-400">
            <i className=" text-lg ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-bold">{props.ride?.pickup}</h3>
              {/* <p className="text-gray-600 text-base font-semibold">
                {props.ride?.pickup}
              </p> */}
            </div>
          </div>

          <div className="flex items-center gap-5 border-b-2 p-3 border-gray-400">
            <i className=" text-lg ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-bold">{props.ride?.destination} </h3>
              {/* <p className="text-gray-600 text-base font-semibold">
                {props.ride?.destination}
              </p> */}
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-gray-400">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-bold">₹{props.ride?.fare} </h3>
              <p className="text-gray-600 text-base font-semibold">Cash</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between mt-5 ">
        <button
          onClick={() => {
            props.setRidePopUpPanel(false);
            props.rejectRide();
          }}
          className="cursor-pointer bg-gray-300 p-2 px-8 font-semibold text-gray-700 rounded-lg  "
        >
          Ignore
        </button>
        <button
          onClick={() => {
            // Set start ride pop up panel = true here
            // props.setConfirmRidePopUpPanel(true);
            props.confirmRide();
          }}
          className="cursor-pointer bg-green-600 p-2 px-8 font-semibold text-white rounded-lg"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
