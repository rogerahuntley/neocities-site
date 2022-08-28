import type { mdsvexComponent } from "./mdsvex.type";

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

export type { project, project_raw };