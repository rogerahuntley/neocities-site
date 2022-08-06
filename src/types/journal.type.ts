import type { post } from '$types/post.type';

type journal = post;

type nestedDate = {
  [key: string]: journal[];
};

type nestedDates = {
  [key: string]: nestedDate;
};

export type { journal, nestedDate, nestedDates };
