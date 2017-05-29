class StateManager {
  static instance;

  constructor() {
    if (StateManager.instance) {
      return StateManager.instance;

    }
    StateManager.instance = this;

    this.playHomeAnimation = true;
    this.isInProject = null;
  }

  setPlayHomeAnimation(bool) {
    this.playHomeAnimation = bool;
  }

  getPlayHomeAnimation() {
    return this.playHomeAnimation;
  }

  setIsInProject(id) {
    this.isInProject = id;
  }

  getIsInProject() {
    return this.isInProject;
  }

}
const stateManager = new StateManager();
export default stateManager;
