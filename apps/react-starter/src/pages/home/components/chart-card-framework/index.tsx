/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ChartCard from '../../../../components/chart-card';
import styles from './chart-card-framework.module.css';

function ChartCardFramework() {
  return (
    <ChartCard
      counter={123}
      icon="capacity"
      title="Number of components"
      data={[10, 50, 70, 90, 100]}
    >
      <ul className={styles.ChartCardFramework}>
        <li>Web Components</li>
        <li>React</li>
        <li>Angular</li>
        <li>Vue</li>
        <li>Blazor</li>
      </ul>
    </ChartCard>
  );
}

export default ChartCardFramework;
