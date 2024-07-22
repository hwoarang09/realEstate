import React from "react";
import Button from "../../../commonComponents/Button";
import "../../../styles/index.css";

import { Link } from "react-router-dom";
import useModal from "../../../hooks/use-modal";

const PropertyMenu = ({ add }) => {
  console.log("inMenu add : ", add);
  const addBtnPath = "/property/add";
  const { isOpen, openModal, closeModal, ModalComponent } = useModal();
  const links = [
    { label: "매물관리", path: "/property" },
    { label: "즐겨찾기", path: "/bookmark" },
  ];
  const renderedLinks = links.map((link) => {
    return (
      <div
        key={link.label}
        className="items-center mr-2 text-black hover:text-blue-500"
      >
        <Link to={link.path}>{link.label}</Link>
      </div>
    );
  });

  const modal = (
    <ModalComponent>
      <div className="p-5">
        <h1 className="text-xl font-bold">매물 등록</h1>
        <p className="text-gray-500">매물을 등록하시겠습니까?</p>
        <div className="flex justify-end mt-5">
          <Button primary onClick={closeModal}>
            등록
          </Button>
          <Button secondary onClick={closeModal}>
            취소
          </Button>
        </div>
      </div>
    </ModalComponent>
  );
  return (
    <div>
      <div className="flex justify-between items-center p-4 mt-14 min-h-20 ">
        <div className="flex items-center space-x-4">{renderedLinks}</div>
        <div className="flex items-center ">
          {add && (
            <Button primary onClick={() => openModal(addBtnPath)}>
              + 매물 등록
            </Button>
          )}
          {isOpen && modal}
        </div>
      </div>
    </div>
  );
};

export default PropertyMenu;
