import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const AllSMSAvailabilityCategories = ["전체 가능", "부분 가능", "불가능"];

const ItemInfoBuilding = ({ property, setProperty }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  if (!property) {
    console.log(" !property building");
    return;
  }
  const handleChange = (keyList, value) => {
    setProperty((prevProperty) => {
      const newProperty = { ...prevProperty };
      let target = newProperty;

      for (let i = 0; i < keyList.length - 1; i++) {
        target = target[keyList[i]];
      }

      target[keyList[keyList.length - 1]] = value;

      return newProperty;
    });
  };

  const getValue = (keyList) => {
    return keyList.reduce((obj, key) => obj[key], property);
  };

  return (
    <div className="my-6">
      <div className="mb-4">
        <div className="text-blue-600 text-base font-bold mb-2">건물정보</div>
        <div className="flex mb-2">
          <div className="text-sm flex items-center font-bold w-24">주소</div>
          <div className="w-80">
            <input
              type="text"
              name="address"
              value={getValue(["buildingInfo", "address"])}
              onChange={(e) =>
                handleChange(["buildingInfo", "address"], e.target.value)
              }
              className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>
        {showMoreInfo && (
          <>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-24">
                건물명
              </div>
              <div className="w-80">
                <input
                  type="text"
                  name="buildingName"
                  value={getValue(["buildingInfo", "buildingName"])}
                  onChange={(e) =>
                    handleChange(
                      ["buildingInfo", "buildingName"],
                      e.target.value
                    )
                  }
                  className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
                />
              </div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-start font-bold w-24 items-start flex">
                건물 규모
              </div>
              <div className="text-sm mt-1">
                <div>
                  지상
                  <input
                    type="text"
                    name="groundFloors"
                    value={getValue(["buildingInfo", "scale", "groundFloors"])}
                    onChange={(e) =>
                      handleChange(
                        ["buildingInfo", "scale", "groundFloors"],
                        e.target.value
                      )
                    }
                    className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-20 mx-2"
                  />
                  층
                </div>
                <div className="text-sm">
                  지상
                  <input
                    type="text"
                    name="totalFloors"
                    value={getValue(["buildingInfo", "scale", "totalFloors"])}
                    onChange={(e) =>
                      handleChange(
                        ["buildingInfo", "scale", "groundFloors"],
                        e.target.value
                      )
                    }
                    className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-20 mx-2"
                  />
                  층
                </div>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-24">
                준공일자
              </div>
              <div className="w-80">
                <input
                  type="text"
                  name="completionDate"
                  value={getValue(["buildingInfo", "completionDate"])}
                  onChange={(e) =>
                    handleChange(
                      ["buildingInfo", "completionDate"],
                      e.target.value
                    )
                  }
                  className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
                />
              </div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-24">
                승강기
              </div>
              <div className="w-40">
                <input
                  type="text"
                  name="elevators"
                  value={property.buildingInfo.elevators}
                  onChange={(e) =>
                    handleChange(["buildingInfo", "elevators"], e.target.value)
                  }
                  className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-20 mx-2"
                />
                대
              </div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-24">
                주차수
              </div>
              <div className="w-40">
                <input
                  type="text"
                  name="parkingSpots"
                  value={property.buildingInfo.parkingSpots}
                  onChange={(e) =>
                    handleChange(
                      ["buildingInfo", "parkingSpots"],
                      e.target.value
                    )
                  }
                  className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-20 mx-2"
                />
                대
              </div>
            </div>

            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-24">
                병의원 가능 여부
              </div>
              <div className="w-40">
                <input
                  type="text"
                  name="HC_Availability"
                  value={property.buildingInfo.HC_Availability}
                  onChange={(e) =>
                    handleChange(
                      ["buildingInfo", "HC_Availability"],
                      e.target.value
                    )
                  }
                  className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-20 mx-2"
                />
              </div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-32">
                입점 가능한 층
              </div>
              <div className="">
                <input
                  type="text"
                  name="totalRentableFloors"
                  value={property.buildingInfo.totalRentableFloors}
                  onChange={(e) =>
                    handleChange(
                      ["buildingInfo", "totalRentableFloors"],
                      e.target.value
                    )
                  }
                  className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-20 mx-2"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center mt-3">
        <Button
          primary
          rounded
          outline
          className="mb-4 flex justify-between py-0.5 px-1"
          type="button" // 버튼의 기본 타입을 button으로 설정하여 submit 방지
          onClick={() => setShowMoreInfo(!showMoreInfo)}
        >
          {showMoreInfo ? (
            <>
              <span className="text-xs mr-2">접기</span>
              <span>
                <FaChevronUp />
              </span>
            </>
          ) : (
            <>
              <span className="text-xs mr-2">펼치기</span>
              <span>
                <FaChevronDown />
              </span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ItemInfoBuilding;
