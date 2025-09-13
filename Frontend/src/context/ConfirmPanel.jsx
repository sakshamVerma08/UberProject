import React from "react";

const ConfirmPanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className=" text-right text-lg mb-5 absolute top-5 w-[93%] "
      >
        <i className="cursor-pointer ri-arrow-down-line text-3xl "></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-3">Confirm your Ride</h3>

      <div className="flex flex-col justify-between items-center gap-2">
        {props.vehicleType === "car" ? (
          <img
            className="h-20 "
            src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5O2PVmKwYLyptJf2j6AwLaJ8XiBAVt7Z8Cw&s "
            alt="Car.png"
          />
        ) : props.vehicleType === "auto" ? (
          <img
            className="h-20 "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s"
            alt="Auto.png"
          />
        ) : (
          <img
            className="h-20 "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
            alt="Moto.png"
          />
        )}

        <div className="w-full">
          <div className="flex items-center gap-5  border-b-2 p-3 border-gray-400">
            <i className=" text-lg ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-bold"> {props.pickup}</h3>
              <p className="text-gray-600 text-base font-semibold">
                {props.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b-2 p-3 border-gray-400">
            <i className=" text-lg ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-bold">{props.destination}</h3>
              <p className="text-gray-600 text-base font-semibold">
                {props.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-gray-400">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-bold">₹{props.fare}</h3>
              <p className="text-gray-600 text-base font-semibold">Cash</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          props.setVehicleFound(true);
          props.setConfirmRidePanel(false);
          props.createRide(props.vehicleType);
        }}
        className="w-full bg-green-600 p-2 font-semibold text-white rounded-lg mt-5"
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmPanel;
