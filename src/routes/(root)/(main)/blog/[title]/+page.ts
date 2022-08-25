import { redirect } from "@sveltejs/kit";
export const load = async ({ params, parent }) => {
  const stuff = await parent();
  const articles = stuff.articles;

  const title = params.title;
  const article = articles[title];

  if (article) {
    return {
      article
    };
  } else {
    redirect(302, '/blog/')
  }
};