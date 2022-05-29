// returns list of all post
export const get = async () => {
  const postFiles = import.meta.glob('$posts/**/*.md');

  const allPosts = await Promise.all(
    Object.entries(postFiles).map(async ([path, resolver]) => {
      const { metadata } = await resolver()

      return {
        metadata,
        path: path.replace(".md", "")
      }
    })
  )

  return {
    body: allPosts
  }
}