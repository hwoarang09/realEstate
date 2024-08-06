import React, { useState } from "react";
import "../../../../styles/index.css";
import StyleForm from "../../../../commonComponents/FormStyle";
import Button from "../../../../commonComponents/Button";
import { Input } from "../../../../@/components/ui/input";
import { formGenerator } from "../../../../utils/formGenerator";
import { ToggleButton } from "../../../../commonComponents/ToggleButton";
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

  const scoreCompList = ["치과", "미용", "감기", "통증", "한의원"];
  const hospitalCompList = ["치과", "미용", "감기", "통증", "한의원", "기타"];
  const areaCompList = ["지하철", "백화점", "대형마트", "시장"];
  const scoreComps = scoreCompList.map((score, i) => {
    return (
      <StyleForm key={`score_${i}`} className="flex items-center">
        <div className="w-1/2">{score}</div>
        <div className="w-1/2">
          {property.score[i].score ? property.score[i].score : "-"}
        </div>
      </StyleForm>
    );
  });
  const hospitalComps = hospitalCompList.map((hospital, i) => {
    return (
      <StyleForm key={`hospital_${i}`} className="flex items-center">
        <div className="w-1/2">{hospital}</div>
        <div className="w-1/2">{`-`}</div>
      </StyleForm>
    );
  });

  const areaComps = areaCompList.map((item, i) => {
    let v;
    if (item === "지하철") v = property["station"][0]?.["name"];
    else if (item === "대형마트") v = property["market"][0]?.["name"];
    else v = "-";

    console.log("property", v);
    return (
      <StyleForm key={`area_${i}`} className="flex items-center">
        <div className="w-1/2">{item}</div>
        <div className="w-1/2">{v}</div>
      </StyleForm>
    );
  });
  const hideBluePrint = getHideBlueprint({
    comps: [scoreComps, hospitalComps, areaComps],
  });
  return (
    <StyleForm mainWrapper>
      {defaultBluePrint.map((bluePrint, i) => (
        <React.Fragment key={`bd1_${i}`}>
          {formGenerator({ property, setProperty, ...bluePrint })}
        </React.Fragment>
      ))}
      <StyleForm toggleButtonWrapper>
        <ToggleButton
          showMoreInfo={showMoreInfo}
          setShowMoreInfo={setShowMoreInfo}
        />
      </StyleForm>
      {showMoreInfo && (
        <>
          {hideBluePrint.map((bluePrint, i) => (
            <React.Fragment key={`bd2_${i}`}>
              {formGenerator({ property, setProperty, ...bluePrint })}
            </React.Fragment>
          ))}
        </>
      )}
    </StyleForm>
  );
};
