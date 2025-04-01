/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react";
import style from "./styles.module.css";

import {
  iconList,
  iconSearch,
  iconCardLayout,
  iconCloudUpload,
  iconMaintenanceWarning,
  iconInfo,
  iconError,
} from "@siemens/ix-icons/icons";
import { IxButton, IxIcon, IxTypography, IxInput } from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import { Incident } from "./incident";
import IncidentList from "./incident-list";
import useShowDemoMessage from "@/hooks/demoMessage";

function Incidents() {
  const { t } = useTranslation();

  const showDemoMessage = useShowDemoMessage();

  const [incidents] = useState<Incident[]>([
    {
      id: 1,
      incidentName: "Update available",
      icon: iconCloudUpload,
      infoText: "v2.3 -> v2.5",
      deviceName: "robo1-net-sw17",
      ipAddress: "172.19.65.8",
      date: "2024-10-09",
      time: "08:51:21",
      color: iconInfo,
    },
    {
      id: 2,
      incidentName: "Maintenance ended",
      icon: iconMaintenanceWarning,
      infoText: "Manually ended by user",
      deviceName: "agv-net-ap06",
      ipAddress: "172.19.62.12",
      date: "2024-10-08",
      time: "15:20:07",
      color: "warning",
    },
    {
      id: 3,
      incidentName: "Maintenance started",
      icon: iconMaintenanceWarning,
      infoText: "Manually started by user",
      deviceName: "agv-net-ap06",
      ipAddress: "172.19.62.12",
      date: "2024-10-08",
      time: "14:55:12",
      color: "warning",
    },
    {
      id: 4,
      incidentName: "Vendor changed",
      icon: iconInfo,
      infoText: "SIEMENS AG -> Siemens",
      deviceName: "01320ht01.x2p1",
      ipAddress: "10.160.16.6",
      date: "2024-10-08",
      time: "13:10:50",
      color: "neutral",
    },
    {
      id: 5,
      incidentName: "Device name changed",
      icon: iconInfo,
      infoText: "NYC-Cisco-ASR9001 -> NYC-Cisco-ASR9001-Edge-Router",
      deviceName: "NYC-Cisco-ASR9001-Edge-Router",
      ipAddress: "192.168.17.51",
      date: "2024-10-08",
      time: "08:01:44",
      color: "neutral",
    },
    {
      id: 6,
      incidentName: "Maintenance started",
      icon: iconMaintenanceWarning,
      infoText: "Status update from device",
      deviceName: "pd-rack-pnet200sp-01",
      ipAddress: "172.27.232.65",
      date: "2024-10-07",
      time: "23:20:27",
      color: "warning",
    },
    {
      id: 7,
      incidentName: "Device type changed",
      icon: iconInfo,
      infoText: "Level radar -> Sensor",
      deviceName: "tanklevel-sensor",
      ipAddress: "192.168.158.178",
      date: "2024-10-07",
      time: "17:00:04",
      color: "neutral",
    },
    {
      id: 8,
      incidentName: "Maintenance started",
      icon: iconMaintenanceWarning,
      infoText: "Status update from device",
      deviceName: "pd-rackkm-cpu1712-08",
      ipAddress: "172.27.232.95",
      date: "2024-10-06",
      time: "18:59:10",
      color: "warning",
    },
    {
      id: 9,
      incidentName: "Error",
      icon: iconError,
      infoText: "Status update from device",
      deviceName: "heatexchanger-sensor",
      ipAddress: "192.168.145.189",
      date: "2024-10-06",
      time: "14:07:45",
      color: "alarm",
    },
    {
      id: 10,
      incidentName: "Device offline",
      icon: iconInfo,
      infoText: "Status update from device",
      deviceName: "s71200",
      ipAddress: "192.168.74.1",
      date: "2024-10-06",
      time: "14:06:12",
      color: "neutral",
    },
  ]);
  const [search, setSearch] = useState("");

  const handleInput = (event: CustomEvent<string>) => {
    setSearch(event.detail);
  };

  return (
    <section className={style.Incidents}>
      <IxTypography format="label" bold>
        {t("incidents.title")}
      </IxTypography>
      <div className={style.SearchAndFilter}>
        <IxInput placeholder={t("search")} aria-label="Filter devices" type="text" onValueChange={handleInput}>
          <IxIcon slot="start" name={iconSearch} color="color-primary" size="16"></IxIcon>
        </IxInput>

        <div className="btn-group">
          <IxButton icon={iconCardLayout} outline onClick={showDemoMessage}>
            {t("cards")}
          </IxButton>
          <IxButton icon={iconList}>{t("list")}</IxButton>
        </div>
      </div>
      <IncidentList incidents={incidents} search={search}></IncidentList>
    </section>
  );
}

export default Incidents;
