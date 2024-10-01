/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from "./styles.module.css";

import { IxButton, IxMessageBar } from "@siemens/ix-react";

const FirmwareCard = () => {
  return (
    <div>
      <IxMessageBar className={styles.MessageBar} type="warning" dismissible={false}>
        <div className={styles.MessageBarContent}>
          Device firmware is outdated (v1.4 - 3.2)
          <IxButton className={styles.ButtonMargin} outline>
            Update
          </IxButton>
        </div>
      </IxMessageBar>
    </div>
  );
};

export default FirmwareCard;
