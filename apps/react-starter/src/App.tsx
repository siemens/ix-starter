import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  IxApplication,
  IxApplicationHeader,
  IxAvatar,
  IxMenu,
  IxMenuItem,
  IxContent,
} from "@siemens/ix-react";
import { CompanyLogo } from "./components/CompanyLogo";

import GetStarted from "./pages/get-started/GetStarted";
import Forms from "./pages/forms/Forms";
import Charts from "./pages/charts/Charts";
import Grids from "./pages/grids/Grids";
import "./App.css";
import { iconHome, iconPiechart, iconTable, iconTextDocument } from "@siemens/ix-icons/icons";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <IxApplication>
        <IxApplicationHeader name="Siemens Industrial Experience Starter App">
          <div slot="logo">
            <CompanyLogo />
          </div>
          <IxAvatar initials="JD" aria-label="User avatar: JD" />
        </IxApplicationHeader>

        <IxMenu enableToggleTheme aria-label="Main navigation">
          <IxMenuItem
            icon={iconHome}
            active={isActive("/")}
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Get Started
          </IxMenuItem>
          <IxMenuItem
            icon={iconTextDocument}
            active={isActive("/forms")}
            onClick={(e) => {
              e.preventDefault();
              navigate("/forms");
            }}
          >
            Forms
          </IxMenuItem>
          <IxMenuItem
            icon={iconPiechart}
            active={isActive("/charts")}
            onClick={(e) => {
              e.preventDefault();
              navigate("/charts");
            }}
          >
            Charts
          </IxMenuItem>
          <IxMenuItem
            icon={iconTable}
            active={isActive("/grids")}
            onClick={(e) => {
              e.preventDefault();
              navigate("/grids");
            }}
          >
            Grids
          </IxMenuItem>
        </IxMenu>

        <IxContent id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/grids" element={<Grids />} />
            <Route path="*" element={<GetStarted />} />
          </Routes>
        </IxContent>
      </IxApplication>
    </>
  );
}

export default App;
