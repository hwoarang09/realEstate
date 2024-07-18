//import { useState } from "react";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoMdDownload } from "react-icons/io";
function PropertyItem({ property, onEdit }) {
  //const [showEdit, setShowEdit] = useState(false);
  console.log(property.images.main[0]);
  return (
    <div className="bg-white p-4 shadow-md rounded mb-1">
      <img
        src={property.images.main[0].url}
        alt="Listing"
        className="w-full h-48 object-cover rounded p-2"
      />
      <div className="mt-2">
        <div className="flex items-center space-x-5 text-lg">
          <a href="#" className="text-blue-600">
            {property.id}
          </a>
          <CiBookmarkPlus></CiBookmarkPlus>
          <IoMdDownload></IoMdDownload>
        </div>

        <div className="flex flex-col justify-between">
          <p className="text-sm">{property.buildingInfo.address}</p>
          <div className="flex justify-end mt-2 space-x-4">
            <span className="text-sm">
              <span className="font-bold">전용</span>{" "}
              {property.rentInfo.exclusiveArea}평
            </span>
            <span className="text-sm">
              <span className="font-bold">임대</span>
              {property.rentInfo.rentalArea}평
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyItem;
