import React, { useState } from "react";
import { renderCategoryButtons } from "../../../../utils/formUtils";
import StyleForm from "../../../../commonComponents/FormStyle";
import { formGenerator } from "../../../../utils/formGenerator";
import { ToggleButton } from "../../../../commonComponents/ToggleButton";
import {
  getDefaultBlueprint,
  getHideBlueprint,
} from "./ItemInfoRentBlueprints";

export const rentalTypeCategories = ["전층", "일부"];
export const availDateCategories = ["즉시", "협의"];
export const transferMoneyCategories = ["양수도 매물임"];
export const parkingCategories = ["가능", "불가능", "협의"];

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
    ["rent_scale"],
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

  const defaultBluePrint = getDefaultBlueprint(rentalTypeBtns);
  const hideBluePrint = getHideBlueprint(
    availDateBtns,
    freeParkingBtns,
    visitorParkingBtns,
    transferMoneyBtns
  );

  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <StyleForm menuTitle>임대정보</StyleForm>
        {defaultBluePrint.map((bluePrint, i) => (
          <React.Fragment key={`rt1_${i}`}>
            {formGenerator({ property, setProperty, ...bluePrint })}
          </React.Fragment>
        ))}

        {showMoreInfo && (
          <>
            {hideBluePrint.map((bluePrint, i) => (
              <React.Fragment key={`rt2_${i}`}>
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

export default ItemInfoRent;
