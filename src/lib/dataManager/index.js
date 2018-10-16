class DataManager {
  static instance

  constructor () {
    if (DataManager.instance) {
      return DataManager.instance
    }
    DataManager.instance = this

    this.dataLoaded = false
  }

  setData (about, data) {
    this.about = about
    this.projects = data

    this.dataLoaded = true
  }

  isDataLoaded () {
    return this.dataLoaded
  }

  getAbout () {
    return this.about
  }

  getProjects () {
    return this.projects
  }

  getProjectWithName (name) {
    for (let i = 0; i < this.projects.length; i++) {
      const project = this.projects[i]
      if (project.id === name) {
        return project
      }
    }

    return false
  }
}

const dataManager = new DataManager()
export default dataManager
