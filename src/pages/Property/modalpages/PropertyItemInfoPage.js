import React, { useState, useEffect } from "react";
// import Button from "../../../commonComponents/Button";
import ItemInfoRegist from "../components/ItemInfoPageComponents/ItemInfoRegist";
import ItemInfoCate from "../components/ItemInfoPageComponents/ItemInfoCate";
import ItemInfoHeader from "../components/ItemInfoPageComponents/ItemInfoHeader";
import ItemInfoRent from "../components/ItemInfoPageComponents/ItemInfoRent";
import ItemInfoTag from "../components/ItemInfoPageComponents/ItemInfoTag";
import ItemInfoBuilding from "../components/ItemInfoPageComponents/ItemInfoBuilding";
import ItemInfoOther from "../components/ItemInfoPageComponents/ItemInfoOther";
import ItemInfoContract from "../components/ItemInfoPageComponents/ItemInfoContract";
import ItemInfoContact from "../components/ItemInfoPageComponents/ItemInfoContact";
import ItemInfoImages from "../components/ItemInfoPageComponents/ItemInfoImages";
import ItemInfoMemo from "../components/ItemInfoPageComponents/ItemInfoMemo";

import {
  useFetchItemsQuery,
  useRemoveItemMutation,
  useRemoveListMutation,
  useUpdateItemMutation,
  useUpdateListMutation,
} from "../../../store";

const PropertyItemInfoModal = ({ modalPath, closeModal }) => {
  const [formData, setFormData] = useState(null);
  const propertyId = modalPath.split("property/")[1];

  const {
    data: properties = [],
    error,
    isLoading,
  } = useFetchItemsQuery({ id: propertyId });
  const [removeItem] = useRemoveItemMutation();
  const [removeList] = useRemoveListMutation();
  const [updateItem] = useUpdateItemMutation();
  const [updateList] = useUpdateListMutation();

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

  const handleUpdateChanges = (event) => {
    event.preventDefault();
    updateItem(formData);
    updateList(formData);
    closeModal();
  };

  const handleDeleteProperty = (event) => {
    event.preventDefault();
    removeItem({ id: propertyId });
    removeList({ id: propertyId });

    closeModal();
  };
  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 출력할 내용
  }

  if (error) {
    return <div>Error: {error.message}</div>; // 에러 발생 시 출력할 내용
  }

  console.log("formData", formData);
  return (
    <div className=" w-[448px] h-[1200px] overflow-y-auto">
      <ItemInfoHeader onClick={closeModal} />
      <form className="mt-10 ">
        <div className="px-4 pt-4">
          <ItemInfoCate property={formData} setProperty={setFormData} />
          <ItemInfoTag property={formData} setProperty={setFormData} />
          <ItemInfoBuilding property={formData} setProperty={setFormData} />
          <ItemInfoRent property={formData} setProperty={setFormData} />
          <ItemInfoImages property={formData} setProperty={setFormData} />
          <ItemInfoMemo property={formData} setProperty={setFormData} />
          <ItemInfoContact property={formData} setProperty={setFormData} />
          <ItemInfoOther property={formData} setProperty={setFormData} />
          <ItemInfoContract property={formData} setProperty={setFormData} />
          <ItemInfoRegist property={formData} setProperty={setFormData} />
        </div>
        <div
          onClick={handleDeleteProperty}
          className="mb-40 pl-3 flex justify-center items-center text-gray-300 font-bold underline w-full cursor-pointer"
        >
          매물 삭제
        </div>
        <div
          onClick={handleUpdateChanges}
          className="fixed bottom-0 w-[448px] 
          flex justify-center items-center bg-blue-800 text-white text-lg py-3 cursor-pointer"
        >
          변경사항 저장
        </div>
      </form>
    </div>
  );
};

export default PropertyItemInfoModal;
