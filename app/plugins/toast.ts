import type { AlertProps, AlertType } from '@/components/ui';
// eslint-disable-next-line local/types-in-distinct-file
interface ToastOption extends AlertProps {
  id: number
}

export default defineNuxtPlugin({
  name: 'toast',
  setup() {
    const CLOSE_TIMEOUT = 4;
    const toasts = useState<ToastOption[]>('toasts', () => []);

    const defaultTitles: Record<AlertType, string> = {
      error: 'toast.error',
      attention: 'toast.attention',
      success: 'toast.success',
    };

    const setToast = (data: { title: string, description: string, type: AlertType }): ToastOption => {
      return {
        id: Date.now(),
        type: data.type,
        title: data.title,
        description: data.description,
        closeTimeout: CLOSE_TIMEOUT,
      };
    };

    const fireToast = (type: AlertType, title: string, text?: string) => {
      const summary = text ? title : defaultTitles[type];
      const message = text || title;
      const props = setToast({ title: summary, description: message, type });
      toasts.value.push(props);
    };

    const removeToast = (id: number) => {
      toasts.value = toasts.value.filter(t => t.id !== id);
    };

    const success = (title: string, text?: string) => fireToast('success', title, text);
    const attention = (title: string, text?: string) => fireToast('attention', title, text);
    const error = (title: string, text?: string) => fireToast('error', title, text);

    return {
      provide: {
        toast: {
          list: toasts,
          success,
          attention,
          error,
          removeToast,
        },
      },
    };
  },
});
