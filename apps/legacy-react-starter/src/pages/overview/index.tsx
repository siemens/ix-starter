/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxContentHeader } from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import Incidents from "./components/incidents/overview";
import Overview from "./components/overview";
import styles from "./styles.module.css";
import { useIsMobileViewPort } from "@/hooks/mediaQuery";
import clsx from "clsx";

const OverviewPage = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobileViewPort();

  return (
    <>
      <IxContentHeader headerTitle={t("content-header")} slot="header"></IxContentHeader>
      <section
        className={clsx(styles.List, {
          [styles["h-100"]]: !isMobile,
        })}
      >
        <Overview></Overview>
        <Incidents></Incidents>
      </section>
    </>
  );
};

export default OverviewPage;
