/*
 * SPDX-FileCopyrightText: 2023 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  IxCol,
  IxIcon,
  IxLayoutGrid,
  IxRow,
  IxTabItem,
  IxTabs,
} from '@siemens/ix-react';
import PageHeader from '../../components/page-header';

import styles from './styles.module.css';
import { useState } from 'react';
import DataGrid from './data-grid';
import List from './list';

function IconTab(props: { name: string; icon: string }) {
  return (
    <div className={styles.IconTab}>
      <IxIcon name={props.icon}></IxIcon>
      {props.name}
    </div>
  );
}

export default () => {
  const [tab, setTab] = useState<'data-grid' | 'list'>('data-grid');

  return (
    <div className={styles.Example}>
      <PageHeader header="Time series data" />
      <IxTabs>
        <IxTabItem onClick={() => setTab('data-grid')}>
          <IconTab name="Data grid" icon="table" />
        </IxTabItem>
        <IxTabItem onClick={() => setTab('list')}>
          <IconTab name="List" icon="list" />
        </IxTabItem>
      </IxTabs>
      <IxLayoutGrid className={styles.Layout}>
        <IxRow className={styles.Row}>
          <IxCol size="9" className={styles.Col}>
            {tab === 'data-grid' && <DataGrid></DataGrid>}
            {tab === 'list' && <List></List>}
          </IxCol>
          <IxCol size="3" className={styles.Col}>
            Detail
          </IxCol>
        </IxRow>
      </IxLayoutGrid>
    </div>
  );
};
