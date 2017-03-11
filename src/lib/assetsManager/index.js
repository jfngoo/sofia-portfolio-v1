class AssetsManager {
  static instance;

  constructor() {
    if (AssetsManager.instance) {
      return AssetsManager.instance;
    }
    this.fromPhotos = require.context('../../assets/img/');
    AssetsManager.instance = this;
  }

  getPhoto(fileName) {
    return this.fromPhotos('./' + fileName + '.png');
  }
}
const assetsManager = new AssetsManager();
export default assetsManager;
