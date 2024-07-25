import { useSelector } from "react-redux";
import Modal from "../../../commonComponents/Modal";
import PropertyItemInfoPage from "../modalpages/PropertyItemInfoPage";
import PropertyAddModal from "../modalpages/PropertyItemAddPage";
import useModal from "../../../hooks/use-modal";
import React from "react";

const ModalWrapper = () => {
  const { isOpen, modalPath } = useSelector((state) => state.modals);
  const { hideModal } = useModal();

  if (!isOpen) return null;

  if (modalPath === "/property/add") {
    return (
      <Modal onClose={hideModal}>
        <PropertyAddModal closeModal={hideModal} />
      </Modal>
    );
  } else if (modalPath === "/property/") return;
  else if (modalPath.includes("/property/")) {
    return (
      <Modal onClose={hideModal}>
        <PropertyItemInfoPage closeModal={hideModal} modalPath={modalPath} />
      </Modal>
    );
  }

  return <div>주소맞나확인??</div>;
};

export default ModalWrapper;
