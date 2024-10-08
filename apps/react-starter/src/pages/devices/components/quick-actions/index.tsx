/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from "./styles.module.css";

import { IxActionCard, IxCard, IxCardContent, IxTypography } from "@siemens/ix-react";
import AlertCard from "./alert-card/alert-card.tsx";
import { iconAddCircle } from "@siemens/ix-icons/icons";
import type { Device } from "../../../../types";
import { useDataStore } from "../../../store/device-store.ts";
import { useTranslation } from "react-i18next";

export type QuickActionsProps = {
  show: () => void;
};

function QuickActions({ show }: QuickActionsProps) {
  const { t } = useTranslation();

  const { devices } = useDataStore();

  function getDevicesCountByStatus(data: Device[], status: Device["status"]): number {
    if (data) {
      return data!.filter((device: Device) => device.status === status).length;
    }
    return 0;
  }

  return (
    <>
      <IxActionCard
        variant="primary"
        icon={iconAddCircle}
        heading={t("device-quick-actions.add-device")}
        className="w-100"
        onClick={show}
      ></IxActionCard>
      <div className={styles.Container}>
        <IxCard variant="filled" className={styles.DeviceCard}>
          <IxCardContent>
            <IxTypography bold>{t("device-quick-actions.devices")}</IxTypography>
            <IxTypography format="h1">{devices.length}</IxTypography>
          </IxCardContent>
        </IxCard>
        <div className={styles.AlertCards}>
          <AlertCard
            title={t("device-quick-actions.faulty-devices")}
            value={getDevicesCountByStatus(devices, "Error")}
            variant="alarm"
          />
          <AlertCard
            title={t("device-quick-actions.warning-devices")}
            value={getDevicesCountByStatus(devices, "Maintenance")}
            variant="warning"
          />
        </div>
      </div>
    </>
  );
}

export default QuickActions;
