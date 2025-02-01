import React from "react";

const LocationSearchPanel = (props) => {
  // sample array for locations
  const locations = [
    "Connaught Place, New Delhi",
    "India Gate, New Delhi",
    "Red Fort, Chandni Chowk, New Delhi",
    "Qutub Minar, Mehrauli, New Delhi",
    "Lotus Temple, Kalkaji, New Delhi",
    "Hauz Khas Village, New Delhi",
    "Lodhi Gardens, Lodhi Estate, New Delhi",
    "Sarojini Nagar Market, New Delhi",
    "Chandni Chowk, Old Delhi",
    "Akshardham Temple, New Delhi",
    "Jama Masjid, Old Delhi",
    "Rajpath, New Delhi",
    "Dilli Haat, INA, New Delhi",
    "Humayun's Tomb, Nizamuddin East, New Delhi",
    "Rashtrapati Bhavan, New Delhi",
  ];

  return (
    <div>
      {/* this is just sample data */}

      {locations.map((elem, key) => {
        return (
          <div
            key={key}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setIsPanelOpen(false);
            }}
            className="flex items-center justify-start gap-4  my-4 border-2 border-gray-100 py-3 active:border-black rounded-xl"
          >
            <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full ">
              <i className="ri-map-pin-line"></i>
            </h2>
            <h4 className="font-medium ">{elem}</h4>
          </div>
        );
      })}

      <div className="flex items-center justify-start gap-4 my-4 border-2 border-gray-100 py-3 active:border-black rounded-xl">
        <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full ">
          <i className="ri-map-pin-line"></i>
        </h2>
        <h4 className="font-medium ">Mohit Dhaba , Near Ramnagar </h4>
      </div>
      <div className="flex items-center justify-start gap-4 my-4 border-2 border-gray-100 py-3 active:border-black rounded-xl">
        <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full ">
          <i className="ri-map-pin-line"></i>
        </h2>
        <h4 className="font-medium ">
          Meera Bagh A-Block , Near St. Marks School{" "}
        </h4>
      </div>
      <div className="flex items-center justify-start gap-4 my-4 border-2 border-gray-100 py-3 active:border-black rounded-xl">
        <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full ">
          <i className="ri-map-pin-line"></i>
        </h2>
        <h4 className="font-medium ">IIT Roorkee, Near Roorkee Bus Stand </h4>
      </div>
    </div>
  );
};

export default LocationSearchPanel;
