import React, { useState, useEffect } from "react";
import { AbsPosButton } from "../../../../commonComponents/AbsPosButton";

import ItemInfoRegist from "../FormComponents/FormRegist";
import ItemInfoCate from "../FormComponents/FormCate";

import ItemInfoRent from "../FormComponents/FormRent";
import ItemInfoTag from "../FormComponents/FormTag";
import ItemInfoBuilding from "../FormComponents/FormBuilding";
import ItemInfoOther from "../FormComponents/FormOther";
import ItemInfoContract from "../FormComponents/FormContract";
import ItemInfoContact from "../FormComponents/FormContact";
import ItemInfoImages from "../FormComponents/FormImages";
import ItemInfoMemo from "../FormComponents/FormMemo";

import {
  getDefaultBlueprint as getDefaultBlueprintBuilding,
  getHideBlueprint as getHideBlueprintBuilding,
} from "./BuildingBluePrints";
import {
  getDefaultBlueprint as getDefaultBlueprintRent,
  getHideBlueprint as getHideBlueprintRent,
} from "./RentBluePrints";
import {
  getDefaultBlueprint as getDefaultBlueprintOther,
  getHideBlueprint as getHideBlueprintOther,
} from "./OtherBluePrints";

import { basicData } from "./formDataBasic";

import { getCurrentTimestamp, isValidDate } from "../../../../utils/dateHelper";
import { useAddPropertyMutation } from "../../../../store";
import SubModal from "../../../../commonComponents/SubModal";

import { useLazyFetchPropertiesQuery } from "../../../../store";
import { useSelector } from "react-redux";
import Button from "../../../../commonComponents/Button";
export const BasicInfoAddPage = ({
  basicInfo,

  onCloseModal,
}) => {
  const [addProperty] = useAddPropertyMutation();
  const [formData, setFormData] = useState(basicData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [fetchProperties] = useLazyFetchPropertiesQuery();

  const params = useSelector((state) => state.searchFilter);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const completion_date_chk = isValidDate(formData.completion_date);
  const updateChecker = (formData) => {
    if (!formData.address) {
      return { status: false, msg: "주소를 입력하세요" };
    } else if (!formData.completion_date)
      return { status: false, msg: "준공일자를 입력하세요" };
    else if (!completion_date_chk)
      return { status: false, msg: "준공일자에 올바른 날짜 형식을 입력하세요" };
    else if (!formData.deposit)
      return { status: false, msg: "보증금 입력하세요" };
    else if (!formData.monthly_rent)
      return { status: false, msg: "임대로를 입력하세요" };
    else if (!formData.maintenance_cost_str)
      return { status: false, msg: "관리비를 입력하세요" };
    else if (!formData.floor)
      return { status: false, msg: "임대층을 입력하세요" };
    else if (!formData.exclusive_area)
      return { status: false, msg: "전용면적을 입력하세요" };
    else if (!formData.completion_date)
      return { status: false, msg: "준공일자를 입력하세요" };
    else return { status: true, msg: "잘 입력" };
  };
  const handleUpdateChanges = async (e) => {
    e.preventDefault();
    const chk = updateChecker(formData);

    if (chk.status === false) {
      setErrmsg(chk.msg);
      setIsModalOpen(true);
      return;
    }

    try {
      const result = await addProperty(formData).unwrap();
      console.log("Property added successfully:", result);

      setFormData(basicData);

      fetchProperties({
        is_verified: true,
        ...params,
        page: 1,
      });
      onCloseModal(true);
    } catch (error) {
      console.error("Failed to add property:", error);
      setErrmsg(error.message);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      available_md_name: basicInfo?.available_md_name || [],
      recommended_md_name: basicInfo?.recommended_md_name || [],
      address: basicInfo?.address || "",
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    }));
  }, [basicInfo]);

  return (
    <>
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

        <AbsPosButton onClick={handleUpdateChanges}>변경사항 저장</AbsPosButton>
      </form>
      <SubModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="fixed bg-white max-w-[450px] min-h-[150px] flex justify-center items-center rounded-xl w-4/5 z-30">
          <div className="h-full">
            <div className="mb-4">{errMsg}</div>
            <div className="flex justify-center items-center">
              <Button primary onClick={closeModal}>
                확인
              </Button>
            </div>
          </div>
        </div>
      </SubModal>
    </>
  );
};
