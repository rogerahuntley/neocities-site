import type { mdsvexComponent } from '$types/mdsvex.type';
import { getPostsByFilter } from '$lib/posts';
import type { place } from '$types/travel.type';

// get all files
const _placeFiles = import.meta.glob('$lib/travel/**/*.svx');

// get metadata
const getPlaces = async() => {
  const _places = (await Promise.all(
    Object.entries(_placeFiles).map(async ([path, resolver]) => {
      const place = await resolver() as mdsvexComponent;

      return {
        component: place.default,
        metadata: place.metadata
      }
    })
  )).sort((a, b) => { // order by order
    return (a.metadata.order || 0) - (b.metadata.order || 0)
  })

  return _places;
};

const getTravelLogs = async(places?) => {
  places = places || await getPlaces();
  console.log(places)
  const travelLogs = {};
  await Promise.all((Object.values(places) as place[]).map(async place => {
    const place_key = place.metadata.travel;
    const travel_posts = await getPostsByFilter({ type: 'journal', travel: place_key });
    travelLogs[place_key] = travel_posts;
  }));
  return travelLogs;
}

export { getPlaces, getTravelLogs };