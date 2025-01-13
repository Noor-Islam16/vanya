import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React from "react";
import BirthdayLanding from "./components/BirthdayLanding";
import BirthdayWishes from "./components/BirthdayWishes";

// Create a wrapper component to handle state
const RouteWrapper = () => {
  const [hasAccess, setHasAccess] = React.useState<boolean>(false);

  const handleAccessGrant = () => {
    setHasAccess(true);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BirthdayLanding onAccessGrant={handleAccessGrant} />,
    },
    {
      path: "/wishes",
      element: hasAccess ? <BirthdayWishes /> : <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

// Render the app
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouteWrapper />
    </React.StrictMode>
  );
}
