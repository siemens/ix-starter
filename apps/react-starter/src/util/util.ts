import { showToast } from "@siemens/ix-react";
import { iconSingleCheck } from "@siemens/ix-icons/icons";
import { MutableRefObject, useEffect } from "react";
import EChartsReact from "echarts-for-react";

export function toKebabCase(normalString: string): string {
  return normalString
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function showSuccessToast(message: string) {
  showToast({
    message: message,
    icon: iconSingleCheck,
    iconColor: "color-success",
  });
}

export function useResizeHandler(chartRef: MutableRefObject<EChartsReact | null>) {
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chartRef]);
}
