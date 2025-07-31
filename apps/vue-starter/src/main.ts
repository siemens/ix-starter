/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./assets/global.css";
import "./index.css";
import "@siemens/ix/dist/siemens-ix/siemens-ix.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { ixPlugin } from "@siemens/ix-vue";
import { setupI18n } from "./i18n";
import App from "./App.vue";
import router from "./router/index";

function setTheme() {
  const body = document.body;
  Array.from(body.classList)
    .filter(cls => cls.startsWith("theme-"))
    .forEach(cls => body.classList.remove(cls));

  if (import.meta.env.VITE_THEME) {
    const css = `${import.meta.env.BASE_URL}theme/dist/css/brand-theme.css`;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = css;
    document.head.appendChild(link);

    const loader = `${import.meta.env.BASE_URL}theme/dist/index.js`;
    const script = document.createElement("script");
    script.src = loader;
    script.type = "module";
    document.head.appendChild(script);
    body.classList.add("theme-brand-dark");
  } else {
    body.classList.add("theme-classic-dark");
  }
}

setTheme();

const i18n = setupI18n();
const pinia = createPinia();

const app = createApp(App);

app.use(i18n);

app.use(pinia);

app.use(router);

app.use(ixPlugin);

app.mount("#app");
