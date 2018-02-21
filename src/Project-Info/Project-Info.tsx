import * as React from 'react';
import { Project } from '../portfolio/project';
import './Project-Info.css';
import axios from 'axios';
import { Markdown } from '../Markdown/Markdown';

function fetchMarkdown(url: string) {
  return axios.get(url).then(d => d.data);
}

const input = '### fetching description..';

class ProjectInfo extends React.Component {
  props: { selectedProject: Project };
  state = { markdown: input };

  getMarkDown() {
    let { markdownUrl } = this.props.selectedProject;
    fetchMarkdown(markdownUrl)
      .then(s => {
        this.state.markdown = s;
        this.setState(this.state);
      });
  }

  componentDidMount() {
    setupSlick();
    this.getMarkDown();
  }

  render() {
    const { name, company, description, gallery, stack, hasGallery, links } = this.props.selectedProject;
    const noContent = <p>Content is being worked on. Please come back later.</p>;

    return (
      <div className="row">
        <div className="project-info">
          {hasGallery && <div className="gallery">
            {gallery.map((i: string, key: number) => <Slide image={i} key={key} />)}
          </div>}
          {hasGallery && <br />}
          {hasGallery && <br />}
          <br />
          {!hasGallery && noContent}
          <h1 className="title"> {name}  </h1>
          <div className="description">
            <b>Description</b>
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
          <div>
            <b>Links</b>
            <Links links={links} />
          </div>
          <Markdown source={this.state.markdown} />
        </div>
      </div>
    );
  }
}

function Links(prop: { links: string[] }) {
  return (
    <div>
      {prop.links.map((l, k) => <li key={k}>
        <a href={l} target="_blank">{l}</a>
      </li>)}
    </div>
  );
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
