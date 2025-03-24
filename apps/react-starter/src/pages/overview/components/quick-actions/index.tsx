/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import useShowDemoMessage from "@/hooks/demoMessage";
import { IxActionCard } from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import { iconAddCircle, iconList, iconPiechart, iconMaintenance } from "@siemens/ix-icons/icons";

function QuickActions() {
  const { t } = useTranslation();
  const showDemoMessage = useShowDemoMessage();

  return (
    <>
      <IxActionCard
        onClick={showDemoMessage}
        variant="filled"
        icon={iconAddCircle}
        heading={t("quick-actions.add-device")}
      ></IxActionCard>
      <IxActionCard
        onClick={showDemoMessage}
        icon={iconList}
        heading={t("quick-actions.add-devices")}
      ></IxActionCard>
      <IxActionCard
        onClick={showDemoMessage}
        icon={iconPiechart}
        heading={t("analytics")}
      ></IxActionCard>
      <IxActionCard
        onClick={showDemoMessage}
        icon={iconMaintenance}
        heading={t("quick-actions.schedule-maintenance")}
      ></IxActionCard>
    </>
  );
}

export default QuickActions;
