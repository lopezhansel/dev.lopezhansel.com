import * as React from 'react';
import { Project } from '../portfolio/project';
import './Project-List.css';

class ProjectList extends React.Component {
  props: {
    // tslint:disable-next-line:no-any
    selectProject: (data: any) => void,
    projectData: Project[],
  };

  render() {
    return (
      <div className="row">
        <div className="projects" >
          {this.props.projectData.map(p =>
            <div onClick={() => this.props.selectProject(p)} key={p.name}>
              <ProjectItem {...p} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

function ProjectItem(project: Partial<Project>) {
  const noDescription = <p>Description not available...</p>;
  return (
    <div className="project">
      <div className="title">
        {project.name} @ {project.company}
      </div>
      <div className="description ">
        {project.description || noDescription}
      </div>
      <div className="more">
        <button> View</button>
      </div>
    </div>
  );
}

export default ProjectList;
