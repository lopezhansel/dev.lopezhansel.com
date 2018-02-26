import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// My Files
import Home from '../Home/Home';
import ProjectInfo from '../Project-Info/Project-Info';
import ProjectList from '../Project-List/Project-List';
import { projectData, Project } from '../portfolio/project';
import './App.css';

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
    const { projectData: ProjectJson } = this.state;
    
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <NavBar />
          <br />
          <Route exact={true} path="/" component={Home} />
          <Container>
            <Route path="/more-info" component={ProjectInfo} />
            <Route path="/projects" projectData={ProjectJson} component={ProjectList} />
          </Container>
        </div >
        {/* {this.isActive(navSt.home) && <Home />}
        {this.isActive(navSt.projectInfo) && <Container><ProjectInfo selectedProject={selectedProject} /> </Container>}
      {this.isActive(navSt.projectList) && <Container><ProjectList projectData={ProjectJson} selectProject={this.onProjectSelect} /></Container>} */}
      </Router>
    );
  }
}

function NavBar() {
  return (
    <div className="container">
      <button className="overwrite" >
        <Link to="/">Home</Link>
      </button>
      <button className="overwrite">
        <Link to="/projects">Projects</Link>
      </button>
      <button className="overwrite">
        <Link to="/more-info">More Info</Link>
      </button>
    </div>
  );
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
