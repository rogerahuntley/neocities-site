import type { mdsvexComponent } from "./mdsvex.type";
import type { post } from '$types/post.type'

type project = {
  component: any,
  metadata: {
    [key:string]: any
  }
}

type project_raw = mdsvexComponent & {
  metadata: {
    title: string,
    project: string
  }
}

type update = post;

type update_map = { [key: string]: update }

export type { project, project_raw, update, update_map };