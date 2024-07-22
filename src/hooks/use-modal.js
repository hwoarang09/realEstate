import { useState, useEffect } from "react";
import Modal from "../commonComponents/Modal";
import { useNavigate, useLocation } from "react-router-dom";

function useModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [modalPath, setModalPath] = useState(null);

  useEffect(() => {
    if (modalPath && location.pathname !== modalPath) {
      setIsOpen(false);
      setModalPath(null);
    }
  }, [location, modalPath]);

  const openModal = (path) => {
    setIsOpen(true);
    setModalPath(path);
    navigate(path);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalPath(null);
    navigate(-1);
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
