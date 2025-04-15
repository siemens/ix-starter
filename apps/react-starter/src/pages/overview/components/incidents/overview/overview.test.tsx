/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { beforeAll, expect, test } from "vitest";
import IncidentsOverview from "./index";
import { forceElementInternalsPolyfill } from "element-internals-polyfill";

beforeAll(() => {
  forceElementInternalsPolyfill();
});

test(`add filter input`, async () => {
  const screen = render(<IncidentsOverview></IncidentsOverview>);
  const input = screen.getByPlaceholderText("Search") as HTMLInputElement;

  expect(input).toBeInTheDocument();
  await act(() => fireEvent.change(input, { target: { value: "robo1-net-sw17" } }));
  const items = screen.queryAllByTestId("incident-item");
  await waitFor(() => expect(items).toHaveLength(1));
});
