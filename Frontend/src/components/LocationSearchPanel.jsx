import React from "react";

const LocationSearchPanel = () => {
  return (
    <div>
      {/* this is just sample data */}

      <div className="flex items-center justify-start gap-4  my-4">
        <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full ">
          <i className="ri-map-pin-line"></i>
        </h2>
        <h4 className="font-medium ">
          Roorkee Institute Of Technology, Near Puhana{" "}
        </h4>
      </div>
      <div className="flex items-center justify-start gap-4 my-4">
        <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full ">
          <i className="ri-map-pin-line"></i>
        </h2>
        <h4 className="font-medium ">Mohit Dhaba , Near Ramnagar </h4>
      </div>
      <div className="flex items-center justify-start gap-4 my-4">
        <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full ">
          <i className="ri-map-pin-line"></i>
        </h2>
        <h4 className="font-medium ">
          Meera Bagh A-Block , Near St. Marks School{" "}
        </h4>
      </div>
      <div className="flex items-center justify-start gap-4 my-4">
        <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full ">
          <i className="ri-map-pin-line"></i>
        </h2>
        <h4 className="font-medium ">IIT Roorkee, Near Roorkee Bus Stand </h4>
      </div>
    </div>
  );
};

export default LocationSearchPanel;
