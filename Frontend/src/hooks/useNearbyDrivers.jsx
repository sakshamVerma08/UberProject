import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const useNearbyDrivers = ({
  center,
  radius = 5000,
  updateInterval,
  vehicleType,
}) => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!center) return;

    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/drivers/nearby`,
          {
            params: { lat: center.lat, lng: center.lng, radius, vehicleType },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user_token")}`,
            },
          }
        );

        if (response.status === 200) {
          const formattedDrivers = response.data.map((driver) => {
            return {
              id: driver._id,
              position: {
                lat: driver.location.coordinates[1],
                lng: driver.location.coordinates[0],
              },
            };
          });

          setDrivers(formattedDrivers);
        }

        setError(null);
        
      } catch (err) {
        console.error("Error fetching nearby drivers:", err);
        setError("Failed to load nearby drivers");
        toast.error("Failed to find any captains in the vicinity");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();

    const interval = setInterval(fetchDrivers, updateInterval);
    return () => clearInterval(interval);
  }, [center, radius, updateInterval]);

  return { drivers, loading, error };
};

export default useNearbyDrivers;
