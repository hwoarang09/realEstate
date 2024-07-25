import MapViewTab from "../components/MapViewTab";
import PropertyList from "../components/PropertyList";
import PropertyMenu from "../components/Menu";
import { Outlet } from "react-router-dom";
function PropertyPage() {
  return (
    <div>
      <PropertyMenu add={"add"} />
      <PropertyList />
      <Outlet />
      <MapViewTab />
    </div>
  );
}

export default PropertyPage;
