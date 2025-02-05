import React, { useEffect, useState } from "react";

const LocationSearchPanel = (props) => {
  const suggestions = Array.isArray(props.suggestions) ? props.suggestions : [];
  return (
    <div>
      {suggestions.length > 0 ? (
        suggestions.map((elem, idx) => (
          <div
            key={elem?.place_id || idx} // Use place_id or fallback index
            onClick={() => {
              if (props.activeField === "pickup") {
                props.setPickup(
                  elem?.structured_formatting?.main_text || "Unknown Location"
                );
              } else {
                props.setDestination(
                  elem?.structured_formatting?.main_text || "Unknown Location"
                );
              }
            }}
            className="flex items-center justify-start gap-4 my-4 border-2 border-gray-100 py-3 active:border-black rounded-xl cursor-pointer"
          >
            <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full">
              <i className="ri-map-pin-line"></i>
            </h2>
            <div>
              <h4 className="font-medium">
                {elem?.structured_formatting?.main_text || "Unknown Location"}
              </h4>
              <p className="text-gray-500 text-sm">
                {elem?.structured_formatting?.secondary_text || ""}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className=" flex items-center justify-center mt-10 text-xl">
          {" "}
          <p className="text-gray-500">No suggestions available</p>
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
