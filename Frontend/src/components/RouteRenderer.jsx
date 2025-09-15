import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";

import DriverMarker from "./DriverMarker";
import useNearbyDrivers from "../hooks/useNearbyDrivers";

// const libraries = ["places", "directions"];

const RouteRenderer = ({ origin, destination, onRouteCalculated }) => {
  const directionsServiceRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const lastRouteRef = useRef({ origin: null, destination: null });

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && origin && !destination) {
      mapRef.current.panTo(origin);
      mapRef.current.setZoom(15);
    }
  }, [origin, destination]);

  const calculateRoute = useCallback(async () => {
    if (!origin || !destination || !directionsServiceRef.current) {
      console.warn("Origin or Destination is Missing");
      return;
    }

    // Skip if we already have directions for these points
    if (
      lastRouteRef.current.origin === origin &&
      lastRouteRef.current.destination === destination
    ) {
      return;
    }

    try {
      const request = {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      };
      console.log("Calculating route...");

      // const results = await directionsServiceRef.current.route({
      //   origin: origin,
      //   destination: destination,
      //   travelMode: window.google.maps.TravelMode.DRIVING,
      //   provideRouteAlternatives: false,
      // });

      const results = await directionsServiceRef.current.route(
        request,
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            lastRouteRef.current = { origin, destination };
          }
        }
      );

      console.log("Route Found \n");

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
    mapRef.current = map;
  }, []);

  // WIP: instead of this custom hook, call the backend customm api.
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
    10000
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
        {/* Showing Pickup Marker */}
        {origin && (
          <Marker
            position={origin}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // pickup marker
            }}
          />
        )}

        {/* Showing Destination marker */}

        {destination && (
          <Marker
            position={destination}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
        )}

        {directions && (
          <DirectionsRenderer
            options={{
              polylineOptions: {
                strokeColor: "#000000",
                strokeWeight: 6,
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
