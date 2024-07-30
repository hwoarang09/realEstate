import React from "react";
import "../../../../styles/index.css";

import { FaChevronLeft } from "react-icons/fa";

//지금은 구조만 잡아놓은 상태
//필터기능은 정규계약 후에 추가해야함
const ItemInfoHeader = ({ onClick }) => {
  return (
    <div className="fixed top-0 left-0  w border-gray-300 bg-white z-10">
      <div
        onClick={onClick}
        className="hover:bg-gray-200 w-16 p-4 rounded cursor-pointer flex justify-center items-center"
      >
        <FaChevronLeft className="w-6 h-6" />
      </div>
    </div>
  );
};

export default ItemInfoHeader;
