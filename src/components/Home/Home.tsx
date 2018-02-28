import * as React from 'react';
import './Home.css';

class Home extends React.Component {

  componentDidMount() {
    // tslint:disable-next-line:no-any
    (window as any).$('.brand').fitText(0.8);
  }

  render() {
    return (
      <div className="container home">
        <div className="row">
          {/* home-card */}
          <div className="one-half column home-card">
            <div className="brand">
              <div className="half-name hansel">Hansel</div>
              <div className="half-name lopez">Lopez</div>
            </div>

            <div className="introduction">
              Working as a developer allows me to have the pleasure to work amongst the brightest minds thus,
              motivating me constantly to improve. I enjoy collaborating with team members, and sharing what I know.
              I truly believe that teaching is the best way to learn.
            </div>

            <div className="links">
              <a href="https://www.linkedin.com/in/lopezhansel/" target="_blank">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="https://github.com/lopezhansel" target="_blank">
                <i className="fab fa-github-alt" />
              </a>
              <a href="mailto:lopezhansel@gmail.com?Subject=Hello" target="_top">
                <i className="fab fa fa-envelope" />
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Home;
