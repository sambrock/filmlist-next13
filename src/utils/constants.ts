export const BASE_URL = process.env.BASE_URL;
export const API_VERSION = process.env.API_VERSION;
export const NANO_ID_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
export const NANO_ID_LENGTH = 12;
export const MAX_SEARCH_RESULTS = 8;
export const MAX_LIST_MOVIES = 28;
export const SESSION_ID_LENGTH = 24;
export const SESSION_TOKEN_NAME = 'session_token';
export const MOVIE_IMAGE_URL = {
  poster: {
    w92: 'https://image.tmdb.org/t/p/w92',
    w342: {
      default: 'https://zrbwwfldzlttegneqhzw.supabase.co/storage/v1/object/public/media/posters',
      tmdb: 'https://image.tmdb.org/t/p/w342',
    },
  },
  backdrop: {
    w300: 'https://image.tmdb.org/t/p/w300',
    w780: 'https://image.tmdb.org/t/p/w780',
    w1280: {
      default: 'https://zrbwwfldzlttegneqhzw.supabase.co/storage/v1/object/public/media/backdrops',
      tmdb: 'https://image.tmdb.org/t/p/w1280',
    },
  },
} as const;
