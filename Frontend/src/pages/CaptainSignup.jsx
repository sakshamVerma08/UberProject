import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import { toast } from "react-hot-toast";

const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    vehicleColor: "",
    vehiclePlate: "",
    vehicleCapacity: 1,
    vehicleType: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { socket } = useContext(SocketContext);
  const { updateCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.vehicleColor ||
      !formData.vehiclePlate ||
      !formData.vehicleType
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    const captainData = {
      fullname: {
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
      },
      email: formData.email.trim(),
      password: formData.password,
      vehicle: {
        color: formData.vehicleColor.trim(),
        plate: formData.vehiclePlate.trim(),
        capacity: parseInt(formData.vehicleCapacity, 10),
        vehicleType: formData.vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        updateCaptain(data.captain);
        toast.success("Account created successfully!");

        socket.emit("join", {
          userId: data.captain._id,
          userType: "captain",
        });

        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong. Please try again";
      toast.error(errorMessage);
      console.error("Error during signup:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left: Signup Form */}
      <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center overflow-y-auto">
        <div className="max-w-2xl w-full mx-auto">
          <div className="mb-8">
            <img
              className="w-16 h-16 mb-4"
              src="https://www.svgrepo.com/show/505031/uber-driver.svg"
              alt="Uber Driver Logo"
            />
            <h1 className="text-3xl font-bold text-gray-900">
              Become a Driver Partner
            </h1>
            <p className="mt-2 text-gray-600">
              Join our platform and start earning on your schedule
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First name *
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last name *
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    required
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Create a password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength="6"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 6 characters
                </p>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Vehicle Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="vehicleColor"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Vehicle Color *
                  </label>
                  <input
                    id="vehicleColor"
                    name="vehicleColor"
                    type="text"
                    required
                    value={formData.vehicleColor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Black, White, Red"
                  />
                </div>
                <div>
                  <label
                    htmlFor="vehiclePlate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    License Plate *
                  </label>
                  <input
                    id="vehiclePlate"
                    name="vehiclePlate"
                    type="text"
                    required
                    value={formData.vehiclePlate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="e.g., ABC123"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="vehicleCapacity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Passenger Capacity *
                  </label>
                  <input
                    id="vehicleCapacity"
                    name="vehicleCapacity"
                    type="number"
                    min="1"
                    max="8"
                    required
                    value={formData.vehicleCapacity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="vehicleType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Vehicle Type *
                  </label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    required
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="">Select vehicle type</option>
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="auto">Auto</option>
                    <option value="suv">SUV</option>
                    <option value="van">Van</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200 ${
                  isLoading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/captain-login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By proceeding, you agree to our Terms of Service and confirm you
              have read our Privacy Policy. This site is protected by reCAPTCHA
              and the Google{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1630450202870-3e36fc4eec6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative h-full flex items-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-4">Drive with Uber</h2>
            <p className="text-lg mb-6">
              Set your own schedule, be your own boss, and earn money on your
              terms.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Flexible schedule</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Weekly payments</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>24/7 support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
