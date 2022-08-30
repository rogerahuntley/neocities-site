import type { mdsvexComponent } from "./mdsvex.type";

type post = {
  filePath: string;
  publicPath: string;
  data: {
      [key: string]: any;
  };
};

type post_raw = mdsvexComponent & {
  metadata: {
    title: string,
    tags: string,
    size: string,
    hidden: boolean,
    date: string,
    project: string,
  }
}

type post_public = {
  path: string;
  metadata: {
      [key: string]: any;
  };
}

export type { post, post_raw, post_public };
