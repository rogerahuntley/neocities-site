<script lang="ts">
  import { toMonthName } from '../../';

  export let year: string | undefined = undefined;
  export let month: string | undefined = undefined;

  let path = '/journal/';
  if (year) path += `${year}/`;
  if (year && month) path += `${month}/`;

  let style = month ? 'month' : 'year';
</script>

<div class="journals-link {style}">
  <a sveltekit:reload href={path}>
    {month ? toMonthName(month) : year}
  </a>
</div>
