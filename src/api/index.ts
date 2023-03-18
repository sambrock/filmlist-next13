import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

import { buildQueryString } from '@/utils';
import type { Api } from './api.types';

const BASE_URL = 'http://localhost:3000';

export const api = {
  get: async <T extends Api.ApiGetRouteUrls>(
    url: T,
    { params, body, ...config }: RequestInit & { params?: Api.ApiRouteParams<T>; body?: Api.ApiRouteBody<T> } = {}
  ): Promise<Api.ApiRouteData<T>> => {
    return fetch(`${BASE_URL}${url}${buildQueryString(params || {})}`, {
      ...config,
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...config.headers },
    }).then((res) => res.json());
  },

  post: async <T extends Api.ApiPostRouteUrls>(
    url: T,
    data: Api.ApiRouteBody<T>,
    { body, ...config }: RequestInit = {}
  ): Promise<Api.ApiRouteData<T>> => {
    return fetch(BASE_URL + url, {
      ...config,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },
};
