import Header from "../components/Header";
import MapViewTab from "../components/MapViewTab";
import PropertyList from "../components/PropertyList";
import PropertyMenu from "../components/Menu";
function PropertyPage() {
  return (
    <div>
      <PropertyList />
      <MapViewTab />
    </div>
  );
}

export default PropertyPage;
