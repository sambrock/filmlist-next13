import axios from 'axios';

import {
  TMDbMovieReleaseDatesResponse,
  TMDbMovieResponse,
  TMDbPersonMovieCreditsResponse,
  TMDbSearchPeopleResponse,
  TMDbSearchResponse,
  TMDbWatchProviderResponse,
} from './models';

const API_KEY = process.env.TMDB_API_KEY;

export class TMDbApi {
  private static base_url = 'https://api.themoviedb.org/3';
  private static endpoint: string;
  private static params?: Record<string, string>;

  private static async request<T>(): Promise<T> {
    const response = await axios({
      method: 'GET',
      baseURL: this.base_url,
      url: this.endpoint,
      params: { api_key: API_KEY, ...this.params },
    });

    return await response.data;
  }

  static async getSearchMovies(params: { query: string; year?: string }): Promise<TMDbSearchResponse[]> {
    this.endpoint = '/search/movie';
    this.params = { language: 'en-US', ...params };

    const data = await this.request<{ results: TMDbSearchResponse[] }>();

    return data.results;
  }

  static async getMovieById(movieId: number): Promise<TMDbMovieResponse> {
    this.endpoint = `/movie/${movieId}`;
    this.params = { append_to_response: 'watch/providers' };

    const data = await this.request<TMDbMovieResponse>();

    return data;
  }

  static async getMovieByIMDbId(imdbId: string): Promise<TMDbMovieResponse> {
    this.endpoint = `/find/${imdbId}`;
    this.params = { append_to_response: 'credits', external_source: 'imdb_id' };

    const data = await this.request<any>();

    return data?.movie_results[0] as TMDbMovieResponse;
  }

  static async getMovieCertificate(movieId: number): Promise<string | null> {
    this.endpoint = `/movie/${movieId}/release_dates`;
    this.params = {};

    const data = await this.request<{ results: TMDbMovieReleaseDatesResponse[] }>();

    return data.results.find((d) => d?.iso31661 === 'US')?.release_dates[0].certification || null;
  }

  static async getMovieWatchProviders(movieId: number): Promise<TMDbWatchProviderResponse['results'][0]> {
    this.endpoint = `/movie/${movieId}/watch/providers`;
    this.params = {};

    const data = await this.request<TMDbWatchProviderResponse>();

    return data.results.US;
  }

  static async getSearchPeople(params: { query: string }): Promise<TMDbSearchPeopleResponse['results']> {
    this.endpoint = '/search/person';
    this.params = { language: 'en-US', page: '1', ...params };

    const data = await this.request<{ results: TMDbSearchPeopleResponse['results'] }>();

    return data.results;
  }

  static async getPersonMovieCredits(personId: number): Promise<TMDbPersonMovieCreditsResponse> {
    this.endpoint = `/person/${personId}/movie_credits`;
    this.params = { language: 'en-US' };

    const data = await this.request<TMDbPersonMovieCreditsResponse>();

    return data;
  }
}
