import React from "react";
import Button from "../../../commonComponents/Button";
import "../../../styles/index.css";

import { Link } from "react-router-dom";
import useModal from "../../../hooks/use-modal";
import PropertyAddModal from "../modalpages/PropertyItemAddPage";
const PropertyMenu = ({ add }) => {
  console.log("inMenu add : ", add);
  const addBtnPath = "/property/add";
  const { isOpen, openModal } = useModal();
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
          {isOpen && <PropertyAddModal />}
        </div>
      </div>
    </div>
  );
};

export default PropertyMenu;
