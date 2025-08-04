/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createI18n } from "vue-i18n";
import en from "./locales/en/translation.json";
import de from "./locales/de/translation.json";

const messages = {
  en,
  de,
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
  globalInjection: true,
});

export { i18n };

export function setupI18n() {
  return i18n;
}
