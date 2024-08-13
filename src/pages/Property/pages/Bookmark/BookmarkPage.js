import MapViewTab from "../../components/MapViewTabComponents/MapViewTab";
import PropertyMenu from "../../components/PropertyListComponents/PropertyMenu";
import { Outlet } from "react-router-dom";
function BookmarkPage() {
  return (
    <div>
      <PropertyMenu add={"noadd"} />
      <div className="mt-16">
        <h1>Bookmark Page</h1>
      </div>
      <Outlet />
      <MapViewTab />
    </div>
  );
}

export default BookmarkPage;
