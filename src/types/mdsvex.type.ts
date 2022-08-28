// this is just a type for when the thing is loaded from a file
type mdsvexComponent = {
  default: any,
  metadata: {
    [key: string]: any
  }
};

export type { mdsvexComponent }