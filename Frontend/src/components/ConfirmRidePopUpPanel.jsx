import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmRidePopUpPanel = (props) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError("Please enter a valid OTP");
      return;
    }
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/captain-riding");
    } catch (err) {
      setError("Failed to confirm ride. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto focus OTP input when component mounts
  useEffect(() => {
    const otpInput = document.querySelector("#otpInput");
    if (otpInput) otpInput.focus();
  }, []);

  return (
    <div className="relative bg-white rounded-t-3xl shadow-2xl p-6 pb-8 w-full max-w-md mx-auto overflow-hidden">
      {/* Close Button */}
      <button
        onClick={() => props.setConfirmRidePopUpPanel(false)}
        className="absolute right-6 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close"
      >
        <i className="ri-close-line text-2xl"></i>
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Confirm your ride
        </h2>
        <p className="text-gray-600">Verify your details before proceeding</p>
      </motion.div>

      {/* Driver Info */}
      <motion.div
        className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-sm"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Driver"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <div className="bg-white rounded-full p-0.5">
                  <i className="ri-car-fill text-green-500 text-xs"></i>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Aarav Sharma</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-yellow-500">★ 4.9</span>
                <span className="mx-1">•</span>
                <span>MH 12 AB 1234</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              ₹{props.fare.selectedVehicle || "--"}
            </div>
            <div className="text-xs text-gray-500">{props.distance}</div>
          </div>
        </div>
      </motion.div>

      {/* Trip Details */}
      <motion.div
        className="space-y-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="flex items-start truncate">
          <div className="flex flex-col items-center mr-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
            <div className="w-0.5 h-6 bg-gray-300 my-1"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-xs text-gray-500">PICKUP</p>
              <p className="font-medium text-gray-900 truncate text-ellipsis">
                {props.pickup || "Current location"}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-xs text-gray-500">DROPOFF</p>
              <p className="font-medium text-gray-900 truncate text-ellipsis">
                {props.destination || "Destination"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* OTP Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="otpInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter OTP sent to your mobile
            </label>
            <div className="relative">
              <input
                id="otpInput"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/[^0-9]/g, ""));
                  if (error) setError("");
                }}
                placeholder="1234"
                className={`w-full px-4 py-3 rounded-lg border ${
                  error ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
              {otp && (
                <button
                  type="button"
                  onClick={() => setOtp("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line"></i>
                </button>
              )}
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={isLoading || !otp}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                isLoading || !otp
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black hover:bg-gray-900"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Confirming...
                </div>
              ) : (
                "Confirm Ride"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
              }}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ConfirmRidePopUpPanel;
