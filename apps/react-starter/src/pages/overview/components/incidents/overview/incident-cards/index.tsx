/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxCardList, IxPushCard } from "@siemens/ix-react";
import { Incident } from "../incident";
import { useTranslation } from "react-i18next";

function IncidentCards(props: { incidents: Incident[]; search: string }) {
  const { t } = useTranslation();

  function searchArray() {
    if (props.search === "") {
      return props.incidents;
    }

    const query = props.search.toLowerCase();

    return props.incidents.filter((item) =>
      Object.values(item).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(query),
      ),
    );
  }

  function hasUpdates() {
    return searchArray().some((incident) => incident.incidentName === "Update available");
  }

  function updateCount() {
    return searchArray().filter((incident) => incident.incidentName === "Update available").length;
  }

  for (const i in document.getElementsByTagName("ix-card-list")) {
    console.log(i);
  }

  return (
    <IxCardList hideShowAll className="m-0">
      {hasUpdates() && (
        <IxPushCard
          icon="refresh"
          notification={`${updateCount()}`}
          heading="Devices can be updated"
          variant="warning"
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{t("incidents.incident-cards.device")}</th>
                <th scope="col">{t("incidents.incident-cards.date")}</th>
              </tr>
            </thead>
            <tbody>
              {searchArray().map((incident) => (
                <tr key={incident.id}>
                  <th scope="row">{incident.id}</th>
                  <td>{incident.deviceName}</td>
                  <td>{incident.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </IxPushCard>
      )}
    </IxCardList>
  );
}

export default IncidentCards;
