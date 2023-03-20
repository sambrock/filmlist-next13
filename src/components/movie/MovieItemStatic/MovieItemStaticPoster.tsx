import { MOVIE_IMAGE_URL } from '@/constants';

type MovieItemStaticPosterProps = {
  title: string;
  posterPath: string;
  posterSrc: 'tmdb' | 'default';
};

export const MovieItemStaticPoster = ({ title, posterPath, posterSrc }: MovieItemStaticPosterProps) => {
  return (
    <img className="aspect-poster w-full" src={MOVIE_IMAGE_URL['poster']['w342'][posterSrc] + posterPath} alt={title} />
  );
};

// return (
//   <Image
//     className="aspect-poster w-full"
//     src={MOVIE_IMAGE_URL['poster']['w342'][posterSrc] + posterPath}
//     alt={'image'}
//     width="342"
//     height="513"
//   />
// );
