// returns list of all journal
export const get = async () => {
  const journalFiles = import.meta.glob('$journal/**/*.svx');

  const allJournals = await Promise.all(
    Object.entries(journalFiles).map(async ([path, resolver]) => {
      const { metadata } = await resolver()

      return {
        metadata,
        path: path.replace(".svx", "")
      }
    })
  )

  if (allJournals) {
    return {
      body: allJournals.sort((a, b) => a.metadata.date.localeCompare(b.metadata.date) )
    };
  }

  return {
    status: 404
  };
}