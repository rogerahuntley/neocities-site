export const load = async ({ fetch, stuff }) => {
  const _post = await import('@/posts/journal/2022/6/5.svx');
  console.log(_post)

  return {
    body: {
      journals: 4
    }
  };
};