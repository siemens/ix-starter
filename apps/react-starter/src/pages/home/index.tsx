/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IxCardList, IxTypography } from '@siemens/ix-react';
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
      <div>
        <div className={styles.HomePage__Headline}>
          <IxTypography format="display-xxl">
            Siemens Industrial Experience
          </IxTypography>
        </div>
        <div className={styles.HomePage__Headline}>
          <IxTypography format="display-xl" color="weak">
            Made for industrial experiences.
          </IxTypography>
        </div>
        <div className={styles.HomePage__Headline}>
          <IxTypography format="display" color="weak">
            Contribute. Build. Done.
          </IxTypography>
        </div>
      </div>
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
