/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from "./styles.module.css";

import {
  IxPane,
  IxTypography,
  IxButton,
  IxDivider
} from "@siemens/ix-react";
import FirmwareCard from "./firmware-card.tsx";
import camelCaseToNormal from "../../../../util/util.ts";
import {OverviewProps} from "../../../../types";

const Overview = ({
  expanded,
  setExpanded,
  data,
  ...props
}: OverviewProps) => {
  return (
    <IxPane
      heading="Quick actions"
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
        <div>
          <IxTypography className={styles.PaneTitle} format="h1">
            {data.deviceName}
          </IxTypography>
          <FirmwareCard/>
          {Object.keys(data).map((key, index) => (
            index !== 0 && <div key={index}>
              <IxTypography format="body" textColor="soft">{camelCaseToNormal(key)}</IxTypography>
              <IxTypography format="body" textColor="std">
                {data[key]}
              </IxTypography>
              <IxDivider className={styles.Divider}/>
            </div>
          ))}
        </div>
        <div className={styles.ButtonGroup}>
          <IxButton outline>Activate device</IxButton>
          <IxButton icon="open-external">
            See all details
          </IxButton>
        </div>
      </div>
    </IxPane>
  );
};

export default Overview;