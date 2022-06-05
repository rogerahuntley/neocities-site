// returns list of all journal
export const get = async () => {
  const journalFiles = import.meta.glob('$journals/**/*.svx');

  const allJournals = await Promise.all(
    Object.entries(journalFiles).map(async ([path, resolver]) => {
      const { metadata } = await resolver()

      return {
        metadata,
        path: path.replace(".svx", "")
      }
    })
  )

  return {
    body: allJournals
  }
}