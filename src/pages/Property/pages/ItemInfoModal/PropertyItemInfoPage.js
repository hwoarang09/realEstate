import React, { useState, useEffect } from "react";
import { AbsPosButton } from "../../../../commonComponents/AbsPosButton";
// import Button from "../../../commonComponents/Button";
import ItemInfoRegist from "../../components/FormComponents/FormRegist";
import ItemInfoCate from "../../components/FormComponents/FormCate";
import ItemInfoHeader from "../../components/FormComponents/FormHeader";
import ItemInfoRent from "../../components/FormComponents/FormRent";
import {
  getDefaultBlueprint as getDefaultBlueprintRent,
  getHideBlueprint as getHideBlueprintRent,
} from "../../components/ItemInfoPageComponents/ItemInfoRentBluePrints";

import {
  getDefaultBlueprint as getDefaultBlueprintOther,
  getHideBlueprint as getHideBlueprintOther,
} from "../../components/ItemInfoPageComponents/ItemInfoOtherBluePrints";

import ItemInfoTag from "../../components/FormComponents/FormTag";
import ItemInfoBuilding from "../../components/FormComponents/FormBuilding";
import {
  getDefaultBlueprint as getDefaultBlueprintBuilding,
  getHideBlueprint as getHideBlueprintBuilding,
} from "../../components/ItemInfoPageComponents/ItemInfoBuildingBluePrints";
import ItemInfoOther from "../../components/FormComponents/FormOther";
import ItemInfoContract from "../../components/FormComponents/FormContract";
import ItemInfoContact from "../../components/FormComponents/FormContact";
import ItemInfoImages from "../../components/FormComponents/FormImages";
import ItemInfoMemo from "../../components/FormComponents/FormMemo";

import {
  useFetchPropertyByIdQuery,
  useRemovePropertyMutation,
  useUpdatePropertyMutation,
} from "../../../../store";

const PropertyItemInfoModal = ({ modalPath, closeModal, roomId }) => {
  const [formData, setFormData] = useState(null);

  const {
    data: properties,
    error,
    isLoading,
    refetch,
  } = useFetchPropertyByIdQuery({ modalPath, roomId });
  const [removeProperty] = useRemovePropertyMutation();
  const [updateProperty] = useUpdatePropertyMutation();

  useEffect(() => {
    setFormData(properties?.contents);
  }, [properties]);

  useEffect(() => {
    refetch();
  }, [refetch]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const propertyId = properties?.contents?.id;

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
          <ItemInfoBuilding
            property={formData}
            setProperty={setFormData}
            getDefaultBlueprint={getDefaultBlueprintBuilding}
            getHideBlueprint={getHideBlueprintBuilding}
          />
          <ItemInfoRent
            property={formData}
            setProperty={setFormData}
            getDefaultBlueprint={getDefaultBlueprintRent}
            getHideBlueprint={getHideBlueprintRent}
          />
          <ItemInfoImages property={formData} setProperty={setFormData} />
          <ItemInfoMemo property={formData} setProperty={setFormData} />
          <ItemInfoContact property={formData} setProperty={setFormData} />
          <ItemInfoOther
            property={formData}
            setProperty={setFormData}
            getDefaultBlueprint={getDefaultBlueprintOther}
            getHideBlueprint={getHideBlueprintOther}
          />
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
