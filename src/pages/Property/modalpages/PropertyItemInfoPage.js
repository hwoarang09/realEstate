import React, { useState, useEffect } from "react";
import Button from "../../../commonComponents/Button";
import ItemInfoRegist from "../components/ItemInfoPageComponents/ItemInfoRegist";
import ItemInfoCate from "../components/ItemInfoPageComponents/ItemInfoCate";
import ItemInfoHeader from "../components/ItemInfoPageComponents/ItemInfoHeader";
// import ItemInfoRent from "../components/ItemInfoPageComponents/ItemInfoRent";
import ItemInfoTag from "../components/ItemInfoPageComponents/ItemInfoTag";
import ItemInfoBuilding from "../components/ItemInfoPageComponents/ItemInfoBuilding";
import axios from "axios";
import { useFetchItemsQuery } from "../../../store";

const PropertyItemInfoModal = ({ modalPath, closeModal }) => {
  const [formData, setFormData] = useState(null);
  const propertyId = modalPath.split("property/")[1];

  const {
    data: properties = [],
    error,
    isLoading,
  } = useFetchItemsQuery({ id: propertyId });

  useEffect(() => {
    if (properties.length > 0) {
      const property = properties.find(
        (propert) => Number(propert.id) === Number(propertyId)
      );
      if (property) {
        setFormData(property);
      }
    }
  }, [properties, modalPath, propertyId]);

  const handleSaveChanges = (event) => {
    event.preventDefault();
    closeModal();
  };

  const handleDeleteProperty = (event) => {
    event.preventDefault();
    closeModal();
  };
  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 출력할 내용
  }

  if (error) {
    return <div>Error: {error.message}</div>; // 에러 발생 시 출력할 내용
  }

  return (
    <div className="p-4 w-[448px] h-[1200px] overflow-y-auto">
      <ItemInfoHeader onClick={closeModal} />
      <form className="mt-10">
        <ItemInfoCate property={formData} setProperty={setFormData} />
        <ItemInfoTag property={formData} setProperty={setFormData} />
        <ItemInfoBuilding property={formData} setProperty={setFormData} />
        <ItemInfoRegist property={formData} setProperty={setFormData} />
        <div className="flex justify-end mt-5">
          <Button primary onClick={handleSaveChanges}>
            저장
          </Button>
          <Button danger onClick={handleDeleteProperty} className="ml-2">
            삭제
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyItemInfoModal;
