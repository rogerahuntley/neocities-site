import type { mdsvexComponent } from '$types/mdsvex.type';
import type { project } from '$types/project.type';
import ProjectLink from './components/ProjectLink.svelte';

// get all files
const _projectFiles = import.meta.glob('$lib/projects/**/*.svx');

// get metadata
const getProjects = async() => {
  const _projects = await Promise.all(
    Object.entries(_projectFiles).map(async ([path, resolver]) => {
      const project = await resolver() as mdsvexComponent;

      return {
        component: project.default,
        metadata: project.metadata
      }
    })
  )

  return _projects;
};

// sort into map
var mapProjects = async (_projects?) => {
  _projects = _projects || await getProjects();
  const projects = await _projects;
  const projectMap = projects.map(project => {
    return [project.metadata.project, project]
  })
  return Object.fromEntries(projectMap);
}

// sort by type
var mapProjectsByType = async (_projectMap?) => {
  const projectMap = _projectMap || await mapProjects();
  const projectMapByType = {};
  (Object.values(projectMap) as project[]).map((project) => {
    const type = project.metadata?.type;
    projectMapByType[type] ||= []; // initalize empty array if blank
    projectMapByType[type].push(project);
  });
  return projectMapByType;
}

export { ProjectLink, getProjects, mapProjects, mapProjectsByType };