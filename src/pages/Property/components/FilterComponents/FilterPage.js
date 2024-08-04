import { useState } from "react";
import Button from "../../../../commonComponents/Button";
function FilterPage({ onClose, onSave, index, initialValue }) {
  const [value, setValue] = useState(initialValue);

  const handleUpdateChanges = () => {
    console.log("변경사항 저장");
  };
  return (
    <div className="mt-16 w-full max-w-[500px] justify-center items-center rounded-xl">
      <div className="border-2 border-gray-100 p-4">
        <h2 className="text-xl mb-4">zz필터zz</h2>
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
