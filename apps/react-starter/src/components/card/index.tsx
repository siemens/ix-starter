/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  IxCard,
  IxCardContent,
  IxCardTitle,
  IxIcon,
  IxTypography,
} from '@siemens/ix-react';
import clsx from 'clsx';
import styles from './card.module.css';

function Card(
  props: React.PropsWithChildren<{
    icon: string;
    title: string;
    primary?: boolean;
    secondary?: boolean;
    classNames?: string;
    onClick?: () => void;
  }>
) {
  return (
    <IxCard
      className={clsx(
        styles.Card,
        {
          [styles.Secondary]: props.secondary,
          [styles.Primary]: props.primary,
        },
        props?.classNames
      )}
      onClick={props?.onClick}
    >
      <IxCardContent style={{ height: 'calc(100% + 2rem)' }}>
        <IxCardTitle>
          <div className={styles.CardTitle}>
            <IxIcon name={props.icon} size="32"></IxIcon>
            <IxTypography format="h3">{props.title}</IxTypography>
          </div>
        </IxCardTitle>
        {props.children}
      </IxCardContent>
    </IxCard>
  );
}

export default Card;
