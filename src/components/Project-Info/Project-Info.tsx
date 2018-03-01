import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Project } from '../../services/project';
import './Project-Info.css';
import axios from 'axios';
import { Markdown } from '../Markdown/Markdown';
import { match, Link } from 'react-router-dom';
import { websiteApp } from '../../reducers';

function fetchMarkdown(url: string) {
  return axios.get(url).then(d => d.data);
}

class ProjectInfo extends React.Component {
  state = { markdown: '' };
  props: {
    selectedProject: Project,
    projectData: Project[],
    match: match<{ projectId: string }>,
    dispatch: Dispatch<object>
  };

  getMarkDown() {
    let { markdownUrl } = this.props.selectedProject;
    fetchMarkdown(markdownUrl)
      .then(s => {
        const contentDidDownload = s.length > 2;
        this.state.markdown = contentDidDownload ? s : '';
        this.setState(this.state);
      });
  }

  componentWillMount() {
    if (!this.props.selectedProject) {
      let { projectId } = this.props.match.params;
      let project = this.props.projectData.find(p => p.name === projectId);
      if (project) {
        this.props.dispatch({ type: 'Select Project', payload: project });
      }
    }
  }

  // tslint:disable-next-line
  componentDidUpdate(prevProp: any) {
    /* Check If Selected Project Was Updated */
    let didUpdateSelectedProject = !prevProp.selectedProject && !!this.props.selectedProject;
    if (didUpdateSelectedProject) {
      this.setupSlickAndMarkdown();
    }
  }

  /** Init Slick.js and FetchMarkdown */
  setupSlickAndMarkdown() {
    setupSlick();
    this.getMarkDown();
  }

  componentDidMount() {
    if (!!this.props.selectedProject) {
      this.setupSlickAndMarkdown();
    }
  }

  render() {
    if (!this.props.selectedProject) {
      return <div>No Data</div>;
    }
    const { name, company, description, gallery, stack, hasGallery, links } = this.props.selectedProject;
    const noContent = <p>Description is being worked on. Please come back later.</p>;
    const galleryProps = { hasGallery, gallery };

    return (
      <div className="row">
        <div className="project-info">
          <div className="pi-title-container">
            <div className="pi-title">{name}</div>
            <div className="close">
              <Link to="/projects"> <i className="fa fa-times" /></Link>
            </div>
          </div>
          <div className="pi-container">
            <Gallery {...galleryProps} />
            <br />
            <div className="description">
              <b>Purpose</b>
              {!description && noContent}
              <p>{description && description}</p>
            </div>
            <div>
              <b>Company</b>
              <p>{company}</p>
            </div>
            <div>
              <b>Technologies used</b>
              <p>{stack.join(', ')}</p>
            </div>
            <Links links={links} />
            <Markdown source={this.state.markdown} />
          </div>
        </div>
      </div>
    );
  }
}

function Gallery(prop: { hasGallery: boolean, gallery: string[] }) {
  const noContent = <p>Pictures  are being worked on. Please come back later.</p>;
  return (
    <div>
      {prop.hasGallery && <div className="gallery">
        {prop.gallery.map((i: string, key: number) => <Slide image={i} key={key} />)}
      </div>}
      {prop.hasGallery && <br />}
      {prop.hasGallery && <br />}
      {!prop.hasGallery && noContent}
    </div>
  );
}

function Links(prop: { links: string[] }) {
  if (prop.links.length > 0) {
    return (
      <div>
        <b>Links</b>
        {prop.links.map((l, k) => <li key={k}>
          <a href={l} target="_blank">{l}</a>
        </li  >)}
      </div>
    );
  } else {
    return null;
  }
}

function setupSlick() {
  // tslint:disable-next-line:no-any
  (window as any).$('.gallery').slick({
    slidesToShow: 1,
    autoplay: true,
  });
}

function Slide(prop: { image: string }) {
  return (
    <div className="slide" >
      <img src={prop.image} alt="" />
    </div>
  );
}

const mapStateToProps = (state: websiteApp) => ({
  selectedProject: state.selectedProject,
  projectData: state.projects.projectData
});

export default connect(mapStateToProps)(ProjectInfo);
