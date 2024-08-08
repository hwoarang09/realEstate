import BookmarkPage from "./pages/Property/pages/BookmarkPage";
import PropertyPage from "./pages/Property/pages/PropertyPage";
import ModalWrapper from "./commonComponents/ModalWrapper";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useSelector } from "react-redux";
import React, { useEffect } from "react";

import LoginPage from "./pages/Property/pages/LoginPage";
import { AuthProvider } from "./hooks/use-auth";
import PrivateRoute from "./pages/Property/pages/PrivateRoute";
import PublicRoot from "./pages/Property/pages/PublicRoot";
import AuthRoot from "./pages/Property/pages/AuthRoot";
import ErrorPage from "./pages/Property/pages/ErrorPage";

import scrollLoger from "./hooks/use-scrollLogger";
import { useAuth } from "./hooks/use-auth";

const RootSelector = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthRoot /> : <PublicRoot />;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootSelector />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <PrivateRoute element={<PropertyPage />} />,
      },
      {
        path: "property",
        element: <PrivateRoute element={<PropertyPage />} />,
      },
      {
        path: "property/:id",
        element: <PrivateRoute element={<ModalWrapper />} />,
      },
      {
        path: "bookmark",
        element: <PrivateRoute element={<BookmarkPage />} />,
      },
      {
        path: "*",
        element: <ErrorPage />,
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

  // scrollLoger();
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
