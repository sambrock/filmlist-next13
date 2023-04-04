'use client';

import { useLockedBody } from 'usehooks-ts';

import { TMDbMovieResponse } from '@/services/tmdb';
import { MOVIE_IMAGE_URL } from '@/constants';
import { useMovieDetails } from './MovieDetailsStatic';

export const MovieDetails = ({ movie }: { movie: TMDbMovieResponse }) => {
  useLockedBody(true);

  const { close } = useMovieDetails();

  return (
    <div
      className="fixed top-0 left-0 z-50 flex h-full w-full items-start justify-center overflow-y-auto bg-black/60"
      onClick={close}
    >
      <div
        className="relative mt-20 w-full max-w-3xl overflow-hidden rounded-xl bg-neutral-900 pb-6 shadow-md shadow-neutral-900"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="relative mb-10">
          <img src={MOVIE_IMAGE_URL['backdrop']['w780'] + movie.backdrop_path} />
          <div className="fade-black-gradient-0 absolute bottom-0 h-2/3 w-full" />
          <div className="absolute -bottom-4 px-6">
            <h1
              className="font-serif text-5xl font-black italic text-off-white"
              style={{ textShadow: '1px 1px 2px #000' }}
            >
              {movie.title}
            </h1>
            <div className="items-enter mt-2 flex gap-4 text-sm font-medium text-white/40">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>{movie.runtime} mins</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 px-6">
          <div className="col-span-2 space-y-4">
            <p className=" leading-6 text-white/60">{movie.overview}</p>
            <div className="flex gap-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="text-sm font-bold text-white/60"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

const minutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};
