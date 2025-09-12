import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const CaptainLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    console.log("Couldn't find token in localStorage");
  }

  axios
    .get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        toast.success(response.data.message || "Logout Successful");

        navigate("/captain-login");
      }
    })
    .catch((err) => {
      console.log("Error while logging out captain", err);
      toast.error("Something went wrong. Please try again.");
    });
  return <div>CaptainLogout</div>;
};

export default CaptainLogout;
