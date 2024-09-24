/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  IxButton,
  IxEventList,
  IxEventListItem,
  IxIcon,
  IxIconButton,
  IxTypography,
} from "@siemens/ix-react";
import { Incident } from "../incident";
import styles from "./styles.module.css";

function IncidentList(props: { incidents: Incident[]; search: string }) {
  function searchArray() {
    if (props.search === "") {
      return props.incidents;
    }

    const query = props.search.toLowerCase();

    return props.incidents.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(query)
      )
    );
  }

  return (
    <IxEventList itemHeight={72} animated={false}>
      {searchArray().map((incident) => (
        <IxEventListItem
          key={incident.id}
          itemColor={`color-${incident.color}`}
        >
          <div className={styles.ListItemContainer}>
            <div>
              <IxIcon name={incident.icon} />
              <div>
                <IxTypography>{incident.incidentName}</IxTypography>
                <IxTypography color="soft">{incident.infoText}</IxTypography>
              </div>
            </div>
            <div>
              <IxTypography>{incident.deviceName}</IxTypography>
            </div>
            <div>
              <IxTypography>{incident.date}</IxTypography>
            </div>
            <div>
              <IxIconButton icon="open-external" ghost></IxIconButton>
              <IxButton icon="cloud-success-filled" outline>
                Update now
              </IxButton>
            </div>
          </div>
        </IxEventListItem>
      ))}
    </IxEventList>
  );
}

export default IncidentList;
