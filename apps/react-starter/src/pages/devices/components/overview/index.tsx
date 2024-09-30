import styles from "./styles.module.css";
import {
  IxPane,
  IxTypography,
  IxButton,
  IxDivider
} from "@siemens/ix-react";
import FirmwareCard from "./firmware-card.tsx";
import camelCaseToNormal from "../../../../util/util.ts";
import {MockData} from "../../../../types";
import {useOverviewPaneStore} from "../../../store/device-store.ts";

type OverviewProps = {
}

const Overview = ({
  ...props
}: OverviewProps) => {
  const {expanded, selectedData, setExpanded} = useOverviewPaneStore();
  type MockDataKeys = keyof MockData;

  return (
    <IxPane
      heading="Quick actions"
      composition="right"
      size="320px"
      variant="floating"
      hideOnCollapse
      expanded={expanded}
      onExpandedChanged={(event) => {
        setExpanded(event.detail.expanded);
      }}
      className={styles.Pane}
      {...props}
    >
      <div className={styles.Container}>
        {selectedData ? (
          <div>
            <IxTypography className={styles.PaneTitle} format="h1">
              {selectedData.deviceName}
            </IxTypography>
            <FirmwareCard />
            {(Object.keys(selectedData) as MockDataKeys[]).map((key, index) => (
              index !== 0 && <div key={index}>
                <IxTypography format="body" textColor="soft">{camelCaseToNormal(key)}</IxTypography>
                <IxTypography format="body" textColor="std">
                  {selectedData[key]}
                </IxTypography>
                <IxDivider className={styles.Divider} />
              </div>
            ))}
          </div>
        ) : (
          <IxTypography className={styles.PaneTitle} format="h1">
            No device selected
          </IxTypography>
        )}
        <div className={styles.ButtonGroup}>
          <IxButton outline>Activate device</IxButton>
          <IxButton icon="open-external">
            See all details
          </IxButton>
        </div>
      </div>
    </IxPane>
  );
};

export default Overview;