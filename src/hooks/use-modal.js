import { useState } from "react";
import Modal from "../commonComponents/Modal";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModalComponent = ({ children }) => {
    return (
      <Modal isOpen={isOpen} onClose={closeModal}>
        {children}
      </Modal>
    );
  };

  return { isOpen, openModal, closeModal, ModalComponent };
}

export default useModal;
