import React from "react";
import Button from "../../../components/Button";
import "../../../styles/index.css";
import { TfiMenu } from "react-icons/tfi";
import { GrAdd } from "react-icons/gr";
import Link from "../../../components/Link";
import useModal from "../../../hooks/use-modal";

const Header = () => {
  const { isOpen, openModal, closeModal, ModalComponent } = useModal();
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

  const modal = (
    <ModalComponent>
      <div className="p-5">
        <h1 className="text-xl font-bold">매물 등록</h1>
        <p className="text-gray-500">매물을 등록하시겠습니까?</p>
        <div className="flex justify-end mt-5">
          <Button primary onClick={closeModal}>
            등록
          </Button>
          <Button secondary onClick={closeModal}>
            취소
          </Button>
        </div>
      </div>
    </ModalComponent>
  );
  return (
    <header>
      <div className="first-header border border-gray-300 p-4">
        <TfiMenu className="w-8 h-8" />
      </div>
      <div className="flex justify-between items-center p-4">
        <div className="">{renderedLinks}</div>
        <div className="flex items-center">
          <Button primary_add onClick={openModal}>
            <GrAdd />
            매물 등록
          </Button>
          {isOpen && modal}
        </div>
      </div>
    </header>
  );
};

export default Header;
