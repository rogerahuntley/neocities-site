import type { post } from '$types/post.type';

type blog = post;

type blogMap = { [key: string]: post }

export type { blog, blogMap };
