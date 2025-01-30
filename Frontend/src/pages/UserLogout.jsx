import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        navigate("/login");
      }
    })
    .catch((err) => {
      console.log("Error during Logout = ", err);
    });

  return <div>User Logout </div>;
};

export default UserLogout;
