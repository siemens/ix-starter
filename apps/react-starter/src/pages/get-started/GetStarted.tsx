import { IxContentHeader, IxLinkButton, IxTypography } from '@siemens/ix-react';
import { useNavigate } from 'react-router-dom';

import styles from './GetStarted.module.css';

function GetStarted() {
  const navigate = useNavigate();

  return (
    <>
      <IxContentHeader headerTitle="Get started with Siemens Industrial Experience" />
      <IxTypography format="body" className={styles.description}>
        Explore the Siemens Industrial Experience design system with our interactive starter app.
        <br />
        Build faster with ready-to-use components and documentation.
      </IxTypography>

      <IxTypography format="body" className={styles.descriptionShort}>
        The starter app includes an application shell and three example pages featuring our most
        popular components:
      </IxTypography>

      <div className={styles.navLinks}>
        <IxLinkButton
          onClick={() => {
            void navigate('/forms');
          }}
          aria-label="Navigate to Forms page"
        >
          Forms
        </IxLinkButton>
        <IxLinkButton
          onClick={() => {
            void navigate('/charts');
          }}
          aria-label="Navigate to Charts page"
        >
          Charts
        </IxLinkButton>
        <IxLinkButton
          onClick={() => {
            void navigate('/grids');
          }}
          aria-label="Navigate to Grids page"
        >
          Grids
        </IxLinkButton>
      </div>

      <IxTypography format="body" className={styles.description}>
        Browse the full component library in our documentation:{' '}
        <a
          href="https://ix.siemens.io"
          target="_blank"
          rel="noreferrer"
          aria-label="ix.siemens.io (opens in a new tab)"
        >
          ix.siemens.io
        </a>
      </IxTypography>
    </>
  );
}

export default GetStarted;
