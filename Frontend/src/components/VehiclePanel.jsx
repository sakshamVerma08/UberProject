import React from "react";
import LookingForDriver from "./LookingForDriver";
import { IoCloseOutline } from "react-icons/io5";

const VehiclePanel = (props) => {
  return (
    <div className="p-4 sm:p-6 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto  rounded-lg ">
      {/* <i className="cursor-pointer ri-close-line text-2xl"></i> */}

      <div className="w-full h-full flex items-center justify-between">
        <h3 className="font-semibold text-xl sm:text-2xl mb-4 sm:mb-6">
          Choose a ride
        </h3>
        <IoCloseOutline
          className="cursor-pointer text-2xl"
          onClick={() => props.setVehiclePanel(false)}
        />
      </div>

      {/* VEHICLE DIVS */}
      <div
        onClick={() => props.handleVehicleSelect("car")}
        className="flex items-center w-full p-3 sm:p-4 mb-3 border-2 border-gray-100 rounded-xl hover:border-gray-200 active:border-black transition-colors cursor-pointer"
      >
        <img
          className="h-14 sm:h-16 mr-3 sm:mr-4"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5O2PVmKwYLyptJf2j6AwLaJ8XiBAVt7Z8Cw&s"
          alt="car"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm sm:text-base">UberGo</h4>
            <span className="text-gray-500 text-xs sm:text-sm">
              <i className="ri-user-3-fill mr-1"></i>4
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Affordable, compact rides
          </p>
        </div>
        <div className="ml-3 sm:ml-4 text-right">
          <div className="font-semibold text-base sm:text-lg">
            ₹{props.fare?.car ?? "--"}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500">2 min away</div>
        </div>
      </div>

      <div
        onClick={() => props.handleVehicleSelect("motorcycle")}
        className="flex items-center w-full p-3 sm:p-4 mb-3 border-2 border-gray-100 rounded-xl hover:border-gray-200 active:border-black transition-colors cursor-pointer"
      >
        <img
          className="h-14 sm:h-16 mr-3 sm:mr-4"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
          alt="motorcycle"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm sm:text-base">UberMoto</h4>
            <span className="text-gray-500 text-xs sm:text-sm">
              <i className="ri-user-3-fill mr-1"></i>1
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Affordable, motorcycle rides
          </p>
        </div>
        <div className="ml-3 sm:ml-4 text-right">
          <div className="font-semibold text-base sm:text-lg">
            ₹{props.fare?.motorcycle ?? "--"}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500">2 min away</div>
        </div>
      </div>

      <div
        onClick={() => props.handleVehicleSelect("auto")}
        className="flex items-center w-full p-3 sm:p-4 border-2 border-gray-100 rounded-xl hover:border-gray-200 active:border-black transition-colors cursor-pointer"
      >
        <img
          className="h-14 sm:h-16 mr-3 sm:mr-4"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s"
          alt="auto"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm sm:text-base">UberAuto</h4>
            <span className="text-gray-500 text-xs sm:text-sm">
              <i className="ri-user-3-fill mr-1"></i>3
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Affordable, three wheeler auto rides
          </p>
        </div>
        <div className="ml-3 sm:ml-4 text-right">
          <div className="font-semibold text-base sm:text-lg">
            ₹{props.fare?.auto ?? "--"}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500">2 min away</div>
        </div>
      </div>
      {props.lookingForDriver && <LookingForDriver />}
    </div>
  );
};

export default VehiclePanel;
