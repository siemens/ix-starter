/*
 * Copyright (c) Siemens 2018 - 2026
 * SPDX-License-Identifier: MIT
 */

import '@siemens/ix/css/reset.css';
import '@siemens/ix/css/default.css';
import { defineComponent, h, toRaw, type Component, type PropType } from 'vue';

function setIxThemeAttributes() {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.setAttribute('data-ix-theme', 'community');
  document.documentElement.setAttribute('data-ix-color-schema', 'dark');
}

setIxThemeAttributes();

export default defineComponent({
  name: 'Wrapper',
  props: {
    component: {
      type: Object as PropType<Component>,
      required: true,
    },
  },
  setup(props) {
    setIxThemeAttributes();

    return () => h(toRaw(props.component));
  },
});
