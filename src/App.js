import BookmarkPage from "./pages/Property/pages/BookmarkPage";
import PropertyPage from "./pages/Property/pages/PropertyPage";
import ModalWrapper from "./pages/Property/components/ModalWrapper";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Property/pages/Root";

import { useSelector } from "react-redux";
import React, { useEffect } from "react";

import scrollLoger from "./hooks/use-scrollLogger";

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
        path: "property",
        element: <PropertyPage />,
      },
      {
        path: "property/:id",
        element: <ModalWrapper />,
      },
      {
        path: "bookmark",
        element: <BookmarkPage />,
      },
    ],
  },
]);

function App() {
  const { scrollPosition } = useSelector((state) => state.modals);

  useEffect(() => {
    const handlePopState = () => {
      console.log("in handlePopState", scrollPosition);

      const scrollToPosition = () => {
        window.scrollTo(0, scrollPosition);
        if (window.scrollY !== scrollPosition) {
          requestAnimationFrame(scrollToPosition);
        }
      };

      requestAnimationFrame(scrollToPosition);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [scrollPosition]);

  scrollLoger();
  return <RouterProvider router={router} />;
}

export default App;
