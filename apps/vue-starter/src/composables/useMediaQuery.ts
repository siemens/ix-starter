/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ref, onMounted, onUnmounted } from "vue";

export function useMediaQuery(query: string) {
  const matches = ref(false);
  let mediaQueryList: MediaQueryList;

  const updateMatches = (event: MediaQueryListEvent) => {
    matches.value = event.matches;
  };

  onMounted(() => {
    mediaQueryList = window.matchMedia(query);
    matches.value = mediaQueryList.matches;
    mediaQueryList.addEventListener("change", updateMatches);
  });

  onUnmounted(() => {
    if (mediaQueryList) {
      mediaQueryList.removeEventListener("change", updateMatches);
    }
  });

  return matches;
}

export const useIsMobileViewPort = () => useMediaQuery("(max-width: 48em)");
