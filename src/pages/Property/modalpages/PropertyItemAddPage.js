import React from "react";
import Button from "../../../commonComponents/Button";
import "../../../styles/index.css";

import useModal from "../../../hooks/use-modal";

const PropertyAddModal = ({ closeModal }) => {
  console.log("in PropertyAddModal");
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">매물 등록</h1>
      <p className="text-gray-500">매물을 등록하시겠습니까?</p>
      <div className="flex justify-end mt-5">
        <Button primary onClick={closeModal}>
          등록
        </Button>
        <Button secondary onClick={closeModal}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default PropertyAddModal;
