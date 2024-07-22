import React from "react";
import Button from "../../../commonComponents/Button";

import { formatDate } from "../../../utils/dateHelper";

const openable = ["치과", "미용", "감기", "통증", "한의원"];
const recommended = ["치과", "미용", "감기", "통증", "한의원"];

const PropertyItemInfoModal = ({ property, closeModal }) => {
  const openableFilter = openable.map((cate) => {
    if (property.openableCategories.includes(cate)) {
      return (
        <Button option_select rounded>
          V {cate}
        </Button>
      );
    } else {
      return (
        <Button option_noselect rounded>
          {cate}
        </Button>
      );
    }
  });
  const recommendedFilter = recommended.map((cate) => {
    if (property.recommendedCategories.includes(cate)) {
      return (
        <Button option_select rounded>
          <span>V</span>
          <span>{cate}</span>
        </Button>
      );
    } else {
      return (
        <Button option_noselect rounded>
          {cate}
        </Button>
      );
    }
  });
  console.log(openable, openableFilter);
  console.log(recommended, recommendedFilter);
  return (
    <div className="border-2 border-black rounded-2xl px-2 py-3">
      <div className="registInfo">
        <div className="mb-2 text-gray-500">매물 ID: {property.id}</div>
        <div className="mb-2 text-gray-500">
          등록일시: {formatDate(property.contractInfo.registrationDate)}
        </div>
        <div className="mb-2 text-gray-500">
          수정일시: {formatDate(property.contractInfo.modificationDate)}
        </div>
      </div>
      <div className="categoryInfo flex justify-between">
        <div className="openableCate">
          <div className="cateHeader text-blue-600 text-xl font-bold">
            개원 가능 진료과
          </div>
          <div>{openableFilter}</div>
        </div>
        <div className="recommendedCate">
          <div className="cateHeader text-blue-600 text-xl font-bold">
            진료 가능 진료과
          </div>
          <div>{recommendedFilter}</div>
        </div>
      </div>
      <div className="mb-2 text-gray-500">
        주소: {property.buildingInfo.address}
      </div>
      <div className="mb-2 text-gray-500">
        건물명: {property.buildingInfo.buildingName}
      </div>
      <div className="mb-2 text-gray-500">
        보증금: {property.rentInfo.deposit}
      </div>
      <div className="mb-2 text-gray-500">
        월세: {property.rentInfo.monthlyRent}
      </div>
      <div className="flex justify-end mt-5">
        <Button primary onClick={closeModal}>
          뒤로가기
        </Button>
      </div>
    </div>
  );
};

export default PropertyItemInfoModal;
