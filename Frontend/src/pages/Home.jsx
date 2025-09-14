import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FiX, FiMapPin, FiNavigation, FiClock, FiUser } from "react-icons/fi";
import { TfiCar as FiCar } from "react-icons/tfi";

import { toast } from "react-hot-toast";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import GoogleMapComponent from "../components/GoogleMapComponent";
import WaitForDriver from "../components/WaitForDriver";
import VehiclePanel from "../components/VehiclePanel";
import LookingForDriver from "../components/LookingForDriver";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import RouteRenderer from "../components/RouteRenderer";
import useNearbyDrivers from "../hooks/useNearbyDrivers";
import ConfirmRidePopUpPanel from "../components/ConfirmRidePopUpPanel";

const mapLibraries = ["places"];

/* Use State variables mapping for easier Reference 

isPanelOpen---> Bottom Search panel (Location Panel)
pickup ---> Pickup Location (textual)
destination ---> Destination location(textual)
pickupSuggestion---> Suggestions array for pickup field.
destinationSuggestion---> Suggestions array for destination field.
isLookingForCaptains---> Opening and closing of the <LookingForDriver/> component Panel.
pickupCoords---> Pickup coordinates (lat & lng)
vehiclePanel---> Used to toggle opening and closing of Vehicle Panel
selectedVehicle---> Represents the vehicle user chose for his/her ride.

*/

const Home = () => {
  // const navigate = useNavigate();

  const [routeInfo, setRouteInfo] = useState({
    distance: null,
    duration: null,
  });

  const [pickupCoords, setPickupCoords] = useState(null);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [waitForDriverOpen, setWaitForDriverOpen] = useState(false);
  const [pickupSuggestion, setPickupSuggestion] = useState([]);
  const [destinationSuggestion, setDestinationSuggestion] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [rideData, setRideData] = useState({});
  const [captainData, setCaptainData] = useState(null);
  const [isLookingForCaptains, setIsLookingForCaptains] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Refs for GSAP animations
  const panelRef = useRef(null); // Location panel screen
  const panelClose = useRef(null); // Location panel close button
  const vehiclePanelRef = useRef(null); // Vehicle panel screen
  const confirmRideRef = useRef(null); // user confirmation screen
  const isLookingForCaptainsRef = useRef(null); // Loading screen
  const waitForDriverRef = useRef(null); // After booking wait screen.

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const token = localStorage.getItem("user_token");

  /* Getting the Nearby Drivers from useNearbyDrivers custom hook */
  const {
    drivers: nearbyDrivers,
    loading,
    errors: driversError,
  } = useNearbyDrivers({
    center: {
      lat: pickupCoords?.lat,
      lng: pickupCoords?.lng,
    },
    radius: 0.05,
    updateInterval: 5000,
    vehicleType: selectedVehicle,
  });

  useEffect(() => {
    if (pickup && !pickupCoords) {
      const fetchCoords = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`,
            {
              params: {
                address: pickup,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("\nCoordinates for Pickup: ", response.data);

          setPickupCoords({ lat: response.data.ltd, lng: response.data.lng });
        } catch (err) {
          console.error("Error fetching coordinates");
          toast.error("Failed to fetch pickup coordinates");
        }
      };

      fetchCoords();
    }
  }, [pickup, pickupCoords, token]);

  /* ********************************/

  useEffect(() => {
    if (!selectedVehicle) return;

    if (
      pickupCoords &&
      selectedVehicle &&
      pickupCoords.lat !== null &&
      pickupCoords.lng !== null
    ) {
      // Only proceed if coords and vehicle are set
      if (
        pickupCoords?.lat &&
        pickupCoords?.lng &&
        selectedVehicle &&
        !loading &&
        !driversError &&
        nearbyDrivers.length > 0
      ) {
        setCaptainData(nearbyDrivers);
        setIsLookingForCaptains(false);

        socket.emit("new-ride-request", {
          userId: user?._id,
          captainsInRadius: nearbyDrivers,
          vehicleType: selectedVehicle,
          pickup,
          pickupCoords,
          destination,
          distance: routeInfo?.distance,
          duration: routeInfo?.duration,
          fare,
        });
      } else if (driversError) {
        console.error("Error fetching nearby drivers:", driversError);
        toast.error("Failed to find nearby drivers.");
        setIsLookingForCaptains(false);
      }
    } else {
      toast.error(`No nearby ${selectedVehicle} drivers were found.`);
      setIsLookingForCaptains(false);
    }
  }, [
    nearbyDrivers,
    loading,
    isLookingForCaptains,
    driversError,
    pickupCoords,
    selectedVehicle,
    socket,
    user,
    pickup,
    destination,
    routeInfo,
    fare,
  ]);

  // Handle pickup input change and fetch suggestions
  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPickupSuggestion(response.data);
      } catch (err) {
        console.error("Error while getting pickup suggestions", err);
        toast.error("Failed to fetch pickup suggestions");
      }
    } else {
      setPickupSuggestion([]);
    }
  };

  // Handle destination input change and fetch suggestions
  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDestinationSuggestion(response.data);
      } catch (err) {
        console.error("Error while getting destination suggestions", err);
        toast.error("Failed to fetch destination suggestions");
      }
    } else {
      setDestinationSuggestion([]);
    }
  };

  // Handle selection of a suggestion
  const handleSuggestionClick = (suggestion, field) => {
    if (field === "pickup") {
      setPickup(suggestion.description);
      setPickupSuggestion([]);
    } else {
      setDestination(suggestion.description);
      setDestinationSuggestion([]);
    }
  };

  // Find trip and get fare
  const findTrip = async () => {
    if (!pickup || !destination) {
      toast.error("Please enter both pickup and destination");
      return;
    }

    console.log("\nFinding a ride...\n");

    // setIsLookingForCaptains(true);
    setVehiclePanel(true);
    setIsPanelOpen(false);

    try {
      // Get fare estimates for all vehicle types

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFare(response.data);
    } catch (err) {
      console.error("Error in Finding Trip\n", err);
      toast.error("Failed to get fare estimates. Please try again.");
    }
  };

  // Handle vehicle selection from VehiclePanel
  const handleVehicleSelect = async (selectedVehicle) => {
    console.log("\nselected vehicle: ", selectedVehicle);

    setSelectedVehicle(selectedVehicle);
    setIsLookingForCaptains(true);
    setVehiclePanel(false);
  };

  // Handle ride confirmation
  const confirmRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, selectedVehicle },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRideData(response.data.ride);
      setCaptainData(response.data.captain);
      setConfirmRidePanel(false);
      setWaitForDriverOpen(true);

      // Notify the captain that ride is confirmed
      socket.emit("ride-confirmed-by-user", {
        rideId: response.data.ride._id,
        captainId: response.data.captain._id,
      });
    } catch (err) {
      console.error("Error creating ride:", err);
      toast.error("Failed to confirm ride. Please try again.");
    }
  };

  // Join socket room when user is available
  useEffect(() => {
    if (user?._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [user, socket]);

  // Listen for ride confirmation
  useEffect(() => {
    const handleRideConfirmed = (data) => {
      setRideData(data.ride);
      setCaptainData(data.captain);
      setWaitForDriverOpen(true);
    };

    socket.on("ride-confirmed", handleRideConfirmed);
    return () => {
      socket.off("ride-confirmed", handleRideConfirmed);
    };
  }, [socket]);

  const handleRouteCalculated = (data) => {
    setRouteInfo((prev) => ({
      ...prev,
      distance: data.distance.text,
      duration: data.duration.text,
    }));

    console.log("Distance = ", data.distance);
    console.log("\nduration = ", data.duration);
  };

  // GSAP Animations
  useGSAP(() => {
    // Panel animation
    gsap.to(panelRef.current, {
      height: isPanelOpen ? "60%" : "0%",
      duration: 0.3,
      ease: "power2.inOut",
    });

    // Close button animation
    gsap.to(panelClose.current, {
      opacity: isPanelOpen ? 1 : 0,
      duration: 0.2,
      display: isPanelOpen ? "block" : "none",
    });

    // Vehicle panel animation
    gsap.to(vehiclePanelRef.current, {
      y: vehiclePanel ? "0" : "100%",
      duration: 0.3,
      ease: "power2.inOut",
    });

    // Confirm ride panel animation
    gsap.to(confirmRideRef.current, {
      y: confirmRidePanel ? "0" : "100%",
      duration: 0.3,
      ease: "power2.inOut",
    });

    // Vehicle found animation
    /* if (isLookingForCaptains) {
      gsap.fromTo(
        isLookingForCaptainsRef.current,
        { y: "100%" },
        {
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          // onComplete: () => {
          //   // Auto-hide after 3 seconds
          //   // setTimeout(() => {
          //   //   setVehicleFound(false);
          //   // }, 3000);
          // },
        }
      );
    }*/

    // <LookingForDriver/> component animation
    gsap.to(isLookingForCaptainsRef.current, {
      y: isLookingForCaptains ? "0" : "100%",
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    // Wait for driver animation
    if (waitForDriverOpen) {
      gsap.fromTo(
        waitForDriverRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [
    isPanelOpen,
    vehiclePanel,
    confirmRidePanel,
    isLookingForCaptains,
    waitForDriverOpen,
  ]);

  // Render suggestion list
  const renderSuggestions = (suggestions, field) => {
    if (!suggestions.length) return null;

    return (
      <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center"
            onClick={() => handleSuggestionClick(suggestion, field)}
          >
            <FiMapPin className="text-gray-400 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900">
                {suggestion.structured_formatting.main_text}
              </div>
              <div className="text-sm text-gray-500">
                {suggestion.structured_formatting.secondary_text}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Main render
  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      {/* Map View */}
      <div className="flex-1 relative">
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={mapLibraries}
        >
          {pickup && destination ? (
            <RouteRenderer
              origin={pickup}
              destination={destination}
              onRouteCalculated={handleRouteCalculated}
            />
          ) : (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: 28.6139, lng: 77.209 }} // Add your default center
              zoom={13}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            />
          )}
        </LoadScript>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 bg-white shadow-sm z-10 p-4">
          <div className="max-w-3xl mx-auto flex items-center">
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-left flex items-center shadow-sm hover:shadow transition-shadow"
            >
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-black mr-3"></div>
                </div>
                <div className="truncate">
                  <div className="text-sm text-gray-500">From</div>
                  <div className="font-medium truncate">
                    {pickup || "Enter pickup location"}
                  </div>
                </div>
              </div>
            </button>

            <button
              className="mx-2 p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              onClick={() => {
                // Swap pickup and destination
                const temp = pickup;
                setPickup(destination);
                setDestination(temp);
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7l4-4m0 0l4 4m-4-4v18"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                setActiveField("destination");
                setIsPanelOpen(true);
              }}
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-left flex items-center shadow-sm hover:shadow transition-shadow"
            >
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                </div>
                <div className="truncate">
                  <div className="text-sm text-gray-500">To</div>
                  <div className="font-medium truncate">
                    {destination || "Enter destination"}
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Main form panel */}
        <div
          ref={panelRef}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl overflow-hidden z-20"
          style={{ height: 0 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Where to?</h2>
              <button
                ref={panelClose}
                onClick={() => setIsPanelOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <FiMapPin className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={handlePickupChange}
                    onFocus={() => setActiveField("pickup")}
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
                    placeholder="Enter pickup location"
                  />
                  {pickup && (
                    <button
                      onClick={() => setPickup("")}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
                {activeField === "pickup" &&
                  renderSuggestions(pickupSuggestion, "pickup")}
              </div>

              <div className="relative">
                <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <FiNavigation className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    value={destination}
                    onChange={handleDestinationChange}
                    onFocus={() => setActiveField("destination")}
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
                    placeholder="Where to?"
                  />
                  {destination && (
                    <button
                      onClick={() => setDestination("")}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
                {activeField === "destination" &&
                  renderSuggestions(destinationSuggestion, "destination")}
              </div>

              <button
                onClick={findTrip}
                disabled={!pickup || !destination}
                className={`w-full py-3 bg-black text-white font-medium rounded-lg transition-colors ${
                  !pickup || !destination
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-800"
                }`}
              >
                Find a ride
              </button>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  {
                    icon: <FiClock className="w-5 h-5" />,
                    label: "Now",
                    active: true,
                  },
                  { icon: <FiUser className="w-5 h-5" />, label: "Ride later" },
                  { icon: <FiCar className="w-5 h-5" />, label: "Ride later" },
                ].map((item, index) => (
                  <button
                    key={index}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      item.active
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="mb-1">{item.icon}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  RECENT
                </h3>
                <div className="space-y-2">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <FiMapPin className="text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium">
                          Recent location {item}
                        </div>
                        <div className="text-sm text-gray-500">
                          Address details here
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Selection Panel */}
        <div
          ref={vehiclePanelRef}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl z-30 p-6 transform translate-y-full"
        >
          <VehiclePanel
            fare={fare}
            handleVehicleSelect={handleVehicleSelect}
            setVehiclePanel={setVehiclePanel}
            setIsLookingForCaptains={setIsLookingForCaptains}
            // setIsPanelOpen={setIsPanelOpen}
          />
        </div>

        <div ref={isLookingForCaptainsRef}>
          <LookingForDriver
            rideData={rideData}
            isLookingForCaptains={isLookingForCaptains}
          />
        </div>

        {/* Confirm Ride Panel */}
        <div
          ref={confirmRideRef}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl z-40 p-6 transform translate-y-full"
        >
          <ConfirmRidePopUpPanel
            pickup={pickup}
            destination={destination}
            selectedVehicle={selectedVehicle}
            fare={fare}
            onConfirm={confirmRide}
            onBack={() => setConfirmRidePanel(false)}
          />
        </div>

        {/* Vehicle Found Notification
        {vehicleFound && (
          <div
            ref={isLookingForCaptainsRef}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl z-50 p-4 w-11/12 max-w-md"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <FiCar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium">Vehicle Found!</div>
                <div className="text-sm text-gray-500">
                  Your driver is on the way
                </div>
              </div>
            </div>
          </div>
        )}

        */}

        {/* Wait for Driver Panel */}
        {waitForDriverOpen && (
          <div
            ref={waitForDriverRef}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 p-6 max-h-[90vh] overflow-y-auto"
          >
            <WaitForDriver
              captainData={captainData}
              rideData={rideData}
              onCancel={() => setWaitForDriverOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
