import React, { useEffect } from "react";

const RidePopUp = (props) => {
  return (
    <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto p-4 sm:p-6">
      {/* Close button */}
      <button
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
        aria-label="Close"
        className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
      >
        <i className="ri-arrow-down-line text-2xl sm:text-3xl"></i>
      </button>

      <h3 className="font-semibold text-xl sm:text-2xl mb-2 sm:mb-3">
        New Ride Available!
      </h3>

      <div className="flex items-center justify-between p-3 sm:p-4 mt-3 sm:mt-4 rounded-lg bg-gray-100">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsdrJhuv3FcZmEE9MHYjIaJ5DOxSIQ39BWg&s"
            alt="user-image"
          />
          <h2 className="font-medium text-sm sm:text-base md:text-lg truncate max-w-[40vw]">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
          {props.ride?.distance}
        </h5>
      </div>

      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full">
          <div className="flex items-start gap-4 border-b border-gray-200 p-3">
            <i className="text-lg ri-map-pin-line text-green-600 flex-shrink-0 mt-0.5"></i>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold truncate">
                Pickup
              </h3>
              <p className="text-sm sm:text-base text-gray-700 truncate max-w-[80vw] md:max-w-none">
                {props.ride?.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-b border-gray-200 p-3">
            <i className="text-lg ri-map-pin-line text-red-500 flex-shrink-0 mt-0.5"></i>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold truncate">
                Destination
              </h3>
              <p className="text-sm sm:text-base text-gray-700 truncate max-w-[80vw] md:max-w-none">
                {props.ride?.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3">
            <i className="ri-currency-line text-gray-600"></i>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                ₹{props.ride?.fare}{" "}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-semibold">
                Cash
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-4 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 md:flex md:justify-between">
        <button
          onClick={() => {
            props.setRidePopUpPanel(false);
            props.rejectRide();
          }}
          className="w-full sm:w-auto cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 font-semibold text-gray-700 rounded-lg"
        >
          Ignore
        </button>
        <button
          onClick={() => {
            // props.setConfirmRidePopUpPanel(true);
            props.confirmRide();
          }}
          className="w-full sm:w-auto cursor-pointer bg-green-600 hover:bg-green-700 px-4 py-2 font-semibold text-white rounded-lg"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
