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
} from "../FormComponents/FormRentBluePrints";

import ItemInfoTag from "../FormComponents/FormTag";
import ItemInfoBuilding from "../FormComponents/FormBuilding";
import {
  getDefaultBlueprint as getDefaultBlueprintBuilding,
  getHideBlueprint as getHideBlueprintBuilding,
  btnsGenerator as btnsGeneratorBuilding,
} from "../FormComponents/FormBuildingBluePrints";

import ItemInfoOther from "../FormComponents/FormOther";
import ItemInfoContract from "../FormComponents/FormContract";
import ItemInfoContact from "../FormComponents/FormContact";
import ItemInfoImages from "../FormComponents/FormImages";
import ItemInfoMemo from "../FormComponents/FormMemo";
import { basicData } from "./formDataBasic";

import { MODE } from "../../../../utils/Mode";
import { getCurrentTimestamp } from "../../../../utils/dateHelper";
import { useAddPropertyMutation } from "../../../../store";
import SubModal from "../../../../commonComponents/SubModal";
export const BasicInfoAddPage = ({
  basicInfo,
  property,
  setProperty,
  onCloseModal,
}) => {
  const [addProperty] = useAddPropertyMutation();
  const [formData, setFormData] = useState(basicData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const closeModal = () => {
    setIsModalOpen(false);
  };
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
      setErrmsg("Failed to add property " + JSON.stringify(error, null, 2));
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      available_md_name: basicInfo?.available_md_name || [],
      recommended_md_name: basicInfo?.recommended_md_name || [],
      address: basicInfo?.address || [],
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    }));
  }, [basicInfo]);

  return (
    <>
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
      <SubModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="fixed bg-white max-w-[450px] justify-center items-center rounded-xl w-4/5 z-30">
          {errMsg}
        </div>
      </SubModal>
    </>
  );
};
