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
      <h2>
        <a href={`/post/${post.path}`}>
          {post.metadata.title}
        </a>
      </h2>
    </li>
  {/each}
</ul>