import {showToast} from "@siemens/ix-react";
import {iconSingleCheck} from "@siemens/ix-icons/icons";

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