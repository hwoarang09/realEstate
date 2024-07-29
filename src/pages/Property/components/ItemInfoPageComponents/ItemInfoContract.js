import { handleChange } from "../../../../utils/formUtils";

const ItemInfoContract = ({ property, setProperty }) => {
  if (!property) {
    return;
  }

  const getValue = (value) =>
    value !== null && value !== undefined ? value : "";

  return (
    <div className="my-6">
      <div className="mb-2 ">
        <div className="text-blue-600 text-base font-bold mb-2">계약 완료</div>
        <div className="mb-2 text-sm">
          <div className="flex mb-2">
            <div className="w-10">
              <input
                type="checkbox"
                name="is_contract_completed"
                checked={getValue(property.is_contract_completed)}
                onChange={(e) =>
                  handleChange(
                    ["is_contract_completed"],
                    e.target.checked,
                    setProperty
                  )
                }
                className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
              />
            </div>
            <div className="text-sm flex items-center">
              계약완료 (목록에서 숨김 처리됩니다)
            </div>
          </div>
        </div>

        <div className="mb-2 text-sm">
          <div className="flex mb-2">
            <div className="w-10">
              <input
                type="checkbox"
                name="is_contract_completed_by_own"
                checked={getValue(property.is_contract_completed_by_own)}
                onChange={(e) =>
                  handleChange(
                    ["is_contract_completed_by_own"],
                    e.target.checked,
                    setProperty
                  )
                }
                className="border rounded p-1 flex-grow focus:border-blue-500 focus:border-2 focus:outline-none cursor-pointer w-full"
              />
            </div>
            <div className="text-sm flex items-center">
              오픈닥터가 중개한 계약임
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInfoContract;
