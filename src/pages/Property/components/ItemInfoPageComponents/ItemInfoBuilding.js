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
import { Input } from "../../../../@/components/ui/input";
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
        <StyleForm formRow>
          <StyleForm label className="w-1/4">
            주소<span className="text-red-500 font-bold text-xl">*</span>
          </StyleForm>
          <StyleForm className="w-3/4">
            <Input
              type="text"
              name="address"
              value={notNullValue(property.address)}
              onChange={(e) =>
                handleChange(["address"], e.target.value, setProperty)
              }
            />
          </StyleForm>
        </StyleForm>
        {showMoreInfo && (
          <>
            <StyleForm formRow>
              <StyleForm label className="w-1/4">
                건물명
              </StyleForm>
              <StyleForm className="w-3/4">
                <Input
                  type="text"
                  name="building_name"
                  value={notNullValue(property.building_name)}
                  onChange={(e) =>
                    handleChange(["building_name"], e.target.value, setProperty)
                  }
                />
              </StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label className="w-1/4">
                건물 규모
              </StyleForm>
              <StyleForm className="w-3/4">
                <StyleForm formRow className="w-3/4 mb-0">
                  <span className="mr-2">지상</span>
                  <Input
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
                    className="w-20 mr-2"
                  />
                  층
                </StyleForm>
                <StyleForm formRow className="w-3/4 mb-0">
                  <span className="mr-2">지하</span>
                  <Input
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
                    className="w-20 mr-2"
                  />
                  층
                </StyleForm>
              </StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label className="w-1/4">
                준공일자
              </StyleForm>
              <StyleForm className="w-3/4">
                <Input
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
                  className="w-40"
                />
              </StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label className="w-1/4">
                승강기
              </StyleForm>
              <StyleForm formRow className="w-3/4 mb-0">
                <Input
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
                  className="w-20 mr-2"
                />
                대
              </StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label className="w-1/4">
                주차수
              </StyleForm>
              <StyleForm formRow className="w-3/4 mb-0">
                <Input
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
                  className="w-20 mr-2"
                />
                대
              </StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label className="w-1/3">
                병의원 가능 여부
              </StyleForm>
              <StyleForm flatButtons>{bdhsAvailBtns}</StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label className="w-1/4">
                입점 가능한 층
              </StyleForm>
              <StyleForm className="w-3/4">
                <Input
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
                  className="w-20 mr-2"
                />
              </StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label className="w-1/3">
                동종진료과 가능 여부
              </StyleForm>

              <StyleForm flatButtons>{sameCateBtns}</StyleForm>

              <Input
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
                className="w-20 ml-2"
              />
            </StyleForm>

            <StyleForm formRow>
              <StyleForm label className="w-1/3">
                장애인 시설
              </StyleForm>
              <div className="flex flex-wrap">
                <div className="w-1/2 p-2">
                  <StyleForm label>승강기</StyleForm>
                  <div className="flex mt-2">{elevatorsCateBtns}</div>
                </div>
                <div className="w-1/2 p-2">
                  <StyleForm label>경사로</StyleForm>
                  <div className="flex mt-2">{rampCateBtns}</div>
                </div>
                <div className="w-1/2 p-2">
                  <StyleForm label>주차장</StyleForm>
                  <div className="flex mt-2">{parkingSpotsCateBtns}</div>
                </div>
                <div className="w-1/2 p-2">
                  <StyleForm label>화장실</StyleForm>
                  <div className="flex mt-2">{restroomCateBtns}</div>
                </div>
              </div>
            </StyleForm>
          </>
        )}
      </StyleForm>
      <StyleForm toggleButtonWrapper>
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
      </StyleForm>
    </StyleForm>
  );
};

export default ItemInfoBuilding;
