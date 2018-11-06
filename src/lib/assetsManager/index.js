class AssetsManager {
  static instance

  constructor () {
    if (AssetsManager.instance) {
      return AssetsManager.instance
    }
    // this.fromPhotos = require.context('../../assets/img/');
    // this.fromCovers = require.context('../../assets/img/_covers');
    this.fromPhotos = '../../../img/static/'
    this.fromCovers = '../../../img/static/_covers/'
    AssetsManager.instance = this
  }

  getCover (filename) {
    return this.fromCovers + filename
  }

  getAboutBackground (filename) {
    return this.fromPhotos + '/about/' + filename
  }

  getAssetInFolder (folder, filename) {
    return this.fromPhotos + folder + '/' + filename
  }

  preloadCovers (arrayOfImages) {
    for (let i = 0; i < arrayOfImages.length; i++) {
      const filename = arrayOfImages[i]
      new Image().src = this.getCover(filename)
    }
  }

  preloadAboutImage (filename) {
    new Image().src = this.getAboutBackground(filename)
  }
}

const assetsManager = new AssetsManager()
export default assetsManager
