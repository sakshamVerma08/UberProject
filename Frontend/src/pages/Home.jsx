// Correct Last Version
// const Home = () => {
//   const navigate = useNavigate();
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [isPanelOpen, setIsPanelOpen] = useState(false);
//   const panelRef = useRef(null);
//   const panelClose = useRef(null);
//   const [vehiclePanel, setVehiclePanel] = useState(false);
//   const vehiclePanelRef = useRef(null);
//   const confirmRideRef = useRef(null);
//   const [confirmRidePanel, setConfirmRidePanel] = useState(false);
//   const [vehicleFound, setVehicleFound] = useState(false);
//   const [waitForDriverOpen, setWaitForDriverOpen] = useState(false);
//   const [pickupSuggestion, setPickupSuggestion] = useState([]);
//   const [destinationSuggestion, setDestinationSuggestion] = useState([]);
//   const [activeField, setActiveField] = useState(null);
//   const [fare, setFare] = useState({});
//   const [vehicleType, setVehicleType] = useState("");
//   const [rideData, setRideData] = useState({});
//   const [captainData, setCaptainData] = useState({
//     fullname: {
//       firstname: "",
//       lastname: "",
//     },
//     vehicle: {
//       plate: "DL 8H BZ 8074",
//       color: "grey",
//       vehicleType: "car",
//       capacity: 3,
//     },
//   });

//   const { socket } = useContext(SocketContext);
//   const { user } = useContext(UserDataContext);
//   const token = localStorage.getItem("user_token");

//   const vehicleFoundRef = useRef(null);
//   const waitForDriverRef = useRef(null);

//   const handlePickupChange = async (e) => {
//     setPickup(e.target.value);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
//         {
//           params: { input: e.target.value },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("user_token")}`,
//           },
//         }
//       );

//       setPickupSuggestion(response.data);
//     } catch (err) {
//       console.log("Error while getting pickup suggestions", err.message);
//     }
//   };

//   const handleDestinationChange = async (e) => {
//     setDestination(e.target.value);

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
//         {
//           params: { input: e.target.value },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("user_token")}`,
//           },
//         }
//       );

//       setDestinationSuggestion(response.data);
//     } catch (err) {
//       console.log("Error while getting detination suggestions", err.message);
//     }
//   };

//   async function findTrip() {
//     setVehiclePanel(true);
//     setIsPanelOpen(false);

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
//         {
//           params: {
//             pickup,
//             destination,
//           },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("user_token")}`,
//           },
//         }
//       );

//       setFare(response.data);
//     } catch (err) {
//       console.log("Error in Finding Trip\n", err.message);
//     }
//   }

//   async function createRide() {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/rides/create`,
//       {
//         pickup,
//         destination,
//         vehicleType,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("user_token")}`,
//         },
//       }
//     );

//     socket.emit("new-ride-request", {
//       rideId: response.data._id,
//       pickup,
//       destination,
//       userId: response.data.user,
//     });

//     setDestination(response.data.destination);
//     setFare(response.data.fare);
//     setPickup(response.data.pickup);

//     setRideData(response.data.ride);
//     setCaptainData(response.data.captain);
//   }

//   useEffect(() => {
//     if (!user || !user._id) {
//       console.log("User ID is NULL:", user);
//       return <div>User Not found.</div>;
//     }
//     socket.emit("join", { userType: "user", userId: user?._id });

//     socket.on("ride-confirmed", (data) => {
//       setRideData(data.ride);
//       setCaptainData(data.captain);
//       setWaitForDriverOpen(true);
//     });

//   }, [user, socket]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//   };

//   useGSAP(() => {
//     if (isPanelOpen) {
//       gsap.to(panelRef.current, {
//         height: "60%",
//       });

//       gsap.to(panelClose.current, {
//         opacity: 1,
//       });
//     } else {
//       gsap.to(panelRef.current, {
//         height: "0%",
//       });

//       gsap.to(panelClose.current, {
//         opacity: 0,
//       });
//     }
//   }, [isPanelOpen]);

//   useGSAP(() => {
//     if (vehiclePanel) {
//       gsap.to(vehiclePanelRef.current, {
//         transform: "translateY(0)",
//       });
//     } else {
//       gsap.to(vehiclePanelRef.current, {
//         transform: "translateY(100%)",
//       });
//     }
//   }, [vehiclePanel]);
//   useGSAP(() => {
//     if (confirmRidePanel) {
//       gsap.to(confirmRideRef.current, {
//         transform: "translateY(0)",
//       });
//     } else {
//       gsap.to(confirmRideRef.current, {
//         transform: "translateY(100%)",
//       });
//     }
//   }, [confirmRidePanel]);
//   useGSAP(() => {
//     if (vehicleFound) {
//       gsap.fromTo(
//         vehicleFoundRef.current,
//         { transform: "translateY(100%)" },
//         { transform: "translateY(0)", duration: 0.5, ease: "power2.out" }
//       );
//     } else {
//       gsap.to(vehicleFoundRef.current, {
//         transform: "translateY(100%)",
//       });
//     }
//   }, [vehicleFound]);
//   useGSAP(() => {
//     if (waitForDriverOpen) {
//       gsap.to(waitForDriverRef.current, {
//         transform: "translateY(-10%)",
//       });
//     } else {
//       gsap.to(waitForDriverRef.current, {
//         transform: "translateY(100%)",
//       });
//     }
//   }, [waitForDriverOpen]);

//   const handleLogout = async () => {
//     try {
//       navigate("/users/logout");
//     } catch (err) {
//       console.log("Logout failed: \n\n", err);
//     }
//   };

//   return (
//     <div className="relative h-screen overflow-hidden">
//       {/* Map Component Layer (Background) */}
//       <div className="absolute top-0 left-0 w-full h-screen z-0">
//         <GoogleMapComponent />
//       </div>

//       {/* Header Layer (Top) */}
//       <div className="fixed top-0 p-3 flex items-center justify-between w-full z-50">
//         <img
//           className="w-16"
//           src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
//           alt="Uber-Logo.png"
//         />

//         <i
//           className="ri-logout-box-line cursor-pointer text-xl m-2"
//           onClick={handleLogout}
//         ></i>
//       </div>

//       {/* Form Panel Layer (Bottom) */}
//       <div className="flex flex-col justify-end h-screen top-0 w-full absolute z-10">
//         <div className="h-[30%] relative bg-white p-6 ">
//           {" "}
//           <h5
//             ref={panelClose}
//             onClick={() => {
//               setIsPanelOpen(false);
//             }}
//             className="absolute opacity-0 top-5 text-2xl right-2"
//           >
//             <i className="cursor-pointer ri-arrow-down-line"></i>
//           </h5>
//           <h4 className=" font-semibold  text-2xl">Find a trip</h4>
//           <form
//             onSubmit={(e) => {
//               submitHandler(e);
//             }}
//           >
//             <input
//               className="bg-[#eee] px-12 py-2 rounded-lg text-base w-full mt-4"
//               value={pickup}
//               onChange={handlePickupChange}
//               onClick={() => {
//                 setIsPanelOpen(true);
//                 setActiveField("pickup");
//               }}
//               type="text"
//               placeholder="Enter your Pickup"
//             />

//             <input
//               className="bg-[#eee] px-12 py-2 rounded-lg text-base w-full mt-4"
//               type="text"
//               value={destination}
//               onChange={handleDestinationChange}
//               onClick={() => {
//                 setActiveField("destination");
//               }}
//               placeholder="Enter your Destination"
//             />
//           </form>
//           <div className="flex items-center justify-center bg-red-400 mt-4">
//             {" "}
//             <button
//               className="cursor-pointer bg-black text-white rounded-lg p-2 w-full "
//               onClick={findTrip}
//             >
//               Find Rides
//             </button>
//           </div>
//         </div>

//         <div ref={panelRef} className="h-0 bg-white p-5  ">
//           <LocationSearchPanel
//             vehiclePanel={vehiclePanel}
//             setIsPanelOpen={setIsPanelOpen}
//             setVehiclePanel={setVehiclePanel}
//             suggestions={
//               activeField === "pickup"
//                 ? pickupSuggestion
//                 : destinationSuggestion
//             }
//             setPickup={setPickup}
//             setDestination={setDestination}
//             activeField={activeField}
//           />
//         </div>
//       </div>

//       {/* Vehicle Panel */}
//       <div
//         ref={vehiclePanelRef}
//         className="bg-white z-30 fixed bottom-0 w-full translate-y-full px-3 py-10  border-white"
//       >
//         <VehiclePanel
//           fare={fare}
//           selectVehicle={setVehicleType}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehiclePanel={setVehiclePanel}
//         />
//       </div>

//       {/* Confirm Ride Panel */}
//       <div
//         ref={confirmRideRef}
//         className="bg-white z-20 fixed bottom-0 w-full translate-y-full px-3 py-12  border-white"
//       >
//         <ConfirmPanel
//           pickup={pickup}
//           destination={destination}
//           vehicleType={vehicleType}
//           fare={fare[vehicleType]}
//           createRide={createRide}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehicleFound={setVehicleFound}
//         />
//       </div>

//       {/* Looking For Driver Panel */}
//       <div
//         ref={vehicleFoundRef}
//         className="bg-white z-40 fixed bottom-0 w-full translate-y-[120%] px-3 py-12  border-white "
//       >
//         <LookingForDriver
//           setVehicleFound={setVehicleFound}
//           vehicleType={vehicleType}
//           fare={fare[vehicleType]}
//           pickup={pickup}
//           destination={destination}
//         />
//       </div>

//       {/* Wait For Driver Panel */}
//       <div
//         ref={waitForDriverRef}
//         className="bg-white z-50 fixed bottom-0 w-full translate-y-full px-3 py-12  border-white"
//       >
//         <WaitForDriver
//           setWaitForDriverOpen={setWaitForDriverOpen}
//           rideData={rideData}
//           captainData={captainData}
//         />
//       </div>
//     </div>
//   );
// };

// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import "remixicon/fonts/remixicon.css";
// import LocationSearchPanel from "../components/LocationSearchPanel";
// import VehiclePanel from "../components/VehiclePanel";
// import ConfirmPanel from "../context/ConfirmPanel";
// import LookingForDriver from "../components/LookingForDriver";
// import WaitForDriver from "../components/WaitForDriver";
// import { SocketContext } from "../context/SocketContext";
// import { UserDataContext } from "../context/UserContext";
// import axios from "axios";
// import GoogleMapComponent from "../components/GoogleMapComponent";

// Test Version 1
// const Home = () => {
//   const navigate = useNavigate();
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [isPanelOpen, setIsPanelOpen] = useState(false);
//   const panelRef = useRef(null);
//   const panelClose = useRef(null);
//   const [vehiclePanel, setVehiclePanel] = useState(false);
//   const vehiclePanelRef = useRef(null);
//   const confirmRideRef = useRef(null);
//   const [confirmRidePanel, setConfirmRidePanel] = useState(false);
//   const [vehicleFound, setVehicleFound] = useState(false);
//   const [waitForDriverOpen, setWaitForDriverOpen] = useState(false);
//   const [pickupSuggestion, setPickupSuggestion] = useState([]);
//   const [destinationSuggestion, setDestinationSuggestion] = useState([]);
//   const [activeField, setActiveField] = useState(null);
//   const [fare, setFare] = useState({});
//   const [vehicleType, setVehicleType] = useState("");
//   const [rideData, setRideData] = useState({});
//   const [captainData, setCaptainData] = useState({
//     fullname: {
//       firstname: "",
//       lastname: "",
//     },
//     vehicle: {
//       plate: "DL 8H BZ 8074",
//       color: "grey",
//       vehicleType: "car",
//       capacity: 3,
//     },
//   });

//   const { socket } = useContext(SocketContext);
//   const { user } = useContext(UserDataContext);
//   const token = localStorage.getItem("user_token");

//   const vehicleFoundRef = useRef(null);
//   const waitForDriverRef = useRef(null);

//   const handlePickupChange = async (e) => {
//     setPickup(e.target.value);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
//         {
//           params: { input: e.target.value },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("user_token")}`,
//           },
//         }
//       );

//       setPickupSuggestion(response.data);
//     } catch (err) {
//       console.log("Error while getting pickup suggestions", err.message);
//     }
//   };

//   const handleDestinationChange = async (e) => {
//     setDestination(e.target.value);

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
//         {
//           params: { input: e.target.value },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("user_token")}`,
//           },
//         }
//       );

//       setDestinationSuggestion(response.data);
//     } catch (err) {
//       console.log("Error while getting destination suggestions", err.message);
//     }
//   };

//   async function findTrip() {
//     setVehiclePanel(true);
//     setIsPanelOpen(false);

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
//         {
//           params: {
//             pickup,
//             destination,
//           },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("user_token")}`,
//           },
//         }
//       );

//       setFare(response.data);
//     } catch (err) {
//       console.log("Error in Finding Trip\n", err.message);
//     }
//   }

//   async function createRide() {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/rides/create`,
//       {
//         pickup,
//         destination,
//         vehicleType,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("user_token")}`,
//         },
//       }
//     );

//     socket.emit("new-ride-request", {
//       rideId: response.data._id,
//       pickup,
//       destination,
//       userId: response.data.user,
//     });

//     setDestination(response.data.destination);
//     setFare(response.data.fare);
//     setPickup(response.data.pickup);

//     setRideData(response.data.ride);
//     setCaptainData(response.data.captain);
//   }

//   useEffect(() => {
//     if (!user || !user._id) {
//       console.log("User ID is NULL:", user);
//       return <div>User Not found.</div>;
//     }
//     socket.emit("join", { userType: "user", userId: user?._id });

//     socket.on("ride-confirmed", (data) => {
//       setRideData(data.ride);
//       setCaptainData(data.captain);
//       setWaitForDriverOpen(true);
//     });
//   }, [user, socket]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//   };

//   useGSAP(() => {
//     if (isPanelOpen) {
//       gsap.to(panelRef.current, {
//         height: "60%",
//       });

//       gsap.to(panelClose.current, {
//         opacity: 1,
//       });
//     } else {
//       gsap.to(panelRef.current, {
//         height: "0%",
//       });

//       gsap.to(panelClose.current, {
//         opacity: 0,
//       });
//     }
//   }, [isPanelOpen]);

//   useGSAP(() => {
//     if (vehiclePanel) {
//       gsap.to(vehiclePanelRef.current, {
//         transform: "translateY(0)",
//       });
//     } else {
//       gsap.to(vehiclePanelRef.current, {
//         transform: "translateY(100%)",
//       });
//     }
//   }, [vehiclePanel]);
//   useGSAP(() => {
//     if (confirmRidePanel) {
//       gsap.to(confirmRideRef.current, {
//         transform: "translateY(0)",
//       });
//     } else {
//       gsap.to(confirmRideRef.current, {
//         transform: "translateY(100%)",
//       });
//     }
//   }, [confirmRidePanel]);
//   useGSAP(() => {
//     if (vehicleFound) {
//       gsap.fromTo(
//         vehicleFoundRef.current,
//         { transform: "translateY(100%)" },
//         { transform: "translateY(0)", duration: 0.5, ease: "power2.out" }
//       );
//     } else {
//       gsap.to(vehicleFoundRef.current, {
//         transform: "translateY(100%)",
//       });
//     }
//   }, [vehicleFound]);
//   useGSAP(() => {
//     if (waitForDriverOpen) {
//       gsap.to(waitForDriverRef.current, {
//         transform: "translateY(-10%)",
//       });
//     } else {
//       gsap.to(waitForDriverRef.current, {
//         transform: "translateY(100%)",
//       });
//     }
//   }, [waitForDriverOpen]);

//   const handleLogout = async () => {
//     try {
//       navigate("/users/logout");
//     } catch (err) {
//       console.log("Logout failed: \n\n", err);
//     }
//   };

//   return (
//     <div className="relative h-screen overflow-hidden">
//       {/* Map Component Layer (Background) - Higher z-index for interactivity */}
//       <div className="absolute inset-0 z-10">
//         <GoogleMapComponent />
//       </div>

//       {/* Header Layer (Top) - Above map but below panels */}
//       <div className="fixed top-0 p-3 flex items-center justify-between w-full z-20 pointer-events-none">
//         <img
//           className="w-16 pointer-events-auto"
//           src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
//           alt="Uber-Logo.png"
//         />

//         <i
//           className="ri-logout-box-line cursor-pointer text-xl m-2 pointer-events-auto bg-white rounded-full p-2 shadow-lg"
//           onClick={handleLogout}
//         ></i>
//       </div>

//       {/* Form Panel Layer (Bottom) - Higher z-index to appear over map */}
//       <div className="flex flex-col justify-end h-screen absolute inset-0 z-30 pointer-events-none">
//         {/* Main form panel */}
//         <div className="pointer-events-auto">
//           <div className="h-auto min-h-[200px] relative bg-white p-6 rounded-t-xl shadow-lg">
//             <h5
//               ref={panelClose}
//               onClick={() => {
//                 setIsPanelOpen(false);
//               }}
//               className="absolute opacity-0 top-5 text-2xl right-2 cursor-pointer"
//             >
//               <i className="ri-arrow-down-line"></i>
//             </h5>
//             <h4 className="font-semibold text-2xl mb-4">Find a trip</h4>
//             <form onSubmit={submitHandler}>
//               <input
//                 className="bg-[#eee] px-12 py-3 rounded-lg text-base w-full mt-4"
//                 value={pickup}
//                 onChange={handlePickupChange}
//                 onClick={() => {
//                   setIsPanelOpen(true);
//                   setActiveField("pickup");
//                 }}
//                 type="text"
//                 placeholder="Enter your Pickup"
//               />

//               <input
//                 className="bg-[#eee] px-12 py-3 rounded-lg text-base w-full mt-4"
//                 type="text"
//                 value={destination}
//                 onChange={handleDestinationChange}
//                 onClick={() => {
//                   setIsPanelOpen(true);
//                   setActiveField("destination");
//                 }}
//                 placeholder="Enter your Destination"
//               />
//             </form>

//             <button
//               className="cursor-pointer bg-black text-white rounded-lg p-3 w-full mt-6 font-medium"
//               onClick={findTrip}
//             >
//               Find Rides
//             </button>
//           </div>

//           {/* Location search suggestions panel */}
//           <div ref={panelRef} className="h-0 bg-white overflow-hidden">
//             <LocationSearchPanel
//               vehiclePanel={vehiclePanel}
//               setIsPanelOpen={setIsPanelOpen}
//               setVehiclePanel={setVehiclePanel}
//               suggestions={
//                 activeField === "pickup"
//                   ? pickupSuggestion
//                   : destinationSuggestion
//               }
//               setPickup={setPickup}
//               setDestination={setDestination}
//               activeField={activeField}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Vehicle Panel */}
//       <div
//         ref={vehiclePanelRef}
//         className="bg-white z-40 fixed bottom-0 w-full translate-y-full px-3 py-10 border-white rounded-t-xl shadow-lg"
//       >
//         <VehiclePanel
//           fare={fare}
//           selectVehicle={setVehicleType}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehiclePanel={setVehiclePanel}
//         />
//       </div>

//       {/* Confirm Ride Panel */}
//       <div
//         ref={confirmRideRef}
//         className="bg-white z-50 fixed bottom-0 w-full translate-y-full px-3 py-12 border-white rounded-t-xl shadow-lg"
//       >
//         <ConfirmPanel
//           pickup={pickup}
//           destination={destination}
//           vehicleType={vehicleType}
//           fare={fare[vehicleType]}
//           createRide={createRide}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehicleFound={setVehicleFound}
//         />
//       </div>

//       {/* Looking For Driver Panel */}
//       <div
//         ref={vehicleFoundRef}
//         className="bg-white z-60 fixed bottom-0 w-full translate-y-[120%] px-3 py-12 border-white rounded-t-xl shadow-lg"
//       >
//         <LookingForDriver
//           setVehicleFound={setVehicleFound}
//           vehicleType={vehicleType}
//           fare={fare[vehicleType]}
//           pickup={pickup}
//           destination={destination}
//         />
//       </div>

//       {/* Wait For Driver Panel */}
//       <div
//         ref={waitForDriverRef}
//         className="bg-white z-70 fixed bottom-0 w-full translate-y-full px-3 py-12 border-white rounded-t-xl shadow-lg"
//       >
//         <WaitForDriver
//           setWaitForDriverOpen={setWaitForDriverOpen}
//           rideData={rideData}
//           captainData={captainData}
//         />
//       </div>
//     </div>
//   );
// };
// export default Home;

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
import VehicleSelection from "../components/VehiclePanel";
import RideConfirmation from "../components/ConfirmRidePopUpPanel";
import WaitForDriver from "../components/WaitForDriver";
import VehiclePanel from "../components/VehiclePanel";
import LookingForDriver from "../components/LookingForDriver";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import RouteRenderer from "../components/RouteRenderer";

const Home = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitForDriverOpen, setWaitForDriverOpen] = useState(false);
  const [pickupSuggestion, setPickupSuggestion] = useState([]);
  const [destinationSuggestion, setDestinationSuggestion] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState("");
  const [rideData, setRideData] = useState({});
  const [captainData, setCaptainData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    vehicle: {
      plate: "DL 8H BZ 8074",
      color: "grey",
      vehicleType: "car",
      capacity: 3,
    },
  });
  const [routeInfo, setRouteInfo] = useState({
    origin: null,
    destination: null,
    distance: null,
    duration: null,
  });

  // Refs for GSAP animations
  const panelRef = useRef(null);
  const panelClose = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitForDriverRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const token = localStorage.getItem("user_token");

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

    setVehiclePanel(true);
    setIsPanelOpen(false);

    try {
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
      toast.error("Failed to calculate fare. Please try again.");
    }
  };

  // Create ride request
  const createRide = async () => {
    if (!vehicleType) {
      toast.error("Please select a vehicle type");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      socket.emit("new-ride-request", {
        rideId: response.data._id,
        pickup,
        destination,
        userId: response.data.user,
      });

      setDestination(response.data.destination);
      setFare(response.data.fare);
      setPickup(response.data.pickup);
      setRideData(response.data.ride);
      setCaptainData(response.data.captain);
      setConfirmRidePanel(false);
      setVehiclePanel(false);
      setVehicleFound(true);

      // Auto-show wait for driver after a short delay
      setTimeout(() => {
        setWaitForDriverOpen(true);
      }, 1500);
    } catch (err) {
      console.error("Error creating ride:", err);
      toast.error("Failed to create ride. Please try again.");
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
      distance: data.distance,
      duration: data.duration,
    }));
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
      y: vehiclePanel ? 0 : "100%",
      duration: 0.3,
      ease: "power2.inOut",
    });

    // Confirm ride panel animation
    gsap.to(confirmRideRef.current, {
      y: confirmRidePanel ? 0 : "100%",
      duration: 0.3,
      ease: "power2.inOut",
    });

    // Vehicle found animation
    if (vehicleFound) {
      gsap.fromTo(
        vehicleFoundRef.current,
        { y: "100%" },
        {
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          onComplete: () => {
            // Auto-hide after 3 seconds
            setTimeout(() => {
              setVehicleFound(false);
            }, 3000);
          },
        }
      );
    }

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
    vehicleFound,
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
          libraries={["places", "directions"]}
          
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
                className={`w-full py-3 px-4 bg-black text-white font-medium rounded-lg transition-colors ${
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
            selectVehicle={setVehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
            setWaitForDriverOpen={setWaitForDriverOpen}
          />
        </div>

        <div ref={vehicleFoundRef}>
          <LookingForDriver
            rideData={rideData}
            setVehicleFound={setVehicleFound}
          />
        </div>

        {/* Confirm Ride Panel */}
        <div
          ref={confirmRideRef}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl z-40 p-6 transform translate-y-full"
        >
          <RideConfirmation
            pickup={pickup}
            destination={destination}
            vehicleType={vehicleType}
            fare={fare}
            onConfirm={createRide}
            onBack={() => setConfirmRidePanel(false)}
          />
        </div>

        {/* Vehicle Found Notification */}
        {vehicleFound && (
          <div
            ref={vehicleFoundRef}
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
