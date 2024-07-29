import React from "react";
import Button from "../../../commonComponents/Button";
import "../../../styles/index.css";
import { Link } from "react-router-dom";
import useModal from "../../../hooks/use-modal";
import { useLocation } from "react-router-dom";

const PropertyMenu = ({ add }) => {
  const { showModal } = useModal({ caller: "PropertyMenu" });
  const activeClassName = "font-bold text-blue-700";
  const location = useLocation();

  const handleClick = () => {
    const modalPath = "/property/add";
    showModal({ modalPath });
  };

  const links = [
    { label: "매물관리", path: "/property" },
    { label: "즐겨찾기", path: "/bookmark" },
  ];

  const renderedLinks = links.map((link) => {
    const isSelected = location.pathname === link.path;
    const selectedClass = isSelected ? activeClassName : "";

    console.log(selectedClass);
    return (
      <div
        key={link.label}
        className={`items-center mr-2 text-black hover:text-blue-700 ${selectedClass}`}
      >
        <Link to={link.path}>{link.label}</Link>
      </div>
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center px-4 mt-12 mb-3 h-9">
        <div className="flex items-center space-x-4 text-sm ">
          {renderedLinks}
        </div>
        <div className="flex items-center ">
          {add === "add" && (
            <Button
              primary
              rounded
              onClick={handleClick}
              className="py-0.5 px-2"
            >
              + 매물 등록
            </Button>
          )}
        </div>
      </div>
      <div className="px-4 pb-3.5 text-sm">
        총 <span className="font-bold">4382건 중 </span>{" "}
        <span className="text-blue-800 font-bold">3503</span>건 표시중
      </div>
    </div>
  );
};

export default PropertyMenu;
