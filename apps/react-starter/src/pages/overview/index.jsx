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

const OverviewPage = () => {
  return (
    <>
      <IxPaneLayout variant="inline">
        <div slot="content" className={styles.Content}>
          <IxContentHeader headerTitle="Welcome to our demo app!"></IxContentHeader>
          <Overview className={styles.Overview}></Overview>
          <Incidents></Incidents>
        </div>
        <IxPane heading="Quick actions" expanded slot="right">
          <QuickActions></QuickActions>
        </IxPane>
      </IxPaneLayout>
    </>
  );
};

export default OverviewPage;
