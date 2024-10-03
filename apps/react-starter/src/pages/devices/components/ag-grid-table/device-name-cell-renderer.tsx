import styles from "./styles.module.css";
import { ICellRendererParams } from "ag-grid-community";

const DeviceNameCellRenderer = (props: ICellRendererParams) => {
  const { value, data } = props;
  let indicatorColorClass;

  switch (data.status) {
    case "Online": {
      indicatorColorClass = styles.online;
      break;
    }
    case "Offline": {
      indicatorColorClass = styles.offline;
      break;
    }
    case "Maintenance": {
      indicatorColorClass = styles.maintenance;
      break;
    }
    default: {
      indicatorColorClass = styles.error;
      break;
    }
  }

  return (
    <div className={styles.DeviceCell}>
      <div className={`${styles.Indicator} ${indicatorColorClass}`}></div>
      <span>{value}</span>
    </div>
  );
};

export default DeviceNameCellRenderer;
