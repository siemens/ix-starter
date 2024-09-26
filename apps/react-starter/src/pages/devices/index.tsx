import {useEffect, useState} from 'react';
import {
  IxButton,
  IxCategoryFilter,
  IxContentHeader, IxPane,
  IxPaneLayout
} from "@siemens/ix-react";
import styles from "./styles.module.css";
import QuickActions from "./components/quick-actions";
import AgGridTable from "./components/ag-grid-table/ag-grid-table.tsx";
import Overview from "./components/overview";

import show from "./components/modal/index.tsx";
import {useDataStore} from "../store/device-store.ts";
import type {MockData} from "../../types";

const DevicesPage = () => {
  const {devices, fetch} = useDataStore();
  const [expanded, setExpanded] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const [categories] = useState({
    ID_1: {
      label: 'Gender',
      options: ['Male', 'Female'],
    },
  });

  useEffect(() => {
    fetch();
  }, []);


  function handleRowClick(data: MockData) {
    setSelectedData(data);
    setExpanded(true);
  }

  function getDevicesCountByStatus(data: MockData[], status: MockData['status']): number {
    if (data) {
      return data!.filter((device: MockData) => device.status === status).length;
    }

    return 0;
  }

  return (
    <>
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <Overview
          expanded={expanded}
          setExpanded={setExpanded}
          data={selectedData}
        />
        <IxPaneLayout variant="inline">
          <div slot="content" className={styles.Content}>
            <IxContentHeader headerTitle="Devices">
              <IxButton
                icon="add-circle"
                ghost
                onClick={() => show()}
              >
                Add device
              </IxButton>
            </IxContentHeader>
            <IxCategoryFilter
              placeholder="Filter by"
              suggestions={[]}
              onFilterChanged={(e) => {
                if (e.detail.categories[0]) {
                  setSearchTerm(e.detail.categories[0].value);
                } else {
                  setSearchTerm('')
                }
              }}
              categories={categories}
              className="mb-4"
              repeatCategories={false}
            ></IxCategoryFilter>
            <AgGridTable onRowClick={handleRowClick} data={devices}
                         searchTerm={searchTerm}/>
          </div>
          <IxPane heading="Quick actions" size="320px" expanded slot="right">
            <QuickActions
              devicesCount={devices ? devices.length : 0}
              errorCount={getDevicesCountByStatus(devices, 'Error')}
              warningCount={getDevicesCountByStatus(devices, 'Maintenance')}
              show={show}
            ></QuickActions>
          </IxPane>
        </IxPaneLayout>
      </div>
    </>
  );
};

export default DevicesPage;