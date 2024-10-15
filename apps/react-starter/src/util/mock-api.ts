/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Device } from "../types";

export const fetchDataSheet = async (): Promise<Device[]> => {
  const res = await fetch(`${import.meta.env.BASE_URL}data.json`);
  const text = await res.text();

  if (res.status !== 200) {
    throw Error("Could not load data");
  }

  return JSON.parse(text);
};
