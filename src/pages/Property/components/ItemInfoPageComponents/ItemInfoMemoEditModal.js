import { useState } from "react";
import Button from "../../../../commonComponents/Button";
function MemoEditModal({ onClose, onSave, index, initialValue }) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="bg-white p-4 rounded shadow-lg w-3/4 z-40">
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
          onClick={() => onSave(index, value)}
        >
          저장
        </Button>
        <Button danger rounded onClick={onClose}>
          취소
        </Button>
      </div>
    </div>
  );
}
export default MemoEditModal;
