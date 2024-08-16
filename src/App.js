import ModalWrapper from "./commonComponents/ModalWrapper";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useSelector } from "react-redux";
import React, { useEffect } from "react";

import { AuthProvider } from "./hooks/use-auth";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoot from "./routes/PublicRoot";
import AuthRoot from "./routes/AuthRoot";
import ErrorPage from "./pages/Property/pages/Error/ErrorPage";
import LoginPage from "./pages/Property/pages/Login/LoginPage";
import BookmarkPage from "./pages/Property/pages/Bookmark/BookmarkPage";
import PropertyPage from "./pages/Property/pages/Property/PropertyPage";
import ItemMapPage from "./pages/Property/pages/ItemMapModal/ItemMapPage";
// import scrollLoger from "./hooks/use-scrollLogger";
import { useAuth } from "./hooks/use-auth";
import { NavermapsProvider } from "react-naver-maps";

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
        element: <AuthRoot element={<LoginPage />} />,
        // element: <PropertyPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <PrivateRoute element={<PropertyPage />} />,
        // element: <PropertyPage />,
      },
      {
        path: "property",
        element: <PrivateRoute element={<PropertyPage />} />,
        // element: <PropertyPage />,
      },
      {
        path: "map",
        element: <PrivateRoute element={<ModalWrapper />} />,
        // element: <PropertyPage />,
      },
      {
        path: "property/:id",
        element: <PrivateRoute element={<ModalWrapper />} />,
        // element: <ModalWrapper />,
      },
      {
        path: "bookmark",
        // element: <PrivateRoute element={<BookmarkPage />} />,
        element: <BookmarkPage />,
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

  return (
    <NavermapsProvider
      ncpClientId={process.env.REACT_APP_NAVER_API_ID}
      // clientSecret={process.env.REACT_APP_NAVER_API_CLIENT_SECRET}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NavermapsProvider>
  );
}

export default App;
