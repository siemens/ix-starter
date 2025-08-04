/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { themeSwitcher } from "@siemens/ix";
import { ref, onMounted, onUnmounted } from "vue";

export const useEChartsTheme = () => {
  const echartsTheme = ref(themeSwitcher.getCurrentTheme());
  let dispose: (() => void) | null = null;

  onMounted(() => {
    const result = themeSwitcher.themeChanged.on((theme) => {
      echartsTheme.value = theme;
    });
    dispose = result.dispose;
  });

  onUnmounted(() => {
    if (dispose) {
      dispose();
    }
  });

  return echartsTheme;
};
