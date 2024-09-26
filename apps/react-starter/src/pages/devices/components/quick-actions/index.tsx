/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from "./styles.module.css";

import {
  IxActionCard,
  IxCard,
  IxCardContent,
  IxTypography
} from "@siemens/ix-react";
import AlertCard from "./alert-card/alert-card.tsx";
import {iconAddCircle} from "@siemens/ix-icons/icons";
import {QuickActionsProps} from "../../../../types";

function QuickActions({devicesCount,errorCount, warningCount, show}: QuickActionsProps) {
  return (
    <>
      <IxActionCard
        variant="primary"
        icon={iconAddCircle}
        heading="Add device"
        className="w-100"
        onClick={show}
      ></IxActionCard>
      <div className={styles.Container}>
        <IxCard variant="filled" className={styles.DeviceCard}>
          <IxCardContent>
            <IxTypography bold>Devices</IxTypography>
            <IxTypography format="h1">{devicesCount}</IxTypography>
          </IxCardContent>
        </IxCard>
        <div className={styles.AlertCards}>
          <AlertCard title="Faulty" value={errorCount} variant="alarm"/>
          <AlertCard title="Warning" value={warningCount} variant="warning"/>
        </div>
      </div>
    </>
  );
}

export default QuickActions;
