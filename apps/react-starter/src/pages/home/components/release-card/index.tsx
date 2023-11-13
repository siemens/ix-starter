/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ChartCard from '../../../../components/chart-card';
import styles from './styles.module.css';

function ChartCardFramework() {
  return (
    <ChartCard
      counter={4}
      icon="capacity"
      title="Releases during last month"
      data={[10, 50, 70, 90, 100]}
    >
      <ul className={styles.ChartCardFramework}></ul>
    </ChartCard>
  );
}

export default ChartCardFramework;
