import type { post } from '$types/post.type';

type blog = post;

type blog_map = { [key: string]: blog }

export type { blog, blog_map };
