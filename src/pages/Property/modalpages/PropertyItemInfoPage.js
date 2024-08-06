import React, { useState, useEffect } from "react";
import { AbsPosButton } from "../../../commonComponents/AbsPosButton";
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
  useFetchPropertyByIdQuery,
  useRemovePropertyMutation,
  useUpdatePropertyMutation,
} from "../../../store";

const PropertyItemInfoModal = ({ modalPath, closeModal }) => {
  const [formData, setFormData] = useState(null);
  const propertyId = modalPath.split("property/")[1];

  const {
    data: properties,
    error,
    isLoading,
  } = useFetchPropertyByIdQuery(propertyId);
  const [removeProperty] = useRemovePropertyMutation();

  const [updateProperty] = useUpdatePropertyMutation();
  useEffect(() => {
    setFormData(properties?.contents);
  }, [properties]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleUpdateChanges = (event) => {
    event.preventDefault();
    updateProperty(formData);
    closeModal();
  };

  const handleDeleteProperty = (event) => {
    event.preventDefault();
    removeProperty({ id: propertyId });
    closeModal();
  };

  return (
    <div className="w-full h-[1200px] overflow-y-auto">
      <ItemInfoHeader onCloseModal={closeModal} />
      <form className="mt-10">
        <div className="px-4 pt-4 ">
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
        <AbsPosButton onClick={handleUpdateChanges}>변경사항 저장</AbsPosButton>
      </form>
    </div>
  );
};

export default PropertyItemInfoModal;
