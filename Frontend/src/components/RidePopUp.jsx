import React from "react";

const RidePopUp = () => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className=" text-right text-lg mb-5 absolute top-5 w-[93%] "
      >
        <i className="ri-arrow-down-line text-3xl "></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-3">New Ride Available!</h3>

      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full">
          <div className="flex items-center gap-5  border-b-2 p-3 border-gray-400">
            <i className=" text-lg ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-bold">562/11-A </h3>
              <p className="text-gray-600 text-base font-semibold">
                Kankariya Talab , Ahemdabad
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b-2 p-3 border-gray-400">
            <i className=" text-lg ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-bold">562/11-A </h3>
              <p className="text-gray-600 text-base font-semibold">
                Kankariya Talab , Ahemdabad
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-gray-400">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-bold">₹193.20 </h3>
              <p className="text-gray-600 text-base font-semibold">Cash</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          props.setVehicleFound(true);
          props.setConfirmRidePanel(false);
        }}
        className="w-full bg-green-600 p-2 font-semibold text-white rounded-lg mt-5"
      >
        Confirm
      </button>
      <button
        onClick={() => {
          props.setVehicleFound(true);
          props.setConfirmRidePanel(false);
        }}
        className="w-full bg-gray-300 p-2 font-semibold text-gray-700 rounded-lg mt-3 "
      >
        Ignore
      </button>
    </div>
  );
};

export default RidePopUp;
