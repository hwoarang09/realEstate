import React, { useState, forwardRef } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { Button } from "../../../../@/components/ui/button";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import defaultImage from "../../../../Images/defaultImage.png";

const cateArray = ["치과", "미용", "감기", "통증", "한의원"];

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
            className="font-bold mr-3 text-gray-300"
          >
            {cate}
          </span>
        );
      });
    } else {
      content = cateArray.map((cate) => {
        if (property.available_md_name.includes(cate)) {
          return (
            <span key={`${cate}cate${key_id}`} className="font-bold mr-3">
              {cate}
            </span>
          );
        } else
          return (
            <span
              key={`${cate}cate${key_id}`}
              className="font-bold mr-3 text-gray-300"
            >
              {cate}
            </span>
          );
      });
    }

    // src\Images\defaultImage.png
    const imageUrl = property.file.image_outside[0]?.url || defaultImage;

    return (
      <div ref={ref} className="bg-white m-4 shadow-md rounded pb-2 border-b ">
        <div className="relative w-full">
          <img
            src={imageUrl}
            alt="Listing"
            className="w-full aspect-[3/2] object-cover rounded"
          />
          <div className="absolute bottom-3 right-14 border-2 border-black bg-white rounded-full p-2">
            <FaRegBookmark className="text-black w-4 h-4" />
          </div>
          <div className="absolute bottom-3 right-3 border-2 border-black bg-white rounded-full p-2">
            <IoMdDownload className="text-black w-4 h-4" />
          </div>
          <div className="absolute top-4 left-4 bg-blue-700 rounded-full py-1 px-2">
            <div className="text-base text-white text-sm">
              {property.is_verified ? "매물 확보" : "공동 매물"}
            </div>
          </div>
        </div>

        <div className="mt-1.5 px-4">
          <div className="flex items-center space-x-5 text-base">
            <div className="mt-1.5 mb-2 text-sm">{content}</div>
            <div className="flex-grow"></div>
            {/* <div
              onClick={() => handleClick({ modalPath, selectedProperty })}
              className="text-blue-600 cursor-pointer"
            >
              {property?.group_id ? property.group_id : property.id}
            </div> */}

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
          </div>

          {/* <div className="flex flex-col justify-between">
            {property.building_name}
          </div> */}

          <div className="flex flex-col justify-start">
            <div className="flex justify-start space-x-4">
              <span className="text-sm">
                <span>전용</span>
                <span className="font-bold ml-2 text-lg">
                  {property.exclusive_area}
                </span>
                <span>평</span>
              </span>
              <span className="text-sm">
                <span>임대</span>
                <span className="font-bold ml-2 text-lg">
                  {property.contact_area ? property.contact_area : "?"}
                </span>
                <span>평</span>
              </span>
            </div>
          </div>
          <div className="mt-2 flex text-sm justify-start">
            <div className="mr-6">
              <span className="text-gray-400 font-bold">보 </span>

              {Number(property.deposit) > 10000 ? (
                <>
                  <span className="font-bold ml-1 ">
                    {Number(property.deposit) / 10000}
                    {property.deposit === null ? "" : property.deposit}
                  </span>
                  <span>억</span>
                </>
              ) : (
                <>
                  <span className="font-bold ml-1 ">
                    {property.deposit === null ? "" : property.deposit}
                  </span>
                  <span>만</span>
                </>
              )}
            </div>
            <div className="mr-6">
              <span className="text-gray-400 font-bold">임 </span>
              {Number(property.monthly_rent) > 10000 ? (
                <>
                  <span className="font-bold ml-1 ">
                    {Number(property.monthly_rent) / 10000}
                    {property.monthly_rent === null ? "" : "억원"}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold ml-1 ">
                    {property.monthly_rent === null
                      ? ""
                      : property.monthly_rent}
                  </span>
                  <span>만</span>
                </>
              )}
            </div>
            <div className="mr-6">
              <span className="text-gray-400 font-bold">관 </span>
              {Number(property.deposit) > 10000 ? (
                <>
                  <span className="font-bold ml-1">
                    {Number(property.deposit) / 10000}
                    {property.deposit === null ? "" : "억"}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold ml-1 ">
                    {property.deposit === null ? "" : property.deposit}
                  </span>
                  <span>만</span>
                </>
              )}
            </div>
          </div>

          <div className="relative flex mt-4 mb-2 justify-between items-center">
            <div className="w-full text-left">
              <p className="text-sm  ">
                {property.address}
                {" 우리집 102동 304호"}
              </p>
            </div>
            <div className="ml-4">
              <Button
                variant="outline_blue"
                // className="absolute bottom-8 left-2 "
                onClick={() => handleClick({ modalPath, selectedProperty })}
              >
                상세 정보
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// export default PropertyItem;
export default React.memo(PropertyItem);
