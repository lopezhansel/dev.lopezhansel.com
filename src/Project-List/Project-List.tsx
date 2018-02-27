import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
// My Files
import { Project } from '../portfolio/project';
import './Project-List.css';
import ProjectInfo from '../Project-Info/Project-Info';

type ProjectListTypes = {
  projectData: Project[],
  selectProject: (p: Project) => void,
  history: { push: (p: string) => void },
};

const Projects = ({ projectData, selectProject, history }: ProjectListTypes) => (
  <div className="projects" >
    {projectData.map(p =>
      <div onClick={() => history.push('/projects/' + p.name) || selectProject(p)} key={p.name}>
        <ProjectItem {...p} />
      </div>
    )}
  </div>
);

const ProjectList = (props) => (
  <div className="row">
    <Route
      exact={true}
      path={'/projects'}
      render={({ history }) => <Projects {...props} />}
    />
    <Route path={`/projects/:projectId`} component={ProjectInfo} />
  </div>
);

function ProjectItem(project: Partial<Project>) {
  const noDescription = <p>Description not available...</p>;
  return (
    <div className="project">
      <div className="title">
        <code style={{ background: 'none', border: 'none' }}>
          ~/{project.name} @{project.company}
        </code>
      </div>
      <div className="description ">
        {project.description || noDescription}
      </div>
      <div className="more">
        <Link to={'/projects/' + project.name}> View</Link>
      </div>
    </div>
  );
}

// tslint:disable-next-line:no-any
const mapStateToProps = (state: { projects: { projectData: any[] } }, ownProps: any) => {
  return {
    projectData: state.projects.projectData
  };
};

// tslint:disable-next-line:no-any
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    selectProject: (p: Project) => {
      dispatch({ type: 'Select Project', payload: p });
    }
  };
};

/* tslint:disable */
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
