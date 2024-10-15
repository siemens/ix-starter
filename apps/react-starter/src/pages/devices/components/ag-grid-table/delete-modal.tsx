/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRef } from "react";
import {
  IxButton,
  IxModalContent,
  IxModalFooter,
  IxModalHeader,
  Modal,
  ModalRef,
} from "@siemens/ix-react";
import { iconTrashcan } from "@siemens/ix-icons/icons";
import { useTranslation } from "react-i18next";

export default function DeleteModal() {
  const { t } = useTranslation();
  const modalRef = useRef<ModalRef>(null);

  const close = () => {
    modalRef.current?.close({ deleted: true });
  };
  const dismiss = () => {
    modalRef.current?.dismiss({ deleted: false });
  };

  return (
    <Modal ref={modalRef}>
      <IxModalHeader onCloseClick={() => dismiss()} icon={iconTrashcan} iconColor="color-alarm">
        {t("device-delete-modal.title")}
      </IxModalHeader>
      <IxModalContent> {t("device-delete-modal.content")}</IxModalContent>
      <IxModalFooter>
        <IxButton variant="secondary" outline onClick={() => dismiss()}>
          {t("device-delete-modal.dismiss")}
        </IxButton>
        <IxButton variant="danger" onClick={() => close()}>
          {t("device-delete-modal.close")}
        </IxButton>
      </IxModalFooter>
    </Modal>
  );
}
