/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from "./styles.module.css";
import { IxPane, IxTypography, IxButton, IxDivider } from "@siemens/ix-react";
import FirmwareCard from "./firmware-card.tsx";
import { toKebabCase } from "../../../../util/util.ts";
import { MockData } from "../../../../types";
import { useDataStore, useOverviewPaneStore } from "../../../store/device-store.ts";
import { useTranslation } from "react-i18next";

const DeviceDetails = ({ ...props }) => {
  const { editDevice } = useDataStore();

  const { t } = useTranslation();
  const { expanded, selectedData, setExpanded } = useOverviewPaneStore();

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
      {...props}
    >
      <div className={styles.Container}>
        {selectedData ? (
          <div>
            <IxTypography className={styles.PaneTitle} format="h1">
              {selectedData.deviceName}
            </IxTypography>
            <FirmwareCard />
            {Object.keys(selectedData).slice(0, -1).map((key, index) => (
              <div key={index}>
                <IxTypography format="body" textColor="soft">
                  {t(`device-details.${toKebabCase(key)}`)}
                </IxTypography>
                <IxTypography format="body" textColor="std">
                  {selectedData[key as keyof MockData]}
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
        {selectedData?.status !== "Online" && (
          <div className={styles.ButtonGroup}>
            <IxButton
              outline
              onClick={() => {
                const updatedDevice = {
                  ...selectedData!,
                  status: (selectedData!.status = "Online"),
                };
                editDevice(updatedDevice as MockData);
                props.api.onFilterChanged();
              }}
            >
              {t("device-details-footer.activate")}
            </IxButton>
          </div>
        )}
      </div>
    </IxPane>
  );
};

export default DeviceDetails;
