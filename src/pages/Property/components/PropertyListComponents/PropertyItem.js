import React, { useState, forwardRef } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { Button } from "../../../../@/components/ui/button";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import defaultImage from "../../../../Images/defaultImage.png";

const cateArray = ["헬스장", "고깃집", "오락실", "카페", "병원"];

const PropertyItem = forwardRef(
  ({ property, showModal, setProperties }, ref) => {
    const [isGroupSpread, setIsGroupSpread] = useState(false);

    if (!property) return null;
    const hasGroup = property.rooms?.length > 0;
    const modalPath = "/property/" + property.id;
    const selectedProperty = property;
    const handleClick = ({ modalPath, selectedProperty }) => {
      //그룹이 아닌 경우
      if (!selectedProperty?.group_id)
        showModal({ modalPath, selectedProperty });
      //그룹인 경우
      else {
        const room = selectedProperty.id;
        modalPath =
          "/property/" +
          String(selectedProperty.property_id) +
          "?r=" +
          String(room);
        console.log("그룹 클릭 modalPath:", modalPath);
        showModal({ modalPath, selectedProperty });
      }
    };

    const handleClickGroup = () => {
      console.log("click group");

      if (!isGroupSpread) {
        setIsGroupSpread(!isGroupSpread);
        const newRooms = property.rooms.map((room, index) => {
          return {
            available_md_name: property.available_md_name,
            file: property.file,
            address: property.address,
            building_name: property.building_name,
            ...room,
            group_id: `${property.id}_${index + 1}`,
          };
        });
        console.log("그룹 닫혀있어서 열기, newRooms:", newRooms);
        setProperties((prev) => {
          const newProperties = [];

          prev.forEach((p) => {
            newProperties.push(p);

            if (p.id === property.id) {
              newProperties.push(...newRooms);
            }
          });
          return newProperties;
        });
      } else {
        console.log("그룹 열려있어서 닫기");
        setIsGroupSpread(!isGroupSpread);
        setProperties((prev) => {
          const newProperties = [];

          prev.forEach((p) => {
            if (!(p.group_id && p.group_id.startsWith(`${property.id}_`))) {
              newProperties.push(p);
            }
          });

          console.log("열린거 닫기 길이", newProperties.length);
          return newProperties;
        });
      }
    };
    let content;
    const key_id = property?.group_id ? property.group_id : property.id;
    if (property.available_md_name === null) {
      content = cateArray.map((cate) => {
        return (
          <span
            key={`${cate}cate${key_id}`}
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
              key={`${cate}cate${key_id}`}
              className="text-sm font-bold mr-3"
            >
              {cate}
            </span>
          );
        } else
          return (
            <span
              key={`${cate}cate${key_id}`}
              className="text-sm font-bold mr-3 text-gray-300"
            >
              {cate}
            </span>
          );
      });
    }

    // src\Images\defaultImage.png
    const imageUrl = property.file.image_outside[0]?.url || defaultImage;

    return (
      <div ref={ref} className="bg-white p-1 shadow-md rounded pb-2 border-b">
        <img
          src={imageUrl}
          alt="Listing"
          className="w-full h-40 object-cover rounded"
        />
        <div className="mt-1.5 px-4">
          <div className="flex items-center space-x-5 text-base">
            <div
              onClick={() => handleClick({ modalPath, selectedProperty })}
              className="text-blue-600 cursor-pointer"
            >
              {property?.group_id ? property.group_id : property.id}
            </div>

            <FaRegBookmark />
            <IoMdDownload />
            {hasGroup && (
              <Button onClick={handleClickGroup} className="w-10 h-5">
                {isGroupSpread ? (
                  <SlArrowUp className="w-2 h-2" />
                ) : (
                  <SlArrowDown className="w-2 h-2" />
                )}
              </Button>
            )}
            {property.group_id &&
            property.group_id.startsWith(`${property.property_id}_`) ? (
              <Button className="w-10 h-5">묶음</Button>
            ) : (
              ""
            )}
            <div className="flex-grow"></div>
            <div className="text-base text-sm">
              확보 {property.is_verified ? "O" : "X"}
            </div>
          </div>
          <div className="mt-1">
            <p className="text-sm">{property.address}</p>
          </div>

          <div className="flex flex-col justify-between">
            {property.building_name}
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex justify-end space-x-4">
              <span className="text-sm">
                <span className="font-bold">전용</span>{" "}
                {property.exclusive_area}평
              </span>
              <span className="text-sm">
                <span className="font-bold">임대</span> {property.contact_area}
                평
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
              {property.maintenance_cost_str
                ? property.maintenance_cost_str
                : "만원"}
            </div>
          </div>
          <div className="mt-1.5 mb-2">{content}</div>
        </div>
      </div>
    );
  }
);

// export default PropertyItem;
export default React.memo(PropertyItem);
