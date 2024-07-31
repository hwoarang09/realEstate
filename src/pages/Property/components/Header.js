import React from "react";
import "../../../styles/index.css";
// import "../../../styles/globals.css";
import { TfiMenu } from "react-icons/tfi";

//지금은 구조만 잡아놓은 상태
//필터기능은 정규계약 후에 추가해야함
const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-12 px-4 pt-4 bg-white z-10">
      <TfiMenu className="w-5 h-5" />
    </div>
  );
};

export default Header;
