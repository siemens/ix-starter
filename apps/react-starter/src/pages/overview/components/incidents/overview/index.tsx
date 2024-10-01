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

import { IxBlind, IxIcon, IxButton, IxInputGroup } from "@siemens/ix-react";
import { Incident } from "./incident";
import IncidentList from "./incident-list";
import { useTranslation } from "react-i18next";

function Incidents() {
  const { t } = useTranslation();

  const [incidents] = useState<Incident[]>([
    {
      id: 1,
      incidentName: "Update available",
      icon: "alarm-bell",
      infoText: "v2.3 -> v2.5",
      deviceName: "Device 1",
      date: "2022-05-01",
      color: "alarm",
    },
    {
      id: 2,
      incidentName: "Update available",
      icon: "alarm-bell",
      infoText: "v2.3 -> v2.5",
      deviceName: "Device 2",
      date: "2022-05-01",
      color: "alarm",
    },
  ]);
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(true);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const showCards = () => {
    setShowList(false);
  };

  const showListView = () => {
    setShowList(true);
  };

  return (
    <IxBlind label="Incidents">
      <div className={style.SearchAndFilter}>
        <IxInputGroup>
          <input type="text" aria-label="Filter devices" onChange={handleInput} />
          <span slot="input-start">
            <IxIcon name="search" color="color-primary" size="16"></IxIcon>
          </span>
        </IxInputGroup>

        <div className="btn-group">
          <IxButton icon="card-layout" outline={showList} onClick={showCards}>
            {t("cards")}
          </IxButton>
          <IxButton icon="list" outline={!showList} onClick={showListView}>
            {t("list")}
          </IxButton>
        </div>
      </div>
      {showList && <IncidentList incidents={incidents} search={search}></IncidentList>}
    </IxBlind>
  );
}

export default Incidents;
