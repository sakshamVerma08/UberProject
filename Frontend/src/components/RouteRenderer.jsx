import React, { useEffect, useRef, useState, useCallback } from "react";
import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";

import DriverMarker from "./DriverMarker";
import useNearbyDrivers from "../hooks/useNearbyDrivers";
import { RiMapPinUserFill } from "react-icons/ri";

const RouteRenderer = ({
  origin,
  destination,
  onRouteCalculated,
  isDarkMode = false,
}) => {
  const directionsServiceRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const lastRouteRef = useRef({ origin: null, destination: null });

  const mapRef = useRef(null);

  const darkMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

  const lightMapStyles = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [{ saturation: -100 }, { gamma: 0.5 }],
    },
  ];

  const mapOptions = {
    styles: isDarkMode ? darkMapStyles : lightMapStyles,
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f0f0",
  };

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
    if (window.google) {
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      calculateRoute();
    }
  }, []);

  useEffect(() => {
    if (directionsServiceRef.current) {
      const timer = setTimeout(() => {
        calculateRoute();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [origin, destination, calculateRoute]);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
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
        options={mapOptions}
      >
        {origin && (
          <Marker
            position={origin}
            icon={{
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
              fillColor: isDarkMode ? "#3b82f6" : "#2563eb",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
              scale: 1.5,
            }}
          />
        )}

        {destination && (
          <Marker
            position={destination}
            icon={{
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
              fillColor: isDarkMode ? "#10b981" : "#059669",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
              scale: 1.5,
            }}
          />
        )}

        {directions && (
          <DirectionsRenderer
            options={{
              polylineOptions: {
                strokeColor: isDarkMode ? "#60a5fa" : "#3b82f6",
                strokeWeight: 6,
                strokeOpacity: 0.8,
              },
              suppressMarkers: true,
            }}
            directions={directions}
          />
        )}

        {nearbyDrivers.map((driver) => (
          <DriverMarker
            key={driver.id}
            position={driver.position}
            driverId={driver.id}
            vehicleType={driver.vehicle?.vehicleType || "car"}
            isDarkMode={isDarkMode}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default React.memo(RouteRenderer);
