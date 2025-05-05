/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  IxButton,
  IxInput,
  IxModalContent,
  IxModalFooter,
  IxModalHeader,
  IxSelect,
  IxSelectItem,
  Modal,
  ModalRef,
} from "@siemens/ix-react";
import { useRef, useEffect } from "react";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { useDataStore } from "../../../../store/device-store.ts";
import { Device } from "../../../../types";
import { useTranslation } from "react-i18next";
import { showSuccessToast } from "../../../../util/util.ts";

export default function AddDeviceModal() {
  const { t } = useTranslation();
  const { addDevice } = useDataStore();
  const modalRef = useRef<ModalRef>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const close = () => {
    modalRef.current?.close("close payload!");
  };
  const dismiss = () => {
    modalRef.current?.dismiss("dismiss payload");
  };

  const { register, setValue, handleSubmit } = useForm<Device>({
    defaultValues: {
      deviceName: "",
      vendor: "",
      description: "",
      status: "Online",
      articleNumber: "",
      macAddress: "",
      ipAddress: "",
      firmwareVersion: "",
      serialNumber: "",
    },
  });

  useEffect(() => {
    register("status");
  }, [register]);

  const onSubmit = (data: Device) => {
    addDevice(data);
    showSuccessToast(t("device-add-modal.success"));
    close();
  };

  return (
    <Modal ref={modalRef}>
      <IxModalHeader onCloseClick={() => dismiss()}>{t("device-add-modal.title")}</IxModalHeader>

      <IxModalContent>
        <form id="modalForm" ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.FormGrid}>
            <IxInput
              id="deviceName"
              aria-label={t("device-details.device-name")}
              label={t("device-details.device-name")}
              {...register("deviceName")}
            />
            <IxInput
              id="vendor"
              label={t("device-details.vendor")}
              aria-label={t("device-details.vendor")}
              {...register("vendor")}
            />
            <div className={styles.ItemFullWidth}>
              <IxInput
                id="description"
                label={t("device-details.description")}
                aria-label={t("device-details.description")}
                {...register("description")}
              />
            </div>
            <div className="d-flex flex-column">
              <IxSelect
                id="status"
                value="Online"
                label={t("device-details.status")}
                aria-label={t("device-details.status")}
                i18nSelectListHeader={t("device-add-modal.list-header")}
                onValueChange={(e) => setValue("status", e.detail as Device["status"])}
              >
                <IxSelectItem label="Online" value="Online" />
                <IxSelectItem label="Offline" value="Offline" />
                <IxSelectItem label="Maintenance" value="Maintenance" />
                <IxSelectItem label="Error" value="Error" />
              </IxSelect>
            </div>
            <IxInput
              id="articleNumber"
              label={t("device-details.article-number")}
              aria-label={t("device-details.article-number")}
              {...register("articleNumber")}
            />
            <IxInput
              id="macAddress"
              label={t("device-details.mac-address")}
              aria-label={t("device-details.mac-address")}
              {...register("macAddress")}
            />
            <IxInput
              id="ipAddress"
              label={t("device-details.ip-address")}
              aria-label={t("device-details.ip-address")}
              {...register("ipAddress")}
            />
            <IxInput
              id="firmwareVersion"
              label={t("device-details.firmware-version")}
              aria-label={t("device-details.firmware-version")}
              {...register("firmwareVersion")}
            />
            <IxInput
              id="serialNumber"
              label={t("device-details.serial-number")}
              aria-label={t("device-details.serial-number")}
              {...register("serialNumber")}
            />
          </div>
        </form>
      </IxModalContent>

      <IxModalFooter className={styles.ModalFooter}>
        <IxButton aria-label={t("device-add-modal.dismiss")} outline onClick={() => dismiss()}>
          {t("device-add-modal.dismiss")}
        </IxButton>
        <IxButton
          aria-label={t("device-add-modal.close")}
          type="button"
          onClick={() => formRef.current?.requestSubmit()}
        >
          {t("device-add-modal.close")}
        </IxButton>
      </IxModalFooter>
    </Modal>
  );
}
