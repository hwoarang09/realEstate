import React, { useState, useEffect, useRef } from "react";

import "../../../../styles/index.css";

import { useFetchBasicInfoQuery } from "../../../../store";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { AbsPosButton } from "../../../../commonComponents/AbsPosButton";

import ItemInfoHeader from "../../components/FormComponents/FormHeader";
import { BasicInfoSearchHeader } from "../../components/ItemAddPageComponents/BasicInfoSearchHeader";
import { BasicInfoMainResult } from "../../components/ItemAddPageComponents/BasicInfoMainResult";
import { BasicInfoAddPage } from "../../components/ItemAddPageComponents/BasicInfoAddPage";

const PropertyAddModal = ({ closeModal }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [basicInfo, setBasicInfo] = useState(null);
  const [isSearchPage, setIsSearchPage] = useState(true);
  const [property, setProperty] = useState(null);
  const inputRef = useRef(null);
  const {
    data: properties,
    error,
    isLoading,
    refetch,
  } = useFetchBasicInfoQuery(
    searchQuery ? { address: searchQuery } : skipToken
  );
  useEffect(() => {
    setBasicInfo(properties);
  }, [properties]);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error!</div>;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleNext = () => {
    setIsSearchPage(false);
  };

  const handleCloseModal = (shouldRefetch) => {
    closeModal();
    if (shouldRefetch) {
      refetch();
    }
  };
  return (
    <>
      <div className="w-full h-[1200px] overflow-y-auto">
        <ItemInfoHeader onCloseModal={closeModal} />

        {isSearchPage && (
          <div>
            <div className="px-4 pt-20 ">
              <BasicInfoSearchHeader
                inputValue={inputValue}
                handleChange={handleChange}
                handleSearch={handleSearch}
                inputRef={inputRef}
              />
              {!basicInfo && !isLoading && !error && (
                <div className="flex justify-center items-center h-[500px] pb-40 text-center">
                  <div className="text-left">
                    <div className="text-center">주소로 검색하시면</div>
                    <br />
                    <span className="text-blue-500 font-bold">* </span> 해당
                    지역의 개업 가능
                    <br />
                    <span className="text-blue-500 font-bold">* </span> 추천
                    업종
                    <br />
                    <span className="text-blue-500 font-bold">* </span> 상권
                    <br />
                    <br />
                    <div className="text-center">정보를 받을 수 있습니다.</div>
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
            <AbsPosButton onClick={handleNext}>다음</AbsPosButton>
          </div>
        )}
        {!isSearchPage && (
          <>
            <BasicInfoAddPage
              basicInfo={basicInfo}
              property={property}
              setProperty={setProperty}
              onCloseModal={handleCloseModal}
            />
          </>
        )}
      </div>
    </>
  );
};

export default PropertyAddModal;
