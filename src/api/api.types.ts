import type { POST_CreateList } from '@/pages/api/v1/createList';
import type { POST_Initialize } from '@/pages/api/v1/initialize';
import type { POST_SaveTransactions } from '@/pages/api/v1/saveTransactions';
import type { GET_SearchMovie } from '@/pages/api/v1/searchMovies';

export type GetApi = GET_SearchMovie;
export type PostApi = POST_Initialize | POST_CreateList | POST_SaveTransactions;

export interface GetApiDefinition<T extends { url: string; params?: Record<string, string>; return: unknown }> {
  url: T['url'];
  params: T['params'];
  return: T['return'];
}

export interface PostApiDefinition<T extends { url: string; data: unknown; return: unknown }> {
  url: T['url'];
  data: T['data'];
  return: T['return'];
}

export type GetUrl = GetApi['url'];
export type GetApiParams<T extends string> = Extract<GetApi, { url: T }>['params'];
export type GetApiReturn<T extends string> = Extract<GetApi, { url: T }>['return'];

export type PostUrl = PostApi['url'];
export type PostApiReturn<T extends string> = Extract<PostApi, { url: T }>['return'];
export type PostApiData<T extends string> = Extract<PostApi, { url: T }>['data'];
