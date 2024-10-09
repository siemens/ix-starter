/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import useShowDemoMessage from "@/hooks/demoMessage";
import { useIsMobileViewPort } from "@/hooks/mediaQuery";
import { iconOpenExternal, iconUpload } from "@siemens/ix-icons/icons";
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
import { useTranslation } from "react-i18next";
import { type Incident } from "../incident";
import styles from "./styles.module.css";

function DesktopItem({ incident }: { incident: Incident }) {
  const { t } = useTranslation();
  const showDemoMessage = useShowDemoMessage();

  return (
    <IxLayoutGrid noMargin>
      <IxRow>
        <IxCol size="3">
          <IxRow style={{ gap: "1rem" }} className={styles.NoWrap}>
            <IxIcon name={incident.icon} size="24" />
            <IxTypography bold>{incident.incidentName}</IxTypography>
          </IxRow>
          <IxRow>
            <IxTypography className={styles.InfoText} textColor="soft">
              {incident.infoText}
            </IxTypography>
          </IxRow>
        </IxCol>
        <IxCol size="3">
          <IxTypography bold>{incident.deviceName}</IxTypography>
          <IxTypography textColor="soft">{incident.ipAddress}</IxTypography>
        </IxCol>
        <IxCol>
          <IxTypography textColor="soft">{incident.date}</IxTypography>
          <IxTypography textColor="soft">{incident.time}</IxTypography>
        </IxCol>
        <IxCol className={styles.IncidentActions}>
          <IxIconButton variant="secondary" ghost icon={iconOpenExternal} />
          <IxButton outline color="primary" onClick={showDemoMessage}>
            {t("incidents.create-task")}
          </IxButton>
        </IxCol>
      </IxRow>
    </IxLayoutGrid>
  );
}

function MobileItem({ incident }: { incident: Incident }) {
  const showDemoMessage = useShowDemoMessage();
  return (
    <IxLayoutGrid noMargin>
      <IxRow>
        <IxCol size="6">
          <IxRow style={{ gap: "1rem" }} className={styles.NoWrap}>
            <IxIcon name={incident.icon} size="24" />
            <IxTypography bold>{incident.incidentName}</IxTypography>
          </IxRow>
          <IxRow>
            <IxTypography className={styles.InfoText} textColor="soft">
              {incident.infoText}
            </IxTypography>
          </IxRow>
        </IxCol>
        <IxCol size="4">
          <IxTypography bold>{incident.deviceName}</IxTypography>
          <IxTypography textColor="soft">{incident.ipAddress}</IxTypography>
        </IxCol>
        <IxCol size="2">
          <IxIconButton
            variant="primary"
            outline
            icon={iconUpload}
            onClick={showDemoMessage}
          ></IxIconButton>
        </IxCol>
      </IxRow>
    </IxLayoutGrid>
  );
}

function IncidentList(props: { incidents: Incident[]; search: string }) {
  const isMobile = useIsMobileViewPort();
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
    <section className={styles.IncidentList}>
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
      <IxEventList itemHeight={72} animated={false} className={styles.EventList}>
        {props.incidents.filter(searchFilter).map((incident) => (
          <IxEventListItem
            key={incident.id}
            itemColor={`color-${incident.color}`}
            data-testid={`incident-item`}
          >
            {isMobile ? (
              <MobileItem incident={incident}></MobileItem>
            ) : (
              <DesktopItem incident={incident}></DesktopItem>
            )}
          </IxEventListItem>
        ))}
      </IxEventList>
    </section>
  );
}

export default IncidentList;
