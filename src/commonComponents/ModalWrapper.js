import { useSelector } from "react-redux";
import Modal from "./Modal";
import PropertyItemInfoPage from "../pages/Property/modalpages/PropertyItemInfoPage";
import PropertyAddModal from "../pages/Property/modalpages/PropertyItemAddPage";
import useModal from "../hooks/use-modal";
import React from "react";

const ModalWrapper = () => {
  const { isOpen, modalPath } = useSelector((state) => state.modals);
  const { hideModal } = useModal();

  if (!isOpen) return null;

  if (modalPath === "/property/add") {
    return (
      <Modal onClose={hideModal} isRouting={true}>
        <PropertyAddModal closeModal={hideModal} />
      </Modal>
    );
  } else if (modalPath === "/property/") return;
  else if (modalPath.includes("/property/")) {
    return (
      <Modal onClose={hideModal} isRouting={true}>
        <PropertyItemInfoPage closeModal={hideModal} modalPath={modalPath} />
      </Modal>
    );
  }

  return <div>Modal Path Error?</div>;
};

export default ModalWrapper;
