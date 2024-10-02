/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { showModal } from "@siemens/ix-react";

import AddDeviceModal from "./add-device-modal";

export default async function show() {
  await showModal({
    size: "600",
    content: <AddDeviceModal />,
  });
}
