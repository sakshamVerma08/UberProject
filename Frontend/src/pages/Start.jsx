import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-50">
      {/* Left: Hero Section */}
      <div className="lg:w-1/2 relative overflow-hidden">
        <div
          className="h-[40vh] lg:h-full w-full bg-cover bg-center 
           transition-all duration-700 hover:scale-105"
        >
          <div className="absolute inset-0  bg-black bg-opacity-30 flex flex-col justify-between p-8 lg:p-12">
            <img
              className="w-16 lg:w-24"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber Logo"
            />
            <div className="text-white">
              <h1 className="text-3xl lg:text-5xl font-bold mb-4">Get there</h1>
              <h2 className="text-2xl lg:text-4xl font-light">
                Your ride, on demand
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Content Section */}
      <div className="lg:w-1/2 flex flex-col justify-between p-8 lg:p-12 bg-white">
        <div className="max-w-md mx-auto w-full">
          {/* Logo for mobile */}
          <img
            className="w-16 mb-8 lg:hidden"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Request a ride now
              </h2>
              <p className="text-gray-600">
                Get where you want to go with the tap of a button. Available in
                10,000+ cities worldwide.
              </p>
            </div>

            <div className="space-y-4">
              <Link
                to="/login"
                className="block w-full py-4 px-6 bg-black text-white text-center font-medium rounded-lg hover:bg-gray-900 transition-colors duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                Sign in to ride
              </Link>

              <Link
                to="/signup"
                className="block w-full py-4 px-6 bg-white text-black border-2 border-black text-center font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Sign up to ride
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Drive with Uber
              </h3>
              <div className="flex space-x-4">
                <Link
                  to="/captain-login"
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-center rounded-lg text-sm font-medium transition-colors"
                >
                  Sign in to drive
                </Link>
                <Link
                  to="/captain-signup"
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-center rounded-lg text-sm font-medium transition-colors"
                >
                  Sign up to drive
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            By proceeding, you agree to our Terms of Use and confirm you have
            read our Privacy Notice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Start;
