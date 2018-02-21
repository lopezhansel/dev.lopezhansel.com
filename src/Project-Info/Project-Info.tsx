import * as React from 'react';
import { Project } from '../portfolio/project';
import './Project-Info.css';
import axios from 'axios';
import { Markdown } from '../Markdown/Markdown';

function fetchMarkdown(url: string) {
  return axios.get(url).then(d => d.data);
}

class ProjectInfo extends React.Component {
  props: { selectedProject: Project };
  state = { markdown: '' };

  getMarkDown() {
    let { markdownUrl } = this.props.selectedProject;
    fetchMarkdown(markdownUrl)
      .then(s => {
        const contentDidDownload = s.length > 2;
        this.state.markdown = contentDidDownload ? s : '';
        this.setState(this.state);
      });
  }

  componentDidMount() {
    setupSlick();
    this.getMarkDown();
  }

  render() {
    const { name, company, description, gallery, stack, hasGallery, links } = this.props.selectedProject;
    const noContent = <p>Description is being worked on. Please come back later.</p>;
    const galleryProps = { hasGallery, gallery };

    return (
      <div className="row">
        <div className="project-info">
          <Gallery {...galleryProps} />
          <br />
          <h1 className="title"> {name}  </h1>
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
      <img src={'./' + prop.image} alt="" />
    </div>
  );
}

export default ProjectInfo;
