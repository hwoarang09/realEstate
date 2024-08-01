import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import {
  notNullValue,
  renderCategoryButtons,
  handleChange,
  parseFormInt,
} from "../../../../utils/formUtils";
import StyleForm from "../../../../commonComponents/FormStyle";

const categoriesBDHS = ["전체 가능", "부분 가능", "불가능"];
const categoriesSame = ["가능", "불가능"];
const categoriesExist = ["유", "무"];

const ItemInfoBuilding = ({ property, setProperty }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  if (!property) return;

  const bdhsAvailBtns = renderCategoryButtons(
    categoriesBDHS,
    ["extra", "bd_hs_available"],
    "single",
    property,
    setProperty
  );
  const sameCateBtns = renderCategoryButtons(
    categoriesSame,
    ["extra", "sm_md_open_available"],
    "single",
    property,
    setProperty
  );
  const elevatorsCateBtns = renderCategoryButtons(
    categoriesExist,
    ["extra", "handicap_ele"],
    "single",
    property,
    setProperty
  );
  const parkingSpotsCateBtns = renderCategoryButtons(
    categoriesExist,
    ["extra", "handicap_parking"],
    "single",
    property,
    setProperty
  );
  const rampCateBtns = renderCategoryButtons(
    categoriesExist,
    ["extra", "handicap_ramp"],
    "single",
    property,
    setProperty
  );
  const restroomCateBtns = renderCategoryButtons(
    categoriesExist,
    ["extra", "handicap_wc"],
    "single",
    property,
    setProperty
  );

  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <StyleForm menuTitle>건물정보</StyleForm>
        <div className="flex mb-2">
          <StyleForm label>
            주소<span className="text-red-500 font-bold text-xl">*</span>
          </StyleForm>
          <div className="w-80">
            <input
              type="text"
              name="address"
              value={notNullValue(property.address)}
              onChange={(e) =>
                handleChange(["address"], e.target.value, setProperty)
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
                  name="building_name"
                  value={notNullValue(property.building_name)}
                  onChange={(e) =>
                    handleChange(["building_name"], e.target.value, setProperty)
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
                    type="number"
                    name="max_floor"
                    value={notNullValue(property.max_floor)}
                    onChange={(e) =>
                      handleChange(
                        ["max_floor"],
                        parseFormInt(e.target.value),
                        setProperty
                      )
                    }
                    className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-20 mx-2"
                  />
                  층
                </div>
                <div className="text-sm">
                  지하
                  <input
                    type="text"
                    name="min_floor"
                    value={notNullValue(property.min_floor)}
                    onChange={(e) =>
                      handleChange(
                        ["min_floor"],
                        parseFormInt(e.target.value),
                        setProperty
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
                  name="completion_date"
                  value={notNullValue(property.completion_date)}
                  onChange={(e) =>
                    handleChange(
                      ["completion_date"],
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
                승강기
              </div>
              <div className="w-40">
                <input
                  type="number"
                  name="elevator_customer"
                  value={notNullValue(property.elevator_customer)}
                  onChange={(e) =>
                    handleChange(
                      ["elevator_customer"],
                      parseFormInt(e.target.value),
                      setProperty
                    )
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
              <div className="">
                <input
                  type="number"
                  name="total_parking"
                  value={notNullValue(property.total_parking)}
                  onChange={(e) =>
                    handleChange(
                      ["total_parking"],
                      parseFormInt(e.target.value),
                      setProperty
                    )
                  }
                  className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-20 mx-2"
                />
                대
              </div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold">
                병의원 가능 여부
              </div>
              <div className="flex ml-4">{bdhsAvailBtns}</div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-32">
                입점 가능한 층
              </div>
              <div className="">
                <input
                  type="number"
                  name="pt_hs_available_floor"
                  value={notNullValue(property.extra.pt_hs_available_floor)}
                  onChange={(e) =>
                    handleChange(
                      ["extra", "pt_hs_available_floor"],
                      parseFormInt(e.target.value),
                      setProperty
                    )
                  }
                  className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-20 mx-2"
                />
              </div>
            </div>
            <div className="mb-2">
              <div className="flex w-full mb-2">
                <div className="text-sm flex items-center font-bold w-full">
                  동종진료과 가능 여부
                </div>
              </div>
              <div className="flex">
                <div className="flex">{sameCateBtns}</div>
                <div className="ml-2">
                  <input
                    type="text"
                    name="pt_hs_available_floor"
                    value={notNullValue(property.extra.sm_md_open_available)}
                    onChange={(e) =>
                      handleChange(
                        ["extra", "sm_md_open_available"],
                        e.target.value,
                        setProperty
                      )
                    }
                    className="border rounded p-1 ml-2 focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-40"
                  />
                </div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex w-full mb-2">
                <div className="text-sm flex items-center font-bold w-full">
                  장애인 시설
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-1/2 p-2">
                  <div className="text-sm flex items-center font-bold">
                    승강기
                  </div>
                  <div className="flex">{elevatorsCateBtns}</div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="text-sm flex items-center font-bold">
                    경사로
                  </div>
                  <div className="flex">{rampCateBtns}</div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="text-sm flex items-center font-bold">
                    주차장
                  </div>
                  <div className="flex">{parkingSpotsCateBtns}</div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="text-sm flex items-center font-bold">
                    화장실
                  </div>
                  <div className="flex">{restroomCateBtns}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </StyleForm>
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
    </StyleForm>
  );
};

export default ItemInfoBuilding;
