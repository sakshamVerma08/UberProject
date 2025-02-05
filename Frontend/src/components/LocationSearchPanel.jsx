import React, { useEffect, useState } from "react";

const LocationSearchPanel = (props) => {
  // sample array for locations
  console.log(props.suggestions);

  return (
    <div>
      {props.suggestions.map((elem, idx) => (
        <div
          key={props.suggestions?.place_id || idx}
          onClick={() => {
            props.setVehiclePanel(true);
            props.setIsPanelOpen(false);
          }}
          className="flex items-center justify-start gap-4 my-4 border-2 border-gray-100 py-3 active:border-black rounded-xl"
        >
          <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full">
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className="font-medium">
            {elem?.structured_formatting.main_text || "Unknown Location"}
          </h4>
          <p className="text-gray-500 text-sm">
            {elem?.structured_formatting.secondary_text || ""}
          </p>
        </div>
      ))}
      ;
    </div>
  );
};

export default LocationSearchPanel;
