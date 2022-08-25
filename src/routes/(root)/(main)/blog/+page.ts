export const load = async ({ parent }) => {
  const stuff = await parent();
  return {
    props: {
      articles: stuff.articles
    }
  };
};