import * as React from 'react';
import './App.css';
import Home from '../Home/Home';
import ProjectInfo from '../Project-Info/Project-Info';
import ProjectList from '../Project-List/Project-List';
import { projectData, Project } from '../portfolio/project';
import * as classNames from 'classnames';

enum navSt {
  home,
  projectList,
  projectInfo,
}

class App extends React.Component {
  state = {
    appState: navSt.home,
    projectData,
    selectedProject: projectData[0]
  };

  setNavState(state: navSt) {
    return () => {
      this.state.appState = state;
      this.setState(this.state);
    };
  }

  onProjectSelect = (selectedProject: Project) => {
    this.state.selectedProject = selectedProject;
    this.state.appState = navSt.projectInfo;
    this.setState(this.state);
  }

  isActive(check: navSt) {
    switch (check) {
      case navSt.home:
        return this.state.appState === navSt.home;
      case navSt.projectList:
        return this.state.appState === navSt.projectList;
      case navSt.projectInfo:
        return this.state.appState === navSt.projectInfo;
      default:
        return false;
    }
  }

  render() {
    const { projectData: ProjectJson, selectedProject } = this.state;
    const goHome = this.setNavState(navSt.home);
    const gotoProjectList = this.setNavState(navSt.projectList);

    return (
      <div style={{ height: '100%' }}>
        <br />
        <div className="container">
          <button className={classNames('overwrite', { 'active': this.isActive(navSt.home) })} onClick={goHome}>Home </button>
          <button className={classNames('overwrite', { 'active': this.isActive(navSt.projectList) })} onClick={gotoProjectList}>Projects </button>
        </div>
        {this.isActive(navSt.home) && <Home />}
        {this.isActive(navSt.projectInfo) && <Container><ProjectInfo selectedProject={selectedProject} /> </Container>}
        {this.isActive(navSt.projectList) && <Container><ProjectList projectData={ProjectJson} selectProject={this.onProjectSelect} /></Container>}
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
