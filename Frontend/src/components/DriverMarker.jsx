import { Marker } from "@react-google-maps/api";
import React, { useEffect, useRef } from "react";

const DriverMarker = ({ position, driverId, icon }) => {
  const markerRef = useRef(null);

  // Update the marker position when it changes

  useEffect(() => {
    if (markerRef.current && position) {
      markerRef.current.setPosition(position);
    }
  }, [position]);

  return (
    <Marker
      position={position}
      ref={markerRef}
      icon={{
        url: "/driver-marker.png",
        scaledSize: new window.google.maps.Size(40, 40),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(20, 20),
      }}
    />
  );
};

export default DriverMarker;
