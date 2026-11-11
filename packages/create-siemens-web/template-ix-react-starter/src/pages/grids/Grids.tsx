import { IxTypography, IxContentHeader } from '@siemens/ix-react';
import { AgGridReact } from 'ag-grid-react';
import * as ag from 'ag-grid-community';
import { getIxTheme } from '@siemens/ix-aggrid';
import { GRID_ROW_DATA, GRID_COL_DEFS } from '../../shared';
import styles from './Grids.module.css';

const ixTheme = getIxTheme(ag);

function Grids() {
  return (
    <>
      <IxContentHeader headerTitle="Grids" />
      <IxTypography format="body" className={styles.description}>
        Siemens Industrial Experience integrates the data grid library{' '}
        <a
          href="https://www.ag-grid.com"
          target="_blank"
          rel="noreferrer"
          aria-label="AG Grid (opens in a new tab)"
        >
          AG Grid
        </a>
        .<br />
        This lets you use its features while staying consistent with the Siemens Industrial
        Experience design system.
      </IxTypography>

      <section className={styles.gridContainer} aria-label="Inspection data grid">
        <AgGridReact
          rowData={GRID_ROW_DATA}
          columnDefs={GRID_COL_DEFS}
          suppressMovableColumns={true}
          domLayout="autoHeight"
          theme={ixTheme}
          aria-label="Inspection records table"
        />
      </section>
    </>
  );
}

export default Grids;
