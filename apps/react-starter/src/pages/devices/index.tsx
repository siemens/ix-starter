/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Device, DeviceState } from "@/types/index.tsx";
import { toKebabCase } from "@/util/util.ts";
import { FilterState, LogicalFilterOperator } from "@siemens/ix";
import {
  iconAddCircle,
  iconError,
  iconInfo,
  iconMaintenanceWarning,
  iconSuccess,
} from "@siemens/ix-icons/icons";
import { IxButton, IxCategoryFilter, IxChip, IxContentHeader } from "@siemens/ix-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDataStore, useFilterStore } from "../../store/device-store.ts";
import { useDeviceStatus } from "../../store/hooks/device.ts";
import AgGridTable from "./components/ag-grid-table/ag-grid-table.tsx";
import DeviceDetails from "./components/device-details/index.tsx";
import show from "./components/modal/index.tsx";
import styles from "./styles.module.css";

type Categories = Record<
  string,
  {
    label: string;
    options: string[];
  }
>;

function createUniqueValueArray(devices: Device[], key: string) {
  return Array.from(new Set(devices.map<string>((device) => device[key as keyof Device] ?? "")));
}

const useCategories = () => {
  const { t } = useTranslation();
  const { devices } = useDataStore();
  const [categories, setCategories] = useState<Categories>({});

  useEffect(() => {
    if (devices.length > 0) {
      const newCategories: Categories = {};
      const keys = Object.keys(devices[0]);
      keys.forEach((key) => {
        const uniqueValues = createUniqueValueArray(devices, key);
        newCategories[key] = {
          label: t(`device-details.${toKebabCase(key)}`),
          options: uniqueValues,
        };
      });
      setCategories(newCategories);
    }
  }, [devices, t]);

  return categories;
};

function DeviceFilter() {
  const { t } = useTranslation();
  const { filter, setFilter } = useFilterStore();
  const categories = useCategories();
  const onFilterChanged = useCallback(
    (event: CustomEvent<FilterState>) => setFilter(event.detail.categories),
    [setFilter],
  );
  return (
    <IxCategoryFilter
      aria-label={t("category-filter.placeholder")}
      placeholder={t("category-filter.placeholder")}
      labelCategories={t("category-filter.categories")}
      onFilterChanged={onFilterChanged}
      filterState={{ tokens: [], categories: filter }}
      categories={categories}
      className={styles.CategoryFilter}
      repeatCategories={false}
    ></IxCategoryFilter>
  );
}

const QuickFilter = () => {
  const { Error, Maintenance, Offline, Online } = useDeviceStatus();
  const { setFilter, resetFilter, filter } = useFilterStore();

  const activeQuickFilter = useMemo(() => {
    if (filter.length === 0) return null;

    const [quickFilter] = filter;

    if (quickFilter.id === "status") {
      return quickFilter.value;
    }
  }, [filter]);

  function onFilterBy(status: DeviceState) {
    resetFilter();
    if (activeQuickFilter !== status) {
      setFilter([
        {
          id: "status",
          operator: LogicalFilterOperator.EQUAL,
          value: status,
        },
      ]);
    }
  }

  return (
    <section className={styles.QuickFilter}>
      <IxChip
        outline={activeQuickFilter !== "Online"}
        icon={iconSuccess}
        variant="success"
        onClick={() => onFilterBy("Online")}
      >
        {Online} online
      </IxChip>

      <IxChip
        icon={iconMaintenanceWarning}
        variant="warning"
        outline={activeQuickFilter !== "Maintenance"}
        onClick={() => onFilterBy("Maintenance")}
      >
        {Maintenance} maintenance
      </IxChip>

      <IxChip
        icon={iconError}
        variant="alarm"
        outline={activeQuickFilter !== "Error"}
        onClick={() => onFilterBy("Error")}
      >
        {Error} error
      </IxChip>

      <IxChip
        icon={iconInfo}
        variant="neutral"
        outline={activeQuickFilter !== "Offline"}
        onClick={() => onFilterBy("Offline")}
      >
        {Offline} offline
      </IxChip>
    </section>
  );
};

const DevicesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <DeviceDetails />
      <IxContentHeader headerTitle={t("devices")} slot="header">
        <IxButton
          variant="primary"
          ghost
          icon={iconAddCircle}
          onClick={show}
          aria-label="add device"
        >
          {t("add-device")}
        </IxButton>
      </IxContentHeader>
      <section className={styles.DeviceTable}>
        <section className={styles.DeviceFilter}>
          <DeviceFilter />
          <QuickFilter />
        </section>
        <AgGridTable />
      </section>
    </>
  );
};

export default DevicesPage;
