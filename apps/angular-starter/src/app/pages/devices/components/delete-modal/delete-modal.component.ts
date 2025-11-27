/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, inject, Inject } from '@angular/core';
import {
  IxButton,
  IxModalContent,
  IxModalFooter,
  IxModalHeader,
  IxActiveModal,
} from '@siemens/ix-angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from '@siemens/ix-icons';
import { iconTrashcan } from '@siemens/ix-icons/icons';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [
    IxModalHeader,
    IxModalContent,
    IxModalFooter,
    IxButton,
    TranslateModule,
  ],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {
  @Inject(IxActiveModal) readonly activeModal = inject(IxActiveModal);

  constructor() {
    addIcons({
      iconTrashcan,
    });
  }

  close() {
    this.activeModal.close({ deleted: true });
  }

  dismiss() {
    this.activeModal.dismiss({ deleted: false });
  }
}
