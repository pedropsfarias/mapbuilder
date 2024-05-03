import maplibregl from 'maplibre-gl'

class MapSingleton {
  constructor() {
    // The instance property holds the single instance of the map
    this.map = null
  }

  // Initialize the map if it hasn't been created yet
  initializeMap(config) {
    if (!this.map) {
      config = config || {}
      let style = config.style || 'style.json'
      let container = config.container || 'map'
      let options = config.options || {}

      this.map = new maplibregl.Map({
        style,
        container,
        ...options
      })
    }
    return this.map
  }

  getMap() {
    return this.map
  }

  // Method to access the singleton instance
  static getInstance() {
    if (!MapSingleton._instance) {
      console.log('getInstance: Creating new instance')
      MapSingleton._instance = new MapSingleton()
    }
    return MapSingleton._instance
  }
}

export default MapSingleton
