/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Outlet } from 'react-router-dom';
import ThemeRoulette from '../theme-roulette';
import styles from './content.module.css';

function Content() {
  return (
    <main className={styles.Content}>
      <ThemeRoulette />
      <Outlet />
    </main>
  );
}

export default Content;
