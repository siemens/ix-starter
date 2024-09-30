/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import style from "./styles.module.css";

import { IxBlind } from "@siemens/ix-react";
import DeviceStatus from "../device-status";
import StatusHistory from "../status-history";

function Overview() {
  return (
    <IxBlind label="Overview">
      <div className={style.CardContainer}>
        <DeviceStatus></DeviceStatus>
        <StatusHistory></StatusHistory>
      </div>
    </IxBlind>
  );
}

export default Overview;
