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
  IxModalContent,
  IxModalFooter,
  IxModalHeader,
  IxSelect,
  IxSelectItem,
  Modal,
  ModalRef,
  showModal,
} from "@siemens/ix-react";
import { useRef, useEffect } from "react";
import styles from "./styles.module.css";
import FormField from "./form-field";
import { useForm } from "react-hook-form";
import { useDataStore } from "../../../store/device-store";
import { MockData } from "../../../../types";

function AddDeviceModal() {
  const { addDevice } = useDataStore();
  const modalRef = useRef<ModalRef>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const close = () => {
    modalRef.current?.close("close payload!");
  };
  const dismiss = () => {
    modalRef.current?.dismiss("dismiss payload");
  };

  const { register, setValue, handleSubmit } = useForm<MockData>({
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

  const onSubmit = (data: MockData) => {
    addDevice(data);
    close();
  };

  return (
    <Modal ref={modalRef}>
      <IxModalHeader onCloseClick={() => dismiss()}>Add device</IxModalHeader>

      <IxModalContent>
        <form id="modalForm" ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.FormGrid}>
            <FormField id="deviceName" label="Device Name" register={register} />
            <FormField id="vendor" label="Vendor" register={register} />
            <div className={styles.ItemFullWidth}>
              <FormField id="description" label="Description" register={register} />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="status">Status</label>
              <IxSelect
                id="status"
                value="online"
                onValueChange={(e) => setValue("status", e.detail as MockData["status"])}
              >
                <IxSelectItem label="Online" value="online" />
                <IxSelectItem label="Offline" value="offline" />
              </IxSelect>
            </div>
            <FormField id="articleNumber" label="Article Number" register={register} />
            <FormField id="macAddress" label="MAC Address" register={register} />
            <FormField id="ipAddress" label="IP Address" register={register} />
            <FormField id="firmwareVersion" label="Firmware Version" register={register} />
            <FormField id="serialNumber" label="Serial Number" register={register} />
          </div>
        </form>
      </IxModalContent>

      <IxModalFooter>
        <IxButton aria-label="cancel" outline onClick={() => dismiss()}>
          Cancel
        </IxButton>
        <IxButton
          aria-label="create device"
          type="button"
          onClick={() => formRef.current?.requestSubmit()}
        >
          OK
        </IxButton>
      </IxModalFooter>
    </Modal>
  );
}

export default async function show() {
  await showModal({
    size: "600",
    content: <AddDeviceModal />,
  });
}
