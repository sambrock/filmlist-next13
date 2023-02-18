import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { GET_SearchMovieQueryParams } from '@/pages/api/v1/searchMovies';

type ApiUrlObject = {
  pathname: '/api/v1/searchMovies';
  query: GET_SearchMovieQueryParams;
};

const BASE_API_URL = `http://localhost:3000`;
const BASE_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const createUrl = (urlObject: ApiUrlObject) => {
  const pathname = urlObject.pathname;
  const query = urlObject.query ? `?${new URLSearchParams(urlObject.query).toString()}` : '';

  return new URL(`${pathname}${query}`, BASE_API_URL);
};

export const api = {
  get: <T>(url: ApiUrlObject, config?: RequestInit) => {
    return fetch(createUrl(url), {
      ...BASE_CONFIG,
      ...config,
      method: 'GET',
    }).then((res) => res.json() as Promise<T>);
  },
  delete: <T>(url: ApiUrlObject, config?: RequestInit) => {
    return fetch(BASE_API_URL + url, {
      ...BASE_CONFIG,
      ...config,
      method: 'DELETE',
    }).then((res) => res.json() as Promise<T>);
  },
  post: <T>(url: ApiUrlObject, body: unknown, config?: RequestInit) => {
    return fetch(BASE_API_URL + url, {
      ...BASE_CONFIG,
      ...config,
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => res.json() as Promise<T>);
  },
  patch: <T>(url: ApiUrlObject, body: unknown, config?: RequestInit) => {
    return fetch(BASE_API_URL + url, {
      ...BASE_CONFIG,
      ...config,
      method: 'PATCH',
      body: JSON.stringify(body),
    }).then((res) => res.json() as Promise<T>);
  },
  put: <T>(url: ApiUrlObject, body: unknown, config?: RequestInit) => {
    return fetch(BASE_API_URL + url, {
      ...BASE_CONFIG,
      ...config,
      method: 'PUT',
      body: JSON.stringify(body),
    }).then((res) => res.json() as Promise<T>);
  },
};
