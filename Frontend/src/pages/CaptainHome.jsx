import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
  LoadScript,
} from "@react-google-maps/api";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUpPanel from "../components/ConfirmRidePopUpPanel";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { RiMapPinUserFill } from "react-icons/ri";
import { IoPrint } from "react-icons/io5";
import RouteRenderer from "../components/RouteRenderer";

const mapLibraries = ["places"];

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);
  const { socket } = useContext(SocketContext);
  let { captain, setCaptain } = useContext(CaptainDataContext);

  const [ride, setRide] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const directionsServiceRef = useRef(null);

  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  // This function is used as a fake driver spreader, so that drivers can have
  // different locations on the grid (In Development Mode, don't use in prod).
  function generateRandomDelhiCoords() {
    // Delhi NCR Bounding Box Coordinates
    // North: Rohini (28.8, 77.0)
    // South: Faridabad (28.3, 77.3)
    // East: Noida (28.5, 77.5)
    // West: Gurugram (28.4, 76.9)
    // Major Landmarks:
    // - IIT Delhi: 28.5455° N, 77.1970° E
    // - Red Fort: 28.6562° N, 77.2410° E
    // - IGI Airport: 28.5562° N, 77.1000° E
    // - Connaught Place: 28.6280° N, 77.2020° E

    const minLat = 28.3; // Southernmost point (Faridabad)
    const maxLat = 28.9; // Northernmost point (Rohini)
    const minLng = 76.8; // Westernmost point (Gurugram)
    const maxLng = 77.5; // Easternmost point (Noida)

    return {
      lat: Number((Math.random() * (maxLat - minLat) + minLat).toFixed(6)),
      lng: Number((Math.random() * (maxLng - minLng) + minLng).toFixed(6)),
    };
  }

  // Calculate route between two points
  const calculateRoute = useCallback((origin, destination) => {
    if (
      !window.google ||
      !directionsServiceRef.current ||
      !origin ||
      !destination
    )
      return;

    directionsServiceRef.current.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  }, []);

  // Handle map load
  const onLoad = useCallback((map) => {
    setMap(map);
    directionsServiceRef.current = new window.google.maps.DirectionsService();
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Update location function
  const updateLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude ?? null,
          lng: position.coords.longitude ?? null,
        };

        setCurrentLocation(coords);

        // Update server with new location
        if (captain?._id) {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              type: "Point",
              coordinates: [coords.lng, coords.lat],
            },
          });
        }

        // Update route if we have a ride with pickup location
        if (ride?.pickupCoords && directionsServiceRef.current) {
          calculateRoute(coords, ride.pickupCoords);
        }
      },
      (error) => {
        console.error("Error getting geolocation:", error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [captain?._id, ride?.pickupCoords, calculateRoute]);

  // Initialize socket and location updates
  useEffect(() => {
    if (captain && captain._id) {
      console.log("Joining socket room as captain:", captain._id);
      socket.emit("join", { userType: "captain", userId: captain._id });
    } else {
      console.log("No captain found, checking localStorage...");
      const storedCaptain = JSON.parse(localStorage.getItem("captain"));
      if (storedCaptain) {
        setCaptain(storedCaptain);
      }
    }

    console.log("Starting location updates every 10 seconds");
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation(); // Initial call

    return () => {
      console.log("Cleaning up location updates");
      clearInterval(locationInterval);
    };
  }, [captain, updateLocation, socket, setCaptain]);

  
  useEffect(() => {
    const handleNewRideRequest = (data) => {
      console.log("\nRide Request Received:\n", data);
      setRide(data);
      setPickupCoords(data.pickupCoords); // {lat: xyz, lng: xyz}
      setDestinationCoords(data.destinationCoords); // {lat: xyz, lng: xyz}
      setRidePopUpPanel(true);

      // If we have current location, calculate route to pickup
      if (currentLocation && data.pickupCoords) {
        calculateRoute(currentLocation, data.pickupCoords);
      }
    };

    // socket.on("new-ride-request", handleNewRideRequest);

    // Cleanup
    return () => {
      socket.off("new-ride-request", handleNewRideRequest);
    };
  }, [currentLocation, calculateRoute]);

  
 
  async function confirmRide() {
    if (!ride || !ride._id) {
      console.log("Ride or ride id is missing");
      toast.error("Something went wrong. Please try to accept the ride again");
      return;
    }

    if (!captain || !captain._id) {
      console.log("Captain or captain id is missing");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        console.log("Ride Accepted by captain\n");
        toast.success(response.data.message);
      } else if (response.status === 400) {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log("Error in Confirming the ride", err);
      toast.error("Something went wrong. Please try again");
    }

    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);
  }

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopUpPanel]);
  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUpPanel]);

  // Map container style
  const containerStyle = {
    width: "100%",
    height: "60vh",
    position: "relative",
  };

  // Default center (will be overridden by current location)
  const defaultCenter = {
    lat: 28.6139, // Default to Delhi coordinates
    lng: 77.209,
  };

  return (
    <div className="h-screen">
      <div className="fixed top-0 p-3 flex items-center justify-between w-full z-10 bg-white bg-opacity-90">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber-Logo.png"
        />
        <div className="flex items-center space-x-4">
          <Link
            to="/captains/logout"
            className="flex items-center justify-center rounded-full bg-white shadow-md w-10 h-10 hover:bg-gray-100 transition-colors"
          >
            <i className="ri-logout-box-line text-gray-700"></i>
          </Link>
        </div>
      </div>

      <div className="h-3/5 relative">
        {pickupCoords && destinationCoords ? (
          <RouteRenderer
            origin={pickupCoords}
            destination={destinationCoords}
            onRouteCalculated={handleRouteCalculated}
            isDarkMode={isDarkMode}
          />
        ) : (
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={mapLibraries}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={currentLocation || defaultCenter}
              zoom={15}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                disableDefaultUI: true,
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                ],
              }}
            >
              {/* Current location marker */}
              {currentLocation && (
                <Marker
                  position={currentLocation}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "white",
                  }}
                />
              )}

              {/* Pickup location marker */}
              {ride?.pickupCoords && (
                <Marker
                  position={ride.pickupCoords}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    scaledSize: new window.google.maps.Size(40, 40),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(20, 40),
                  }}
                />
              )}

              {/* Directions */}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        )}
      </div>

      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
      >
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          confirmRide={confirmRide}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
      {/* <div
        ref={confirmRidePopUpPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
      >
        <ConfirmRidePopUpPanel
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div> */}
    </div>
  );
};

export default CaptainHome;
