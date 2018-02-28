import { combineReducers } from 'redux';
import projects from './projects';
import selectedProject from './selected-project';
import { Project } from '../services/project';

export type websiteApp = {
  projects: { projectData: Project[] };
  selectedProject: Project | null
};

const websiteApp = combineReducers<websiteApp>({
  projects,
  selectedProject
});

export default websiteApp;