import * as React from 'react';
import { Project } from '../portfolio/project';
import './Project-Info.css';

class ProjectInfo extends React.Component {
  props: { selectedProject: Project };

  componentDidMount() {
    setupSlick();
  }

  render() {
    const { name, company, description, gallery, stack, hasGallery } = this.props.selectedProject;
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
        </div>
      </div>
    );
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
