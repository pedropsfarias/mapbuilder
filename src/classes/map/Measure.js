//import maplibregl from 'maplibre-gl';

class Measure {
  // public map: any;

  constructor(map) {
    this.map = map;
  }

  init() {
    console.log('Measure tool initialized', this);

    setTimeout(() => {
      this.map.on('mousemove', (e) => {
        console.log('move', e);
      });
    }, 1000);


  }


}

export default Measure;
