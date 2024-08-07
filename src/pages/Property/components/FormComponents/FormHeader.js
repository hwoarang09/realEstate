import React from "react";
import "../../../../styles/index.css";
// import "../../../../styles/globals.css";

import { FaChevronLeft } from "react-icons/fa";

//지금은 구조만 잡아놓은 상태
//필터기능은 정규계약 후에 추가해야함
const FormHeader = ({ onCloseModal }) => {
  const handleClick = () => {
    console.log("ItemInfoHeader Click", onCloseModal);
    onCloseModal();
  };
  return (
    <div className="fixed top-0 left-0 h-16 pt-2 bg-opacity-10 bg-white z-10">
      <div
        onClick={handleClick}
        className="hover:bg-gray-100 hover:rounded-xl w-16 p-4 rounded cursor-pointer flex justify-center items-center "
      >
        <FaChevronLeft className="w-6 h-6" />
      </div>
    </div>
  );
};

export default FormHeader;
