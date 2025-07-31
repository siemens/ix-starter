/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { showMessage } from "@siemens/ix";
import { iconInfo } from "@siemens/ix-icons/icons";
import { useI18n } from "vue-i18n";

export function useShowDemoMessage() {
  const { t } = useI18n();
  
  const show = () => {
    showMessage({
      message: t("demo-message"),
      icon: iconInfo,
      actions: [
        {
          id: "cancel",
          text: t("cancel"),
          type: "cancel",
        },
        {
          id: "okay",
          text: t("okay"),
          type: "okay",
        },
      ],
      messageTitle: "Demo app",
    });
  };

  return show;
}
