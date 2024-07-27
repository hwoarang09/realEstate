import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { renderCategoryButtons } from "../../../../utils/formUtils";

const cateArray = ["치과", "미용", "감기", "통증", "한의원"];

const ItemInfoCate = ({ property, setProperty }) => {
  const [showRecommended, setShowRecommended] = useState(false);
  if (!property) {
    return;
  }

  const openableFilter = renderCategoryButtons(
    cateArray,
    ["available_md_name_fixed"],
    "multi",
    property,
    setProperty
  );
  const recommendedFilter = renderCategoryButtons(
    cateArray,
    ["recommended_md_name_fixed"],
    "multi",
    property,
    setProperty
  );
  return (
    <div className="categoryInfo my-6">
      <div className="mb-4">
        <div className="cateHeader text-blue-600 text-base font-bold mb-2">
          개원 가능 진료과
        </div>
        <div className="flex flex-wrap">{openableFilter}</div>
      </div>

      {showRecommended && (
        <div className="recommendedCate">
          <div className="cateHeader text-blue-600 text-base font-bold mb-2">
            추천 진료과
          </div>
          <div className="flex flex-wrap">{recommendedFilter}</div>
        </div>
      )}
      <div className="flex justify-center mt-3">
        <Button
          primary
          rounded
          outline
          className="mb-4 flex justify-between py-0.5 px-1"
          type="button" // 버튼의 기본 타입을 button으로 설정하여 submit 방지
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
      </div>
    </div>
  );
};

export default ItemInfoCate;
