import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// My Files
import Home from '../Home/Home';
import ProjectInfo from '../Project-Info/Project-Info';
import ProjectList from '../Project-List/Project-List';
import appReducers from '../../reducers';
import './App.css';

const store = createStore(appReducers);

const App = () => (
  <Provider store={store}>
    <Router>
      <div style={{ height: '100%' }}>
        <NavBar />
        <br />
        <Route exact={true} path="/" component={Home} />
        <Container>
          <Route path="/more-info" component={ProjectInfo} />
          <Route path="/projects" component={ProjectList} />
        </Container>
      </div >
    </Router>
  </Provider>
);

function NavBar() {
  return (
    <div className="container">
      <button className="overwrite" >
        <Link to="/">Home</Link>
      </button>
      <button className="overwrite">
        <Link to="/projects">Projects</Link>
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
