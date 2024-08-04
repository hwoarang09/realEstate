import React, { useState } from "react";
import {
  notNullValue,
  renderCategoryButtons,
  handleChange,
  parseFormInt,
} from "../../../../utils/formUtils";
import { Input } from "../../../../@/components/ui/input";
import StyleForm from "../../../../commonComponents/FormStyle";
import { formGenerator, ToggleButton } from "../../../../utils/formGenerator";
import {
  getDefaultBlueprint,
  getHideBlueprint,
} from "./ItemInfoBuildingBluePrints";

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

  const defaultBluePrint = getDefaultBlueprint();
  const hideBluePrint = getHideBlueprint(
    bdhsAvailBtns,
    sameCateBtns,
    elevatorsCateBtns,
    rampCateBtns,
    parkingSpotsCateBtns,
    restroomCateBtns
  );

  const buildingSizeComp = (
    <StyleForm formRow>
      <StyleForm label className="w-2/5">
        건물 규모
      </StyleForm>
      <StyleForm className="w-full">
        <StyleForm formRow className=" mb-0">
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
            type="number"
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
  );

  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <StyleForm menuTitle>건물정보</StyleForm>
        {defaultBluePrint.map((bluePrint, i) => (
          <React.Fragment key={`bd1_${i}`}>
            {formGenerator({ property, setProperty, ...bluePrint })}
          </React.Fragment>
        ))}
        {showMoreInfo && (
          <>
            {hideBluePrint.slice(0, 1).map((bluePrint, i) => (
              <React.Fragment key={`bd2_${i}`}>
                {formGenerator({ property, setProperty, ...bluePrint })}
              </React.Fragment>
            ))}
            {buildingSizeComp}
            {hideBluePrint.slice(1).map((bluePrint, i) => (
              <React.Fragment key={`bd3_${i}`}>
                {formGenerator({ property, setProperty, ...bluePrint })}
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

export default ItemInfoBuilding;
