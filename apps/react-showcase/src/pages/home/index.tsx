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
import ReleasesCard from './components/release-card';
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
          <IxTypography format="h1">Siemens Industrial Experience</IxTypography>
        </div>
        <div className={styles.HomePage__Headline}>
          <IxTypography format="display" color="weak">
            Made for industrial experiences.
          </IxTypography>
        </div>
        <div className={styles.HomePage__Headline}>
          <IxTypography format="body-lg" color="weak">
            Contribute. Build. Done.
          </IxTypography>
        </div>
      </div>
      <div className={styles.HomePage}>
        <section className={styles.TopLineCards}>
          <ReleasesCard />
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
