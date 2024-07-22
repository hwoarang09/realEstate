import Header from "../components/Header";
import MapViewTab from "../components/MapViewTab";
import PropertyMenu from "../components/Menu";

function BookmarkPage() {
  return (
    <div>
      <Header />
      <PropertyMenu add={false} />
      <div className="mt-16">
        <h1>Bookmark Page</h1>
      </div>

      <MapViewTab />
    </div>
  );
}

export default BookmarkPage;
