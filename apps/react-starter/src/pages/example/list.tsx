/*
 * SPDX-FileCopyrightText: 2023 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  IxEventList,
  IxEventListItem,
  IxPill,
  IxSpinner,
  IxTypography,
} from '@siemens/ix-react';
import { useCallback, useLayoutEffect, useState } from 'react';
import { fetchDataSheet } from '../../utils/mock-api';
import styles from './list.module.css';
import { MockData } from './mock-data';

export default function List(props: {
  search: string;
  selected: MockData | null;
  onSelectionChange: (entry: MockData) => void;
}) {
  const [data, setData] = useState<MockData[]>([]);

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await fetchDataSheet();
    setData(result.data);
  };

  /**
   * Just an basic "full"-search
   */
  const searchArray = useCallback(() => {
    if (props.search === '') {
      return data;
    }

    const query = props.search.toLowerCase();

    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(query)
      )
    );
  }, [props.search, data]);

  if (!data.length) {
    return <IxSpinner size="large" class={styles.Loading}></IxSpinner>;
  }

  return (
    <div className={styles.List}>
      <IxEventList itemHeight={120} animated={false}>
        {searchArray().map((item) => (
          <IxEventListItem
            key={item.id}
            color="color-success"
            selected={props.selected?.id === item.id}
            onClick={() => props.onSelectionChange(item)}
          >
            <div className={styles.List_Item}>
              <IxPill variant="success">Online</IxPill>
              <IxTypography format="h3">{item.account}</IxTypography>
              <IxTypography>
                {item.service}, {item.app_version}
              </IxTypography>
              <IxTypography>Country: {item.country}</IxTypography>
              <IxTypography color="weak">Id: {item.id}</IxTypography>
            </div>
          </IxEventListItem>
        ))}
      </IxEventList>
    </div>
  );
}
