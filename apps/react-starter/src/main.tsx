import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { IxApplicationContext } from "@siemens/ix-react";
import "./index.css";
import "@siemens/ix/dist/siemens-ix/siemens-ix.css";
import App from "./App.tsx";
import OverviewPage from "./pages/overview/index.tsx";
import DevicesPage from "./pages/devices/index.tsx";
import AnalyticsPage from "./pages/analytics/index.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <OverviewPage />,
      },
      {
        path: "/devices",
        element: <DevicesPage />,
      },
      {
        path: "/analytics",
        element: <AnalyticsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IxApplicationContext>
      <RouterProvider router={router}></RouterProvider>
    </IxApplicationContext>
  </StrictMode>,
);
