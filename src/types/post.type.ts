type post = {
  filePath: string;
  publicPath: string;
  data: {
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
