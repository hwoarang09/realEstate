import ReactDOM from "react-dom";
import { useEffect } from "react";

function Modal({ onClose, children, isRouting }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const isRoutingStyle = isRouting
    ? "top-0 h-screen"
    : "h-[calc(100vh-64px)] top-[64px]";
  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80 "
      ></div>
      <div
        className={`fixed left-0 bg-white  w-full max-w-[500px] z-30  + ${isRoutingStyle}`}
      >
        <div className="flex flex-col justify-between h-full">{children}</div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
