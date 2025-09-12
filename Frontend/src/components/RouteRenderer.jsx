import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const libraries = ["places", "directions"];

const RouteRenderer = ({ origin, destination, onRouteCalculated }) => {
  const directionsServiceRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!origin || !destination) return;

    const calculateRoute = async () => {
      if (!directionsServiceRef.current) return;

      try {
        const results = await directionsServiceRef.current.route({
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: false,
        });

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
    };

    calculateRoute();
  }, [origin, destination, onRouteCalculated]);

  // Initialize directions service
  const onLoad = React.useCallback((map) => {
    directionsServiceRef.current = new window.google.maps.DirectionsService();
  }, []);

  return (
    <div className="w-full h-full">
      {error && <div className="text-red-500 text-sm p-2">{error}</div>}
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
      </GoogleMap>
    </div>
  );
};

export default RouteRenderer;
