import type { FetchError, ResponseType } from 'ofetch';

declare module 'ofetch' {
  interface FetchOptions<R extends ResponseType = ResponseType, T = any> {
    silent?: boolean;
  }
}

declare global {
  type RequestResult<T> =
    | { data: T; error: null }
    | { data: null; error: FetchError };
}

export {}
