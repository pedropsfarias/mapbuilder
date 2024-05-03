import MapSingleton from '../MapSingleton.js'
import Interaction from './Interaction.js'

class Measure {
  constructor() {
    let map = MapSingleton.getInstance().getMap()

    let interaction = new Interaction()
    interaction.getPoint()
  }
}

export default Measure
