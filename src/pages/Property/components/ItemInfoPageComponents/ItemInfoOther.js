import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { renderCategoryButtons } from "../../../../utils/formUtils";

const areaTypeArray = ["역세권", "주거권", "유통권"];
const gradeArray = ["상", "중", "하"];
const statusArray = ["기본", "임장중", "계약중"];
const isActiveArray = [true, false];
const isVerifiedArray = [true, false];

const ItemInfoOther = ({ property, setProperty }) => {
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
    <div className="my-6">
      <div className="mb-2 ">
        <div className="text-blue-600 text-base font-bold mb-2">기타 설정</div>
        <div className="flex mb-2">
          <div className="text-sm flex items-center font-bold w-28">상권</div>
          <div className="flex">{areaTypeBtns}</div>
        </div>
        {showMoreInfo && (
          <>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-28">
                등급
              </div>
              <div className="flex">{gradeBtns}</div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-28">
                진행 상태
              </div>
              <div className="flex">{statusBtns}</div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-28">
                앱/웹 노출 여부
              </div>
              <div className="flex">{isActiveBtns}</div>
            </div>
            <div className="flex mb-2">
              <div className="text-sm flex items-center font-bold w-28">
                매물 확보 여부
              </div>
              <div className="flex">{isVerifiedBtns}</div>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center mt-3">
        <Button
          primary
          rounded
          outline
          className="mb-4 flex justify-between py-0.5 px-1"
          type="button" // 버튼의 기본 타입을 button으로 설정하여 submit 방지
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
    </div>
  );
};

export default ItemInfoOther;
