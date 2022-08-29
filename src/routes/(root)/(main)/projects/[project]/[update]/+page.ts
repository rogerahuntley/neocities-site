import { mapUpdates, getPostsByFilter } from "$lib/posts";
import { redirect } from "@sveltejs/kit";
export const load = async ({ params }) => {

  const updates = getPostsByFilter({ type: 'project', project: params.project })
  const mappedUpdates = await mapUpdates(updates);

  const update = mappedUpdates[`/projects/${params.project}/${params.update}`]

  if (update) {
    return {
      update
    };
  } else {
    redirect(302, '/blog/')
  }
};