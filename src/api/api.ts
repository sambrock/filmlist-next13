import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import type { GetApiParams, GetApiReturn, GetUrl, PostApiData, PostApiReturn, PostUrl } from './api.types';

type QueryParams = { [key: string]: string | number | boolean | undefined };
export type ApiConfig<TParams = {}> = RequestInit & { params?: TParams };

const buildQueryString = (params: QueryParams): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
    .join('&');
  return query ? `?${query}` : '';
};

const BASE_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const api = {
  get: <T extends GetUrl>(
    url: T,
    { params, ...config } = {} as ApiConfig<GetApiParams<T>>
  ): Promise<GetApiReturn<T>> => {
    return fetch(`${url}${buildQueryString(params || {})}`, {
      ...BASE_CONFIG,
      ...config,
      method: 'GET',
    }).then((res) => res.json());
  },

  post: <T extends PostUrl>(url: T, data: PostApiData<T>, config = {} as ApiConfig): Promise<PostApiReturn<T>> => {
    return fetch(`${url}`, {
      ...BASE_CONFIG,
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },

  // put: <T>(url: string, { params, ...config } = {} as ApiConfig) => {
  //   return fetch(`${url}${buildQueryString(params || {})}`, {
  //     ...BASE_CONFIG,
  //     ...config,
  //     method: 'PUT',
  //   }).then((res) => res.json() as Promise<T>);
  // },

  // patch: <T>(url: string, { params, ...config } = {} as ApiConfig) => {
  //   return fetch(`${url}${buildQueryString(params || {})}`, {
  //     ...BASE_CONFIG,
  //     ...config,
  //     method: 'PATCH',
  //   }).then((res) => res.json() as Promise<T>);
  // },

  // delete: <T>(url: string, { params, ...config } = {} as ApiConfig) => {
  //   return fetch(`${url}${buildQueryString(params || {})}`, {
  //     ...BASE_CONFIG,
  //     ...config,
  //     method: 'DELETE',
  //   }).then((res) => res.json() as Promise<T>);
  // },
};
