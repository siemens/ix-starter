/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { themeSwitcher } from '@siemens/ix';
import { IxButton, IxIconButton, IxTypography } from '@siemens/ix-react';
import { mixUp, revertMixUp } from '../../utils/mix-up-theme';
import arrowImage from './../../assets/arrow.svg';
import styles from './theme-roulette.module.css';
function ThemeRoulette() {
  const onSwitchTheme = (theme: string) => {
    revertMixUp();
    themeSwitcher.setTheme(theme);
  };

  const onMixupThemeColors = () => {
    mixUp();
  };

  return (
    <div className={styles.ThemeRoulette}>
      <IxIconButton
        variant="primary"
        oval
        icon="sun-filled"
        onClick={() => onSwitchTheme('theme-classic-light')}
      />
      <IxIconButton
        variant="primary"
        oval
        icon="moon-filled"
        onClick={() => onSwitchTheme('theme-classic-dark')}
      />
      {/* <IxIconButton
        variant="primary"
        oval
        icon="sun"
        onClick={() => onSwitchTheme('theme-brand-light')}
      />
      <IxIconButton
        variant="primary"
        oval
        icon="moon"
        onClick={() => onSwitchTheme('theme-brand-dark')}
      /> */}
      <IxButton icon="refresh" onClick={onMixupThemeColors}>
        Mix up colors
      </IxButton>
      <div className={styles.TryOut}>
        <IxTypography format="display-xs" className={styles.TryOutText} bold>
          Try a random color combination
        </IxTypography>
        <img src={arrowImage} className={styles.TryOutArrow}></img>
      </div>
    </div>
  );
}

export default ThemeRoulette;
