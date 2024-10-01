/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxActionCard } from "@siemens/ix-react";

function QuickActions() {
  function handleAddDeviceClick() {}

  return (
    <>
      <IxActionCard
        variant="filled"
        icon="add-circle"
        heading="Add device"
        onClick={handleAddDeviceClick}
      ></IxActionCard>
      <IxActionCard icon="list" heading="Add devices"></IxActionCard>
      <IxActionCard icon="piechart" heading="Analytics"></IxActionCard>
      <IxActionCard icon="maintenance" heading="Schedule maintenance"></IxActionCard>
    </>
  );
}

export default QuickActions;
