import { useIxTheme as getIxTheme } from "@siemens/ix-aggrid";
import { IxApplicationContext } from "@siemens/ix-react";
import "@siemens/ix/dist/siemens-ix/siemens-ix-core.css";
import "@siemens/ix/dist/siemens-ix/theme/classic-dark.css";
import "@siemens/ix/dist/siemens-ix/theme/classic-light.css";
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from "ag-grid-community";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./i18n";
import "./index.css";
import DevicesPage from "./pages/devices/index.tsx";
import OverviewPage from "./pages/overview/index.tsx";

ModuleRegistry.registerModules([AllCommunityModule]);

function optionalTheme() {
  if (import.meta.env.VITE_THEME) {
    const css = `${import.meta.env.BASE_URL}theme/dist/css/brand-theme.css`;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = css;
    document.head.appendChild(link);

    const loader = `${import.meta.env.BASE_URL}theme/dist/index.js`;
    const script = document.createElement("script");
    script.src = loader;
    script.type = "module";
    document.head.appendChild(script);

    document.body.classList.add("theme-brand-dark");
  }
}

optionalTheme();

async function configureAgGridTheme() {
  const ixTheme = await getIxTheme(() => import("ag-grid-community"));
  provideGlobalGridOptions({
    theme: ixTheme,
  });
}

// Initialize AG Grid theme and then render the app
configureAgGridTheme().then(() => {
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
});
