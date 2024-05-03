import MapSingleton from '../MapSingleton.js'

class Measure {
  constructor() {
    let map = MapSingleton.getInstance().getMap()

    map.on('mousemove', (e) => {
      console.log('Mouse move :', e.lngLat)
    })
  }
}

export default Measure
