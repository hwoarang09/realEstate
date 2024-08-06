import React, { useState, useEffect } from "react";

import "../../../styles/index.css";

import { useFetchBasicInfoQuery } from "../../../store";
import { skipToken } from "@reduxjs/toolkit/query/react";
import Button from "../../../commonComponents/Button";
// import { formGenerator, ToggleButton } from "../../../../utils/formGenerator";
import StyleForm from "../../../commonComponents/FormStyle";

import {
  getDefaultBlueprint,
  getHideBlueprint,
} from "./ItemAddBasicInfoBluePrints";

import { BasicInfoSearchHeader } from "../components/ItemAddPageComponents/BasicInfoSearchHeader";
import { BasicInfoMainResult } from "../components/ItemAddPageComponents/BasicInfoMainResult";
// const defaultBluePrint = getDefaultBlueprint();
// const hideBluePrint = getHideBlueprint({
//   customJSX: [],
//   btns: [
//     bdhsAvailBtns,
//     sameCateBtns,
//     elevatorsCateBtns,
//     rampCateBtns,
//     parkingSpotsCateBtns,
//     restroomCateBtns,
//   ],
// });
const PropertyAddModal = ({ closeModal }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState(null);
  const {
    data: properties,
    error,
    isLoading,
  } = useFetchBasicInfoQuery(
    searchQuery ? { address: searchQuery } : skipToken
  );
  useEffect(() => {
    setFormData(properties);
  }, [properties]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const handleSearch = () => {
    setSearchQuery(inputValue);
    console.log("handleSearch Click");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log("handleChange", e.target.value, inputValue);
  };

  return (
    <div>
      <BasicInfoSearchHeader
        inputValue={inputValue}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />
      <BasicInfoMainResult
        property={formData}
        setProperty={setFormData}
        error={error}
        isLoading={isLoading}
      />
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
