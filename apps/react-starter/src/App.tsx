import "./App.css";

import { NavLink, Outlet } from "react-router-dom";
import {
  IxApplication,
  IxApplicationHeader,
  IxAvatar,
  IxContent,
  IxDropdownButton,
  IxDropdownItem,
  IxMenu,
  IxMenuItem,
  IxMenuSettings,
  IxMenuSettingsItem,
} from "@siemens/ix-react";
import * as echarts from "echarts/core";
import { registerTheme } from "@siemens/ix-echarts";
import { useDataStore } from "./pages/store/device-store.ts";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

registerTheme(echarts);

interface Language {
  code: string;
  name: string;
}

function App() {
  const { fetch } = useDataStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  const supportedLanguages: Language[] = [
    { code: "en", name: "English" },
    { code: "de", name: "German" },
  ];

  const { t, i18n } = useTranslation();

  return (
    <IxApplication>
      <IxApplicationHeader name="Siemens Industrial Experience">
        <IxAvatar></IxAvatar>
      </IxApplicationHeader>
      <IxMenu enableToggleTheme i18nToggleTheme={t("toggle-theme")} i18nSettings={t("settings")}>
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

        {/* <NavLink to="/analytics">
          {({ isActive }) => (
            <IxMenuItem active={isActive} icon="piechart">
              Analytics
            </IxMenuItem>
          )}
        </NavLink> */}

        <IxMenuSettings>
          <IxMenuSettingsItem label="User settings">
            <span className="language-switch-label">{t("language.title")}:</span>
            <IxDropdownButton label={t(`language.${i18n.language}`)}>
              {supportedLanguages.map((lang) => (
                <IxDropdownItem key={lang.code} onClick={() => i18n.changeLanguage(lang.code)}>
                  {t(lang.name)} ({t(lang.code)})
                </IxDropdownItem>
              ))}
            </IxDropdownButton>
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
