/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IxContentHeader } from '@siemens/ix-react';
import styles from './styles.module.css';

const PageHeader = (props: { header: string }) => {
  return (
    <IxContentHeader
      headerTitle={props.header}
      class={styles.ContentPage}
    ></IxContentHeader>
  );
};

export default PageHeader;
