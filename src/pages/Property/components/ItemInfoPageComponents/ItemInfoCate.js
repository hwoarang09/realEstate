import React, { useState, useEffect } from "react";
import Button from "../../../../commonComponents/Button";
import { FaCheck, FaChevronUp, FaChevronDown } from "react-icons/fa";

const openable = ["치과", "미용", "감기", "통증", "한의원"];
const recommended = ["치과", "미용", "감기", "통증", "한의원"];

const ItemInfoCate = ({ property }) => {
  const [showRecommended, setShowRecommended] = useState(false);

  const openableFilter = openable.map((cate) => {
    if (property.openableCategories.includes(cate)) {
      return (
        <div key={`openSelect` + cate}>
          <Button option_select rounded>
            <span>
              <FaCheck />
            </span>
            <span>{cate}</span>
          </Button>
        </div>
      );
    } else {
      return (
        <div key={`openNoSelect` + cate}>
          <Button option_noselect rounded>
            <span>{cate}</span>
          </Button>
        </div>
      );
    }
  });
  const recommendedFilter = recommended.map((cate) => {
    if (property.recommendedCategories.includes(cate)) {
      return (
        <div key={`recommSelect` + cate}>
          <Button option_select rounded>
            <span>
              <FaCheck />
            </span>
            <span>{cate}</span>
          </Button>
        </div>
      );
    } else {
      return (
        <div key={`recommNoSelect` + cate}>
          <Button option_noselect rounded>
            <span>{cate}</span>
          </Button>
        </div>
      );
    }
  });

  return (
    <div className="categoryInfo my-6">
      <div className="openableCate mb-4">
        <div className="cateHeader text-blue-600 text-base font-bold mb-2">
          개원 가능 진료과
        </div>
        <div className="flex flex-wrap">{openableFilter.slice(0, 5)}</div>
      </div>

      {showRecommended && (
        <div className="recommendedCate">
          <div className="cateHeader text-blue-600 text-base font-bold mb-2">
            추천 진료과
          </div>
          <div className="flex flex-wrap">{recommendedFilter.slice(0, 5)}</div>
        </div>
      )}
      <div className="flex justify-center mt-3">
        <Button
          primary
          rounded
          outline
          className="mb-4 flex justify-between py-0.5 px-1"
          onClick={() => setShowRecommended(!showRecommended)}
        >
          {showRecommended ? (
            <>
              <span className="text-xs mr-2">접기</span>{" "}
              <span>
                <FaChevronUp />
              </span>
            </>
          ) : (
            <>
              <span className="text-xs mr-2">펼치기</span>{" "}
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
