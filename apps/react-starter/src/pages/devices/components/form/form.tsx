import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from './styles.module.css';
import FormField from "./form-field.tsx";
import {IxSelect, IxSelectItem} from "@siemens/ix-react";

const ModalForm = ({addDevice}) => {
  const { register, setValue } = useForm<MockData>({
    defaultValues: {
      deviceName: '',
      vendor: '',
      description: '',
      status: 'Online',
      articleNumber: '',
      macAddress: '',
      ipAddress: '',
      firmwareVersion: '',
      serialNumber: '',
    },
  });

  useEffect(() => {
    register("status");
  }, [register]);


  return (
    <form id="modalForm" onSubmit={() => alert('Form submitted!')} noValidate>
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
            <IxSelectItem label="Online" value="Online" />
            <IxSelectItem label="Offline" value="Offline" />
            <IxSelectItem label="Offline" value="Error" />
            <IxSelectItem label="Offline" value="Maintenance" />
          </IxSelect>
        </div>
        <FormField id="articleNumber" label="Article Number" register={register} />
        <FormField id="macAddress" label="MAC Address" register={register} />
        <FormField id="ipAddress" label="IP Address" register={register} />
        <FormField id="firmwareVersion" label="Firmware Version" register={register} />
        <FormField id="serialNumber" label="Serial Number" register={register} />
      </div>
    </form>
  );
};

export default ModalForm;