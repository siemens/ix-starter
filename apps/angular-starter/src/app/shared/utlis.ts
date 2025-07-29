import { showMessage } from '@siemens/ix';
import { iconInfo } from '@siemens/ix-icons/icons';

export function useShowDemoMessage() {
  showMessage({
    message: 'This feature is currently unavailable in the demo version.',
    icon: iconInfo,
    actions: [
      {
        id: 'cancel',
        text: 'Cancel',
        type: 'cancel',
      },
      {
        id: 'okay',
        text: 'OK',
        type: 'okay',
      },
    ],
    messageTitle: 'Demo app',
  });
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
