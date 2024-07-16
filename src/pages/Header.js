import React from "react";
import Button from "../components/Button";
import "../styles/index.css";
import { TfiMenu } from "react-icons/tfi";
import { GrAdd } from "react-icons/gr";

const Header = () => {
  return (
    <header>
      <div className="first-header">
        <div className="menu-icon">
          <TfiMenu />
        </div>
      </div>
      <div className="second-header">
        <div className="second-header-left">
          <div>매물관리</div>
          <div>즐겨찾기</div>
        </div>
        <div className="second-header-right">
          <Button primary_add>
            <GrAdd />
            매물 등록
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
