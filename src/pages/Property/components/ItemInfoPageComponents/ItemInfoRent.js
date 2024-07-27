import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import {
  renderCategoryButtons,
  handleChange,
} from "../../../../utils/formUtils";

const rentalTypeCategories = ["전층", "일부"];
const availDateCategories = ["즉시", "협의"];
const transferMoneyCategories = ["양수도 매물임"];
const parkingCategories = ["가능", "불가능", "협의"];
const ItemInfoRent = ({ property, setProperty }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  if (!property) return;

  const availDateBtns = renderCategoryButtons(
    availDateCategories,
    ["available_date"],
    "single",
    property,
    setProperty
  );
  const rentalTypeBtns = renderCategoryButtons(
    rentalTypeCategories,
    ["floor"],
    "single",
    property,
    setProperty
  );
  const transferMoneyBtns = renderCategoryButtons(
    transferMoneyCategories,
    ["transferMoney"],
    "single",
    property,
    setProperty
  );

  const visitorParkingBtns = renderCategoryButtons(
    parkingCategories,
    ["visit_parking"],
    "single",
    property,
    setProperty
  );
  const freeParkingBtns = renderCategoryButtons(
    parkingCategories,
    ["free_parking_str"],
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
              name="deposit"
              value={property.deposit}
              onChange={(e) =>
                handleChange(["deposit"], e.target.value, setProperty)
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
              name="monthly_rent"
              value={property.monthly_rent}
              onChange={(e) =>
                handleChange(["monthly_rent"], e.target.value, setProperty)
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
              name="maintenance_cost_str"
              value={property.maintenance_cost_str}
              onChange={(e) =>
                handleChange(
                  ["maintenance_cost_str"],
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
              name="floor"
              value={property.floor}
              onChange={(e) =>
                handleChange(["floor"], e.target.value, setProperty)
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
              name="exclusive_area"
              value={property.exclusive_area}
              onChange={(e) =>
                handleChange(["exclusive_area"], e.target.value, setProperty)
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
              name="contact_area"
              value={property.contact_area}
              onChange={(e) =>
                handleChange(["contact_area"], e.target.value, setProperty)
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
                <div className="flex">{availDateBtns}</div>

                <input
                  type="text"
                  name="available_date"
                  value={property.available_date}
                  onChange={(e) =>
                    handleChange(
                      ["available_date"],
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
                무료주차
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex">{freeParkingBtns}</div>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-24">
                방문주차
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex">{visitorParkingBtns}</div>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-24">
                양도양수
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex">{transferMoneyBtns}</div>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-24">
                권리금
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  name="key_money"
                  value={property.key_money}
                  onChange={(e) =>
                    handleChange(["key_money"], e.target.value, setProperty)
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
            type="button"
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
