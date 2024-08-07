import React, { useState } from "react";
import { renderCategoryButtons } from "../../../../utils/formUtils";
import { ToggleButton } from "../../../../commonComponents/ToggleButton";
import StyleForm from "../../../../commonComponents/FormStyle";

const areaTypeArray = ["역세권", "주거권", "유통권"];
const gradeArray = ["상", "중", "하"];
const statusArray = ["기본", "임장중", "계약중"];
const isActiveArray = [true, false];
const isVerifiedArray = [true, false];

const FormOther = ({ property, setProperty }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  if (!property) {
    return;
  }
  const mapppedActive = {
    true: "노출 O",
    false: "노출 X",
  };
  const mapppedVerified = {
    true: "확보 O",
    false: "확보 X",
  };
  const areaTypeBtns = renderCategoryButtons(
    areaTypeArray,
    ["area_type"],
    "multi",
    property,
    setProperty
  );

  const gradeBtns = renderCategoryButtons(
    gradeArray,
    ["grade"],
    "single",
    property,
    setProperty
  );

  const statusBtns = renderCategoryButtons(
    statusArray,
    ["status"],
    "single",
    property,
    setProperty
  );
  const isActiveBtns = renderCategoryButtons(
    isActiveArray,
    ["is_active"],
    "single",
    property,
    setProperty,
    mapppedActive
  );
  const isVerifiedBtns = renderCategoryButtons(
    isVerifiedArray,
    ["is_verified"],
    "single",
    property,
    setProperty,
    mapppedVerified
  );

  return (
    <StyleForm mainWrapper>
      <StyleForm tabWrapper>
        <StyleForm menuTitle>기타 설정</StyleForm>
        <StyleForm formRow>
          <StyleForm label>상권</StyleForm>
          <StyleForm flatButtons>{areaTypeBtns}</StyleForm>
        </StyleForm>
        {showMoreInfo && (
          <StyleForm tabWrapper>
            <StyleForm formRow>
              <StyleForm label>등급</StyleForm>
              <StyleForm flatButtons>{gradeBtns}</StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label>진행 상태</StyleForm>
              <StyleForm flatButtons>{statusBtns}</StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label>앱/웹 노출 여부</StyleForm>
              <StyleForm flatButtons>{isActiveBtns}</StyleForm>
            </StyleForm>
            <StyleForm formRow>
              <StyleForm label>매물 확보 여부</StyleForm>
              <StyleForm flatButtons>{isVerifiedBtns}</StyleForm>
            </StyleForm>
          </StyleForm>
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

export default FormOther;
