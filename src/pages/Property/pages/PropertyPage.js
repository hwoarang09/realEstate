import Header from "../components/Header";
import MapViewTab from "../components/MapViewTab";
import PropertyList from "../components/PropertyList";
import Menu from "../components/Menu";
function PropertyPage() {
  return (
    <div className="relative mx-auto">
      <Header />
      <Menu add={true} />
      <PropertyList />
      <MapViewTab />
    </div>
  );
}

export default PropertyPage;
