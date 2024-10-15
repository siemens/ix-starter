/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxTypography } from "@siemens/ix-react";
import brand from "./brand.png";
import classic from "./classic.png";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { themeSwitcher } from "@siemens/ix";
import { useTranslation } from "react-i18next";
import useShowDemoMessage from "@/hooks/demoMessage";

function ThemeButton(props: {
  name: string;
  theme: string;
  active?: boolean;
  image: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={styles.ThemeButton}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      <div
        className={clsx(styles.ThemeImagePreview, {
          [styles.Active]: props.active,
        })}
      >
        <img draggable={false} src={props.image} alt="Siemens brand theme" />
      </div>
      <div>
        <input
          type="radio"
          checked={props.active}
          id={props.name}
          onChange={() => {
            console.log("ThemeButton onChange", props.theme);
          }}
        />
        <label htmlFor={props.name}>{props.name}</label>
      </div>
    </div>
  );
}

export default function UserSettings() {
  const showDemoMessage = useShowDemoMessage();
  const { t, i18n } = useTranslation();
  const [currentTheme, setCurrentTheme] = useState<string>(
    import.meta.env.VITE_THEME ? "brand" : "classic",
  );

  useEffect(() => {
    const currentVariant = themeSwitcher.getCurrentTheme();
    const isDark = currentVariant.endsWith(themeSwitcher.suffixDark);
    themeSwitcher.setTheme(`theme-${currentTheme}-${isDark ? "dark" : "light"}`);
  }, [currentTheme]);

  function changeTheme(theme: string) {
    if (import.meta.env.VITE_THEME === undefined) {
      showDemoMessage();
      return;
    }

    setCurrentTheme(theme);
  }

  return (
    <div className={styles.UserSettings}>
      <IxTypography format="h4">Theme</IxTypography>
      <section className={styles.ThemeSelection}>
        <ThemeButton
          name="Siemens Brand"
          image={brand}
          active={currentTheme === "brand"}
          theme="brand"
          onClick={() => changeTheme("brand")}
        />
        <ThemeButton
          name="Classic"
          image={classic}
          active={currentTheme === "classic"}
          theme="classic"
          onClick={() => changeTheme("classic")}
        />
      </section>
      <section>
        <IxTypography className={styles.HeadlineLanguage} format="h4">
          {t("language.title")}
        </IxTypography>
        <section className={styles.LanguageSelection}>
          <div>
            <input
              id="l_en"
              type="radio"
              checked={i18n.language === "en"}
              onChange={() => i18n.changeLanguage("en")}
            />
            <label htmlFor="l_en">{t("language.en")}</label>
          </div>
          <div>
            <input
              id="l_de"
              type="radio"
              checked={i18n.language === "de"}
              onChange={() => i18n.changeLanguage("de")}
            />
            <label htmlFor="l_de">{t("language.de")}</label>
          </div>
        </section>
      </section>
    </div>
  );
}
