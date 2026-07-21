<script setup lang="ts">
import { IxContentHeader, IxTypography } from '@siemens/ix-vue';
import { AgGridVue } from 'ag-grid-vue3';
import * as ag from 'ag-grid-community';
import { getIxTheme } from '@siemens/ix-aggrid';
import { GRID_ROW_DATA, GRID_COL_DEFS } from '../../shared';

const ixTheme = getIxTheme(ag);
</script>

<template>
  <IxContentHeader header-title="Grids" />
  <IxTypography format="body" class="description">
    Siemens Industrial Experience integrates the data grid library
    <a
      href="https://www.ag-grid.com"
      target="_blank"
      rel="noreferrer"
      aria-label="AG Grid (opens in a new tab)"
      >AG Grid</a
    >.
    <br />
    This lets you use its features while staying consistent with the Siemens Industrial Experience
    design system.
  </IxTypography>

  <section class="grid-container" aria-label="Inspection data grid">
    <AgGridVue
      :row-data="GRID_ROW_DATA"
      :column-defs="GRID_COL_DEFS"
      :suppress-movable-columns="true"
      dom-layout="autoHeight"
      :theme="ixTheme"
      aria-label="Inspection records table"
    />
  </section>
</template>

<style scoped src="./GridsPage.css"></style>
