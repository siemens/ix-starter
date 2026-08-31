/*
 * Copyright (c) Siemens 2018 - 2026
 * SPDX-License-Identifier: MIT
 */

import '@siemens/ix/dist/siemens-ix/siemens-ix.css';
import type { ReactNode } from 'react';

export default function Wrapper({ children }: { children: ReactNode }) {
  document.documentElement.setAttribute('data-ix-theme', 'classic');
  document.documentElement.setAttribute('data-ix-color-schema', 'dark');

  return <>{children}</>;
}
