import { mapProjectsByType } from "$lib/projects";
export const load = async ({ parent }) => {
  const stuff = await parent();
  var projectMap = stuff.projects;

  return {
    projectsByType: await mapProjectsByType(projectMap),
    title: "Project List"
  };
};