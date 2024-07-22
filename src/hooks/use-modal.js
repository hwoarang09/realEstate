import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  openModal as openModalAction,
  closeModal as closeModalAction,
  setModalPath,
} from "../store/slices/modalSlice";
import Modal from "../commonComponents/Modal";

function useModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, modalPath } = useSelector((state) => state.modal);

  useEffect(() => {
    if (modalPath && location.pathname !== modalPath) {
      dispatch(closeModalAction());
    }
  }, [location, modalPath, dispatch]);
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/property/")) {
      dispatch(setModalPath(path));
    }
  }, [location.pathname, dispatch]);
  const openModal = (path) => {
    dispatch(openModalAction(path));
    navigate(path); // navigate를 여기서 호출
  };

  const closeModal = () => {
    dispatch(closeModalAction());
    navigate(-1); // navigate를 여기서 호출
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
