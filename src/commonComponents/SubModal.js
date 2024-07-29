import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
function SubModal({ isOpen, onClose, onSave, initialValue }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    console.log("in useEffect1", initialValue);
    if (initialValue !== value) {
      console.log("in useEffect2", initialValue);
      setValue(initialValue);
    }
  }, [initialValue, value]);
  if (!isOpen) return null;

  console.log("in SubModal ini", initialValue);
  console.log("in SubModal val", value);
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-[448px] z-50">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-green-300 opacity-0 "
      ></div>
      <div className="bg-white p-4 rounded shadow-lg w-3/4  z-50">
        <h2 className="text-xl mb-4">메모 수정</h2>
        <textarea
          className="border rounded px-2 w-full h-24"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <Button
            primary
            rounded
            className="mr-2 py-0.5"
            onClick={() => onSave(value)}
          >
            저장
          </Button>
          <Button danger rounded onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-sub")
  );
}

export default SubModal;
