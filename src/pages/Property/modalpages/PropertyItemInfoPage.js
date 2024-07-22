import React, { useState, useEffect } from "react";
import Button from "../../../commonComponents/Button";
import { formatDate } from "../../../utils/dateHelper";
import axios from "axios";

const URL = "http://localhost:3002/opn";
const openable = ["치과", "미용", "감기", "통증", "한의원"];
const recommended = ["치과", "미용", "감기", "통증", "한의원"];

const PropertyItemInfoModal = ({ modalPath, closeModal }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  const fetchProperties = async () => {
    try {
      const response = await axios.get(URL);
      console.log(`response.data`, response.data); // API 응답 확인
      setProperties(response.data);
      setLoading(false); // 로딩 완료
    } catch (error) {
      console.error("Failed to fetch properties", error);
      setError(error);
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);
  // console.log(`property`, JSON.stringify(properties));
  console.log("proper");
  // const property = properties.find(
  //   (propert) => propert.id === modalPath.split("property/")[1]
  // );
  if (loading) {
    console.log("loading ", loading);
    return <div>Loading...</div>; // 로딩 중일 때 출력할 내용
  }

  if (error) {
    console.log("error ", error);
    return <div>Error: {error.message}</div>; // 에러 발생 시 출력할 내용
  }
  const propertyId = modalPath.split("property/")[1];
  const property = properties.find(
    (propert) => Number(propert.id) === Number(propertyId)
  );
  const openableFilter = openable.map((cate) => {
    if (property.openableCategories.includes(cate)) {
      return (
        <div key={`openSelect` + cate}>
          <Button option_select rounded>
            V {cate}
          </Button>
        </div>
      );
    } else {
      return (
        <div key={`openNoSelect` + cate}>
          <Button option_noselect rounded>
            {cate}
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
            <span>V</span>
            <span>{cate}</span>
          </Button>
        </div>
      );
    } else {
      return (
        <div key={`recommNoSelect` + cate}>
          <Button option_noselect rounded>
            {cate}
          </Button>
        </div>
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
