class DataManager {
  static instance;

  constructor() {
    if (DataManager.instance) {
      return DataManager.instance;

    }
    DataManager.instance = this;

    this.setData();
  }

  setData() {
    this.projects = [
      {
        title: "Cushy!",
        type: "IoT",
        date: "2017"
      },
      {
        title: "Lost Elements",
        type: "Tablet Game",
        date: "2016"
      },
      {
        title: "Orianna",
        type: "Cosplay",
        date: "2015"
      },
      {
        title: "S4M-M1",
        type: "Arduino",
        date: "2014"
      },
      {
        title: "Attraction Magnitude",
        type: "Data visualization",
        date: "2014"
      }
    ]
  }

  getProjects() {
    return this.projects;
  }
}
const dataManager = new DataManager();
export default dataManager;
