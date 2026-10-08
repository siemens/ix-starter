/*
 * Copyright (c) Siemens 2018 - 2026
 * SPDX-License-Identifier: MIT
 */

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
  return {
    plugins: [vue()],
  };
});
