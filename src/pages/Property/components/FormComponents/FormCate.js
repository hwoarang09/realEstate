import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { renderCategoryButtons } from "../../../../utils/formUtils";
import StyleForm from "../../../../commonComponents/FormStyle";
const cateArray = ["치과", "미용", "감기", "통증", "한의원"];

const FormCate = ({ property, setProperty, mode }) => {
  const [showRecommended, setShowRecommended] = useState(false);
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
        <StyleForm menuTitle>개원 가능 진료과</StyleForm>
        <StyleForm flatButtons>{openableFilter}</StyleForm>
      </StyleForm>

      {showRecommended && (
        <StyleForm tabWrapper>
          <StyleForm menuTitle>추천 진료과</StyleForm>
          <StyleForm flatButtons>{recommendedFilter}</StyleForm>
        </StyleForm>
      )}
      <StyleForm toggleButtonWrapper>
        <Button
          primary
          rounded
          outline
          toggle
          type="button"
          onClick={() => setShowRecommended(!showRecommended)}
        >
          {showRecommended ? (
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

export default FormCate;
