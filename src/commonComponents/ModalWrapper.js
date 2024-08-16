import { useSelector } from "react-redux";
import Modal from "./Modal";
import PropertyItemInfoPage from "../pages/Property/pages/ItemInfoModal/PropertyItemInfoPage";
import ItemMapPage from "../pages/Property/pages/ItemMapModal/ItemMapPage";
import PropertyAddModal from "../pages/Property/pages/ItemAddModal/PropertyItemAddPage";
import useModal from "../hooks/use-modal";
import React from "react";
import { useLocation } from "react-router-dom";

//모달이랑 주소창 연동 지을 때만 사용함.
//그외의 모달은 단순하게 띄움
const ModalWrapper = () => {
  const { isOpen, modalPath } = useSelector((state) => state.modals);
  const { hideModal } = useModal();
  const location = useLocation();

  if (!isOpen) return null;

  const params = new URLSearchParams(location.search);
  const roomId = params.get("r");
  const lat = params.get("lat");
  const lon = params.get("lon");
  if (modalPath === "/property/add") {
    return (
      <Modal onClose={hideModal} isRouting={true}>
        <PropertyAddModal closeModal={hideModal} />
      </Modal>
    );
  } else if (modalPath === "/property/") {
    return;
  } else if (modalPath.includes("/property/")) {
    return (
      <Modal onClose={hideModal} isRouting={true}>
        <PropertyItemInfoPage
          closeModal={hideModal}
          modalPath={modalPath}
          roomId={roomId}
        />
      </Modal>
    );
  } else if (modalPath.includes("/map")) {
    console.log("map!!!!!!!!!!!!!!!!", lat, lon);
    return (
      <Modal onClose={hideModal} isRouting={true}>
        <ItemMapPage
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
