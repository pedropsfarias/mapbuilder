import MapSingleton from '../MapSingleton'

class Interaction {
  constructor() {
    this.map = MapSingleton.getInstance().getMap()
  }

  _mouseMove() {
    this.map.on('mousemove', (e) => {
      const point = e.point

      const features = this.map.queryRenderedFeatures(point)
      console.log(features)
    })
  }

  getPoint() {
    this._mouseMove()
  }
}

export default Interaction
