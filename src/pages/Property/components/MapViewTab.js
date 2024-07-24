import Button from "../../../commonComponents/Button";
import "../../../styles/index.css";

function MapViewTab() {
  return (
    <div className="fixed bottom-5 w-[448px] flex justify-center">
      <Button primary rounded>
        지도로 보기
      </Button>
    </div>
  );
}

export default MapViewTab;
