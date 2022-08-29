import type { mdsvexComponent } from "./mdsvex.type";

type place = {
  component: any,
  metadata: {
    [key:string]: any
  }
}

type place_raw = mdsvexComponent & {
  metadata: {
    title: string,
    travel: string
  }
}

export type { place, place_raw };