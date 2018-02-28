import { AnyAction } from 'redux';
import { projectsData } from '../services/project-data';
import { Project } from '../services/project';

let projectData = projectsData
  .map(p => new Project(p.name, p.company, p.description, p.stack, p.galleryPath, p.galleryTotal, p.links, p.markdownUrl));

const project = (state = { projectData }, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default project;
