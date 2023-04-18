import { clsx } from 'clsx';
import { movieItemStyles } from './MovieItemStatic/MovieItemStatic';

export const MovieItemLoading = () => {
  return <li className={clsx(movieItemStyles)}></li>;
};
