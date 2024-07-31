import React from "react";
import Button from "../../../commonComponents/Button";
import "../../../styles/index.css";
// import "../../../styles/globals.css";
import { Link } from "react-router-dom";
import useModal from "../../../hooks/use-modal";
import { useLocation } from "react-router-dom";
import { useFetchPropertiesQuery } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
const PropertyMenu = ({ add }) => {
  const { showModal } = useModal({ caller: "PropertyMenu" });
  const activeClassName = "font-bold text-blue-700";
  const location = useLocation();
  const {
    data: properties = [],
    error,
    isLoading,
  } = useFetchPropertiesQuery({
    is_verified: true,
    page: 1,
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

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
        총 <span className="font-bold">{properties.count.total}건 중 </span>{" "}
        <span className="text-blue-800 font-bold">
          {properties.count.filtered}
        </span>
        건 표시중
      </div>
    </div>
  );
};

export default PropertyMenu;
