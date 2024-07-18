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
        className="mb-5 mr-2 text-black hover:text-blue-500"
        activeClassName="font-bold text-blue-500"
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header>
      <div className="first-header border border-gray-300 p-4">
        <TfiMenu className="w-8 h-8" />
      </div>
      <div className="flex justify-between items-center p-4">
        <div className="">{renderedLinks}</div>
        <div className="flex items-center">
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
