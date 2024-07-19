import React from "react";
import Button from "../../../components/Button";
import useModal from "../../../hooks/use-modal";

const PropertyItemInfoModal = ({ property, closeModal }) => {
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">매물 정보</h1>
      <div className="mb-2 text-gray-500">ID: {property.id}</div>
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
