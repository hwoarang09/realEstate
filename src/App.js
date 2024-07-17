import PropertyItemInfoPage from "./pages/Property/modalpages/PropertyItemInfoPage";
import PropertyItemAddPage from "./pages/Property/modalpages/PropertyItemAddPage";
import MapViewPage from "./pages/Property/modalpages/MapViewPage";
import BookmarkPage from "./pages/Property/pages/BookmarkPage";
import PropertyPage from "./pages/Property/pages/PropertyPage";
import Route from "./components/Route";
import { NavigationProvider } from "./context/navigation";
function App() {
  return (
    <div className="col-span-5">
      <Route path="/bookmark">
        <BookmarkPage />
      </Route>
      <Route path="/">
        <PropertyPage />
      </Route>
    </div>
  );
}

export default App;
