import { http } from './axios';

export const fetcher = (...args /**@ts-ignore */) =>
  http(...args).then((res) => {
    return res.data?.data;
  });
