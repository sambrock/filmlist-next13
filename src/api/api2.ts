import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

import { buildQueryString } from '@/utils';
import type { ApiGetRouteUrls, ApiPostRouteUrls, ApiRouteBody, ApiRouteData, ApiRouteParams } from './api2.types';

export const api = {
  get: async <T extends ApiGetRouteUrls>(
    url: T,
    { params, body, ...config }: RequestInit & { params?: ApiRouteParams<T>; body?: ApiRouteBody<T> } = {}
  ): Promise<ApiRouteData<T>> => {
    return fetch(`${url}${buildQueryString(params || {})}`, {
      ...config,
      headers: { 'Content-Type': 'application/json', ...config.headers },
    }).then((res) => res.json());
  },

  post: async <T extends ApiPostRouteUrls>(
    url: T,
    data: ApiRouteBody<T>,
    { body, ...config }: RequestInit = {}
  ): Promise<ApiRouteData<T>> => {
    return fetch(url, {
      ...config,
      headers: { 'Content-Type': 'application/json', ...config.headers },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },
};

api.get('/api/v1/getListMovies', { params: {} });
