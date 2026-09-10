import type { FetchError } from 'ofetch';

export default defineNuxtPlugin({
  dependsOn: ['toast'],
  setup() {
    const { $toast } = useNuxtApp();
    const requestHeaders = useRequestHeaders(['cookie']);
    const instance = $fetch.create({
      baseURL: '/',
      credentials: 'include',
      onRequest({ options }) {
        if (import.meta.server && requestHeaders.cookie) {
          options.headers = new Headers(options.headers);
          options.headers.set('cookie', requestHeaders.cookie);
        }
      },

      onResponse({ response, options }) {
        if (options.silent || !response.ok) return;
        const data = response._data;
        if (data?.error && typeof data.error === 'string') {
          $toast.error(data.error);
        }
      },

      onResponseError({ response, options }) {
        if (options.silent) return;
        const data = response?._data;
        const message = data && typeof data === 'string'
          ? data
          : (data.msg && typeof data.msg === 'string')
            ? data.msg
            : response?.statusText;

        $toast.error(message);
      },
    });

    const request = async <T = unknown>(...args: Parameters<typeof instance<T>>): Promise<RequestResult<T>> => {
      try {
        const data = await instance<T>(...args);
        return { data, error: null };
      }
      catch (error) {
        return { data: null, error: error as FetchError };
      }
    };

    return {
      provide: { request },
    };
  },
});

// Использование:
// const { $request } = useNuxtApp();
// const { data, error } = await $request<Interface or Type>('/api/endpoint', options);
