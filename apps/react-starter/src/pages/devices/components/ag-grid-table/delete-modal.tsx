/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useRef} from "react";
import {
  IxButton,
  IxModalContent,
  IxModalFooter,
  IxModalHeader,
  Modal,
  ModalRef
} from "@siemens/ix-react";

export default function DeleteModal() {
  const modalRef = useRef<ModalRef>(null);

  const close = () => {
    modalRef.current?.close({deleted: true});
  };
  const dismiss = () => {
    modalRef.current?.dismiss({deleted: false});
  };

  return (
    <Modal ref={modalRef}>
      <IxModalHeader onCloseClick={() => dismiss()}>
        Delete Device
      </IxModalHeader>
      <IxModalContent>Do you really want to delete the device?</IxModalContent>
      <IxModalFooter>
        <IxButton variant="secondary" outline onClick={() => dismiss()}>
          No
        </IxButton>
        <IxButton variant="danger" onClick={() => close()}>Yes</IxButton>
      </IxModalFooter>
    </Modal>
  );
}