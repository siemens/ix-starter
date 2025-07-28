/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ref, onMounted, onUnmounted, watch, nextTick, type Ref } from "vue";

import { useIsMobileViewPort } from "./useMediaQuery";

interface ChartInstance {
  $el?: HTMLElement;
  resize: () => void;
}

interface ChartConfig {
  chartRef: Ref<ChartInstance | undefined>;
  initializeChart: () => Promise<void>;
}

export function useChart({ chartRef, initializeChart }: ChartConfig) {
  const isMobile = useIsMobileViewPort();
  let resizeHandler: (() => void) | null = null;
  const isInitialized = ref(false);

  const ensureChartDimensions = async (maxRetries = 20): Promise<boolean> => {
    for (let i = 0; i < maxRetries; i++) {
      if ((chartRef.value?.$el?.clientWidth ?? 0) > 0 && (chartRef.value?.$el?.clientHeight ?? 0) > 0) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return false;
  };

  const safeChartResize = () => {
    try {
      if (chartRef.value && isInitialized.value) {
        chartRef.value.resize();
      }
    } catch (error) {
      console.warn("Chart resize failed:", error);
    }
  };

  const initChart = async () => {
    try {
      await nextTick();

      const hasDimensions = await ensureChartDimensions();
      if (!hasDimensions) {
        console.warn("Chart container failed to get valid dimensions");
        return;
      }

      await initializeChart();
      isInitialized.value = true;

      resizeHandler = safeChartResize;
      window.addEventListener("resize", resizeHandler);
    } catch (error) {
      console.error("Chart initialization failed:", error);
    }
  };

  const handleViewportChange = async () => {
    if (!isInitialized.value || !chartRef.value) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 150));
      safeChartResize();
    } catch (error) {
      console.warn("Viewport change handling failed:", error);
    }
  };

  onMounted(initChart);

  onUnmounted(() => {
    if (resizeHandler) {
      window.removeEventListener("resize", resizeHandler);
    }
    isInitialized.value = false;
  });

  watch(isMobile, handleViewportChange, { immediate: false });

  return {
    safeChartResize,
    isInitialized,
  };
}
