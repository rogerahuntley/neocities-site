type post = {
  metadata: {
    title: string;
    date: string;
    tags?: string;
    travel?: string;
    hidden?: boolean;
  };
  path: string;
};

export type { post };
