import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        navigate("/captain-login");
      }
    })
    .catch((err) => {
      console.log("Error while logging out captain", err);
    });
  return <div>CaptainLogout</div>;
};

export default CaptainLogout;
