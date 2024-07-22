import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModalAction } from "../../../store/slices/modalSlice";
import Modal from "../../../commonComponents/Modal";

const ModalWrapper = () => {
  const dispatch = useDispatch();
  const { isOpen, content } = useSelector((state) => state.modals);

  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  if (!isOpen) return null;

  return <Modal onClose={handleCloseModal}>{content}</Modal>;
};

export default ModalWrapper;
