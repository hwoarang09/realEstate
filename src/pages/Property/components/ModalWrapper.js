import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../store/slices/modalSlice";
import Modal from "../../../commonComponents/Modal";
import PropertyItemInfoPage from "../modalpages/PropertyItemInfoPage";
import PropertyAddModal from "../modalpages/PropertyItemAddPage";
import useModal from "../../../hooks/use-modal";
import React, { useEffect, useState } from "react";
import axios from "axios";
const URL = "http://localhost:3002/opn"; // API URL 설정
const ModalWrapper = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    const response = await axios.get(URL);

    setProperties(response.data);
  };

  const { selectedProperty, isOpen, modalPath } = useSelector(
    (state) => state.modals
  );
  const { hideModal } = useModal();

  console.log(`in ModalWrapper, modalPath ${modalPath}`);
  if (!isOpen) {
    console.log("chk1");
    return null;
  }

  if (modalPath === "/property/add") {
    console.log("chk2");
    return (
      <Modal onClose={hideModal}>
        <PropertyAddModal closeModal={hideModal} />
      </Modal>
    );
  } else if (modalPath === "/property/") {
    console.log("chk3");
    return;
  } else if (modalPath.includes("/property/")) {
    console.log("chk4");
    return (
      <Modal onClose={hideModal}>
        <PropertyItemInfoPage closeModal={hideModal} modalPath={modalPath} />
      </Modal>
    );
  }

  return <div>주소 맞냐?</div>;
};

export default ModalWrapper;
