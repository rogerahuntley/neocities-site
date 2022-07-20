type post = {
  path: string;
  post: {
      [key: string]: any;
  };
};

type post_endpoint = {
  path: string;
  metadata: {
      [key: string]: any;
  };
}

export type { post, post_endpoint };
