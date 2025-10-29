/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { themeSwitcher } from "@siemens/ix";
import { useLayoutEffect, useState } from "react";

export const useEChartsTheme = () => {
  const [echartsTheme, setEchartsTheme] = useState(themeSwitcher.getCurrentTheme());

  useLayoutEffect(() => {
    const { dispose } = themeSwitcher.themeChanged.on((theme) => setEchartsTheme(theme));
    return dispose;
  }, []);

  return echartsTheme;
};
