import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

import useModal from "../../../hooks/use-modal";
import PropertyItemInfoModal from "../modalpages/PropertyItemInfoPage";


function PropertyItem({ property, showModal }) {
  console.log(`in PropertyItem, every item useModal`);

  const modalPath = "/property/" + property.id;
  const selectedProperty = property;
  const handleClick = ({ modalPath, selectedProperty }) => {
    showModal({ modalPath, selectedProperty });
    console.log(
      `in PropertyItem, handleClick....modalPath ${modalPath}, 
      property ${JSON.stringify(property)}`
    );
  };
  return (
    <div className="bg-white p-4 shadow-md rounded mb-1 pb-20">
      <img
        src={property.images.main[0].url}
        alt="Listing"
        className="w-full h-48 object-cover rounded p-2"
      />
      <div className="mt-2">
        <div className="flex items-center space-x-5 text-lg">
          <div
            onClick={() => handleClick({ modalPath, selectedProperty })}
            className="text-blue-600 cursor-pointer"
          >
            {property.id}
          </div>
          <FaRegBookmark />
          <IoMdDownload />
          <div className="flex-grow"></div>
          <div className="text-base ">
            확보 : {property.contractInfo.completed ? "O" : "X"}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <p className="text-sm">{property.buildingInfo.address}</p>
          <div className="flex justify-end mt-2 space-x-4">
            <span className="text-sm">
              <span className="font-bold">전용</span>{" "}
              {property.rentInfo.exclusiveArea}평
            </span>
            <span className="text-sm">
              <span className="font-bold">임대</span>{" "}
              {property.rentInfo.rentalArea}평
            </span>
          </div>
        </div>
        <div className="mt-2 flex text-sm">
          <div className="flex-grow text-left">
            <span className="text-gray-500">보 </span>
            {property.rentInfo.deposit}만원
          </div>
          <div className="flex-grow text-center ">
            <span className="text-gray-500">임 </span>
            {property.rentInfo.monthlyRent}만원
          </div>
          <div className="flex-grow text-right">
            <span className="text-gray-500">관 </span>
            {property.rentInfo.maintenanceFee}만원
          </div>
        </div>
      </div>
    </div>
  );
}

// export default PropertyItem;
export default React.memo(PropertyItem);