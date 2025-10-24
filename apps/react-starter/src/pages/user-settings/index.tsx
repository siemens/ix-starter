/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxRadio, IxRadioGroup, IxTypography } from "@siemens/ix-react";
import brand from "./brand.png";
import classic from "./classic.png";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
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
        <IxRadio
          id={props.name}
          checked={props.active}
          onCheckedChange={(event) => {
            event.preventDefault();
            console.log("ThemeButton onCheckedChange", props.theme);
          }}
          label={props.name}
        ></IxRadio>
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
    // Update theme using v4 data attribute approach
    document.documentElement.setAttribute('data-ix-theme', currentTheme);
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
          <IxRadioGroup>
            <IxRadio
              id="l_en"
              checked={i18n.language === "en"}
              onCheckedChange={() => i18n.changeLanguage("en")}
              label={t("language.en")}
            ></IxRadio>
            <IxRadio
              id="l_de"
              checked={i18n.language === "de"}
              onCheckedChange={() => i18n.changeLanguage("de")}
              label={t("language.de")}
            ></IxRadio>
          </IxRadioGroup>
        </section>
      </section>
    </div>
  );
}
