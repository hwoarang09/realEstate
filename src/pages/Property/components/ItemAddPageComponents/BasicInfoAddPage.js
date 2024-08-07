import React, { useState, useEffect } from "react";
import { AbsPosButton } from "../../../../commonComponents/AbsPosButton";

import ItemInfoRegist from "../FormComponents/FormRegist";
import ItemInfoCate from "../FormComponents/FormCate";
import ItemInfoHeader from "../FormComponents/FormHeader";
import ItemInfoRent from "../FormComponents/FormRent";
import {
  getDefaultBlueprint as getDefaultBlueprintRent,
  getHideBlueprint as getHideBlueprintRent,
  btnsGenerator as btnsGeneratorRent,
} from "../ItemAddPageComponents/BasicInfoRentBluePrints";

import ItemInfoTag from "../FormComponents/FormTag";
import ItemInfoBuilding from "../FormComponents/FormBuilding";
import {
  getDefaultBlueprint as getDefaultBlueprintBuilding,
  getHideBlueprint as getHideBlueprintBuilding,
  btnsGenerator as btnsGeneratorBuilding,
} from "../ItemAddPageComponents/BasicInfoBuildingBluePrints";

import ItemInfoOther from "../FormComponents/FormOther";
import ItemInfoContract from "../FormComponents/FormContract";
import ItemInfoContact from "../FormComponents/FormContact";
import ItemInfoImages from "../FormComponents/FormImages";
import ItemInfoMemo from "../FormComponents/FormMemo";
import { basicData } from "./formDataBasic";

import { MODE } from "../../../../utils/Mode";

import { useAddPropertyMutation } from "../../../../store";
export const BasicInfoAddPage = ({
  basicInfo,
  property,
  setProperty,
  onCloseModal,
}) => {
  const [addProperty] = useAddPropertyMutation();
  const [formData, setFormData] = useState(basicData);

  console.log("basicInfo", basicInfo);
  const handleDeleteProperty = (event) => {};
  const handleUpdateChanges = async () => {
    console.log("formData handleChanges", formData);

    try {
      const result = await addProperty(formData).unwrap();
      console.log("Property added successfully:", result);

      setFormData(basicData);
      onCloseModal();
    } catch (error) {
      console.error("Failed to add property:", error);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      available_md_name: basicInfo?.available_md_name || [],
      recommended_md_name: basicInfo?.recommended_md_name || [],
    }));
  }, [basicInfo]);

  return (
    <form className="mt-10">
      <div className="px-4 pt-4 ">
        <ItemInfoCate
          property={formData}
          setProperty={setFormData}
          mode={MODE.CREATE}
        />
        <ItemInfoTag
          property={formData}
          setProperty={setFormData}
          mode={MODE.CREATE}
        />
        <ItemInfoBuilding
          property={formData}
          setProperty={setFormData}
          getDefaultBlueprint={getDefaultBlueprintBuilding}
          getHideBlueprint={getHideBlueprintBuilding}
          btnsGenerator={btnsGeneratorBuilding}
          mode={MODE.CREATE}
        />
        <ItemInfoRent
          property={formData}
          setProperty={setFormData}
          getDefaultBlueprint={getDefaultBlueprintRent}
          getHideBlueprint={getHideBlueprintRent}
          btnsGenerator={btnsGeneratorRent}
          mode={MODE.CREATE}
        />
        <ItemInfoImages
          property={formData}
          setProperty={setFormData}
          mode={MODE.CREATE}
        />
        <ItemInfoMemo
          property={formData}
          setProperty={setFormData}
          mode={MODE.CREATE}
        />
        <ItemInfoContact
          property={formData}
          setProperty={setFormData}
          mode={MODE.CREATE}
        />
        <ItemInfoOther
          property={formData}
          setProperty={setFormData}
          mode={MODE.CREATE}
        />
        <ItemInfoContract
          property={formData}
          setProperty={setFormData}
          mode={MODE.CREATE}
        />
        <ItemInfoRegist
          property={formData}
          setProperty={setFormData}
          mode={MODE.CREATE}
        />
      </div>
      <div
        onClick={handleDeleteProperty}
        className="mb-40 pl-3 flex justify-center items-center text-gray-300 font-bold underline w-full cursor-pointer"
      >
        매물 삭제
      </div>
      <AbsPosButton onClick={handleUpdateChanges}>변경사항 저장</AbsPosButton>
    </form>
  );
};
