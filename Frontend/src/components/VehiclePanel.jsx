import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className=" text-right text-lg mb-5 absolute top-5 w-[93%] "
      >
        <i className=" ri-arrow-down-line text-3xl"></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-3">Choose a Vehicle</h3>

      {/* VEHICLE DIVS
       ******************/}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
        className="flex border-2 border-white  active:border-black rounded-xl justify-between items-center w-full p-3 mb-2"
      >
        {" "}
        <img
          className="h-16"
          src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5O2PVmKwYLyptJf2j6AwLaJ8XiBAVt7Z8Cw&s "
          alt="car png"
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base ">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm ">2 mins away </h5>
          <p className="font-normal text-sm text-gray-400 ">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="font-semibold text-xl ">₹193.20</h2>
      </div>
      {/* ***************************** */}

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
        className="flex border-2 border-white  active:border-black rounded-xl justify-between items-center w-full p-3 mb-2"
      >
        {" "}
        <img
          className="h-16"
          src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5O2PVmKwYLyptJf2j6AwLaJ8XiBAVt7Z8Cw&s "
          alt="car png"
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base ">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm ">2 mins away </h5>
          <p className="font-normal text-sm text-gray-400 ">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="font-semibold text-xl ">₹193.20</h2>
      </div>
      {/* ***************************** */}

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
        className="flex border-2 border-white  active:border-black rounded-xl justify-between items-center w-full p-3 mb-2"
      >
        {" "}
        <img
          className="h-16"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s "
          alt="car png"
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base ">
            UberMoto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm ">2 mins away </h5>
          <p className="font-normal text-sm text-gray-400 ">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="font-semibold text-xl ">₹65.17</h2>
      </div>
      {/* ***************************** */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
        className="flex border-2 border-white  active:border-black rounded-xl justify-between items-center w-full p-3 mb-2"
      >
        {" "}
        <img
          className="h-16"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s  "
          alt="car png"
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base ">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm ">2 mins away </h5>
          <p className="font-normal text-sm text-gray-400 ">
            Affordable, three wheeler auto rides
          </p>
        </div>
        <h2 className="font-semibold text-xl ">₹118.86</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
