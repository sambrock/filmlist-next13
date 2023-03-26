import { POST_CreateList } from '@/pages/api/v1/createList';
import { GET_GetListMovies } from '@/pages/api/v1/getListMovies';
import { POST_SaveTransactions } from '@/pages/api/v1/saveTransactions';
import { GET_SearchMovies } from '@/pages/api/v1/searchMovies';

type ApiRoutes = GET_SearchMovies | GET_GetListMovies | POST_CreateList | POST_SaveTransactions;

export namespace Api {
  export interface GetRoute<T extends Required<{ url: string; data: unknown; params?: Record<string, string> }>> {
    method: 'GET';
    url: T['url'];
    params: T['params'];
    data: T['data'];
    body: null;
  }

  export interface PostRoute<
    T extends { url: string; data: unknown; params?: Record<string, string>; body?: unknown }
  > {
    method: 'POST';
    url: T['url'];
    params: T['params'];
    data: T['data'];
    body: T['body'];
  }

  export type ApiRouteUrl = ApiRoutes['url'];
  export type ApiRouteMethod<T> = Extract<ApiRoutes, { url: T }>['method'];
  export type ApiRouteParams<T> = Extract<ApiRoutes, { url: T }>['params'];
  export type ApiRouteData<T> = Extract<ApiRoutes, { url: T }>['data'];
  export type ApiRouteBody<T> = Extract<ApiRoutes, { url: T }>['body'];

  export type ApiGetRouteUrls = Extract<ApiRoutes, { method: 'GET' }>['url'];
  export type ApiPostRouteUrls = Extract<ApiRoutes, { method: 'POST' }>['url'];
  export type ApiDeleteRouteUrls = Extract<ApiRoutes, { method: 'DELETE' }>['url'];
  export type ApiPatchRouteUrls = Extract<ApiRoutes, { method: 'PATCH' }>['url'];
  export type ApiPutRouteUrls = Extract<ApiRoutes, { method: 'PUT' }>['url'];
}
