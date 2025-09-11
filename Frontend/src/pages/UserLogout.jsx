import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("Token not taken from localStorage");
  }
  const navigate = useNavigate();
  axios
    .get(`${import.meta.env.VITE_API_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        console.log("token removed from localStorage");
        toast.success("Logged out successfully ");
        navigate("/login");
      }
    })
    .catch((err) => {
      console.log("Error during Logout = ", err);
      toast.error("Something went wrong. Please try again");
    });

  return <div>User Logout </div>;
};

export default UserLogout;
