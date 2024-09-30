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
import {MockData} from "../../types";

const DevicesPage = () => {
  const {devices, fetch} = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (devices.length > 0) {
      const newCategories: { [key: string]: {} } = {};
      const keys = Object.keys(devices[0]);

      keys.forEach((key, index) => {
        const uniqueValues = Array.from(new Set(devices.map(device => device[key as keyof MockData])));
        newCategories[`ID_${index + 1}`] = {
          label: key,
          options: uniqueValues,
        };
      });

      setCategories(newCategories);
    }
  }, [devices]);


  return (
    <>
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <Overview />
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
            <AgGridTable
              data={devices}
              searchTerm={searchTerm}
            />
          </div>
          <IxPane heading="Quick actions" size="320px" expanded slot="right">
            <QuickActions
              show={show}
            ></QuickActions>
          </IxPane>
        </IxPaneLayout>
      </div>
    </>
  );
};

export default DevicesPage;