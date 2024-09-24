/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import svgCommitment from '../../../../assets/commit-history.svg';
import Card from '../../../../components/card';

function CommitmentCard() {
  return (
    <Card icon="code" title="commitment" secondary>
      <img src={svgCommitment}></img>
    </Card>
  );
}

export default CommitmentCard;
