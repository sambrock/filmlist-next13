import { supabase } from '../supabase';

const TMDB_POSTER_PATH = 'https://image.tmdb.org/t/p/w342';
const TMDB_BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

export const uploadMoviePoster = async (filename?: string) => {
  const posterFile = await fetch(`${TMDB_POSTER_PATH}${filename}`).then((res) => res.blob());
  await supabase.storage.from('media').upload(`posters/w342/${filename}`, posterFile);
};

export const uploadMovieBackdrop = async (filename?: string) => {
  const backdropFile = await fetch(`${TMDB_BACKDROP_PATH}${filename}`).then((res) => res.blob());
  await supabase.storage.from('media').upload(`backdrops/w1280/${filename}`, backdropFile);
};
