import React, { useState, useEffect } from "react";

import "../../../styles/index.css";

import { useFetchBasicInfoQuery } from "../../../store";
import { skipToken } from "@reduxjs/toolkit/query/react";
import Button from "../../../commonComponents/Button";
// import { formGenerator, ToggleButton } from "../../../../utils/formGenerator";
import StyleForm from "../../../commonComponents/FormStyle";
import { AbsPosButton } from "../../../commonComponents/AbsPosButton";

import ItemInfoHeader from "../components/ItemInfoPageComponents/ItemInfoHeader";
import { BasicInfoSearchHeader } from "../components/ItemAddPageComponents/BasicInfoSearchHeader";
import { BasicInfoMainResult } from "../components/ItemAddPageComponents/BasicInfoMainResult";
import { BasicInfoAddPage } from "../components/ItemAddPageComponents/BasicInfoAddPage";

const PropertyAddModal = ({ closeModal }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [basicInfo, setBasicInfo] = useState(null);
  const [isSearchPage, setIsSearchPage] = useState(true);
  const [property, setProperty] = useState(null);
  const [isTest, setIsTest] = useState(true);
  const {
    data: properties,
    error,
    isLoading,
  } = useFetchBasicInfoQuery(
    searchQuery ? { address: searchQuery } : skipToken
  );
  useEffect(() => {
    setBasicInfo(properties);
  }, [properties]);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error!</div>;
  console.log("PropertyAddModal closeModal", closeModal);
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    console.log("handleSearch Click");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log("handleChange", e.target.value, inputValue);
  };
  const handleNext = () => {
    setIsSearchPage(false);
    setIsTest(false);
    console.log("handleNext Click");
  };
  return (
    <>
      <div className="w-full h-[1200px] overflow-y-auto">
        <ItemInfoHeader onCloseModal={closeModal} />

        {isSearchPage && (
          <div className="px-4 pt-10 ">
            <BasicInfoSearchHeader
              inputValue={inputValue}
              handleChange={handleChange}
              handleSearch={handleSearch}
            />
            {!basicInfo && (
              <div className="flex justify-center items-center h-[500px] pb-40 text-center">
                <div className="text-left">
                  주소로 검색하시면
                  <br />
                  <br />
                  <span className="text-blue-500 font-bold">*</span> 해당 지역의
                  개원 가능
                  <br />
                  <span className="text-blue-500 font-bold">*</span> 추천 진료과
                  <br />
                  <span className="text-blue-500 font-bold">*</span> 상권
                  <br />
                  <br />
                  정보를 받을 수 있습니다.
                </div>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center items-center h-[500px]">
                Loading...
              </div>
            )}
            {error && (
              <div className="flex justify-center items-center h-[500px]">
                검색결과가 없습니다.
              </div>
            )}
            <BasicInfoMainResult
              property={basicInfo}
              setProperty={setBasicInfo}
              error={error}
              isLoading={isLoading}
            />
          </div>
        )}
        {!isSearchPage && (
          <BasicInfoAddPage
            basicInfo={basicInfo}
            property={property}
            setProperty={setProperty}
          />
        )}
      </div>
      <AbsPosButton onClick={handleNext}>다음</AbsPosButton>
    </>
  );
};

export default PropertyAddModal;
