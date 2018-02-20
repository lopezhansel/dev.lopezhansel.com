import * as React from 'react';
import './App.css';
import Home from '../Home/Home';
import ProjectInfo from '../Project-Info/Project-Info';
import ProjectList from '../Project-List/Project-List';
import { projectData, Project } from '../portfolio/project';
import * as classNames from 'classnames';

enum navEnum {
  home,
  projectList,
  projectInfo,
}

class App extends React.Component {
  state = {
    appState: navEnum.home,
    projectData,
    selectedProject: projectData[0]
  };

  setNavState(state: navEnum) {
    return () => {
      this.state.appState = state;
      this.setState(this.state);
    };
  }

  onProjectSelect = (selectedProject: Project) => {
    this.state.selectedProject = selectedProject;
    this.state.appState = navEnum.projectInfo;
    this.setState(this.state);
  }

  isActive(check: navEnum) {
    switch (check) {
      case navEnum.home:
        return this.state.appState === navEnum.home;
      case navEnum.projectList:
        return this.state.appState === navEnum.projectList;
      case navEnum.projectInfo:
        return this.state.appState === navEnum.projectInfo;
      default:
        return false;
    }
  }

  render() {
    const { projectData: ProjectJson, selectedProject } = this.state;
    const goHome = this.setNavState(navEnum.home);
    const gotoProjectList = this.setNavState(navEnum.projectList);

    return (
      <div style={{ height: '100%' }}>
        <br />
        <div className="container">
          <button className={classNames({ 'overwrite': true, 'active': this.isActive(navEnum.home) })} onClick={goHome}>Home </button>
          <button className={classNames({ 'overwrite': true, 'active': this.isActive(navEnum.projectList) })} onClick={gotoProjectList}>Projects </button>
        </div>
        {this.isActive(navEnum.home) && <Home />}
        {this.isActive(navEnum.projectInfo) && <Container><ProjectInfo selectedProject={selectedProject} /> </Container>}
        {this.isActive(navEnum.projectList) && <Container><ProjectList projectData={ProjectJson} selectProject={this.onProjectSelect} /></Container>}
      </div >

    );
  }
}

function Container(prop: React.Props<null>) {
  return (
    <div className="container">
      <br />
      {prop.children}
      <br />
    </div>
  );
}

export default App;
