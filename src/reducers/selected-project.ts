import { AnyAction } from 'redux';
import { Project } from '../services/project';

const _selectedProject: Project | null = null;

const selectedProject = (state = _selectedProject, action: AnyAction) => {
  switch (action.type) {
    case 'Select Project':
      return action.payload;
    default:
      return state;
  }
};

export default selectedProject;
