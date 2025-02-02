import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen ">
      <Link
        to={"/home"}
        className="flex items-center justify-center top-2 right-2 rounded-full bg-white w-10 h-10 fixed"
      >
        <i className="text-lg font-bold  ri-home-5-line"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
          alt="temporary image"
        />
      </div>

      <div className="h-1/2 p-4">
        <div className="flex justify-between items-center">
          <img
            className="h-18 "
            src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5O2PVmKwYLyptJf2j6AwLaJ8XiBAVt7Z8Cw&s "
            alt="Car.png"
          />
          <div className="text-right">
            <h2 className="font-semibold text-lg">Ramesh</h2>
            <h4 className="text-2xl font-medium ">DL 8H BZ 9924</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Swift</p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-2">
          <div className="w-full">
            {/* <div className="flex items-center gap-5  border-b-2 p-3 border-gray-400">
            <i className=" text-lg ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-bold">562/11-A </h3>
              <p className="text-gray-600 text-base font-semibold">
                Kankariya Talab , Ahemdabad
              </p>
            </div>
          </div> */}

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

        <button className="w-full bg-green-600 p-2 font-semibold text-white rounded-lg mt-5">
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
