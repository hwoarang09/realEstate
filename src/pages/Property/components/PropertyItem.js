import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

function PropertyItem({ property, showModal }) {
  if (!property) return null;

  const modalPath = "/property/" + property.id;
  const selectedProperty = property;
  const handleClick = ({ modalPath, selectedProperty }) => {
    showModal({ modalPath, selectedProperty });
  };
  const cateArray = ["치과", "미용", "감기", "통증", "한의원"];
  let content;
  if (property.available_md_name === null) {
    content = cateArray.map((cate) => {
      return (
        <span
          key={`${cate}cate${property.id}`}
          className="text-sm font-bold mr-3 text-gray-300"
        >
          {cate}
        </span>
      );
    });
  } else {
    content = cateArray.map((cate) => {
      if (property.available_md_name.includes(cate)) {
        return (
          <span
            key={`${cate}cate${property.id}`}
            className="text-sm font-bold mr-3"
          >
            {cate}
          </span>
        );
      } else
        return (
          <span
            key={`${cate}cate${property.id}`}
            className="text-sm font-bold mr-3 text-gray-300"
          >
            {cate}
          </span>
        );
    });
  }
  return (
    <div className="bg-white p-1 shadow-md rounded pb-2 border-b">
      <img
        src={property.file.image_outside[0].url}
        alt="Listing"
        className="w-full h-40 object-cover rounded"
      />
      <div className="mt-1.5 px-4">
        <div className="flex items-center space-x-5 text-base">
          <div
            onClick={() => handleClick({ modalPath, selectedProperty })}
            className="text-blue-600 cursor-pointer"
          >
            {property.id}
          </div>
          <FaRegBookmark />
          <IoMdDownload />
          <div className="flex-grow"></div>
          <div className="text-base text-sm">
            확보 {property.is_verified ? "O" : "X"}
          </div>
        </div>
        <div className="mt-1">
          <p className="text-sm">{property.address}</p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-end space-x-4">
            <span className="text-sm">
              <span className="font-bold">전용</span> {property.major_use}평
            </span>
            <span className="text-sm">
              <span className="font-bold">임대</span> {property.rent_scale}평
            </span>
          </div>
        </div>
        <div className="mt-2 flex text-sm">
          <div className="flex-grow text-left">
            <span className="text-gray-400 font-bold">보 </span>
            {Number(property.deposit) > 10000
              ? `${Number(property.deposit) / 10000}억원`
              : `${property.deposit === null ? "" : property.deposit} 만원`}
          </div>
          <div className="flex-grow text-center ">
            <span className="text-gray-400 font-bold">임 </span>
            {Number(property.monthly_rent) > 10000
              ? `${Number(property.monthly_rent) / 10000}억원`
              : `${
                  property.monthly_rent === null ? "" : property.monthly_rent
                } 만원`}
          </div>
          <div className="flex-grow text-right">
            <span className="text-gray-400 font-bold">관 </span>
            {Number(property.maintenance_cost) > 10000
              ? `${Number(property.maintenance_cost) / 10000}억원`
              : `${
                  property.maintenance_cost === null
                    ? ""
                    : property.maintenance_cost
                } 만원`}
          </div>
        </div>
        <div className="mt-1.5 mb-2">{content}</div>
      </div>
    </div>
  );
}

// export default PropertyItem;
export default React.memo(PropertyItem);