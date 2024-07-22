import React from "react";
import "../../../styles/index.css";
import { TfiMenu } from "react-icons/tfi";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 border w-[414px] border-gray-300 p-4 bg-white z-10">
      <TfiMenu className="w-8 h-8" />
    </div>
  );
};

export default Header;
