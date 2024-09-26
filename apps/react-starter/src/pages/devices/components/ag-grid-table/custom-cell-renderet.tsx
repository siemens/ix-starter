import {
  IxDivider,
  IxDropdown, IxDropdownItem,
  IxDropdownQuickActions,
  IxIconButton,
  IxRow
} from "@siemens/ix-react";

const CustomQuickActionsComp = props => {
  return (
    <IxRow className="d-flex justify-content-end">
      <IxIconButton icon="pen" color="color-primary" ghost/>
      <IxIconButton icon="trashcan" color="color-primary" ghost/>
      <IxIconButton
        icon="context-menu"
        color="color-primary"
        ghost
        id={`device_${props.node.rowIndex}`}
      ></IxIconButton>
      <IxDropdown trigger={`device_${props.node.rowIndex}`}>
        <IxDropdownQuickActions>
          <IxIconButton icon="cut" ghost></IxIconButton>
          <IxIconButton icon="bulb" ghost></IxIconButton>
          <IxIconButton icon="trashcan" ghost></IxIconButton>
        </IxDropdownQuickActions>

        <IxDivider></IxDivider>

        <IxDropdownItem icon="star" label="Item 1"></IxDropdownItem>
        <IxDropdownItem icon="document" label="Item 2"></IxDropdownItem>
        <IxDropdownItem icon="bulb" label="Item 3"></IxDropdownItem>
      </IxDropdown>
    </IxRow>
  )
};

export default CustomQuickActionsComp