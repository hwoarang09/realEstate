import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import {
  renderCategoryButtons,
  handleChange,
} from "../../../../utils/formUtils";

const rentalTypeCategories = ["전층", "일부"];
const moveInCategories = ["즉시", "협의"];
const ItemInfoRent = ({ property, setProperty }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  if (!property) {
    console.log("??");
    return;
  }
  const moveInBtns = renderCategoryButtons(
    moveInCategories,
    ["rentInfo", "moveIn", "moveInASAP"],
    "single",
    property,
    setProperty
  );
  const rentalTypeBtns = renderCategoryButtons(
    rentalTypeCategories,
    ["rentInfo", "rentalFloor", "rentalType"],
    "single",
    property,
    setProperty
  );
  return (
    <div className="my-6">
      <div className="mb-4">
        <div className="text-blue-600 text-base font-bold mb-2">임대정보</div>
        <div className="flex mb-2">
          <div className="text-sm flex items-center font-bold w-24">
            보증금<span className="text-red-500 font-bold text-xl">*</span>
          </div>
          <div className="w-80">
            <input
              type="text"
              name="address"
              value={property.rentInfo.deposit}
              onChange={(e) =>
                handleChange(
                  ["rentInfo", "deposit"],
                  e.target.value,
                  setProperty
                )
              }
              className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>
        <div className="flex mb-2">
          <div className="text-sm flex items-center font-bold w-24">
            임대료<span className="text-red-500 font-bold text-xl">*</span>
          </div>
          <div className="w-80">
            <input
              type="text"
              name="address"
              value={property.rentInfo.monthlyRent}
              onChange={(e) =>
                handleChange(
                  ["rentInfo", "monthlyRent"],
                  e.target.value,
                  setProperty
                )
              }
              className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>
        <div className="flex mb-2">
          <div className="text-sm flex items-center font-bold w-24">
            관리비<span className="text-red-500 font-bold text-xl">*</span>
          </div>
          <div className="w-80">
            <input
              type="text"
              name="address"
              value={property.rentInfo.maintenanceFee}
              onChange={(e) =>
                handleChange(
                  ["rentInfo", "maintenanceFee"],
                  e.target.value,
                  setProperty
                )
              }
              className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>
        <div className="flex mb-2">
          <div className="text-sm flex items-center font-bold w-24">
            임대층<span className="text-red-500 font-bold text-xl">*</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex">{rentalTypeBtns}</div>

            <input
              type="text"
              name="address"
              value={property.rentInfo.rentalFloor.rentalFloorInput}
              onChange={(e) =>
                handleChange(
                  ["rentInfo", "moveIn", "moveInASAP"],
                  e.target.value,
                  setProperty
                )
              }
              className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-40"
            />
          </div>
        </div>
        <div className="flex mb-2">
          <div className="text-sm flex items-center font-bold w-24">
            전용면적<span className="text-red-500 font-bold text-xl">*</span>
          </div>
          <div className="w-80">
            <input
              required
              type="text"
              name="address"
              value={property.rentInfo.exclusiveArea}
              onChange={(e) =>
                handleChange(
                  ["rentInfo", "exclusiveArea"],
                  e.target.value,
                  setProperty
                )
              }
              className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>
        <div className="flex mb-2">
          <div className="text-sm flex items-center font-bold w-24">
            임대면적
          </div>
          <div className="w-80">
            <input
              type="text"
              name="address"
              value={property.rentInfo.rentalArea}
              onChange={(e) =>
                handleChange(
                  ["rentInfo", "exclusiveArea"],
                  e.target.value,
                  setProperty
                )
              }
              className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>
        {showMoreInfo && (
          <>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-24">
                입주시기
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex">{moveInBtns}</div>

                <input
                  type="text"
                  name="address"
                  value={property.rentInfo.moveIn.moveInASAP}
                  onChange={(e) =>
                    handleChange(
                      ["rentInfo", "moveIn", "moveInASAP"],
                      e.target.value,
                      setProperty
                    )
                  }
                  className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-40"
                />
              </div>
            </div>
          </>
        )}
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
    </div>
  );
};

export default ItemInfoRent;
