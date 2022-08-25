import { nestDates } from '$lib/posts';
import { filterPosts } from '$lib/posts';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
  console.log(params);
  const stuff = await parent();

  // get page params
  const [year, month, day] = params.date.split('/').filter((i) => i != '');

  // pull journal data, filter journals without dates
  const journals = stuff.journals.filter((j) => j.data.metadata.date);

  // if we go forward we skip the year page, but if we go 'back' we won't, so let's check to see if we should reroute
  let backSteps = 0;
  let stop = false;

  // get parameters we can check
  const filters = { year, month };
  const valid = Object.keys(filters).filter((k) => filters[k]);

  while (!stop && valid.length > 0) {
    // get filtered for this page
    const curFilters = Object.fromEntries(
      Object.entries(filters).filter((e) => valid.includes(e[0]))
    );
    const curFiltered = filterPosts(journals, curFilters);

    // get filtered for one page up
    const subFilters = Object.fromEntries(
      Object.entries(filters).filter((e) => valid.slice(0, -1).includes(e[0]))
    );
    const subFiltered = filterPosts(journals, subFilters);

    // go up one dir if contents are the same
    if (curFiltered.length == subFiltered.length) {
      backSteps++;
      valid.pop();
    } else {
      stop = true;
    }
  }

  // check if how far back we should redirect
  if (backSteps > 0) {
    throw redirect(302, Array(backSteps).fill('../').join(''))
  } else {
    const filtered = filterPosts(journals, { year, month, day }).reverse();
    const dates = nestDates(filtered).dates;

    return {
      filtered,
      dates,
      year,
      month,
      day
    };
  }
};