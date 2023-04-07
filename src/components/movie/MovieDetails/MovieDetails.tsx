'use client';

import { useLockedBody } from 'usehooks-ts';
import { Fragment } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

import type { GET_GetMovieDetails } from '@/pages/api/v1/getMovieDetails';
import { MOVIE_IMAGE_URL } from '@/constants';
import { useMovieDetails } from './MovieDetailsStatic';
import { googleFeelingLuckyLink } from '@/utils';
import { ModalDetailsCredit } from './ModalDetailsCredit';
import { Button } from '@/components/common/Button';
import { useModal } from '@/hooks/useModal';
import { KeyboardShortcut } from '@/components/common/KeyboardShortcut';

export const MovieDetails = ({ movie }: { movie: GET_GetMovieDetails['data'] }) => {
  useLockedBody(true);

  const { close } = useMovieDetails();

  const showMoreCast = useModal();

  return (
    <div
      className="fixed top-0 left-0 z-50 flex h-full w-full items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative mt-20 mb-20 w-full max-w-3xl overflow-hidden rounded-xl bg-neutral-900 shadow-2xl shadow-neutral-900"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="relative mb-10">
          <div className="aspect-video bg-neutral-700">
            <img src={MOVIE_IMAGE_URL['backdrop']['w780'] + movie.backdrop_path} />
          </div>
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
              <span>
                {movie.genres
                  .map((g) => {
                    if (g.name === 'Science Fiction') return 'Sci-Fi';
                    return g.name;
                  })
                  .join(', ')}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 px-6 pb-6">
          <div className="col-span-2 space-y-8">
            <p className="leading-7 text-white/60">{movie.overview}</p>

            <div>
              <h2 className="mb-2 font-bold text-white/60">Crew</h2>
              <div className="space-y-1">
                {movie.credits.crew.map((c) => (
                  <ModalDetailsCredit key={c.id} name={c.name} role={c.job} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-white/60">Cast</h2>
              <div className="space-y-1">
                {movie.credits.cast.slice(0, showMoreCast.isOpen ? movie.credits.cast.length : 10).map((c) => (
                  <ModalDetailsCredit key={c.id} name={c.name} role={c.character} />
                ))}
              </div>
              {movie.credits.cast.length > 10 && (
                <Button className="mx-auto mt-2" size="small" onClick={showMoreCast.toggle}>
                  {showMoreCast.isOpen ? 'Show less' : 'Show more'}
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="w-full rounded-md border border-neutral-800">
              {movie.watchProviders.length > 0 ? (
                <Fragment>
                  {movie.watchProviders?.map((s) => (
                    <a
                      key={s.provider_id}
                      className="default-focus-shadow group relative z-10 block rounded-md outline-none ring-offset-2 focus:z-50"
                      href={googleFeelingLuckyLink(
                        `${movie.title} ${new Date(movie.release_date).getFullYear()} ${s.provider_name}`
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div
                        className={clsx(
                          'flex cursor-pointer items-center gap-2 overflow-hidden overflow-ellipsis whitespace-nowrap border-b border-b-neutral-600 bg-neutral-800 px-4 py-2 hover:bg-neutral-700 group-first:rounded-t-md group-last:rounded-b-md group-last:border-b-0',
                          `border-l-2 border-l-neutral-600 hover:border-l-neutral-300`
                        )}
                      >
                        <span className="text-sm font-medium text-white/60 ">{s.provider_name} ↗</span>
                      </div>
                    </a>
                  ))}
                </Fragment>
              ) : (
                <span className="mt-[3px] inline-block px-4 py-2 text-sm font-medium text-white/40">
                  Not on any streaming services
                </span>
              )}
            </div>
            {movie.watchProviders.length > 0 && (
              <a
                href="https://www.justwatch.com/"
                target="_blank"
                rel="noreferrer"
                className="default-focus-shadow mt-2 ml-auto mr-2 block rounded outline-none ring-offset-2"
              >
                <Image
                  src="/logos/jw_logo.webp"
                  alt="JustWatch"
                  width="65"
                  height="100"
                  className="brightness-75 grayscale-[1] hover:brightness-100"
                />
              </a>
            )}
          </div>
        </div>
        <div className="flex gap-4 border-t border-neutral-700 px-4 py-1">
          <KeyboardShortcut defaultKeys={['esc']} label="Close" />
          <KeyboardShortcut defaultKeys={['←']} label="Prev film" />
          <KeyboardShortcut defaultKeys={['→']} label="Next film" />
        </div>
      </div>
    </div>
  );
};
