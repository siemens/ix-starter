/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 * SPDX-License-Identifier: MIT
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 */

import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/vue";
import IncidentHistory from "@/components/Overview/IncidentHistory.vue";
import "@testing-library/jest-dom";
import { i18n } from "@/i18n";

test("add filter input", async () => {
  const { getByLabelText, findAllByTestId } = render(IncidentHistory, {
    global: {
      plugins: [i18n],
    },
  });
  const filter = getByLabelText("Filter devices") as HTMLInputElement;
  expect(filter).toBeInTheDocument();
  filter.value = "robo1-net-sw17";
  await fireEvent(filter, new CustomEvent("valueChange", { detail: "robo1-net-sw17" }));
  const items = await findAllByTestId("incident-item");
  expect(items).toHaveLength(1);
});
