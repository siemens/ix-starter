/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChangeEvent, useState } from "react";
import style from "./styles.module.css";

import { iconList, iconSearch } from "@siemens/ix-icons/icons";
import { IxButton, IxIcon, IxInputGroup, IxTypography } from "@siemens/ix-react";
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
      icon: "alarm-bell",
      infoText: "v2.3 -> v2.5",
      deviceName: "Device A",
      date: "2022-05-01",
      color: "alarm",
    },
    {
      id: 2,
      incidentName: "Update available",
      icon: "alarm-bell",
      infoText: "v2.3 -> v2.5",
      deviceName: "Device B",
      date: "2022-05-01",
      color: "alarm",
    },
    {
      id: 3,
      incidentName: "Update available",
      icon: "alarm-bell",
      infoText: "v2.3 -> v2.5",
      deviceName: "Device B",
      date: "2022-05-01",
      color: "alarm",
    },
  ]);
  const [search, setSearch] = useState("");

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <section className={style.Incidents}>
      <IxTypography format="label" bold>
        {t("incidents.title")}
      </IxTypography>
      <div className={style.SearchAndFilter}>
        <IxInputGroup>
          <input
            placeholder={t("search")}
            type="text"
            aria-label="Filter devices"
            onChange={handleInput}
          />
          <span slot="input-start">
            <IxIcon name={iconSearch} color="color-primary" size="16"></IxIcon>
          </span>
        </IxInputGroup>

        <div className="btn-group">
          <IxButton icon="card-layout" outline onClick={showDemoMessage}>
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
