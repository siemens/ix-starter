/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useLayoutEffect, useState } from "react";

const getCurrentTheme = (): string => {
  const theme = document.documentElement.getAttribute('data-ix-theme') || 'classic';
  const colorSchema = document.documentElement.getAttribute('data-ix-color-schema') || 'dark';
  return `${theme}-${colorSchema}`;
};

export const useEChartsTheme = () => {
  const [theme, setTheme] = useState(getCurrentTheme());

  useLayoutEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getCurrentTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-ix-theme', 'data-ix-color-schema']
    });

    return () => observer.disconnect();
  }, []);

  return theme;
};
