/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useSelectedDevice } from "@/store/hooks/device.ts";
import { Device } from "@/types/index.tsx";
import { toKebabCase } from "@/util/util.ts";
import { IxButton, IxDivider, IxPane, IxTypography } from "@siemens/ix-react";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";
import { useDataStore, useOverviewPaneStore } from "@/store/device-store";

const hideProperties = (key: string) => key !== "id";

const DeviceDetails = () => {
  const { editDevice } = useDataStore();
  const selectedDevice = useSelectedDevice();
  const [performMaintenance, setPerformMaintenance] = useState(false);
  const { t } = useTranslation();
  const { expanded, setExpanded } = useOverviewPaneStore();

  const isInMaintenance = selectedDevice?.status === "Maintenance";

  useLayoutEffect(() => {
    const closeByEscape = (event: KeyboardEvent) => {
      if (expanded === false) {
        return;
      }

      if (event.key === "Escape") {
        setExpanded(false);
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [expanded, setExpanded]);

  return (
    <IxPane
      heading={t("device-details-header.title")}
      composition="right"
      size="320px"
      variant="floating"
      hideOnCollapse
      expanded={expanded}
      onExpandedChanged={(event) => {
        setExpanded(event.detail.expanded);
      }}
      className={styles.Pane}
    >
      <div className={styles.Container}>
        {selectedDevice ? (
          <div>
            <IxTypography format="h1" className={styles.DeviceName}>
              {selectedDevice.deviceName}
            </IxTypography>
            {Object.keys(selectedDevice)
              .filter(hideProperties)
              .map((key, index) => (
                <div key={index}>
                  <IxTypography format="body" textColor="soft">
                    {t(`device-details.${toKebabCase(key)}`)}
                  </IxTypography>
                  <IxTypography format="body" textColor="std">
                    {selectedDevice[key as keyof Device]}
                  </IxTypography>
                  <IxDivider className={styles.Divider} />
                </div>
              ))}
          </div>
        ) : (
          <IxTypography className={styles.PaneTitle} format="h1">
            No device selected
          </IxTypography>
        )}

        <IxButton
          loading={performMaintenance}
          outline
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();

            setPerformMaintenance(true);
            setTimeout(() => {
              const updatedDevice = {
                ...selectedDevice!,
                status: isInMaintenance ? "Online" : "Maintenance",
              };
              editDevice(updatedDevice as Device);
              setPerformMaintenance(false);
            }, 2000);
          }}
        >
          {!isInMaintenance && t("device-details-footer.set-maintenance")}
          {isInMaintenance && t("device-details-footer.end-maintenance")}
        </IxButton>
      </div>
    </IxPane>
  );
};

export default DeviceDetails;
