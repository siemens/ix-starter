/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createRouter, createWebHashHistory } from "vue-router";
import OverviewView from "../views/OverviewView.vue";
import DevicesView from "../views/DevicesView.vue";

const routes = [
  {
    path: "/",
    name: "Overview",
    component: OverviewView,
  },
  {
    path: "/devices",
    name: "DevicesGrid",
    component: DevicesView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
