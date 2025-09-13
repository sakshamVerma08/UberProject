import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import DriverMarker from "./DriverMarker";
import useNearbyDrivers from "../hooks/useNearbyDrivers";

const libraries = ["places", "directions"];

const RouteRenderer = ({ origin, destination, onRouteCalculated }) => {
  const directionsServiceRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const lastRouteRef = useRef({ origin: null, destination: null });

  const calculateRoute = useCallback(async () => {
    if (!origin || !destination || !directionsServiceRef.current) return;

    // Skip if we already have directions for these points
    if (
      lastRouteRef.current.origin === origin &&
      lastRouteRef.current.destination === destination
    ) {
      return;
    }

    try {
      console.log("Calculating route...");
      const results = await directionsServiceRef.current.route({
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      });

      lastRouteRef.current = { origin, destination };
      setDirections(results);

      if (onRouteCalculated) {
        onRouteCalculated({
          distance: results.routes[0].legs[0].distance,
          duration: results.routes[0].legs[0].duration,
        });
      }
    } catch (err) {
      console.error("Error calculating route:", err);
      setError("Could not calculate route. Please try again.");
    }
  }, [origin, destination, onRouteCalculated]);

  useEffect(() => {
    // Initialize directions service
    if (window.google) {
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      calculateRoute();
    }
  }, []);

  // Only recalculate when origin or destination changes
  useEffect(() => {
    if (directionsServiceRef.current) {
      const timer = setTimeout(() => {
        calculateRoute();
      }, 300); // Small debounce to handle rapid updates

      return () => clearTimeout(timer);
    }
  }, [origin, destination, calculateRoute]);

  const onLoad = useCallback((map) => {
    // Just storing the map instance if needed later
  }, []);

  const {
    drivers: nearbyDrivers,
    loading,
    error: driversError,
  } = useNearbyDrivers(
    {
      lat: (origin?.lat + destination?.lat) / 2,
      lng: (origin?.lng + destination?.lng) / 2,
    },
    0.03,
    3000
  );
  return (
    <div className="w-full h-full">
      {driversError && (
        <div className="text-red-500 text-sm p-2">{driversError}</div>
      )}

      <GoogleMap
        zoom={14}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={onLoad}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        
      >
        {directions && (
          <DirectionsRenderer
            options={{
              polylineOptions: {
                strokeColor: "#000000",
                strokeWeight: 5,
                strokeOpacity: 0.8,
              },
              suppressMarkers: true,
            }}
            directions={directions}
          />
        )}

        {nearbyDrivers.map((driver) => {
          return (
            <DriverMarker
              key={driver.id}
              position={driver.position}
              driverId={driver.id}
              vehicleType={driver.vehicle?.vehicleType || "car"}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default React.memo(RouteRenderer);
