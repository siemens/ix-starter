import {
  IxDivider,
  IxDropdown, IxDropdownItem,
  IxDropdownQuickActions,
  IxIconButton,
  IxRow
} from "@siemens/ix-react";
import { ICellRendererParams } from "ag-grid-community";
import { useDataStore } from "../../../store/device-store.ts";
import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  iconCopy,
  iconCut,
  iconDuplicate,
  iconEyeCancelled,
  iconPaste,
  iconRename,
  iconTrashcan
} from "@siemens/ix-icons/icons";

type CustomQuickActionsCompProps = ICellRendererParams & {
  gridRef: RefObject<AgGridReact>;
};

const CustomQuickActionsComp = (props: CustomQuickActionsCompProps) => {
  const { deleteDevice, addDevice, editDevice, pasteDevice } = useDataStore();

  const startEditingFirstCell = () => {
    props.api.startEditingCell({
      rowIndex: props.node.rowIndex!,
      colKey: "deviceName"
    })
  };

  const handleCopy = () => {
    const cellValue = JSON.stringify(props.data);
    navigator.clipboard.writeText(cellValue).then(() => {
      console.log('Copied to clipboard:', cellValue);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  const handleCut = () => {
    handleCopy();
    deleteDevice(props.data);
  }

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      try {
        const data = JSON.parse(text);
        pasteDevice(data, props.data.id);
        console.log('Pasted from clipboard:', data);
      } catch (err) {
        console.error('Failed to parse clipboard data:', err);
      }
    }).catch(err => {
      console.error('Failed to read from clipboard:', err);
    });
  };

  return (
    <IxRow className="d-flex justify-content-end h-100 align-items-center">
      <IxIconButton icon="pen" color="color-primary" ghost onClick={startEditingFirstCell} />
      <IxIconButton
        icon="trashcan"
        color="color-primary"
        ghost
        onClick={() => {
          deleteDevice(props.data);
        }}
      />
      <IxIconButton
        icon="context-menu"
        color="color-primary"
        ghost
        id={`device_${props.node.rowIndex}`}
      ></IxIconButton>
      <IxDropdown trigger={`device_${props.node.rowIndex}`}>
        <IxDropdownQuickActions>
          <IxIconButton icon={iconDuplicate} ghost onClick={() => addDevice(props.data)}></IxIconButton>
          <IxIconButton icon={iconCut} ghost onClick={handleCut}></IxIconButton>
          <IxIconButton icon={iconCopy} ghost onClick={handleCopy}></IxIconButton>
          <IxIconButton icon={iconPaste} ghost onClick={handlePaste}></IxIconButton>
        </IxDropdownQuickActions>
        <IxDivider></IxDivider>
        <IxDropdownItem icon={iconRename} label="Rename" onClick={startEditingFirstCell}></IxDropdownItem>
        <IxDropdownItem
          icon={iconEyeCancelled}
          label="Hide"
          onClick={() => {
            const updatedDevice = { ...props.data, hidden: !props.data.hidden };
            editDevice(updatedDevice);
            props.api.onFilterChanged();
            console.log('Toggled hidden state for:', updatedDevice);
          }}
        />
        <IxDivider />
        <IxDropdownItem
          icon={iconTrashcan}
          label="Delete"
          onClick={() => {
            deleteDevice(props.data);
          }}>
        </IxDropdownItem>
      </IxDropdown>
    </IxRow>
  );
};

export default CustomQuickActionsComp;