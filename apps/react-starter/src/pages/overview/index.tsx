/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxContentHeader, IxPane, IxPaneLayout } from "@siemens/ix-react";
import Overview from "./components/overview";
import QuickActions from "./components/quick-actions";
import styles from "./styles.module.css";
import Incidents from "./components/incidents/overview";
import { useTranslation } from "react-i18next";

const OverviewPage = () => {
  const { t } = useTranslation();

  return (
    <IxPaneLayout variant="inline">
      <div slot="content" className={styles.Content}>
        <IxContentHeader headerTitle={t("content-header")} slot="header"></IxContentHeader>
        <section className={styles.List}>
          <Overview></Overview>
          <Incidents></Incidents>
        </section>
      </div>
      <IxPane heading={t("quick-actions.title")} slot="right">
        <QuickActions></QuickActions>
      </IxPane>
    </IxPaneLayout>
  );
};

export default OverviewPage;
