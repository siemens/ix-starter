/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  IxCard,
  IxCardContent,
  IxIcon,
  IxRow,
  IxTypography
} from "@siemens/ix-react";
import styles from "./styles.module.css";

type AlertCardProps = {
  title: string;
  value: number;
  variant: string;
}

function AlertCard({title, value, variant}: AlertCardProps) {

  return (
    <IxCard
      className={`${variant === 'warning' ? styles.CardWarning : styles.CardAlert} m-0 border-0`}>
      <IxCardContent className={styles.AlertCardContainer}>
        <IxRow className={styles.AlertCard}>
          <IxIcon name="warning"/>
          <IxTypography bold>{title}</IxTypography>
        </IxRow>
        <IxTypography format="h1">{value}
        </IxTypography>
      </IxCardContent>
    </IxCard>
  );
}

export default AlertCard;