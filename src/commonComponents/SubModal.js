import React from "react";
import ReactDOM from "react-dom";

function SubModal({ isOpen, onClose, onSave, index, initialValue, children }) {
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      onClose,
      ...(onSave && { onSave }),
      ...(typeof index !== "undefined" && { index }),
      ...(typeof initialValue !== "undefined" && { initialValue }),
    })
  );
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 max-w-[500px] flex items-center  justify-center z-50">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-0 "
      ></div>

      {childrenWithProps}
    </div>,
    document.querySelector(".modal-sub")
  );
}

export default SubModal;
