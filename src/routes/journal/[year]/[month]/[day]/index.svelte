<script context="module" lang="ts">
  import { toMonthInt } from '$lib/journals';

  export const load = async ({ params }) => {
    if (params.month && isNaN(params.month)) {
      return {
        status: 302,
        redirect: `/journal/${params.year}/${toMonthInt(params.month) + 1}/${params.day}/`
      };
    }

    return {
      status: 200
    };
  };
</script>

<slot />
