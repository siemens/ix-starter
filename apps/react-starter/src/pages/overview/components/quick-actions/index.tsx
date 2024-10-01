/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxActionCard } from "@siemens/ix-react";
import { useTranslation } from "react-i18next";

function QuickActions() {
  const { t } = useTranslation();

  return (
    <>
      <IxActionCard
        variant="filled"
        icon="add-circle"
        heading={t("quick-actions.add-device")}
      ></IxActionCard>
      <IxActionCard icon="list" heading={t("quick-actions.add-devices")}></IxActionCard>
      <IxActionCard icon="piechart" heading={t("analytics")}></IxActionCard>
      <IxActionCard
        icon="maintenance"
        heading={t("quick-actions.schedule-maintenance")}
      ></IxActionCard>
    </>
  );
}

export default QuickActions;
