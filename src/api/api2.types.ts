import { GetListMoviesRoute } from '@/pages/api/v1/getListMovies';
import { SearchMoviesRoute } from '@/pages/api/v1/searchMovies';

export type ApiRoutes = GetListMoviesRoute | SearchMoviesRoute;

export interface ApiRoute<
  T extends {
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
    url: string;
    data: unknown;
    params?: Record<string, string>;
    body?: unknown;
  }
> {
  method: T['method'];
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
