import { useSelector } from "react-redux";
import Modal from "./Modal";
import PropertyItemInfoPage from "../pages/Property/pages/ItemInfo/PropertyItemInfoPage";
import PropertyAddModal from "../pages/Property/pages/ItemAdd/PropertyItemAddPage";
import useModal from "../hooks/use-modal";
import React from "react";
import { useLocation } from "react-router-dom";

const ModalWrapper = () => {
  const { isOpen, modalPath } = useSelector((state) => state.modals);
  const { hideModal } = useModal();
  const location = useLocation();

  if (!isOpen) return null;

  const params = new URLSearchParams(location.search);
  const roomId = params.get("r");

  if (modalPath === "/property/add") {
    console.log("modalchk1", modalPath);
    return (
      <Modal onClose={hideModal} isRouting={true}>
        <PropertyAddModal closeModal={hideModal} />
      </Modal>
    );
  } else if (modalPath === "/property/") {
    console.log("modalchk2", modalPath);
    return;
  } else if (modalPath.includes("/property/")) {
    console.log("modalchk3", modalPath);
    return (
      <Modal onClose={hideModal} isRouting={true}>
        <PropertyItemInfoPage
          closeModal={hideModal}
          modalPath={modalPath}
          roomId={roomId}
        />
      </Modal>
    );
  }

  return <div>Modal Path Error?</div>;
};

export default ModalWrapper;
