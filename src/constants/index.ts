export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://filmq.vercel.app';
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';
export const NANO_ID_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
export const NANO_ID_LENGTH = 12;
export const MAX_SEARCH_RESULTS = 4;
export const MAX_LIST_MOVIES = 28;
export const SESSION_ID_LENGTH = 24;
export const SESSION_TOKEN_NAME = 'session_token';
export const MAX_DESCRIPTION_LENGTH = 3000;
export const MAX_DESCRIPTION_PREVIEW_LENGTH = 450;
export const MAX_TITLE_LENGTH = 200;

export const MOVIE_IMAGE_URL = {
  poster: {
    w92: 'https://image.tmdb.org/t/p/w92',
    w342: {
      default: 'https://zrbwwfldzlttegneqhzw.supabase.co/storage/v1/object/public/media/posters/w342',
      tmdb: 'https://image.tmdb.org/t/p/w342',
    },
  },
  backdrop: {
    w300: 'https://image.tmdb.org/t/p/w300',
    w780: 'https://image.tmdb.org/t/p/w780',
    w1280: {
      default: 'https://zrbwwfldzlttegneqhzw.supabase.co/storage/v1/object/public/media/backdrops/w1280',
      tmdb: 'https://image.tmdb.org/t/p/w1280',
    },
  },
} as const;
