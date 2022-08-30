import { getPostsByFilter } from "$lib/posts";
import { redirect } from "@sveltejs/kit";
export const load = async ({ params, parent }) => {
  const stuff = await parent();
  const projects = stuff.projects;

  const project = projects[params.project];
  const updates = await getPostsByFilter({ type: 'project', project: project.metadata.project });
  const journals = await getPostsByFilter({ type: 'journal', project: project.metadata.project });

  if (project) {
    return {
      project,
      updates,
      journals,
    };
  } else {
    redirect(302, '/projects/')
  }
};