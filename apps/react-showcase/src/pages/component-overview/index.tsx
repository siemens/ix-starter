/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  IxButton,
  IxCol,
  IxEmptyState,
  IxEventList,
  IxEventListItem,
  IxIcon,
  IxLayoutGrid,
  IxPagination,
  IxRow,
  IxSlider,
  IxTabItem,
  IxTabs,
  IxToggle,
  IxTypography,
} from '@siemens/ix-react';
import clsx from 'clsx';
import { useState } from 'react';
import PageHeader from '../../components/page-header';
import styles from './styles.module.css';

function ComponentOverview() {
  return (
    <>
      <PageHeader header="Component overview" />
      <IxLayoutGrid>
        <IxRow>
          <IxCol>
            <IconExamples />
          </IxCol>
          <IxCol>
            <EmptyExample />
          </IxCol>
        </IxRow>
        <IxRow>
          <IxCol>
            <TypographyExample />
          </IxCol>
          <IxCol>
            <ToggleExample />
          </IxCol>
          <IxCol>
            <ButtonExample />
          </IxCol>
        </IxRow>
        <IxRow>
          <IxCol>
            <PaginationExample />
          </IxCol>
          <IxCol>
            <SliderExample />
          </IxCol>
        </IxRow>
        <IxRow>
          <IxCol>
            <EventListExample />
          </IxCol>
          <IxCol>
            <EmptyExample />
          </IxCol>
        </IxRow>
        <IxRow>
          <IxCol>
            <TabsExample />
          </IxCol>
        </IxRow>
      </IxLayoutGrid>
    </>
  );
}

function EmptyExample() {
  return (
    <div className={styles.Example}>
      <IxEmptyState
        header="No elements available"
        subHeader="Create an element first"
        icon="add"
        action="Create element"
      ></IxEmptyState>
    </div>
  );
}

function SliderExample() {
  return (
    <div className={clsx(styles.Example, styles.SliderExample)}>
      <IxSlider
        trace
        trace-reference={50}
        marker={[0, 25, 50, 75, 100]}
        value={25}
      >
        <span slot="label-start">0</span>
        <span slot="label-end">100</span>
      </IxSlider>

      <IxSlider
        min={0}
        max={50}
        value={20}
        step={10}
        trace
        trace-reference={10}
        marker={[0, 10, 20, 30, 40, 50]}
      >
        <span slot="label-start">0</span>
        <span slot="label-end">100</span>
      </IxSlider>

      <IxSlider trace trace-reference={50} marker={[0, 25, 50, 75, 100]} error>
        <span slot="label-start">0</span>
        <span slot="label-end">100</span>
      </IxSlider>
    </div>
  );
}

function EventListExample() {
  return (
    <div className={styles.Example}>
      <IxEventList compact>
        <IxEventListItem color="color-primary">Text 1</IxEventListItem>
        <IxEventListItem color="color-primary">Text 2</IxEventListItem>
        <IxEventListItem color="color-primary">Text 3</IxEventListItem>
        <IxEventListItem color="color-primary">Text 4</IxEventListItem>
      </IxEventList>
    </div>
  );
}

function PaginationExample() {
  return (
    <div className={clsx(styles.Example, styles.PaginationExample)}>
      <IxPagination count={100}></IxPagination>
      <IxPagination advanced></IxPagination>
    </div>
  );
}

function ToggleExample() {
  return (
    <div className={clsx(styles.Example)}>
      <IxToggle></IxToggle>
      <IxToggle checked></IxToggle>
      <IxToggle disabled></IxToggle>
      <IxToggle checked disabled></IxToggle>
    </div>
  );
}

function ButtonExample() {
  return (
    <div className={clsx(styles.Example, styles.ButtonExample)}>
      <IxButton>Button primary</IxButton>
      <IxButton variant="secondary">Button primary</IxButton>
      <IxButton outline>Button primary</IxButton>
      <IxButton outline variant="secondary">
        Button primary
      </IxButton>
      <IxButton ghost>Button primary</IxButton>
      <IxButton ghost variant="secondary">
        Button primary
      </IxButton>
      <IxButton disabled>Button primary</IxButton>
      <IxButton disabled variant="secondary">
        Button primary
      </IxButton>
    </div>
  );
}

function TypographyExample() {
  return (
    <div className={clsx(styles.Example, styles.TypographyExample)}>
      <IxTypography format="h1">Block H1</IxTypography>
      <IxTypography format="h2">Block H2</IxTypography>
      <IxTypography format="display">Block Display</IxTypography>
      <IxTypography format="body">Block Body</IxTypography>
      <IxTypography format="label-sm">Block Label</IxTypography>
    </div>
  );
}

function TabsExample() {
  const [tab, setTab] = useState(0);
  const [tab2, setTab2] = useState(0);

  return (
    <div className={clsx(styles.Example, styles.TabsExample)}>
      <IxTabs
        layout="stretched"
        onSelectedChange={({ detail: selectedTab }) => setTab(selectedTab)}
      >
        <IxTabItem>Tab 1</IxTabItem>
        <IxTabItem>Tab 2</IxTabItem>
        <IxTabItem>Tab 3</IxTabItem>
      </IxTabs>

      <div className={styles.TabsExampleContent}>Tab {tab}</div>

      <IxTabs
        layout="stretched"
        rounded
        onSelectedChange={({ detail: selectedTab }) => setTab2(selectedTab)}
      >
        <IxTabItem>
          <IxIcon name="success"></IxIcon>
        </IxTabItem>
        <IxTabItem counter={200}>
          <IxIcon name="tree"></IxIcon>
        </IxTabItem>
        <IxTabItem>
          <IxIcon name="maintenance"></IxIcon>
        </IxTabItem>
        <IxTabItem disabled counter={24}>
          <IxIcon name="sound-loud"></IxIcon>
        </IxTabItem>
        <IxTabItem>
          <IxIcon name="hierarchy"></IxIcon>
        </IxTabItem>
        <IxTabItem disabled>
          <IxIcon name="calendar-settings"></IxIcon>
        </IxTabItem>
      </IxTabs>

      <div className={styles.TabsExampleContent}>Tab {tab2}</div>
    </div>
  );
}

function IconExamples() {
  const [icons] = useState([
    ['app-menu', 'rocket', 'calendar', 'capacity'],
    ['backup', 'bar-code', 'battery-full', 'clock'],
    ['cloud', 'code', 'cogwheel', 'database'],
  ]);

  return (
    <div className={clsx(styles.Example, styles.IconsExample)}>
      <IxLayoutGrid>
        {icons.map((iconRow, row) => (
          <IxRow key={row}>
            {iconRow.map((icon, col) => (
              <IxCol
                key={`${row}_${col}_${icon}`}
                size="3"
                class={styles.IconCol}
              >
                <IxIcon name={icon}></IxIcon>
              </IxCol>
            ))}
          </IxRow>
        ))}
      </IxLayoutGrid>
    </div>
  );
}

export default ComponentOverview;
