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
}
const dataManager = new DataManager();
export default dataManager;
