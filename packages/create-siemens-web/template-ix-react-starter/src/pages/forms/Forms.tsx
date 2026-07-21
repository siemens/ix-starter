import { useState } from "react";
import {
  IxInput,
  IxSelect,
  IxSelectItem,
  IxDateInput,
  IxRadioGroup,
  IxRadio,
  IxButton,
  IxContentHeader,
  IxTypography,
  showMessage,
} from "@siemens/ix-react";
import styles from "./Forms.module.css";
import { iconQuestion } from "@siemens/ix-icons/icons";

function Forms() {
  const [inspectorName, setInspectorName] = useState("");
  const [inspectionType, setInspectionType] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [inspectionMode, setInspectionMode] = useState("inline");

  const handleSave = async () => {
    await showMessage({
      messageTitle: "Confirm inspection assignment?",
      message: "The inspection will be assigned and a notification will be sent to the inspector.",
      icon: iconQuestion,
      centered: true,
      actions: [
        { id: "cancel", text: "Cancel", type: "cancel" },
        { id: "ok", text: "Confirm", type: "okay" },
      ],
    });
  };

  return (
    <>
      <IxContentHeader headerTitle="Forms" />
      <IxTypography format="body" className={styles.description}>
        Siemens Industrial Experience provides consistent form elements for collecting and
        validating user input.
      </IxTypography>

      <form
        className={styles.formContainer}
        aria-label="Inspection assignment form"
        onSubmit={(e) => e.preventDefault()}
      >
        <IxInput
          label="Inspector Name"
          placeholder="Jane Doe"
          helperText="Enter the certified inspector's full name"
          value={inspectorName}
          onValueChange={(e) => setInspectorName(e.detail)}
        />

        <IxSelect
          label="Inspection Type"
          helperText="Choose the inspection to perform"
          value={inspectionType}
          onValueChange={(e) => setInspectionType(e.detail as string)}
        >
            <IxSelectItem value="Visual Inspection" label="Visual Inspection" />
            <IxSelectItem value="Dimensional Check" label="Dimensional Check" />
            <IxSelectItem value="Functional Test" label="Functional Test" />
            <IxSelectItem value="Safety Audit" label="Safety Audit" />
            <IxSelectItem value="Pressure Test" label="Pressure Test" />
            <IxSelectItem value="Material Analysis" label="Material Analysis" />
            <IxSelectItem value="Electrical Test" label="Electrical Test" />
            <IxSelectItem value="Thermal Imaging" label="Thermal Imaging" />
            <IxSelectItem value="Calibration Check" label="Calibration Check" />
        </IxSelect>

        <IxDateInput
          label="Inspection Date"
          helperText="Schedule the inspection"
          placeholder="DD/MM/YYYY"
          format="dd/MM/yyyy"
          value={inspectionDate}
          onValueChange={(e) => setInspectionDate(e.detail as string)}
        />

        <IxRadioGroup
          label="Inspection Mode"
          helperText="In-line inspection takes place during production. Offline sampling requires batch removal for lab testing."
          value={inspectionMode}
          onValueChange={(e) => setInspectionMode(e.detail as string)}
        >
          <IxRadio value="inline" label="In-line inspection" />
          <IxRadio value="offline" label="Offline sampling" />
        </IxRadioGroup>

        <div className={styles.buttonRow}>
          <IxButton variant="primary" aria-label="Save inspection assignment" onClick={handleSave}>
            {"Save"}
          </IxButton>
        </div>
      </form>
    </>
  );
}

export default Forms;
