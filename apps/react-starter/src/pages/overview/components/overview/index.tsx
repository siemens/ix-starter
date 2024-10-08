/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import style from "./styles.module.css";

import DeviceRange from "../device-range";
import StatusHistory from "../status-history";

function Overview() {
  return (
    <div className={style.CardContainer}>
      <DeviceRange></DeviceRange>
      <StatusHistory></StatusHistory>
    </div>
  );
}

export default Overview;
