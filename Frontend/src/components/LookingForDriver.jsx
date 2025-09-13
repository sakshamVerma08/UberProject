// LookingForDriver.jsx
import React from "react";
import { FiLoader } from "react-icons/fi";

const LookingForDriver = ({ setVehicleFound }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      {/* Close button */}
      <button
        onClick={() => setVehicleFound(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <i className="ri-arrow-down-line text-2xl"></i>
      </button>

      {/* Spinner */}
      <div className="flex items-center justify-center mb-6">
        <FiLoader className="w-10 h-10 animate-spin text-black" />
      </div>

      {/* Message */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Finding your driver…
      </h3>
      <p className="text-gray-500 text-sm max-w-sm">
        Please wait while we connect you with a nearby driver.
      </p>
    </div>
  );
};

export default LookingForDriver;
