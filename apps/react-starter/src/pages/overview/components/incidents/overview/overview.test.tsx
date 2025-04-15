/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "@vitest/browser/context";
import { screen } from "shadow-dom-testing-library";
import IncidentsOverview from "./index";

test(`add filter input`, async () => {
  const { getByTestId } = render(<IncidentsOverview></IncidentsOverview>);
  const filter = screen.getByLabelText("Filter devices");
  await expect.element(filter).toBeInTheDocument();
  await expect.element(filter).toHaveClass(/hydrated/);

  const input = filter.shadowRoot!.querySelector("input")!;
  await userEvent.fill(input, "robo1-net-sw17");

  const items = getByTestId("incident-item").all();
  expect(items).toHaveLength(1);
});
