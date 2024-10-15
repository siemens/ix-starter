/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { act } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import IncidentsOverview from "./index";

test(`add filter input`, async () => {
  const screen = render(<IncidentsOverview></IncidentsOverview>);
  const input = screen.getByLabelText("Filter devices") as HTMLInputElement;

  expect(input).toBeInTheDocument();
  await act(() => fireEvent.change(input, { target: { value: "robo1-net-sw17" } }));

  const items = screen.queryAllByTestId("incident-item");
  await waitFor(() => expect(items).toHaveLength(1));
});
