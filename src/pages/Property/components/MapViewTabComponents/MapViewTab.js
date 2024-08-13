import Button from "../../../../commonComponents/Button";
import "../../../../styles/index.css";
// import "../../../styles/globals.css";
import { CiMap } from "react-icons/ci";
function MapViewTab() {
  return (
    <div className="fixed bottom-5 w flex justify-center">
      <Button primary rounded className="py-2">
        <CiMap /> <span className="text-sm">지도로 보기</span>
      </Button>
    </div>
  );
}

export default MapViewTab;
