import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Route, Link } from 'react-router-dom';
// My Files
import { Project } from '../../services/project';
import './Project-List.css';
import ProjectInfo from '../Project-Info/Project-Info';
import { websiteApp } from '../../reducers';

type ProjectListTypes = {
  projectData: Project[],
  selectProject: (p: Project) => void,
  history: { push: (p: string) => void },
};

const Projects = ({ projectData, selectProject, history }: ProjectListTypes) => {
  // tslint:disable
  let projectPairs = projectData.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      // tslint:disable
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, [] as Project[][]);

  return (
    <div>
      {projectPairs.map((pair) => (
        <div className="row">
          {pair.map(p => (<div className="one-half column" onClick={() => history.push('/projects/' + p.name) || selectProject(p)} key={p.name}>
            <ProjectItem {...p} />
          </div>))}
        </div>
      ))}
    </div>
  )
};

// tslint:disable
const ProjectList = (props: any) => (
  <div>
    <Route
      exact={true}
      path={'/projects'}
      render={() => <Projects {...props} />}
    />
    <Route path={`/projects/:projectId`} component={ProjectInfo} />
  </div>
);

export function ProjectItem(project: Partial<Project>) {
  const noDescription = <p>Description not available...</p>;
  return (
    <div className="project">
      <div className="title">
        <code style={{ background: 'none', border: 'none' }}>
          ~/{project.name}
        </code>
      </div>
      <div className="description ">
        {project.description || noDescription}
      </div>
      <div className="company">@{project.company}</div >
      <div className="more">
        <Link to={'/projects/' + project.name}> View</Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state: websiteApp) => {
  return {
    projectData: state.projects.projectData
  };
};

const mapDispatchToProps = (dispatch: Dispatch<null>) => {
  return {
    selectProject: (p: Project) => {
      dispatch({ type: 'Select Project', payload: p });
    }
  };
};

/* tslint:disable */
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
