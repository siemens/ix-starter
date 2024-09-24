/*
 * SPDX-FileCopyrightText: 2023 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MockData } from './mock-data';
import styles from './detail.module.css';
import {
  IxCol,
  IxIcon,
  IxKeyValue,
  IxKeyValueList,
  IxLayoutGrid,
  IxRow,
  IxTooltip,
  IxTypography,
} from '@siemens/ix-react';

export function EntryDetail(props: { entry: MockData | null }) {
  if (props.entry === null) {
    return (
      <div className={styles.Please_Select}>
        <IxIcon
          name="mouse-click"
          size="32"
          style={{
            transform: 'scale(1.5)',
          }}
        ></IxIcon>
        <IxTypography format="display">
          Select a data row to see details
        </IxTypography>
      </div>
    );
  }

  return (
    <div className={styles.Detail}>
      <IxKeyValueList>
        <IxKeyValue
          label="Account"
          value={props.entry.account}
          icon="user"
        ></IxKeyValue>
        <IxKeyValue
          label="Country"
          value={props.entry.country}
          icon="location"
        ></IxKeyValue>
        <IxKeyValue
          label="Application"
          value={props.entry.service}
          icon="application-screen"
        ></IxKeyValue>
      </IxKeyValueList>
      <IxLayoutGrid noMargin>
        <IxRow>
          <IxCol size="5">
            <IxKeyValue
              label="App version"
              value={`${props.entry.app_version}`}
            ></IxKeyValue>
          </IxCol>

          <IxCol size="7">
            <IxKeyValue
              id="session_id"
              label="Session ID"
              value={props.entry.id.substring(0, 10) + '...'}
            ></IxKeyValue>
            <IxTooltip for="#session_id">{props.entry.id}</IxTooltip>
          </IxCol>
        </IxRow>

        <IxRow>
          <IxCol size="5">
            <IxKeyValue label="IP V4" value={props.entry.ip_v4}></IxKeyValue>
          </IxCol>

          <IxCol size="7">
            <IxKeyValue
              id="ip_v6"
              label="IP V6"
              value={props.entry.IP_v6.substring(0, 25) + '...'}
            ></IxKeyValue>
            <IxTooltip for="#ip_v6">{props.entry.IP_v6}</IxTooltip>
          </IxCol>
        </IxRow>

        <IxRow>
          <IxCol>
            <IxKeyValue
              label="Last login"
              value={props.entry.login_time}
            ></IxKeyValue>
          </IxCol>

          <IxCol>
            <IxKeyValue
              label="Last logout"
              value={props.entry.logout_time}
            ></IxKeyValue>
          </IxCol>

          <IxCol>
            <IxKeyValue
              label="Online time"
              value={props.entry.online_minutes}
            ></IxKeyValue>
          </IxCol>
        </IxRow>
      </IxLayoutGrid>
    </div>
  );
}
