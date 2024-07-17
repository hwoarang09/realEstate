import PropertyItemInfoPage from "./pages/Property/modalpages/PropertyItemInfoPage";
import PropertyItemAddPage from "./pages/Property/modalpages/PropertyItemAddPage";
import MapViewPage from "./pages/Property/modalpages/MapViewPage";
import BookmarkPage from "./pages/Property/pages/BookmarkPage";
import PropertyPage from "./pages/Property/pages/PropertyPage";
import Route from "./components/Route";
import { NavigationProvider } from "./context/navigation";
function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <div className="col-span-5">
        <Route path="/bookmark">
          <BookmarkPage />
        </Route>
        <Route path="/">
          <PropertyPage />
        </Route>
      </div>
    </div>
  );
}

export default App;
