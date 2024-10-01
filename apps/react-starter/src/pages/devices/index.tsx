/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";
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

const DevicesPage = () => {
  const { devices } = useDataStore();
  const { filter, setFilter } = useFilterStore();
  const [categories, setCategories] = useState({});
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (devices.length > 0) {
      const newCategories: Record<string, { label: string; options: (string | undefined)[] }> = {};
      const keys = Object.keys(devices[0]);

      keys.forEach((key) => {
        const uniqueValues = Array.from(
          new Set(devices.map((device) => device[key as keyof MockData])),
        );
        newCategories[key] = {
          label: key,
          options: uniqueValues,
        };
      });

      setCategories(newCategories);
    }
  }, [devices]);

  function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

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
            <IxCategoryFilter
              aria-label="Filter by"
              placeholder="Filter by"
              onFilterChanged={(e) => {
                const newCategories = e.detail.categories;
                if (!deepEqual(filter, newCategories)) {
                  setFilter(newCategories.length > 0 ? newCategories : []);
                }
              }}
              filterState={{ tokens: [], categories: filter }}
              categories={categories}
              className="mb-4"
              repeatCategories={false}
            ></IxCategoryFilter>
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
