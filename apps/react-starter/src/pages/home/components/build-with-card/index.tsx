/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ChartCard from '../../../../components/chart-card';

function BuildWithCard() {
  return (
    <ChartCard
      counter={32}
      icon="apps"
      title="Apps built with iX"
      data={[1, 5, 20, 70, 95]}
    ></ChartCard>
  );
}

export default BuildWithCard;
