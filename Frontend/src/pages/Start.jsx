import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  h-screen w-full pt-8 flex flex-col justify-between">
        <img
          className="w-16 ml-8 md:w-20 lg:w-24 md:ml-12 lg:ml-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber-Logo.png"
        />
        <div className="bg-white py-5 px-4 pb-7 md:px-8 lg:px-12">
          <h2 className="text-3xl font-bold md:text-3xl lg:text-4xl lg:mt-4">
            Get started with Uber
          </h2>
          <Link
            to="/login"
            className="flex justify-center items-center w-full py-3 bg-black text-white rounded mt-5 md:py-3.5 lg:py-4 md:text-lg hover:bg-gray-800 transition"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
