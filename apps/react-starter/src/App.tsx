import { registerTheme } from "@siemens/ix-echarts";
import { iconLogOut, iconUserSettings } from "@siemens/ix-icons/icons";
import {
  IxApplication,
  IxApplicationHeader,
  IxAvatar,
  IxContent,
  IxDropdownItem,
  IxMenu,
  IxMenuItem,
  IxMenuSettings,
  IxMenuSettingsItem,
} from "@siemens/ix-react";
import * as echarts from "echarts/core";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import useShowDemoMessage from "./hooks/demoMessage";
import Logo from "./Logo";
import UserSettings from "./pages/user-settings";
import { useDataStore } from "./store/device-store";
import ApplicationSettings from "./pages/application-settings";

registerTheme(echarts);

function App() {
  const menuRef = useRef<HTMLIxMenuElement>(null);
  const showDemoMessage = useShowDemoMessage();
  const { fetch } = useDataStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  const { t } = useTranslation();

  return (
    <IxApplication>
      <IxApplicationHeader name="Siemens Industrial Experience">
        <Logo />
        <IxAvatar username="Your user" extra="Administrator">
          <IxDropdownItem
            icon={iconUserSettings}
            label={t("settings.user-settings")}
            onClick={showDemoMessage}
          />
          <IxDropdownItem icon={iconLogOut} label="Logout" onClick={showDemoMessage} />
        </IxAvatar>
      </IxApplicationHeader>
      <IxMenu
        ref={menuRef}
        enableToggleTheme
        i18nToggleTheme={t("toggle-theme")}
        i18nSettings={t("settings.title")}
      >
        <NavLink to="/">
          {({ isActive }: { isActive: boolean }) => (
            <IxMenuItem active={isActive} icon="home">
              {t("overview")}
            </IxMenuItem>
          )}
        </NavLink>

        <NavLink to="/devices">
          {({ isActive }: { isActive: boolean }) => (
            <IxMenuItem active={isActive} icon="project">
              {t("devices")}
            </IxMenuItem>
          )}
        </NavLink>

        <IxMenuSettings label={t("settings.title")}>
          <IxMenuSettingsItem label={t("settings.user-settings")}>
            <UserSettings />
          </IxMenuSettingsItem>
          <IxMenuSettingsItem label={t("settings.application-settings")}>
            <ApplicationSettings />
          </IxMenuSettingsItem>
        </IxMenuSettings>
      </IxMenu>

      <IxContent>
        <Outlet></Outlet>
      </IxContent>
    </IxApplication>
  );
}

export default App;
