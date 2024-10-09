/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { showMessage } from "@siemens/ix";
import { iconInfo } from "@siemens/ix-icons/icons";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export default function useShowDemoMessage() {
  const { t } = useTranslation();
  const show = useCallback(() => {
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
  }, [t]);

  return show;
}
