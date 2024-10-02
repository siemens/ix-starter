/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect, useState } from "react";
import {
  IxButton,
  IxCategoryFilter,
  IxContentHeader,
  IxPane,
  IxPaneLayout,
} from "@siemens/ix-react";
import styles from "./styles.module.css";
import QuickActions from "./components/quick-actions";
import AgGridTable from "./components/ag-grid-table/ag-grid-table.tsx";
import Overview from "./components/overview";

import show from "./components/modal/index.tsx";
import { useDataStore, useFilterStore } from "../store/device-store.ts";
import { MockData } from "../../types";
import { FilterState } from "@siemens/ix";

type Categories = Record<
  string,
  {
    label: string;
    options: string[];
  }
>;

function createUniqueValueArray(devices: MockData[], key: string) {
  return Array.from(new Set(devices.map<string>((device) => device[key as keyof MockData] ?? "")));
}

const useCategories = () => {
  const { devices } = useDataStore();
  const [categories, setCategories] = useState<Categories>({});

  useEffect(() => {
    if (devices.length > 0) {
      const newCategories: Categories = {};
      const keys = Object.keys(devices[0]);
      keys.forEach((key) => {
        const uniqueValues = createUniqueValueArray(devices, key);
        newCategories[key] = {
          label: key,
          options: uniqueValues,
        };
      });
      setCategories(newCategories);
    }
  }, [devices]);

  return categories;
};

function DeviceFilter() {
  const { filter, setFilter } = useFilterStore();
  const categories = useCategories();
  const onFilterChanged = useCallback(
    (event: CustomEvent<FilterState>) => setFilter(event.detail.categories),
    [setFilter],
  );
  return (
    <IxCategoryFilter
      aria-label="Filter by"
      placeholder="Filter by"
      onFilterChanged={onFilterChanged}
      filterState={{ tokens: [], categories: filter }}
      categories={categories}
      className="mb-4"
      repeatCategories={false}
    ></IxCategoryFilter>
  );
}

const DevicesPage = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Overview />
        <IxPaneLayout variant="inline">
          <div slot="content" className={styles.Content}>
            <IxContentHeader headerTitle="Devices">
              <IxButton aria-label="add new device" icon="add-circle" ghost onClick={() => show()}>
                Add device
              </IxButton>
            </IxContentHeader>
            <DeviceFilter />
            <AgGridTable />
          </div>
          <IxPane
            heading="Quick actions"
            size="320px"
            slot="right"
            expanded={expanded}
            onExpandedChanged={(e) => {
              setExpanded(e.detail.expanded);
            }}
          >
            <QuickActions show={show}></QuickActions>
          </IxPane>
        </IxPaneLayout>
      </div>
    </>
  );
};

export default DevicesPage;
