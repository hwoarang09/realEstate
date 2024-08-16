import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { renderCategoryButtons } from "../../../../utils/formUtils";
import StyleForm from "../../../../commonComponents/FormStyle";
import { ToggleButton } from "../../../../commonComponents/ToggleButton";

const cateArray = ["치과", "미용", "감기", "통증", "한의원"];

const FormCate = ({ property, setProperty, mode }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  if (!property) {
    return;
  }

  const opVar = property?.available_md_name
    ? "available_md_name"
    : "available_md_name_fixed";
  const recVar = property?.recommended_md_name
    ? "recommended_md_name"
    : "recommended_md_name_fixed";

  const openableFilter = renderCategoryButtons(
    cateArray,
    [opVar],
    "multi",
    property,
    setProperty
  );
  const recommendedFilter = renderCategoryButtons(
    cateArray,
    [recVar],
    "multi",
    property,
    setProperty
  );

  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <StyleForm menuTitle>개업 가능 업종</StyleForm>
        <StyleForm flatButtons>{openableFilter}</StyleForm>
      </StyleForm>

      {showMoreInfo && (
        <StyleForm tabWrapper>
          <StyleForm menuTitle>추천 업종</StyleForm>
          <StyleForm flatButtons>{recommendedFilter}</StyleForm>
        </StyleForm>
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

export default FormCate;
