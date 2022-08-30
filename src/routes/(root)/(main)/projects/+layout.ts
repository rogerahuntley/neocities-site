import { mapProjects } from '$lib/projects';
export const load = async () => {
  return {
    projects: await mapProjects(),
    title: 'Projects',
    titleLink: '/projects/',
  };
};