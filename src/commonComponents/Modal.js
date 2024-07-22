import Button from "./Button";
import ReactDOM from "react-dom";
import { useEffect } from "react";
function Modal({ onClose, children }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80"
      ></div>
      <div className="fixed top-0 left-0 w-[414px] h-screen m-0 p-10 bg-white z-50">
        <div className="flex flex-col justify-between h-full">{children}</div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
