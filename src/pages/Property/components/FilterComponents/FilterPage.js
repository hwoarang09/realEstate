import { useState } from "react";
import Button from "../../../../commonComponents/Button";
function FilterPage({ onClose, onSave, index, initialValue }) {
  const [value, setValue] = useState(initialValue);

  const handleUpdateChanges = () => {
    console.log("변경사항 저장");
  };
  return (
    <div className="border-2 border-gray-100 mt-16 w-full max-w-[500px] justify-center items-center rounded-xl">
      <div className=" p-4">
        <h2 className="text-xl mb-4">zz필터zz</h2>
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
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
      </div>
      <div
        onClick={handleUpdateChanges}
        className="fixed bottom-0 w-full max-w-[500px]
          flex justify-center items-center bg-blue-800 text-white text-lg py-3 cursor-pointer"
      >
        변경사항 저장
      </div>
    </div>
  );
}
export default FilterPage;
