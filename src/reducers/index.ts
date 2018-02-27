import { combineReducers } from 'redux';
import projects from './projects';
import selectedProject from './selected-project';

const websiteApp = combineReducers({
  projects,
  selectedProject
});

export default websiteApp;