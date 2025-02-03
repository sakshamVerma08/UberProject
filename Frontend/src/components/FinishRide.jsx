import React from "react";
import { Link } from "react-router-dom";

const FinishRide = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className=" text-right text-lg mb-5 absolute top-5 w-[93%] "
      >
        <i className="ri-arrow-down-line text-3xl "></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-3">Finish this ride </h3>

      <div className="flex items-center justify-between p-3 mt-4 rounded-lg bg-yellow-300">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cove"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsdrJhuv3FcZmEE9MHYjIaJ5DOxSIQ39BWg&s"
            alt="user-image"
          />
          <h2 className="font-medium text-lg">Harsh Patel</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

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

      <div className="mt-6 w-full">
        <Link
          to={"/captain-home"}
          className="flex justify-center w-full bg-green-600 p-3 font-semibold text-white rounded-lg mt-5"
        >
          Finish Ride
        </Link>
        <p className="text-red-500 mt-10 text-xs">
          Click on Finish ride button if you have completed the payment
        </p>
      </div>
    </div>
  );
};

export default FinishRide;
