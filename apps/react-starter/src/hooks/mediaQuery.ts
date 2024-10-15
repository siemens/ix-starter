/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    const mediaChanged = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    matchQueryList.addEventListener("change", mediaChanged);

    setMatches(matchQueryList.matches);
    return () => {
      matchQueryList.removeEventListener("change", mediaChanged);
    };
  }, [query]);
  return matches;
}

export const useIsMobileViewPort = () => useMediaQuery("(max-width: 48em)");
