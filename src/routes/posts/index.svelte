<script context="module">
  export const load = async ({ fetch }) => {
    const posts = await fetch('/api/posts.json')
    const allPosts = await posts.json()
  
    return {
      props: {
        posts: allPosts
      }
    }
  }
</script>


<script>
  export let posts
</script>

<ul>
  {#each posts as post}
    <li>
      <a href={`/post/${post.path}`}>
        {post.metadata.title}
      </a>
    </li>
  {/each}
</ul>