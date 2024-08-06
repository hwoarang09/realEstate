import Button from "../commonComponents/Button";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const ToggleButton = ({ showMoreInfo, setShowMoreInfo }) => {
  return (
    <Button
      primary
      rounded
      outline
      className="mb-4 flex justify-between py-0.5 px-1"
      type="button"
      onClick={() => setShowMoreInfo(!showMoreInfo)}
    >
      {showMoreInfo ? (
        <>
          <span className="text-xs mr-2">접기</span>
          <span>
            <FaChevronUp />
          </span>
        </>
      ) : (
        <>
          <span className="text-xs mr-2">펼치기</span>
          <span>
            <FaChevronDown />
          </span>
        </>
      )}
    </Button>
  );
};
