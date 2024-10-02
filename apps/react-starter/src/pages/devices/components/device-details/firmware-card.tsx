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
import {useTranslation} from "react-i18next";

const FirmwareCard = () => {
  const  {t} = useTranslation();

  return (
    <div>
      <IxMessageBar className={styles.MessageBar} type="warning" dismissible={false}>
        <div className={styles.MessageBarContent}>
          {t("device-details-header.firmware-card")}
          <IxButton className={styles.ButtonMargin} outline>
            {t("device-details-header.update")}
          </IxButton>
        </div>
      </IxMessageBar>
    </div>
  );
};

export default FirmwareCard;
