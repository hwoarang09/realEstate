import React from "react";
import Button from "../../../components/Button";
import "../../../styles/index.css";
import { TfiMenu } from "react-icons/tfi";
import { GrAdd } from "react-icons/gr";
import Link from "../../../components/Link";

const Header = () => {
  const links = [
    { label: "매물관리", path: "/" },
    { label: "즐겨찾기", path: "/bookmark" },
  ];
  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label}
        to={link.path}
        className="mb-5"
        activeClassName="font-bold"
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header>
      <div className="first-header">
        <div className="menu-icon">
          <TfiMenu />
        </div>
      </div>
      <div className="second-header">
        <div className="">{renderedLinks}</div>
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
