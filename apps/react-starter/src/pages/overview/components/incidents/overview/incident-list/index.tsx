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
  IxCol,
  IxEventList,
  IxEventListItem,
  IxIcon,
  IxIconButton,
  IxLayoutGrid,
  IxRow,
  IxTypography,
} from "@siemens/ix-react";
import { Incident } from "../incident";
import styles from "./styles.module.css";
import { iconOpenExternal } from "@siemens/ix-icons/icons";

function IncidentList(props: { incidents: Incident[]; search: string }) {
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

  return (
    <section>
      <IxLayoutGrid noMargin>
        <IxRow className={styles.EventListHeaderOffset}>
          <IxCol size="3">
            <IxRow style={{ gap: "1rem" }}>
              <IxTypography format="label" bold textColor="soft">
                Type
              </IxTypography>
              <IxTypography format="label" bold textColor="soft">
                Incident name
              </IxTypography>
            </IxRow>
          </IxCol>
          <IxCol size="3">
            <IxTypography format="label" bold textColor="soft" className={styles.TitleOffsetDevice}>
              Device
            </IxTypography>
          </IxCol>
          <IxCol size="3">
            <IxTypography format="label" bold textColor="soft" className={styles.TitleOffsetDate}>
              Date
            </IxTypography>
          </IxCol>
        </IxRow>
      </IxLayoutGrid>
      <IxEventList itemHeight={72} animated={false}>
        {searchArray().map((incident) => (
          <IxEventListItem
            key={incident.id}
            itemColor={`color-${incident.color}`}
            data-testid={`incident-item`}
          >
            <IxLayoutGrid noMargin>
              <IxRow>
                <IxCol size="3">
                  <IxRow style={{ gap: "1rem" }} className={styles.NoWrap}>
                    <IxIcon name={incident.icon} size="24" />
                    <IxTypography>{incident.incidentName}</IxTypography>
                  </IxRow>
                  <IxRow>
                    <IxTypography className={styles.InfoText} textColor="soft">
                      {incident.infoText}
                    </IxTypography>
                  </IxRow>
                </IxCol>
                <IxCol>{incident.deviceName}</IxCol>
                <IxCol>{incident.date}</IxCol>
                <IxCol className={styles.IncidentActions}>
                  <IxIconButton variant="secondary" ghost icon={iconOpenExternal} />
                  <IxButton outline color="primary">
                    Update now
                  </IxButton>
                </IxCol>
              </IxRow>
            </IxLayoutGrid>
          </IxEventListItem>
        ))}
      </IxEventList>
    </section>
  );
}

export default IncidentList;
