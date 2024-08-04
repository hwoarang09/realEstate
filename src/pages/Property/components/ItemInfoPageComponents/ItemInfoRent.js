import React, { useState } from "react";
import { renderCategoryButtons } from "../../../../utils/formUtils";
import StyleForm from "../../../../commonComponents/FormStyle";
import { formGenerator, ToggleButton } from "../../../../utils/formGenerator";

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
  const defaultBluePrint = [
    {
      STATE: { property, setProperty },
      WIDTHLIST: [
        [
          {
            type: "label",
            labelText: "보증금",
            req: true,
          },
          {
            type: "number",
            keyList: ["deposit"],
            disabled: true,
          },
        ],
      ],
    },
    {
      STATE: { property, setProperty },
      WIDTHLIST: [
        [
          {
            type: "label",
            labelText: "임대료",
            req: true,
          },
          {
            type: "number",
            keyList: ["monthly_rent"],
            disabled: true,
          },
        ],
      ],
    },
    {
      STATE: { property, setProperty },
      WIDTHLIST: [
        [
          {
            type: "label",
            labelText: "관리비",
            req: true,
          },
          {
            type: "text",
            keyList: ["maintenance_cost_str"],
            disabled: true,
          },
        ],
      ],
    },
    {
      STATE: { property, setProperty },
      WIDTHLIST: [
        [
          {
            type: "label",
            labelText: "임대층",
            req: true,
          },
          {
            type: "text",
            keyList: ["floor"],
            style: "w-20 mr-2",
          },
          {
            type: "flatButtons",
            btns: rentalTypeBtns,
          },
        ],
      ],
    },
    {
      STATE: { property, setProperty },
      WIDTHLIST: [
        [
          {
            type: "label",
            labelText: "전용면적",
            req: true,
          },
          {
            type: "number",
            keyList: ["exclusive_area"],
            disabled: true,
          },
        ],
      ],
    },
    {
      STATE: { property, setProperty },
      WIDTHLIST: [
        [
          {
            type: "label",
            labelText: "임대면적",
            req: false,
          },
          {
            type: "number",
            keyList: ["contact_area"],
            disabled: true,
          },
        ],
      ],
    },
  ];

  const hideBluePrint = [
    {
      STATE: { property, setProperty },
      WIDTHLIST: [
        [
          {
            type: "label",
            labelText: "입주시기",
          },
          {
            type: "datepicker",
            keyList: ["available_date"],
          },
        ],
        [
          {
            type: "label",
            labelText: " ",
          },
          {
            type: "flatButtons",
            btns: availDateBtns,
          },
        ],
      ],
    },
    {
      STATE: { property, setProperty },
      WIDTHLIST: [
        [
          {
            type: "label",
            labelText: "무료주차",
            req: false,
          },
          {
            type: "flatButtons",
            btns: freeParkingBtns,
          },
        ],
      ],
    },
    {
      STATE: { property, setProperty },
      WIDTHLIST: [
        [
          {
            type: "label",
            labelText: "방문주차",
            req: false,
          },
          {
            type: "flatButtons",
            btns: visitorParkingBtns,
          },
        ],
      ],
    },
    {
      STATE: { property, setProperty },
      WIDTHLIST: [
        [
          {
            type: "label",
            labelText: "양도양수",
            req: false,
          },
          {
            type: "flatButtons",
            btns: transferMoneyBtns,
          },
        ],
      ],
    },
    {
      STATE: { property, setProperty },
      WIDTHLIST: [
        [
          {
            type: "label",
            labelText: "권리금",
            req: false,
          },
          {
            type: "number",
            keyList: ["key_money"],
          },
        ],
      ],
    },
  ];

  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <StyleForm menuTitle>임대정보</StyleForm>
        {defaultBluePrint.map((bluePrint, i) => (
          <React.Fragment key={`rt1_${i}`}>
            {formGenerator(bluePrint)}
          </React.Fragment>
        ))}

        {showMoreInfo && (
          <>
            {hideBluePrint.map((bluePrint, i) => (
              <React.Fragment key={`rt2_${i}`}>
                {formGenerator(bluePrint)}
              </React.Fragment>
            ))}
          </>
        )}
      </StyleForm>
      <StyleForm toggleButtonWrapper>
        <ToggleButton
          showMoreInfo={showMoreInfo}
          setShowMoreInfo={setShowMoreInfo}
        />
      </StyleForm>
    </StyleForm>
  );
};

export default ItemInfoRent;
