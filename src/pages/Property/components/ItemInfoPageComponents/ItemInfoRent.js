import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import {
  renderCategoryButtons,
  handleChange,
  notNullValue,
  parseFormInt,
} from "../../../../utils/formUtils";
import StyleForm from "../../../../commonComponents/FormStyle";
import { Input } from "../../../../@/components/ui/input";
import { simpleInputGenerator } from "../../../../utils/formGenerator";
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

  const depositComp = simpleInputGenerator({
    label: "보증금",
    labelRequired: true,
    type: "number",
    keyList: ["deposit"],
    property,
    setProperty,
  });
  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <StyleForm menuTitle>임대정보</StyleForm>
        {depositComp}
        {/* <StyleForm formRow>
          <StyleForm label className="w-1/4">
            보증금<span className="text-red-500 font-bold text-xl">*</span>
          </StyleForm>
          <StyleForm>
            <Input
              type="number"
              name="deposit"
              value={notNullValue(property.deposit)}
              onChange={(e) => {
                handleChange(
                  ["deposit"],
                  parseFormInt(e.target.value),
                  setProperty
                );
              }}
            />
          </StyleForm>
        </StyleForm> */}
        <StyleForm formRow>
          <StyleForm label className="w-1/4">
            임대료<span className="text-red-500 font-bold text-xl">*</span>
          </StyleForm>
          <StyleForm>
            <Input
              type="number"
              name="monthly_rent"
              value={notNullValue(property.monthly_rent)}
              onChange={(e) =>
                handleChange(
                  ["monthly_rent"],
                  parseFormInt(e.target.value),
                  setProperty
                )
              }
            />
          </StyleForm>
        </StyleForm>
        <StyleForm formRow>
          <StyleForm label className="w-1/4">
            관리비<span className="text-red-500 font-bold text-xl">*</span>
          </StyleForm>
          <StyleForm>
            <Input
              type="text"
              name="maintenance_cost_str"
              value={notNullValue(property.maintenance_cost_str)}
              onChange={(e) =>
                handleChange(
                  ["maintenance_cost_str"],
                  e.target.value,
                  setProperty
                )
              }
            />
          </StyleForm>
        </StyleForm>
        <StyleForm formRow>
          <StyleForm label className="w-1/4">
            임대층<span className="text-red-500 font-bold text-xl">*</span>
          </StyleForm>
          <StyleForm formRow className="mb-0">
            <StyleForm flatButtons>{rentalTypeBtns}</StyleForm>

            <Input
              type="text"
              name="floor"
              value={notNullValue(property.floor)}
              onChange={(e) =>
                handleChange(["floor"], e.target.value, setProperty)
              }
              className="w-28 ml-2"
            />
          </StyleForm>
        </StyleForm>
        <StyleForm formRow>
          <StyleForm label className="w-1/4">
            전용면적<span className="text-red-500 font-bold text-xl">*</span>
          </StyleForm>
          <StyleForm>
            <Input
              required
              type="number"
              name="exclusive_area"
              value={notNullValue(property.exclusive_area)}
              onChange={(e) =>
                handleChange(
                  ["exclusive_area"],
                  parseFormInt(e.target.value),
                  setProperty
                )
              }
            />
          </StyleForm>
        </StyleForm>
        <StyleForm formRow>
          <StyleForm label className="w-1/4">
            임대면적
          </StyleForm>
          <StyleForm>
            <Input
              type="number"
              name="contact_area"
              value={notNullValue(property.contact_area)}
              onChange={(e) =>
                handleChange(
                  ["contact_area"],
                  parseFormInt(e.target.value),
                  setProperty
                )
              }
            />
          </StyleForm>
        </StyleForm>
        {showMoreInfo && (
          <>
            <StyleForm formRow>
              <StyleForm label className="w-1/4">
                입주시기
              </StyleForm>
              <StyleForm formRow className="mb-0">
                <StyleForm flatButtons>{availDateBtns}</StyleForm>

                <Input
                  type="text"
                  name="available_date"
                  value={notNullValue(property.available_date)}
                  onChange={(e) =>
                    handleChange(
                      ["available_date"],
                      e.target.value,
                      setProperty
                    )
                  }
                  className="w-28 ml-2"
                />
              </StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label className="w-1/4">
                무료주차
              </StyleForm>
              <StyleForm formRow className="mb-0">
                <StyleForm flatButtons>{freeParkingBtns}</StyleForm>
              </StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label className="w-1/4">
                방문주차
              </StyleForm>
              <StyleForm formRow className="mb-0">
                <StyleForm flatButtons>{visitorParkingBtns}</StyleForm>
              </StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label className="w-1/4">
                양도양수
              </StyleForm>
              <StyleForm formRow className="mb-0">
                <StyleForm flatButtons>{transferMoneyBtns}</StyleForm>
              </StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label className="w-1/4">
                권리금
              </StyleForm>
              <StyleForm formRow className="mb-0">
                <Input
                  type="number"
                  name="key_money"
                  value={property.key_money}
                  onChange={(e) =>
                    handleChange(
                      ["key_money"],
                      parseFormInt(e.target.value),
                      setProperty
                    )
                  }
                />
              </StyleForm>
            </StyleForm>
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
      </StyleForm>
    </StyleForm>
  );
};

export default ItemInfoRent;
