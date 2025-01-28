import React from "react";

const UserLogin = () => {
  return (
    <div className="p-7">
      <img
        className="w-16 mb-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber-Logo.png"
      />
      <form>
        <h3 className="text-lg font-medium mb-2">What's your email</h3>

        <input
          className="w-full mb-7 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
          type="email"
          required
          placeholder="email@example.com"
        />

        <h3 className="text-lg font-medium mb-2">Enter Password</h3>

        <input
          className="w-full mb-7 px-4 py-2 bg-[#eeeeee] text-lg placeholder:text-base rounded border"
          type="password"
          placeholder="Password"
        />

        <button className="w-full mb-7 px-4 py-2 bg-[#111] text-lg text-white font-semibold placeholder:text-base rounded ">
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
