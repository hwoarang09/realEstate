import React, { useState } from "react";
import "../../../../styles/index.css";
import StyleForm from "../../../../commonComponents/FormStyle";
import Button from "../../../../commonComponents/Button";
import { Input } from "../../../../@/components/ui/input";
import { formGenerator, ToggleButton } from "../../../../utils/formGenerator";
import { renderCategoryButtons } from "../../../../utils/formUtils";
import {
  getDefaultBlueprint,
  getHideBlueprint,
} from "./BasicInfoMainResultBluePrints";
const cateArray = ["치과", "미용", "감기", "통증", "한의원"];
const areaArray = ["역세권", "유통권", "주거권"];
export const BasicInfoMainResult = ({
  property,
  setProperty,
  error,
  isLoading,
}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  if (!property) return;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  console.log("result ", property);
  const openableBtns = renderCategoryButtons(
    cateArray,
    ["available_md_name"],
    "multi",
    property,
    setProperty
  );
  const recommendedBtns = renderCategoryButtons(
    cateArray,
    ["recommended_md_name"],
    "multi",
    property,
    setProperty
  );
  const areaBtns = renderCategoryButtons(
    areaArray,
    ["area_type"],
    "multi",
    property,
    setProperty
  );

  const defaultBluePrint = getDefaultBlueprint({
    btns: [openableBtns, areaBtns, recommendedBtns],
  });
  const hideBluePrint = [];
  return (
    <StyleForm mainWrapper>
      {defaultBluePrint.map((bluePrint, i) => (
        <React.Fragment key={`bd1_${i}`}>
          {formGenerator({ property, setProperty, ...bluePrint })}
        </React.Fragment>
      ))}
      {showMoreInfo && (
        <>
          {hideBluePrint.map((bluePrint, i) => (
            <React.Fragment key={`bd2_${i}`}>
              {formGenerator({ property, setProperty, ...bluePrint })}
            </React.Fragment>
          ))}
        </>
      )}
      <StyleForm toggleButtonWrapper>
        <ToggleButton
          showMoreInfo={showMoreInfo}
          setShowMoreInfo={setShowMoreInfo}
        />
      </StyleForm>
    </StyleForm>
  );
};
