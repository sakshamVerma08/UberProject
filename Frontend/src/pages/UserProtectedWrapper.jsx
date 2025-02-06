import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      NProgress.start();
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            setUser(data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log("Error = ", err);
          localStorage.removeItem("token");
          navigate("/login");
        })
        .finally(() => {
          NProgress.done();
        });
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return <div>{children}</div>;
};

export default UserProtectedWrapper;
