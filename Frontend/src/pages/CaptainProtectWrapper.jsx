import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import NProgress from "nprogress";

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    } else {
      NProgress.start();
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            setCaptain(data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log("Error = ", err);
          localStorage.removeItem("token");
          navigate("/captain-login");
        })
        .finally(() => {
          NProgress.done();
        });
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading ... </div>;
  }
  return <div>{children}</div>;
};

export default CaptainProtectedWrapper;
