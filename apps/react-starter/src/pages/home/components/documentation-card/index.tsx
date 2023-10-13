/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IxTypography } from '@siemens/ix-react';
import svgQRCode from '../../../../assets/qrcode.svg';
import Card from '../../../../components/card';
import styles from './styles.module.css';

function DocumentationCard() {
  return (
    <Card
      icon="open-external"
      title="Open documentation"
      primary
      onClick={() => window.open('https://ix.siemens.io', '_blank')}
      classNames={styles.DocumentationCard}
    >
      <div className={styles.Content}>
        <img src={svgQRCode} className={styles.QRCode}></img>
        <IxTypography>ix.siemens.io/docs/getting-started</IxTypography>
      </div>
    </Card>
  );
}

export default DocumentationCard;
