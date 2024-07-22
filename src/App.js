import BookmarkPage from "./pages/Property/pages/BookmarkPage";
import PropertyPage from "./pages/Property/pages/PropertyPage";
import PropertyItemInfoPage from "./pages/Property/modalpages/PropertyItemInfoPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Property/pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <PropertyPage />,
      },
      {
        path: "/property",
        element: <PropertyPage />,
        children: [
          {
            path: ":id",
            element: <PropertyItemInfoPage />,
          },
        ],
      },
      {
        path: "/bookmark",
        element: <BookmarkPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
