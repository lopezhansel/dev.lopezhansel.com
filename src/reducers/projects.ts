import { AnyAction } from 'redux';
import { projects } from '../portfolio/project-data';
import { Project } from '../portfolio/project';

let projectData = projects
  .map(p => new Project(p.name, p.company, p.description, p.stack, p.galleryPath, p.galleryTotal, p.links, p.markdownUrl));

const project = (state = { projectData }, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default project;
