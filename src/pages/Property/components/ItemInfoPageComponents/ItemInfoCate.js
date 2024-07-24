import React, { useState } from "react";
import Button from "../../../../commonComponents/Button";
import { FaCheck, FaChevronUp, FaChevronDown } from "react-icons/fa";

const allCategories = {
  openable: ["치과", "미용", "감기", "통증", "한의원"],
  recommended: ["치과", "미용", "감기", "통증", "한의원"],
};

const ItemInfoCate = ({ property, setProperty }) => {
  const [showRecommended, setShowRecommended] = useState(false);
  if (!property) {
    console.log(" !property cate");
    return;
  }
  const handleCategoryClick = (cate, cateList) => {
    setProperty((prevProperty) => {
      const newProperty = { ...prevProperty };
      const lastKey = cateList.pop();
      const target = cateList.reduce((obj, key) => obj[key], newProperty);

      const newCategories = target[lastKey].includes(cate)
        ? target[lastKey].filter((category) => category !== cate)
        : [...target[lastKey], cate];

      target[lastKey] = newCategories;

      return newProperty;
    });
  };

  const renderCategoryButtons = (cateKey, cateJsonKey) => {
    return allCategories[cateKey].map((cate) => {
      const isSelected = property[cateJsonKey].includes(cate);
      return (
        <div key={`${cateKey}Select` + cate}>
          <Button
            onClick={() => handleCategoryClick(cate, cateJsonKey)}
            option_select={isSelected}
            option_noselect={!isSelected}
            rounded
            type="button"
          >
            {isSelected && <FaCheck />}
            <span>{cate}</span>
          </Button>
        </div>
      );
    });
  };

  const openableFilter = renderCategoryButtons("openable", [
    "openableCategories",
  ]);
  const recommendedFilter = renderCategoryButtons("recommended", [
    "recommendedCategories",
  ]);
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
