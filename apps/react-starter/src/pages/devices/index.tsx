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
import {useDataStore, useFilterStore} from "../store/device-store.ts";
import {MockData} from "../../types";

const DevicesPage = () => {
  const {devices, fetch} = useDataStore();
  const {setFilter} = useFilterStore();
  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (devices.length > 0) {
      const newCategories: { [key: string]: {} } = {};
      const keys = Object.keys(devices[0]);

      keys.forEach((key) => {
        const uniqueValues = Array.from(new Set(devices.map(device => device[key as keyof MockData])));
        newCategories[key] = {
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
        <Overview/>
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
              onFilterChanged={(e) => {
                if (e.detail.categories[0]) {
                  setFilter(e.detail.categories);
                } else {
                  setFilter([])
                }
              }}
              categories={categories}
              className="mb-4"
              repeatCategories={false}
            ></IxCategoryFilter>
            <AgGridTable/>
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