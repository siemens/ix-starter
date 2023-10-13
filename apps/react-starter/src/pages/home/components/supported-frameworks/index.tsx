/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IxCard, IxCardList, IxTypography } from '@siemens/ix-react';
import angularSvgUrl from './img/angular.svg';
import blazorSvgUrl from './img/blazor.svg';
import jsSvgUrl from './img/js.svg';
import reactSvgUrl from './img/react.svg';
import vueSvgUrl from './img/vue.svg';
import styles from './styles.module.css';

function SupportedFrameworks() {
  return (
    <IxCardList
      label="My activities"
      listStyle={'scroll'}
      onShowAllClick={() =>
        window.open('https://ix.siemens.io/docs/installation/', '_blank')
      }
    >
      {frameworks.map((framework, index) => (
        <IxCard className={styles.Framework__Card} key={index}>
          <div className={styles.Framework__Card__Content}>
            <img
              className={styles.Framework__Image}
              src={framework.image}
            ></img>
            <IxTypography>{framework.name}</IxTypography>
            <IxTypography color="weak">{framework.state}</IxTypography>
          </div>
        </IxCard>
      ))}
    </IxCardList>
  );
}

export default SupportedFrameworks;

const frameworks = [
  {
    name: 'Web Components',
    state: 'Stable',
    image: jsSvgUrl,
  },
  {
    name: 'Angular',
    state: 'Stable',
    image: angularSvgUrl,
  },
  {
    name: 'React',
    state: 'Stable',
    image: reactSvgUrl,
  },
  {
    name: 'Vue.js',
    state: 'Experimental',
    image: vueSvgUrl,
  },
  {
    name: 'Blazor',
    state: 'Experimental',
    image: blazorSvgUrl,
  },
];
