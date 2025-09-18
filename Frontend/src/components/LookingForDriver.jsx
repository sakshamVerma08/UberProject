// LookingForDriver.jsx
import React from "react";
import { FiLoader } from "react-icons/fi";

const LookingForDriver = ({ isLookingForCaptains }) => {
  const handleClose = () => {
    if (typeof isLookingForCaptains === "function") {
      isLookingForCaptains(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] text-center p-4 sm:p-6">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <i className="ri-arrow-down-line text-xl sm:text-2xl"></i>
      </button>

      {/* Spinner */}
      <div className="flex items-center justify-center mb-4 sm:mb-6">
        <FiLoader className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-black" />
      </div>

      {/* Message */}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
        Finding your driver…
      </h3>
      <p className="text-gray-500 text-sm sm:text-base max-w-xs sm:max-w-sm">
        Please wait while we connect you with a nearby driver.
      </p>
    </div>
  );
};

export default LookingForDriver;
