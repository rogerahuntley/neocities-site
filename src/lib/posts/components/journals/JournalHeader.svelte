<script lang="ts">
  export var text: string;
  export var link: string;
</script>

{#if text && link}
  <div class="journals-header">
    <a class="journals-back" href={link}> ◄ </a>
    <div class="journals-title">
      {text}
    </div>
  </div>
{/if}
