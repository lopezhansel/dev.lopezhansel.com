import { projects } from './project-data';

const MS_IN_DAY = 86400000;

export interface Projects {
  name: string;
  company: string;
  description: string;
  stack: string[];
  thumb: string;
  markdown: string;
  gallery: string[];
}

export class CheckProp {
  protected checkProp(propValue: number | string, propName: string) {
    if (propValue === undefined) {
      throw new Error(`Expect property ${propName} to exist, but doesn't`);
    }
  }
}

export class ProjectImages extends CheckProp {
  public galleryPath: string;
  public galleryTotal: number;

  get thumb() {
    return this.gallery[0];
  }

  private getImageUrl(num: number) {
    this.checkProp(this.galleryPath, 'galleryPath');
    return `/web/images/projects/${this.galleryPath}/image%20(${num}).png`;
  }

  get hasGallery(): boolean {
    return this.gallery.length > 0;
  }

  get gallery() {
    this.checkProp(this.galleryTotal, 'galleryTotal');
    const emptyArray = Array(this.galleryTotal).fill(undefined);
    return emptyArray.map((e, ind) => this.getImageUrl(ind + 1));
  }
}

export class ProjectDates extends ProjectImages {

  public startDate: string;
  public endDate: string;

  get daysAgo() {
    this.checkProp(this.startDate, 'startDate');
    const then = new Date(this.startDate).valueOf();
    const now = Date.now();
    const diff = now - then;
    return diff / MS_IN_DAY;
  }

  get projectDuration() {
    this.checkProp(this.startDate, 'startDate');
    this.checkProp(this.endDate, 'endDate');
    const start = new Date(this.startDate).valueOf();
    const end = new Date(this.endDate).valueOf();
    const diff = end - start;
    return diff / MS_IN_DAY;
  }
}

export class Project extends ProjectDates implements Projects {

  public markdown: string;
  public startDate: string;
  public endDate: string;

  constructor(
    public name: string,
    public company: string,
    public description: string,
    private _stack: string,
    public galleryPath: string,
    public galleryTotal: number,
    public links: string[]
  ) {
    super();
  }

  get stack() {
    return this._stack.split(',');
  }

  toJSON() {
    let { stack, name, company, description, markdown, startDate, endDate } = this;
    let { daysAgo, projectDuration, gallery, thumb } = this;
    let output = {
      stack, name, company, description, markdown, startDate, endDate,
      daysAgo, projectDuration, gallery, thumb
    };
    return JSON.stringify(output);
  }

}

export let projectData = projects
  .map(p => new Project(p.name, p.company, p.description, p.stack, p.galleryPath, p.galleryTotal, p.links));

// let startDate = new Date(Date.now() - (MS_IN_DAY * 5)).toJSON()
// project.startDate = startDate;
// project.endDate = new Date(Date.now() - (MS_IN_DAY * 3)).toJSON()

// // project.daysAgo //?
// // let { daysAgo, projectDuration, gallery, thumb } = project
// // project.projectDuration //?
// // project.gallery //?
// // project.thumb //?
// let obj = { ...project, daysAgo, projectDuration, gallery, thumb }

// console.log(project.toJSON())

// new ProjectImages('mobilemen', 27)
// new ProjectImages('pmobile', 11)