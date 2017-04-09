import {data_en} from '../../data'

class DataManager {
  static instance;

  constructor() {
    if (DataManager.instance) {
      return DataManager.instance;

    }
    DataManager.instance = this;

    this.setData(data_en);
  }

  setData(data) {
    this.projects = data;
  }

  getProjects() {
    return this.projects;
  }

  getProjectWithName(name) {
    for (let i = 0; i < this.projects.length; i++) {
      const project = this.projects[i];
      if (project.id === name) {
        return project;
      }
    }

    return false;
  }
}
const dataManager = new DataManager();
export default dataManager;
