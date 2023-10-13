/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IxCardList, IxContentHeader } from '@siemens/ix-react';
import BuildWithCard from './components/build-with-card';
import ChartCardFramework from './components/chart-card-framework';
import CommitmentCard from './components/commitment-card';
import DocumentationCard from './components/documentation-card';
import IconsCard from './components/icons-card';
import SupportedFrameworks from './components/supported-frameworks';
import styles from './home.module.css';
function HomePage() {
  return (
    <>
      <IxContentHeader
        class={styles.ContentHeader}
        headerTitle="Welcome visitors, today you have 21 insights on iX Design System!"
      ></IxContentHeader>
      <div className={styles.HomePage}>
        <section className={styles.TopLineCards}>
          <ChartCardFramework />
          <BuildWithCard />
          <CommitmentCard />
          <DocumentationCard />
        </section>
        <section>
          <IxCardList label="Made for industrial apps">
            <IconsCard />
          </IxCardList>
        </section>
        <section>
          <SupportedFrameworks />
        </section>
      </div>
    </>
  );
}

export default HomePage;
