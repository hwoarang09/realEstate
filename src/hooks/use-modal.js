import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  openModal,
  closeModal,
  setModalPath,
} from "../store/slices/modalSlice";

function useModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, selectedProperty, modalPath } = useSelector(
    (state) => state.modals
  );

  useEffect(() => {
    if (modalPath && location.pathname !== modalPath) {
      dispatch(closeModal());
    }
  }, [location, modalPath, dispatch]);

  useEffect(() => {
    const modalPath = location.pathname;

    if (modalPath.includes("/property/")) {
      dispatch(setModalPath({ modalPath }));
    }
  }, [location.pathname, dispatch]);

  const showModal = ({ modalPath, selectedProperty }) => {
    dispatch(openModal({ modalPath, selectedProperty }));
    dispatch(setModalPath({ modalPath }));
    navigate(modalPath);
  };
  const hideModal = () => {
    dispatch(closeModal());
    navigate(-1);
  };

  return { isOpen, selectedProperty, showModal, hideModal };
}

export default useModal;
