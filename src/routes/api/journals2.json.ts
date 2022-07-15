
  import { compile } from 'mdsvex';

  const csompile = async () => {
    return await compile(`# Hello friends
    `);
  };

// returns list of all journal
export const get = async () => {
  const journalFiles = import.meta.glob('@/posts/**/*.svx');

  const allJournals = await Promise.all(
    Object.entries(journalFiles).map(async ([path, resolver]) => {
      const { metadata } = await resolver();

      if (metadata.hidden) {
        return undefined;
      }

      return {
        metadata,
        path: path.replace('.svx', ''),
        data: await csompile()
      };
    })
  );

  const filtered = allJournals.filter((i) => i) as { metadata; path }[];

  if (filtered) {
    return {
      body: filtered.sort((a, b) => a.metadata.date.localeCompare(b.metadata.date))
    };
  }

  return {
    status: 404
  };
};
