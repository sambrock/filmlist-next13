import { customAlphabet } from 'nanoid';
import { createRegExp, exactly } from 'magic-regexp';

import { NANO_ID_ALPHABET, NANO_ID_LENGTH } from '../constants';

export const generateNanoId = customAlphabet(NANO_ID_ALPHABET, NANO_ID_LENGTH);

const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * https://gist.github.com/steve8708/ada9bff2600228789fce2fcc95427e39
 */
export function getRelativeTimeString(date: Date | number, lang = navigator.language): string {
  const time = date instanceof Date ? date.getTime() : date;
  const delta = Math.round((time - Date.now()) / 1000);
  const absoluteDelta = Math.abs(delta);
  const times: [number, Intl.RelativeTimeFormatUnit, number][] = [
    [minute, 'second', 1],
    [hour, 'minute', minute],
    [day, 'hour', hour],
    [week, 'day', day],
    [month, 'week', week],
    [year, 'month', month],
    [Infinity, 'year', year],
  ];
  let divider = year;
  let timeType: Intl.RelativeTimeFormatUnit = 'year';
  for (const [num, timeInterval, div] of times) {
    if (absoluteDelta < num) {
      divider = div;
      timeType = timeInterval;
      break;
    }
  }
  const rtf = new Intl.RelativeTimeFormat(lang, {
    numeric: 'auto',
  });

  return rtf.format(Math.floor(delta / divider), timeType);
}

export const parseSearchQuery = (q: string) => {
  let query = '';
  let director = '';
  let year = '';

  const split = q.split(' ');

  const r1 = createRegExp(exactly('d:').at.lineStart()); // director
  const r2 = createRegExp(exactly('y:').at.lineStart()); // year

  split.forEach((s, i) => {
    if (r1.test(s)) {
      director = s.replace('d:', '');
    } else if (r2.test(s)) {
      year = s.replace('y:', '');
    } else {
      query += s + ' ';
    }
  });

  return {
    query: query.trim(),
    director: director.replaceAll('_', ' ').trim(),
    year,
  };
};

type QueryParams = { [key: string]: string | number | boolean | undefined };

export const buildQueryString = (params: QueryParams): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
    .join('&');
  return query ? `?${query}` : '';
};
