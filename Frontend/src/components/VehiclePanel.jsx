import React from "react";
import LookingForDriver from "./LookingForDriver";

const VehiclePanel = (props) => {
  
  const handleVehicleSelect = (vehicleType) => {
    props.selectVehicle(vehicleType);
    // Show the LookingForDriver component with the selected vehicle type
    props.setWaitForDriverOpen(true);
    props.setVehiclePanel(false);
  };

  return (
    <div className="p-4">
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="text-right text-lg mb-5 absolute top-5 right-5"
      >
        <i className="cursor-pointer ri-close-line text-2xl"></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-6">Choose a ride</h3>

      {/* VEHICLE DIVS */}
      <div
        onClick={() => handleVehicleSelect("car")}
        className="flex items-center w-full p-4 mb-3 border-2 border-gray-100 rounded-xl hover:border-gray-200 active:border-black transition-colors cursor-pointer"
      >
        <img
          className="h-16 mr-4"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5O2PVmKwYLyptJf2j6AwLaJ8XiBAVt7Z8Cw&s"
          alt="car"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-base">UberGo</h4>
            <span className="text-gray-500 text-sm">
              <i className="ri-user-3-fill mr-1"></i>4
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Affordable, compact rides
          </p>
        </div>
        <div className="ml-4 text-right">
          <div className="font-semibold text-lg">₹{props.fare.car}</div>
          <div className="text-xs text-gray-500">2 min away</div>
        </div>
      </div>

      <div
        onClick={() => handleVehicleSelect("motorcycle")}
        className="flex items-center w-full p-4 mb-3 border-2 border-gray-100 rounded-xl hover:border-gray-200 active:border-black transition-colors cursor-pointer"
      >
        <img
          className="h-16 mr-4"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
          alt="motorcycle"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-base">UberMoto</h4>
            <span className="text-gray-500 text-sm">
              <i className="ri-user-3-fill mr-1"></i>1
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Affordable, motorcycle rides
          </p>
        </div>
        <div className="ml-4 text-right">
          <div className="font-semibold text-lg">₹{props.fare.motorcycle}</div>
          <div className="text-xs text-gray-500">2 min away</div>
        </div>
      </div>

      <div
        onClick={() => handleVehicleSelect("auto")}
        className="flex items-center w-full p-4 border-2 border-gray-100 rounded-xl hover:border-gray-200 active:border-black transition-colors cursor-pointer"
      >
        <img
          className="h-16 mr-4"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s"
          alt="auto"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-base">UberAuto</h4>
            <span className="text-gray-500 text-sm">
              <i className="ri-user-3-fill mr-1"></i>3
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Affordable, three wheeler auto rides
          </p>
        </div>
        <div className="ml-4 text-right">
          <div className="font-semibold text-lg">₹{props.fare.auto}</div>
          <div className="text-xs text-gray-500">2 min away</div>
        </div>
      </div>
      {props.lookingForDriver && <LookingForDriver />}
    </div>
  );
};

export default VehiclePanel;
