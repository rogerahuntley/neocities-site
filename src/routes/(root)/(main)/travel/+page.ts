import { getPlaces, getTravelLogs } from '$lib/travel';
export const load = async () => {
  const places = await getPlaces();
  const travelLogs = await getTravelLogs(places);

  return {
    places,
    travelLogs,
    title: 'Travel',
  };
};