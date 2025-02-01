import React from "react";

const WaitForDriver = () => {
  return (
    <div>
      <h5
        onClick={() => {
          setWaitForDriverOpen(false);
        }}
        className=" text-right text-lg mb-5 absolute top-5 w-[93%] "
      >
        <i className="ri-arrow-down-line text-3xl "></i>
      </h5>
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
    </div>
  );
};

export default WaitForDriver;
