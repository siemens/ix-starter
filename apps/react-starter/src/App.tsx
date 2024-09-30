import "./App.css";

import { NavLink, Outlet } from "react-router-dom";
import {
  IxApplication,
  IxApplicationHeader,
  IxAvatar,
  IxContent,
  IxMenu,
  IxMenuItem,
} from "@siemens/ix-react";
import * as echarts from "echarts/core";
import { registerTheme } from '@siemens/ix-echarts';

registerTheme(echarts);

function App() {
  return (
    <IxApplication>
      <IxApplicationHeader name="Siemens Industrial Experience">
        <IxAvatar></IxAvatar>
      </IxApplicationHeader>
      <IxMenu enableToggleTheme>
        <NavLink to="/">
          {({ isActive }) => (
            <IxMenuItem active={isActive} icon="home">
              Overview
            </IxMenuItem>
          )}
        </NavLink>

        <NavLink to="/devices">
          {({ isActive }) => (
            <IxMenuItem active={isActive} icon="project">
              Devices
            </IxMenuItem>
          )}
        </NavLink>

        {/* <NavLink to="/analytics">
          {({ isActive }) => (
            <IxMenuItem active={isActive} icon="piechart">
              Analytics
            </IxMenuItem>
          )}
        </NavLink> */}

        <IxMenuItem bottom icon="cogwheel">
          Settings
        </IxMenuItem>
      </IxMenu>

      <IxContent>
        <Outlet></Outlet>
      </IxContent>
    </IxApplication>
  );
}

export default App;
