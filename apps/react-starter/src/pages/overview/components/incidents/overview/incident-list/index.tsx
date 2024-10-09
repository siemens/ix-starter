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
import { iconOpenExternal, iconUpload } from "@siemens/ix-icons/icons";
import useShowDemoMessage from "@/hooks/demoMessage";

function IncidentList(props: { incidents: Incident[]; search: string }) {
  const showDemoMessage = useShowDemoMessage();
  const searchFilter = (incident: Incident) => {
    if (!props.search) {
      return true;
    }

    const query = props.search.toLowerCase();
    return Object.values(incident).some(
      (value) => typeof value === "string" && value.toLowerCase().includes(query),
    );
  };

  return (
    <section>
      <IxLayoutGrid noMargin>
        <IxRow className={styles.EventListHeaderOffset}>
          <IxCol size="3" sizeSm="6">
            <IxRow style={{ gap: "1rem" }}>
              <IxTypography format="label" bold textColor="soft">
                Type
              </IxTypography>
              <IxTypography format="label" bold textColor="soft">
                Incident name
              </IxTypography>
            </IxRow>
          </IxCol>
          <IxCol size="3" sizeSm="4">
            <IxTypography format="label" bold textColor="soft" className={styles.TitleOffsetDevice}>
              Device
            </IxTypography>
          </IxCol>
          <IxCol size="3" className={styles.Desktop}>
            <IxTypography format="label" bold textColor="soft" className={styles.TitleOffsetDate}>
              Date
            </IxTypography>
          </IxCol>
        </IxRow>
      </IxLayoutGrid>
      <IxEventList itemHeight={72} animated={false}>
        {props.incidents.filter(searchFilter).map((incident) => (
          <IxEventListItem
            key={incident.id}
            itemColor={`color-${incident.color}`}
            data-testid={`incident-item`}
          >
            <IxLayoutGrid noMargin>
              <IxRow>
                <IxCol size="3" sizeSm="6">
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
                <IxCol size="3" sizeSm="4">
                  {incident.deviceName}
                </IxCol>

                <section className={styles.Desktop}>
                  <IxCol>{incident.date}</IxCol>
                  <IxCol className={styles.IncidentActions}>
                    <IxIconButton variant="secondary" ghost icon={iconOpenExternal} />
                    <IxButton outline color="primary" onClick={showDemoMessage}>
                      Update now
                    </IxButton>
                  </IxCol>
                </section>
                <IxCol sizeSm="1" className={styles.Mobile}>
                  <IxIconButton variant="primary" outline icon={iconUpload} />
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
